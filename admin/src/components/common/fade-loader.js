import classNames from 'classnames';
import React from 'react';
import {
  CircularProgress,
} from "@react-md/progress";

import './face-loader.scss';

const FadeLoader = ({
  visible
}) => {
  const classes = classNames('fade-loader', {
    'fade-loader--active': visible,
  })
  return (
    <div className={classes}>
      <CircularProgress id="loader" />
    </div>
  );
};

export default FadeLoader;
