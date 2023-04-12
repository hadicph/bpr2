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

  // ToDo call services to get the routes data
  const routesList: Route[] = routesData.routes;


  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const navigate = useNavigate();


  // Filter routes based on active status
  const filteredRoutesList: Route[] = showActiveOnly ? routesList.filter(route => route.status === "active") : routesList;


  // Navigation to route page
  const handleRouteSelection = (route: Route) => {
    navigate(`/${route.id}`, { state: { route } });
  };


  const handleCreateRoute = () => {
    // ToDo Get new ID and Name and navigate to Route Page
  }


  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Route List</h1>


      <div className="flex justify-between mb-4">
        {/* Button to create new route */}
        <button className="btn btn-primary" onClick={() => handleCreateRoute()} > Create route</button>

        {/* Toggle */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={() => setShowActiveOnly(!showActiveOnly)}
            className="toggle"
          />
          <span>Active Only</span>
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

              <tr key={route.id} className={route.status === "active" ? "active" : ""}>
                <td onClick={() => handleRouteSelection(route)} >{route.routename}</td>
                <td >
                  <button className="btn btn-red btn-xs ">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default RouteList;
