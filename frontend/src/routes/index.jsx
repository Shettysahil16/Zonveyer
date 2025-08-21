import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../Pages/Home';
import RouteProtection from '../route_protection/RouteProtection';
import LoginRouteProtection from '../route_protection/LoginRouteProtection';
import Right from '../right/Right';
import Left from '../left/Left';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <RouteProtection>
            <Home />
          </RouteProtection>
        )
      },
      {
        path: "signup",
        element: (
          <LoginRouteProtection>
            <Signup />
          </LoginRouteProtection>
        )
      },
      {
        path: "login",
        element: (
          <LoginRouteProtection>
            <Login />
          </LoginRouteProtection>
        )
      },
      {
        path: "chatUser",
        element: <Right />
      },
    ]
  },
]);

export default router;