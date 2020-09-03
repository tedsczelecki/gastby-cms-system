import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// import { Paper as MDPaper } from 'react-md';

import './paper.scss';

class Paper extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    title: '',
  };

  render() {

    const {
      children,
      title
    } = this.props;

    return (
      <div className="paper__container">
        { title && (<h1 className="paper__title">{title}</h1>)}
        <div className="paper__paper">
          {children}
        </div>
      </div>
    );
  }
}

export default Paper;
