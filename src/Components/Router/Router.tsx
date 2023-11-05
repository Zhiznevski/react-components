import { createBrowserRouter } from 'react-router-dom';
import { HOME_ROUTE } from '../../Constants/constants';
import App from '../../App';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';

const Router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <DetailedCard />,
      },
    ],
  },
]);
export default Router;
