import fs from 'fs';
import Mustache from 'mustache';
import sgMail from '@sendgrid/mail';
import { getUserById } from '../services/user';
import { join } from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const lstat = promisify(fs.lstat);
const templates = {};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const init = async () => {
  const templatePath = join(__dirname, './email-templates')
  const templateNames = await readdir(templatePath)
  for (const name of templateNames) {
    try {
      const filepath = join(templatePath, name);
      const stat = await lstat(filepath);

      if (stat.isFile() && name !== '.DS_Store') {
        const file = (await readFile(filepath)).toString('utf8');
        templates[name.split('.')[0]] = file.replace(/(\r\n|\n|\r)/gm, '');
      }
    } catch(e) {
      console.log('Error reading email template', name, e);
    }
  }
};

init();



const sendForgotPassword = async ({
  id,
  passwordToken
}) => {
  const user = await getUserById({ id });
  sendEmail({
    to: user.email,
    subject: `Reset your Amped Framework password`,
    templateData: {
      body: `
        <p>Follow the link below to reet your password</p>
      `,
      title: `Reset password`,
      ctaLabel: 'Reset Password',
      ctaLink: `http://localhost:3000/reset-password?token=${passwordToken}`
    }
  })
};

const sendWelcomeEmail = async ({
  id,
}) => {
  const user = await getUserById({ id });
  await sendEmail({
    to: user.email,
    subject: `Welcome to Amped Framework`,
    templateData: {
      body: `
        <p>Hi ${user.name}!</p>
        <p>Welcome to our site!</p>
        <p>We are positive this will be like nothing youve ever experienced</p>
      `,
      title: `Welcome!`,
      ctaLabel: 'Get started',
      ctaLink: `http://localhost:3000`
    }
  })
};


const sendEmail = async ({
  to,
  from = 'Amped Framework <no-reply@ampedframework.com>',
  subject,
  template = 'base',
  templateData = {},
}) => {
  const msg = {
    to,
    from,
    subject,
    html: Mustache.render(templates[template] || templates.base, templateData)
  };
  try {
    await sgMail.send(msg);
  } catch (e) {
    console.log('Error sending email', e);
  }
};


module.exports = {
  sendEmail,
  sendForgotPassword,
  sendWelcomeEmail
}
