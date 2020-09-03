import { google } from 'googleapis';

const {
  ADMIN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;

const config = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirect: `${ADMIN_URL}/google-auth`
};

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/contacts.readonly',
];

const getConnectionUrl = (auth) => auth.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope,
});

const getConnection = () => new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirect
);

export const getGoogleAuthUrl = () => {
  const auth = getConnection();
  return getConnectionUrl(auth)
};

export const getUserInfo = async ({ code }) => {
    console.log('CODE', code);
  try {
    const auth = getConnection();
    const {tokens} = await auth.getToken(code);
    console.log('TOKENS', tokens);
    auth.credentials = tokens;
    const { data: userInfo } = await google.oauth2('v2').userinfo.get({auth});
    // const people = google.people({ version: 'v1', auth });
    // const userInfo = await people.get({userId: 'me'});
    console.log(userInfo);
    return {
      userInfo,
      tokens
    }
  } catch(e) {
    console.log('Google error', e);
  }
}
