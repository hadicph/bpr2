import React from 'react';
import { Coordinates, Route } from '../../API';
import { useNavigate } from 'react-router-dom';

type Props = {
    coordinate: Coordinates;
    bgColor?: string;
    startAddress?: boolean;
    route?: Route;
};

const AddressItem: React.FC<Props> = ({ coordinate, bgColor = 'bg-primary', startAddress = true, route }) => {

    const navigate = useNavigate();

    function handleShowMapDelivery(): void {
        try {
            window.open(
                `https://www.google.com/maps/search/?api=1&query=${coordinate.latitude},${coordinate.longitude}`,
                "_blank"
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleEdit(coordinate: Coordinates): void {
        if (route) {
            navigate(`/${route.id}/edit-address`, { state: { route } });
        } else {
            console.error('Route not provided');
        }
    }

    return coordinate && coordinate.address ? (
        <div className={`collapse py-1`}>
            <input type="checkbox" className="peer" />

            <div
                className={`rounded collapse-title ${bgColor} text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between`}
            >
                <div className="flex justify-start">{coordinate.address ? (
                    coordinate.address.length > 10 ? `${coordinate.address.slice(0, 10)}...` : coordinate.address
                ) : ""}
                </div>
                <div className="flex justify-center">{startAddress ? 'Start' : 'End'}</div>
                <div className="flex justify-end">...</div>
            </div>

            <div
                className={`collapse-content bg-transparent peer-checked:bg-transparent`}
            >
                <p className="pt-1">Address: {coordinate.address}</p>
                <div className="grid grid-cols-1 gap-1 px-10">
                    <button className="btn btn-primary" onClick={handleShowMapDelivery}>
                        Show on Map
                    </button>
                    <button className="btn btn-primary" onClick={() => handleEdit(coordinate)}>
                        Edit
                    </button>

                </div>
            </div>
        </div>
    ) : null;
};

export default AddressItem;
