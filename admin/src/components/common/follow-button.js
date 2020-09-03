import classNames from 'classnames';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@react-md/button';
import gql from "graphql-tag";

import './follow-button.scss';

const FOLLOW_USER = gql`
    mutation FollowUser($followerId: Int!) {
        followUser(followerId: $followerId) {
            isUserFollowing
        }
    }
`

const FollowButton = ({
  iconOnly = false,
  initialFollowing = false,
  followerUserId,
  onChange = () => {}
}) => {

  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [followUser] = useMutation(FOLLOW_USER)

  const handleClick = async () => {
    setIsFollowing(!isFollowing);
    const { data } = await followUser({
      variables: {
        followerId: parseInt(followerUserId, 10),
      }
    });
    onChange(data.followUser.isUserFollowing);
  }

  const buttonClasses = classNames('follow-button', {
    'follow-button--following': isFollowing,
  });
  const heartClasses = classNames('follow-button__heart', {
    'follow-button__heart--active': isFollowing
  });

  const buttonTheme = isFollowing ? 'primary' : 'clear';
  const themeType = iconOnly ? 'icon' : 'contained';
  return (
    <Button
      className={buttonClasses}
      theme={buttonTheme}
      themeType={themeType}
      onClick={handleClick}
    >
      <div className={heartClasses} />
      { !iconOnly && <div className="follow-button__text">{isFollowing ? 'Following' : 'Follow'}</div> }
    </Button>
  )
};

export default FollowButton;
