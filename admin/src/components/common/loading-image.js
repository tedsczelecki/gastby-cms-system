import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import './loading-image.scss';

const LoadingImage = ({
  aspectRatio = 1.3333333333333333,
  url,
}) => {
  const _aspectRatio = parseFloat(aspectRatio);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSrc(url);
    }
    img.src = url;
  }, [url, setSrc]);

  const loadingClasses = classNames('loading-image', {
    'loading-image--loading': !src,
  });

  const styles = {
    width: src ? null : Math.min(window.innerWidth, 600),
    height: isNaN(_aspectRatio) || src ? null : Math.min(window.innerWidth, 600) * _aspectRatio
  };

  return (
    <div className={loadingClasses} style={styles}>
      {src && <img src={src} alt=""/>}
    </div>
  );
};

export default LoadingImage;
