import classNames from 'classnames';
import React, { useState } from 'react';
import { Button } from '@react-md/button';
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";

import './follow-button.scss';

const LIKE_POST = gql`
    mutation LikePost($postId: Int!) {
        likePost(postId: $postId) {
            liked
        }
    }
`

const FollowButton = ({
  children = '',
  className = '',
  initialLiked = false,
  postId,
  onChange = () => {}
}) => {

  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likePost] = useMutation(LIKE_POST)

  const handleClick = async () => {
    setIsLiked(!isLiked);
    const { data } = await likePost({
      variables: {
        postId: parseInt(postId, 10),
      }
    });
    onChange(data.likePost.liked);
  }

  const heartClasses = classNames('follow-button__heart', {
    'follow-button__heart--active': isLiked,
  });

  const buttonClasses = classNames('follow-button', className);
  return (
    <Button className={buttonClasses} theme="primary" onClick={handleClick}>
      <div className={heartClasses} />
      {children}
    </Button>
  )
};

export default FollowButton;
