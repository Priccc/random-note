import * as React from 'react';

const Home = React.lazy(() => import('@/pages/home/index'));

export type RouterType = {
  path: string,
  element: React.FC
};

const Routers: RouterType[] = [
  {
    path: '/',
    element: Home
  }
];

export default Routers;