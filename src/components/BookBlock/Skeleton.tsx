import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton:React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={560}
    viewBox='0 0 280 560'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <circle cx='130' cy='130' r='130' />
    <rect x='0' y='270' rx='11' ry='11' width='280' height='30' />
    <rect x='0' y='315' rx='8' ry='8' width='280' height='90' />
    <rect x='3' y='435' rx='9' ry='9' width='100' height='27' />
    <rect x='125' y='430' rx='9' ry='9' width='150' height='45' />
  </ContentLoader>
);

export default Skeleton;
