import React, { useState } from 'react';
import { ReactElement } from "react";
import { useNavigate } from 'react-router-dom';
import { deleteRouteById, getRoutes, listUserPreference, saveRoute } from '../../helpers/routesHelper';
import { Route, UserPreference } from '../../API';

type RouteListProps = {
  children?: ReactElement;
};

const RouteList: React.FC<RouteListProps> = () => {

  const [routesList, setRoutesList] = useState<Route[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreference>();
  const navigate = useNavigate();

  React.useEffect(() => {
    handleGetRoutes();
    handleListUserPreferences();
  }, []);

  // Filter routes based on active status
  const filteredRoutesList: Route[] = showActiveOnly ? routesList.filter(route => route.status === "active") : routesList;

  const handleGetRoutes = async () => {
    const response = await getRoutes(true);
    setRoutesList(response.routes);
  }
  const handleDeleteRoute = async (id: string) => {
    const response = await deleteRouteById(id);
    if (response) {
      const newRouteList = routesList.filter(route => route.id !== id);
      setRoutesList(newRouteList);
    } else {
      console.error('Invalid response:', response);
    }
  }

  // Navigation to route page
  const handleRouteSelection = (route: Route) => {
    navigate(`/${route.id}`);
  };

  //Create Route and Navigate to Route Page
  const handleCreateRoute = async () => {
    if (userPreferences?.start_address && userPreferences?.end_address) {
      const response = await saveRoute("Test" + routesList.length);
      if (response && response.id) {
        navigate(`/${response.id}`);
      } else {
        console.error('Invalid response:', response);
      }
    }
    else {
      // TODO make a popup maybe?
      navigate(`/default-address`);
    }


  }

  const handleListUserPreferences = async () => {
    const response = await listUserPreference();
    setUserPreferences(response[0]);
  };


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
                <td onClick={() => handleRouteSelection(route)} >{route.route_name}</td>
                <td >
                  <button className="btn btn-red btn-xs " onClick={() => handleDeleteRoute(route.id)}>Delete</button>
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
