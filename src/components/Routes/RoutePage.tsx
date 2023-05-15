import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import NavBar from "../App/NavBar";
import { getRouteById, renameRoute } from "../../helpers/routesHelper";
import { Coordinates, Route } from "../../API";
import { Delivery } from "../../API";
import DeliveryList from '../Delivery/DeliveryList';
import AddressItem from "../Delivery/AddressItem";


const RoutePage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [route, setRoute] = React.useState<Route>();
    const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
    const [showPendingOnly, setShowPendingOnly] = React.useState(false);
    const [routeName, setRouteName] = React.useState<string>('');
    const [editingRouteName, setEditingRouteName] = React.useState(false);
    const [unoptimizedDeliveries, setUnoptimizedDeliveries] = React.useState<Delivery[]>([]);
    const [optimizedDeliveries, setOptimizedDeliveries] = React.useState<Delivery[]>([]);
    //const [pendingDeliveries, setPendingDeliveries] = React.useState<Delivery[]>([]);

    React.useEffect(() => {
        if (id) {
            handleGetRouteById(id);
        }
    }, []);


    // Get route by id and set state for route and delivery list
    const handleGetRouteById = async (id: string) => {
        const response = await getRouteById(id);
        setRoute(response);
        if (response?.deliveries) {
            const routeDeliveries = response.deliveries.filter((delivery) => delivery !== null) as Delivery[];
            if (route?.optimized) {
                setDeliveries(routeDeliveries);
            } else {
                setUnoptimizedDeliveries(routeDeliveries.filter(delivery => !delivery.optimized));
                setOptimizedDeliveries(routeDeliveries.filter(delivery => delivery.optimized));
            }

        }
        setRouteName(response?.route_name ?? '')
    };


    // Filter deliveries based on pending status
    function handleShowPendingOnly(): void {
        setShowPendingOnly(!showPendingOnly);
        if (showPendingOnly) {
            setDeliveries(optimizedDeliveries);
        } else {
            setDeliveries(optimizedDeliveries.filter(delivery => delivery.status === "pending"));
        }
    }


    function handleNewDelivery(): void {
        // TODO: Add new delivery to route

        navigate(`/${id}/newdelivery`, { state: { route } });
    }


    function handleOptimize(): void {
        //TODO: Optimize route
        console.log("Function not implemented. handleOptimize");
    }


    function handleShowMapRoute(): void {
        //TODO: Show map with route
        console.log("Function not implemented. handleShowMapRoute");
    }


    // To handle editing route name
    const handleRouteNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRouteName(event.target.value);
        if (route) {
            setRoute({ ...route, route_name: event.target.value })
        }
    };


    const handleSaveRouteName = async () => {
        if (id) {
            const response = await renameRoute(id, routeName);
            // update the route name in the Route object
            const updatedRoute = { ...route, route_name: routeName };
            setEditingRouteName(false);
        }
    };

    const handleEditRouteName = () => {
        setEditingRouteName(true);
    };

    // To focus on input when editing route name
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (editingRouteName && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingRouteName]);


    return (
        <>
            <NavBar />

            <div className="p-2">

                {/* Route name */}
                <div className="flex justify-start items-center mb-2  ">
                    <span className="text-2xl font-bold mr-2">Name:</span>
                    {editingRouteName ? (
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-ghost font-bold text-2xl w-full max-w-xs mr-2 "
                            value={routeName}
                            onChange={handleRouteNameChange}
                            ref={inputRef}
                        />
                    ) : (
                        <h1 className="text-2xl font-bold cursor-pointer" onClick={handleEditRouteName}>
                            {route?.route_name}
                        </h1>
                    )}

                    {editingRouteName && (
                        <button className="btn btn-primary" onClick={handleSaveRouteName}>
                            Save
                        </button>
                    )}
                </div>



                {/* Buttons and checkbox */}
                <div className="grid grid-cols-2 gap-4 pb-2">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Only Pending</span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={showPendingOnly}
                                onChange={() => handleShowPendingOnly()} />
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleNewDelivery()}>New Delivery</button>
                    <button className="btn btn-primary" onClick={() => handleOptimize()}>Optimize</button>
                    <button className="btn btn-primary" onClick={() => handleShowMapRoute()}>Show on Map</button>
                </div>



                {/* Unoptimized deliveries */}
                {unoptimizedDeliveries.length > 0 && (
                    <>
                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider"></div>
                        </div>

                        <div className="text-center mx-10">
                            <span className="text-lg font-bold">Click Optimize button to add new addresses to the route</span>
                        </div>

                        <DeliveryList
                            deliveries={unoptimizedDeliveries}
                            bgColor="bg-secondary"
                        />

                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider"></div>
                        </div>
                    </>
                )}




                {/* Table Header */}
                <div className="rounded bg-info text-primary-content flex justify-between p-4 pt-1 pb-1">
                    <div className="flex justify-start">Address</div>
                    <div className="flex justify-center">Status</div>
                    <div className="flex justify-end"> </div>
                </div>

                {/* Statistics */}
                <div className=" flex justify-between pl-4 pr-4 ">
                    <div className="flex justify-start">{optimizedDeliveries.length} stops</div>
                    <div className="flex justify-center">{route?.estimated_time} h</div>
                    <div className="flex justify-end">{route?.estimated_distance} km</div>
                </div>

                {/* Start address */}
                <AddressItem
                    coordinate={route?.start_address as Coordinates}
                    bgColor="btn"
                />

                {/* Optimized deliveries */}
                <DeliveryList
                    deliveries={deliveries}
                />

                {/* End address */}
                <AddressItem
                    coordinate={route?.end_address as Coordinates}
                    bgColor="btn"
                    startAddress={false}
                />
            </div>
        </>
    );
};

export default RoutePage;
