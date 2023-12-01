import { createBrowserRouter } from 'react-router-dom';
import {
  HOME_ROUTE,
  REACT_HOOK_FORM_ROUTE,
  UNCONTROLED_FORM_ROUTE,
} from '../constants/constants';
import Layout from '../components/Layout/Layout';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import HookForm from '../HookForm/HookForm';

const Router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: UNCONTROLED_FORM_ROUTE,
        element: <UncontrolledForm />,
      },
      {
        path: REACT_HOOK_FORM_ROUTE,
        element: <HookForm />,
      },
    ],
  },
]);
export default Router;
