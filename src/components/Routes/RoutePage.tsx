import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../App/NavBar";
import { getRouteById } from "../../helpers/routesHelper";
import { Route } from "../../API";

// type RoutePageProps = {
//   route?: Route; 
// };

const RoutePage: React.FC = () => {
    
    const { id } = useParams();
    const [route, setRoute] = React.useState<Route>();

    const handleGetRouteById = async (id: string) => {
        const response = await getRouteById(id);
        setRoute(response);
        console.log(response);
    }
    React.useEffect(() => {
        if(id){
            handleGetRouteById(id);
        }
    }, []);

    return (
        <>
            <NavBar />
            <div className="p-2">
                <h1 className="text-2xl font-bold mb-4 ">Name: {route?.route_name}</h1>
                <h1>Route id that u came from: {id}</h1>
                <h1>{route?.deliveries[0]?.address}</h1>
                <h1>Has Started: {route?.hasStarted?"Yes":"No"}</h1>
            </div>
        </>
    );
};

export default RoutePage;
