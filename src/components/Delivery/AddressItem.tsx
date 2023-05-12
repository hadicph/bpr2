import React from 'react';
import { Coordinates } from '../../API';

type Props = {
    coordinate: Coordinates;
    bgColor?: string;
    startAddress?: boolean;
};

const AddressItem: React.FC<Props> = ({ coordinate, bgColor = 'bg-primary', startAddress = true }) => {
    const [openCollapseId, setOpenCollapseId] = React.useState<string | null>(null);

    const handleCollapseClick = React.useCallback((id: string) => {
        setOpenCollapseId((prevId) => (prevId === id ? null : id));
    }, []);

    function handleShowMapDelivery(): void {
        // TODO: Show map with delivery
        console.log('Function not implemented. handleShowMapDelivery');
    }

    const addressId = coordinate.address ?? '';

    return (
        <div className="collapse py-1" key={addressId}>
            <input
                type="checkbox"
                className="peer"
                checked={openCollapseId === addressId}
                onChange={() => {
                    handleCollapseClick(addressId);
                }}
            />

            <div
                className={`rounded collapse-title ${bgColor} text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between`}
                onClick={() => {
                    handleCollapseClick(addressId);
                }}
            >
                <div className="flex justify-start">{coordinate.address}</div>
                <div className="flex justify-center">{startAddress ? 'Start' : 'End'}</div>
                <div className="flex justify-end">...</div>
            </div>

            <div
                className={`collapse-content bg-transparent peer-checked:bg-transparent ${openCollapseId === addressId ? 'open' : ''
                    }`}
            >
                <p className="pt-1">Address: {coordinate.address}</p>
                <div className="grid grid-cols-1 gap-1 px-10">
                    <button
                        className="btn btn-primary"
                        onClick={handleShowMapDelivery}
                    >
                        Show on Map
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressItem;
