import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import UserRoutes from './UserRoutes';
import ManageRoutes from './ManageRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes, UserRoutes, ManageRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
