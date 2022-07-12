import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={464}
    viewBox="0 0 280 464"
    backgroundColor="#f3f3f3"
    foregroundColor="#e0e2e1">
    <circle cx="127" cy="127" r="126" />
    <rect x="30" y="267" rx="0" ry="0" width="220" height="27" />
    <rect x="242" y="320" rx="0" ry="0" width="36" height="0" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="427" rx="0" ry="0" width="88" height="27" />
    <rect x="126" y="419" rx="20" ry="20" width="151" height="45" />
  </ContentLoader>
);

export default Skeleton;
