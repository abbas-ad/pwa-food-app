import React from 'react';
import { Redirect, Route } from "react-router-dom";
const ProtectedRoute = ({ component: Component,isAuthenticated: authenticated, ...restOfProps }) => {
    return (
        <Route
          {...restOfProps}
          render={(props) =>
            authenticated ? <Component {...props} /> : <Redirect to="/auth" />
          }
        />
      );
};

export default ProtectedRoute;