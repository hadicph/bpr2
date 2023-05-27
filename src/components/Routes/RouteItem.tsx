import React from 'react';
import { Route } from '../../API';


type RouteItemProps = {
    route: Route; 
  };


const RouteItem: React.FC<RouteItemProps> = ({route}) => {
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-2">Name: {route.route_name}</h1>
    <h2 className="text-lg">ID: {route.id}</h2>
    <button className="btn btn-primary">DaisyUI Button</button>
  </div>
  );
};

export default RouteItem;
