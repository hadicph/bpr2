import React, { useEffect } from "react";
import { ReactElement } from "react";
import { CoordinatesInput } from "../../API";
import AddressInput from "../Delivery/AddressInput";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../App/NavBar";
import { setStartAndEndAddress } from "../../helpers/routesHelper";
import { toast } from "react-toastify";

type RouteStartEndAddressProps = {
    children?: ReactElement;
};

const RouteStartEndAddress: React.FC<RouteStartEndAddressProps> = ({ children }) => {
    const [startCoordinate, setStartCoordinate] = React.useState<CoordinatesInput>({
        longitude: 0,
        latitude: 0,
        address: "",
    });
    const [endCoordinate, setEndCoordinate] = React.useState<CoordinatesInput>({
        longitude: 0,
        latitude: 0,
        address: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Retrieving the route
    const { route } = location.state || {};

    useEffect(() => {
        if (route) {
            setStartCoordinate(route.start_address);
            setEndCoordinate(route.end_address);
        }
    }, [route]);


    // Handle the submission of startCoordinate and endCoordinate
    const handleSubmit = async () => {
        try {
            if (!route?.id) return;

            await setStartAndEndAddress(route.id, {
                start_address: startCoordinate,
                end_address: endCoordinate,
            });

            toast.success("Addresses updated successfully");
            handleGoBack();
        } catch (error) {
            console.error("Error updating route start/end addresses:", error);
            toast.error("Error updating route start/end addresses");
        }
    };

    const handleGoBack = () => {
        navigate(`/${route?.id}`);
    };

    return (
        <>
            <NavBar />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Set Default Addresses</h1>

                <div className="mt-8">
                    <h2 className="text-lg font-bold">Start Address</h2>
                    <AddressInput setCoordinate={setStartCoordinate} addressText={startCoordinate.address} />
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-bold">End Address</h2>
                    <AddressInput setCoordinate={setEndCoordinate} addressText={endCoordinate.address} />
                </div>

                <div className="mt-8">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleGoBack}>
                            Go Back
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RouteStartEndAddress;