import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './page-actions.scss';

const PageActions = ({
  Actions = null,
  Image = null,
  stickOnScroll = true,
  subTitle,
  title,
}) => {
  const classes = classNames('page-actions', {
    'page-actions--stick-on-scroll': stickOnScroll,
  })
  return (
    <div className={classes}>
      <div className="page-actions__inner">
        {Image && (
          <div className="page-actions__image">
            <Image />
          </div>
        )}
        <div className="page-actions__titles">
          {title && (
            <h1 className="page-actions__title">
              {title}
            </h1>
            )}
          {subTitle && (
            <div className="page-actions__sub-title">
              {subTitle}
            </div>
          )}
        </div>
        {Actions && (
          <div className="page-actions__actions">
            <Actions />
          </div>
        )}
      </div>
    </div>
  );
};

PageActions.propTypes = {
  stickOnScroll: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
}

export default PageActions;
