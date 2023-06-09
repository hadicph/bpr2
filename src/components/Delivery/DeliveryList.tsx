import React, { useEffect } from 'react';
import { Delivery } from '../../API';
import { useNavigate } from 'react-router-dom';
import { deleteDeliveryById, setDeliveryStatusHelper } from '../../helpers/routesHelper';

type Props = {
    propDeliveries: Delivery[];
    bgColor?: string;
    routeId?: string;
};

const DeliveryList: React.FC<Props> = ({
    propDeliveries,
    bgColor = 'bg-primary',
    routeId = '',
}) => {

    const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
    const [openCollapseId, setOpenCollapseId] = React.useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setDeliveries(propDeliveries);
    }, [propDeliveries]);

    // Closes previous collapsibl and opens the one that was clicked
    const handleCollapseClick = React.useCallback((id: string) => {
        setOpenCollapseId((prevId) => (prevId === id ? null : id));
    }, []);

    function handleShowMapDelivery(delivery: Delivery): void {
        try {
            window.open(
                `https://www.google.com/maps/search/?api=1&query=${delivery.point.latitude},${delivery.point.longitude}`,
                "_blank"
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleDelivered(deliveryId: string): Promise<void> {
        try {
            const response = await setDeliveryStatusHelper(deliveryId, routeId, "DELIVERED");
            if (response) {
                setDeliveries((prevDeliveries) =>
                    prevDeliveries.map((delivery) =>
                        delivery.id === deliveryId ? { ...delivery, status: 'DELIVERED' } : delivery
                    ))
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(deliveryId: string): Promise<void> {
        try {
            const response = await deleteDeliveryById(deliveryId, routeId);
            if (response) {
                setDeliveries((prevDeliveries) =>
                    prevDeliveries.filter((delivery) => delivery.id !== deliveryId))
            }
        } catch (error) {
            console.error(error);
        }
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
                                    {delivery?.status === 'DELIVERED' && 'Delivered'}
                                    {delivery?.status === 'UNDELIVERED' && 'Undelivered'}
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
