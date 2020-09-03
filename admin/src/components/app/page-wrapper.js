import React from 'react';
import { PageActions } from 'components/common';

const PageWrapperComponent = ({
  Component,
  pageActions,
  ...rest
}) => {
  return (
    <div className="app__page">
      {pageActions && (
        <PageActions {...pageActions} />
      )}
      <Component />
    </div>
  );
};

export default PageWrapperComponent;
