import React from 'react';
import './info.scss';

const Info = () => (
  <div className="home-page">
    <h3>Editing:</h3>
    <p>To start off the project, take a look at </p>
    <h3>Includes:</h3>
    <ul>
      <li>React</li>
      <li>Redux</li>
      <li>Redux-Thunk</li>
      <li>Boostrap</li>
      <li>Sass as a CSS prepreocessor</li>
      <li>Ducks Folder Structure Pattern</li>
      <li>Dotenv (see src/config/config.js and you need to create a .env file at root)</li>
    </ul>
  </div>
);

export default Info;
