import path from 'path';
import { syncThemeFiles } from './aws';
import spawn from 'spawn-promise';

const fs = require('fs').promises;

export const SITES_PATH = path.join(__dirname, '../../../sites')

export const buildAndUploadSite = async ({
  name
}) => {
  const themePath = await buildSite({ name });
  console.log('THEME path', themePath);
  return await syncThemeFiles({ bucketName: name, themePath: `${themePath}/public` });;
}

export const buildSite = async ({
  name
}) => {
  const buildSitePath = `${SITES_PATH}/${name}`;
  const command = `cd ${buildSitePath} &&\
    rm -rf .cache && \
    rm -rf public && \
    npm run build
  `

  try {
    await spawn(command, {shell: true})
  } catch (e) {
    console.log('spawn error', e);
  }

  return buildSitePath
}

export const createThemeFromDefault = ({
  name
}) => {

}
