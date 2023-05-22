import React from "react";
import { DeliveryInput, CoordinatesInput, Delivery } from '../../API';
import { useNavigate, useLocation } from "react-router-dom";
import AddressInput from "./AddressInput";
import { updateRouteDeliveries } from "../../helpers/routesHelper";

type EditDeliveryProps = {};

const EditDelivery: React.FC<EditDeliveryProps> = () => {
    const location = useLocation();
    const { delivery } = location.state || {};
    const navigate = useNavigate();

    const [coordinate, setCoordinate] = React.useState<CoordinatesInput>({
        longitude: delivery.point.longitude,
        latitude: delivery.point.latitude,
        address: delivery.point.address,
    });
    const [phoneNumber, setPhoneNumber] = React.useState(delivery.phone_number || "");
    const [packageNumber, setPackageNumber] = React.useState(delivery.package_number || "");
    const [name, setName] = React.useState(delivery.name || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedDelivery: DeliveryInput = {
            ...delivery,
            phone_number: phoneNumber || null,
            package_number: packageNumber || null,
            name: name || null,
            point: coordinate,
        };

        // TODO: Update the delivery in the backend

        handleGoBack();
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page (route page)
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Delivery</h1>

            <AddressInput setCoordinate={setCoordinate} initialCoordinate={coordinate} />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input input-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Package Number:</label>
                    <input
                        type="text"
                        value={packageNumber}
                        onChange={(e) => setPackageNumber(e.target.value)}
                        className="input input-primary"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-primary"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
                        Go Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDelivery;
