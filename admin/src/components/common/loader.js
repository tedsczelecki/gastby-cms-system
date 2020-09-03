import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { CircularProgress } from 'react-md';

import './loader.scss';

class Loader extends PureComponent {

  static propTypes = {
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  }

  render() {

    const {
      visible
    } = this.props;

    const classes = classNames('loader', {
      'loader__visible': visible
    });

    return (
      <div className={classes}>
        <CircularProgress id="loading" />
      </div>
    );
  }
}

export default Loader;
