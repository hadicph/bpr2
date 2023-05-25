import React from 'react';
import { ReactElement } from "react";
import { useNavigate } from 'react-router-dom';
import { deleteRouteById, getRoutes, listUserPreference, saveRoute } from '../../helpers/routesHelper';
import { Route, UserPreference } from '../../API';
import { toast } from 'react-toastify';

type RouteListProps = {
  children?: ReactElement;
};

const RouteList: React.FC<RouteListProps> = () => {
  const [routesList, setRoutesList] = React.useState<Route[]>([]);
  const [showActiveOnly, setShowActiveOnly] = React.useState(false);
  const [userPreferences, setUserPreferences] = React.useState<UserPreference>();
  const [showPopup, setShowPopup] = React.useState(false);
  const [pastRoutesOnly, setPastRoutesOnly] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleGetRoutes(pastRoutesOnly);
    handleListUserPreferences();
  }, [pastRoutesOnly]);

  // Filter routes based on active status
  const filteredRoutesList: Route[] = showActiveOnly ? routesList.filter(route => route.status === "active") : routesList;

  const handleGetRoutes = async (pastRoutesOnly: Boolean) => {
    try {
      // getRoutes - True: Today and Future, False: Past
      const response = await getRoutes(!pastRoutesOnly);
      if (response) {
        setRoutesList(response);
      }
    } catch (error) {
      console.error("Error getting routes:", error);
    }
  };

  const handleDeleteRoute = async (id: string) => {
    try {
      const response = await deleteRouteById(id);
      if (response) {
        const newRouteList = routesList.filter((route) => route.id !== id);
        setRoutesList(newRouteList);
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
      toast.error('Error deleting route');
    }
  };


  // Navigation to route page
  const handleRouteSelection = (route: Route) => {
    navigate(`/${route.id}`);
  };

  //Create Route and Navigate to Route Page
  const handleCreateRoute = async () => {
    if (
      userPreferences?.start_address &&
      userPreferences?.end_address &&
      userPreferences?.end_address?.address !== "" &&
      userPreferences?.start_address?.address !== ""
    ) {
      const response = await saveRoute(
        "New Route " + (routesList.length + 1),
        userPreferences?.start_address,
        userPreferences?.end_address
      );
      if (response && response.id) {
        navigate(`/${response.id}`);
      } else {
        console.error('Invalid response:', response);
      }
    } else {
      setShowPopup(true);
    }
  };

  const handleListUserPreferences = async () => {
    const response = await listUserPreference();
    setUserPreferences(response[0]);
  };

  const handleGoToDefaultAddress = () => {
    navigate('/default-address');
    setShowPopup(false);
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4 text-center">Route List</h1>

      <div className="flex justify-between mb-4">
        {/* Button to create new route */}
        <button className="btn btn-primary" onClick={handleCreateRoute}>
          Create route
        </button>

        {/* Toggle */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={pastRoutesOnly}
            onChange={() => setPastRoutesOnly(!pastRoutesOnly)}
            className="toggle"
          />
          <span>Past Only</span>
        </label>

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
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {/* Routes List */}
            {filteredRoutesList.map(route => (
              <tr key={route.id} className={route.status === "active" ? "active" : ""}>
                <td onClick={() => handleRouteSelection(route)}>{route.route_name}</td>
                <td>
                  <button className="btn btn-red btn-xs" onClick={() => handleDeleteRoute(route.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-xl m-4">
            <h2 className="text-lg font-bold mb-4">Please set default start and end addresses</h2>
            <p className="mb-4">You need to set the start and end addresses before creating a route.</p>
            <div className="flex justify-center">
              <button className="btn btn-primary mr-2" onClick={handleGoToDefaultAddress}>
                Set Addresses
              </button>
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RouteList; 