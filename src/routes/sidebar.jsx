/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { 
  faAddressBook,
  faAddressCard,
  faChartPie,
  faGauge,
  faGrip,
  faRectangleList,
  faSignHanging,
  faStop,
  faTableCells,
  faUsers,
  
} from '@fortawesome/free-solid-svg-icons'

const routes = [
  {
    path: '/app/dashboard', // the url
    icon: faGauge, // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/contacts',
    icon: faAddressBook,
    name: 'Contactos',
  },
  {
    path: '/app/leads',
    icon: faSignHanging,
    name: 'Leads',
  },
  {
    path: '/app/forms',
    icon: faRectangleList,
    name: 'Forms',
  },
  {
    path: '/app/cards',
    icon: faAddressCard,
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: faChartPie,
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: faStop,
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: faGrip,
    name: 'Modals',
  },
  {
    path: '/app/tables',
    icon: faTableCells,
    name: 'Tables',
  },
  {
    path: '/app/users',
    icon: faUsers,
    name: 'Usuarios',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },
]

export default routes
