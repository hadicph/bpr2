import React, { useState } from "react";
import { DeliveryInput, CoordinatesInput } from '../../API';
import { useNavigate } from "react-router-dom";
import AddressInput from "./AddressInput";
import { useLocation } from "react-router-dom";
import { updateRouteDeliveries } from "../../helpers/routesHelper";
import { v4 as uuidv4 } from 'uuid';

type NewDeliveryProps = {};

const NewDelivery: React.FC<NewDeliveryProps> = () => {
  const location = useLocation();
  const { route } = location.state || {};
  const [coordinate, setCoordinate] = React.useState<CoordinatesInput>({
    longitude: 0,
    latitude: 0,
    address: null,
  });
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [packageNumber, setPackageNumber] = React.useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDelivery: DeliveryInput = {
      id: uuidv4(),
      phone_number: phoneNumber || null,
      package_number: packageNumber || null,
      name: name || null,
      point: coordinate,
      optimized: false,
      status: "pending",
    };

    let updatedRoute = { ...route };
    updatedRoute.deliveries.push(newDelivery);

    const response = await updateRouteDeliveries(updatedRoute.id, { deliveries: updatedRoute.deliveries }).then((response) => { handleGoBack() });
  };


  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (route page)
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Delivery</h1>

      <AddressInput
        setCoordinate={setCoordinate}
      />

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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

};

export default NewDelivery;
