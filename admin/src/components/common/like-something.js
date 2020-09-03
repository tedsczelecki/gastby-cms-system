import classNames from 'classnames';
import React, { useState } from 'react';
import { useMutationHandled } from 'hooks';

import './follow-button.scss';

const LikeSomething = ({
  initialLiked = false,
  query,
  queryVariables,
  onChange = () => {}
}) => {

  const [isLiked, setIsLiked] = useState(initialLiked);
  const { doMutation: likePost } = useMutationHandled({ query })

  const handleClick = async () => {
    setIsLiked(!isLiked);
    const { data } = await likePost({
      variables: queryVariables
    });
    onChange(data);
  }

  const heartClasses = classNames('follow-button__heart', {
    'follow-button__heart--active': isLiked
  })
  return (
    <button className="follow-button" onClick={handleClick}>
      <div className={heartClasses} />
    </button>
  )
};

export default LikeSomething;
