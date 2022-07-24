import PageIndex from './pages/Index';
import PageRegistered from './pages/Registered';

export default [
  {
    path: '/',
    component: PageIndex,
  },
  {
    path: '/registered',
    name: 'registered',
    component: PageRegistered,
    props: true,
  },
];
