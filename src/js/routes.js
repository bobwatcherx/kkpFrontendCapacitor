
import HomePage from '../pages/home.svelte';
import Findfood from '../pages/Findfood.svelte';
import Transaksi from '../pages/Transaksi.svelte';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
   {
    path: '/findfood/',
    component: Findfood,
  },
   {
    path: '/transaksi',
    component: Transaksi,
  },
];

export default routes;
