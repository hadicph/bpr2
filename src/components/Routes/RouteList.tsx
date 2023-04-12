import React, { useState } from 'react';
import RouteItem from './RouteItem';
import routesData from './data_temp.json';
import { ReactElement } from "react";
import { Route } from '../../types/Route';
import { useNavigate } from 'react-router-dom';

type RouteListProps = {
  children?: ReactElement;
};

const RouteList: React.FC<RouteListProps> = () => {
  const routesList: Route[] = routesData.routes;
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route>();
  const navigate = useNavigate();

  


  
  // Filter routes based on active status
  const filteredRoutesList = showActiveOnly ? routesList.filter(route => route.status === "active") : routesList;


  // Navigation to route page
  const handleRouteSelection = (route: Route) => {
    setSelectedRoute(route)
    navigate(`/${route.routeid}`);
  };




  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Route List</h1>
      {/* Toggle */}
      <div className="flex justify-end mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={() => setShowActiveOnly(!showActiveOnly)}
            className="form-toggle"
          />
          <span>Show Active Only</span>
        </label>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th >Name</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
            {/* Todo  */}
          {filteredRoutesList.map(route => (
            
            <tr key={route.routeid} className={route.status === "active" ? "active" : ""}>
              <td onClick={() => handleRouteSelection(route)} >{route.routename}</td>
              <td >
                <button className="btn btn-red btn-xs ">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default RouteList;
