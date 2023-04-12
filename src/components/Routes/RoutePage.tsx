import React from "react";
import { Route } from "../../types/Route";

type RoutePageProps = {
  route?: Route; 
};

const RoutePage: React.FC<RoutePageProps> = ({route}) => {
  if (!route) {
    return (
      <>
        <h1>No Route Found</h1>
      </>
    );
  }

  return (
    <>
      <h1>Route Name: {route.routename}</h1> 
    </>
  );
};

export default RoutePage;
