import React from 'react';
import { Delivery } from '../../API';
import { useNavigate } from 'react-router-dom';
import { setDeliveryToDelivered } from '../../helpers/routesHelper';

type Props = {
    deliveries: Delivery[];
    bgColor?: string;
    routeId?: string;
};

const DeliveryList: React.FC<Props> = ({
    deliveries,
    bgColor = 'bg-primary',
    routeId = '',
}) => {


    const [openCollapseId, setOpenCollapseId] = React.useState<string | null>(null);
    const navigate = useNavigate();

    // Closes previous collapsibl and opens the one that was clicked
    const handleCollapseClick = React.useCallback((id: string) => {
        setOpenCollapseId((prevId) => (prevId === id ? null : id));
    }, []);

    function handleShowMapDelivery(delivery: Delivery): void {
        //TODO: Show map with delivery
        console.log("Function not implemented. handleShowMapDelivery");
    }

    async function handleDelivered(deliveryId: string): Promise<void> {
        try {
            await setDeliveryToDelivered(routeId, deliveryId);
        } catch (error) {
            console.error(error);
        }
    }

    function handleDelete(deliveryId: string): void {
        // TODO: Delete delivery
        console.log(`Delete delivery with ID: ${deliveryId}`);
    }

    function handleEdit(delivery: Delivery): void {
        navigate(`/${delivery.id}/edit-delivery`, { state: { delivery } });
    }

    function handleMarkUndelivered(deliveryId: string): void {
        // TODO: Mark as undelivered
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
                        <div className="flex justify-start">
                            {delivery?.point.address ? (delivery.point.address.length > 10
                                ? `${delivery.point.address.slice(0, 10)}...`
                                : delivery?.point.address ?? "") : ""}

                        </div>
                        <div className="flex justify-center">
                            {!delivery?.optimized ? (
                                'Unoptimized'
                            ) : (
                                <>
                                    {delivery?.status === 'pending' && 'Pending'}
                                    {delivery?.status === 'completed' && 'Complete'}
                                    {delivery?.status === 'undelivered' && 'Undelivered'}
                                </>
                            )}

                        </div>
                        <div className="flex justify-end">...</div>
                    </div>

                    {/* Collapsible content */}
                    <div
                        className={`collapse-content bg-transparent peer-checked:bg-transparent ${openCollapseId === delivery?.id ? 'open' : ''
                            }`}
                    >
                        <p className="pt-1">Adress: {delivery?.point.address}</p>
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
                                <div className="grid grid-cols-1 gap-1 ">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleDelivered(delivery.id)}
                                    >
                                        Delivered
                                    </button>
                                    <div className='grid grid-cols-1 gap-1 px-10'>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleMarkUndelivered(delivery.id)}
                                        >
                                            Undelivered
                                        </button>

                                        <button
                                            className="btn btn-primary "
                                            onClick={() => handleEdit(delivery)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleDelete(delivery.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DeliveryList;
