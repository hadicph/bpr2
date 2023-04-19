import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../App/NavBar";
import { getRouteById } from "../../helpers/routesHelper";
import { Route } from "../../API";
import { Delivery } from "../../API";

const RoutePage: React.FC = () => {
    const { id } = useParams();
    const [route, setRoute] = React.useState<Route>();
    const [openCollapseId, setOpenCollapseId] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (id) {
            handleGetRouteById(id);
        }
    }, []);

    const handleGetRouteById = async (id: string) => {
        const response = await getRouteById(id);
        setRoute(response);
    };


    // Closes previous collapsibl and opens the one that was clicked
    const handleCollapseClick = React.useCallback((id: string) => {
        setOpenCollapseId((prevId) => (prevId === id ? null : id));
    }, []);

    return (
        <>
            <NavBar />

            <div className="p-2">
                <h1 className="text-2xl font-bold mb-4 ">Name: {route?.route_name}</h1>
                <h1>{route?.deliveries[0]?.address}</h1>
                <h1>Has Started: {route?.hasStarted ? "Yes" : "No"}</h1>





                <div className="rounded bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content px-3 flex justify-between">
                    <div className="flex justify-start">Address</div>
                    <div className="flex justify-center">Status</div>
                    <div className="flex justify-end">...</div>
                </div>


                {/* Collapsible */}
                {route?.deliveries.map((delivery) => (
                    <div className="collapse py-1 " key={delivery?.id}>
                        <input
                            type="checkbox"
                            className="peer"
                            checked={openCollapseId === delivery?.id}
                            onChange={() => { if (delivery?.id) handleCollapseClick(delivery?.id) }}
                        />
                        <div className="rounded collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between" onClick={() => { if (delivery?.id) handleCollapseClick(delivery?.id) }}>
                            <div className="flex justify-start">{delivery?.address}</div>
                            <div className="flex justify-center">{delivery?.status}</div>
                            <div className="flex justify-end">...</div>
                        </div>

                        <div className={`collapse-content bg-transparent peer-checked:bg-transparent ${openCollapseId === delivery?.id ? 'open' : ''}`}>
                            <p className="pt-1">Adress: {delivery?.address}</p>
                            {/* They will be printed only if object has them */}
                            {delivery?.name && <p>Name: {delivery?.name}</p>}
                            {delivery?.phone_number && <p>Phone: {delivery?.phone_number}</p>}
                            {delivery?.package_number && <p>Package number: {delivery?.package_number}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RoutePage;
