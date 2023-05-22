import React from 'react';
import { Coordinates } from '../../API';

type Props = {
    coordinate: Coordinates;
    bgColor?: string;
    startAddress?: boolean;
};

const AddressItem: React.FC<Props> = ({ coordinate, bgColor = 'bg-primary', startAddress = true }) => {
    function handleShowMapDelivery(): void {
        // TODO: Show map with delivery
        console.log('Function not implemented. handleShowMapDelivery');
    }

    function handleEdit(coordinate: Coordinates): void {
        console.log('edit address');
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
