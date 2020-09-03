import React from 'react';
// import { useSelector } from 'react-redux';
import Avatar from './avatar';
import './avatar.scss';

const UserAvatar = ({
  email,
  name
}) => {
  return email ? (
    <div className="user-avatar-with-name">
      <Avatar email={email} />
      {name && (
        <div className="user-avatar-with-name__name">
          {name}
        </div>
      )}
    </div>
  ) : null;
};

export default UserAvatar;
