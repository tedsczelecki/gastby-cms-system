import React from 'react';
// import { useSelector } from 'react-redux';
import {getAvatar} from "libs/user";
import './avatar.scss';

const UserAvatar = ({
  email,
}) => {
  return email ? (
    <div className="user-avatar">
      <div className="user-avatar__image" dangerouslySetInnerHTML={{ __html: getAvatar({ email })}} />
    </div>
  ) : null;
};

export default UserAvatar;
