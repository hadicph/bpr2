import React from 'react';
import { Delivery } from '../../API';

type Props = {
    deliveries: Delivery[];
    bgColor?: string;
};

const DeliveryList: React.FC<Props> = ({
    deliveries,
    bgColor = 'bg-primary',
}) => {


    const [openCollapseId, setOpenCollapseId] = React.useState<string | null>(null);

    // Closes previous collapsibl and opens the one that was clicked
    const handleCollapseClick = React.useCallback((id: string) => {
        setOpenCollapseId((prevId) => (prevId === id ? null : id));
    }, []);

    function handleShowMapDelivery(delivery: Delivery): void {
        //TODO: Show map with delivery
        console.log("Function not implemented. handleShowMapDelivery");
    }

    function handleDelivered(id: string): void {
        //  TODO: Update delivery status to delivered
        console.log("Function not implemented. handleDelivered");
    }


    return (
        <>
            {/* Collapsible */}
            {deliveries?.map((delivery) => (
                <div className="collapse py-1 " key={delivery?.id}>
                    <input
                        type="checkbox"
                        className="peer"
                        checked={openCollapseId === delivery?.id}
                        onChange={() => {
                            if (delivery?.id) handleCollapseClick(delivery?.id);
                        }}
                    />

                    {/* Collapsible title */}
                    <div
                        className={`rounded collapse-title ${bgColor} text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex justify-between`}
                        onClick={() => {
                            if (delivery?.id) handleCollapseClick(delivery?.id);
                        }}
                    >
                        <div className="flex justify-start">{delivery?.address}</div>
                        <div className="flex justify-center">
                            {delivery?.status === 'pending' && 'Pending'}
                            {delivery?.status === 'completed' && 'Complete'}
                            {delivery?.status === 'undelivered' && 'Undelivered'}
                        </div>
                        <div className="flex justify-end">...</div>
                    </div>

                    {/* Collapsible content */}
                    <div
                        className={`collapse-content bg-transparent peer-checked:bg-transparent ${openCollapseId === delivery?.id ? 'open' : ''
                            }`}
                    >
                        <p className="pt-1">Adress: {delivery?.address}</p>
                        {/* They will be printed only if object has them */}
                        {delivery?.name && <p>Name: {delivery?.name}</p>}
                        {delivery?.phone_number && <p>Phone: {delivery?.phone_number}</p>}
                        {delivery?.package_number && (
                            <p>Package number: {delivery?.package_number}</p>
                        )}

                        <div className="grid grid-cols-1 gap-1 px-10">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleShowMapDelivery(delivery)}
                            >
                                Show on Map
                            </button>

                            {/* If delivery is pending, show delivered button */}
                            {delivery?.status === 'pending' && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleDelivered(delivery.id)}
                                >
                                    Delivered
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DeliveryList;
