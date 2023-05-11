import { ReactElement, useEffect } from "react";
import React, { useState } from "react";
import { Delivery, Coordinates, DeliveryInput } from '../../API';
import { useNavigate } from "react-router-dom";
import { getSuggestions } from "../../helpers/routesHelper";
import { Place } from "@aws-amplify/geo";

type NewDeliveryProps = { children?: ReactElement; };

const NewDelivery: React.FC<NewDeliveryProps> = ({ children }) => {
  const [coordinate, setCoordinate] = React.useState<Coordinates>({
    __typename: "Coordinates",
    longitude: 0,
    latitude: 0,
    address: null,
  });
  const [coordinates, setCoordinates] = React.useState<Coordinates[]>([]);
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [packageNumber, setPackageNumber] = React.useState("");
  const [name, setName] = useState("");
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinates | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const suggestions: Place[] = await getSuggestions(address);

    setCoordinates(
      suggestions.map((suggestion) => ({
        __typename: 'Coordinates',
        longitude: suggestion.geometry?.point?.[0] || 0,
        latitude: suggestion.geometry?.point?.[1] || 0,
        address: suggestion.label || '',
      }))
    );
  };

  const handleCoordinateSelect = (selected: Coordinates) => {
    setSelectedCoordinate(selected);
    setCoordinate(selected);
    setAddress(selected.address || '')
    setCoordinates([])
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDelivery: DeliveryInput = {
      address: coordinate.address || "",
      phone_number: phoneNumber || null,
      package_number: packageNumber || null,
      name: name || null,
      point: coordinate,
      optimized: null,
    };

    console.log(newDelivery);

    // TODO Handle the submission of a new delivery
    // TODO Redirect to the delivery list page
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page (route page)
  };



  // TODO: Delete this useEffect
  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);
  useEffect(() => {
    console.log(coordinate);
  }, [coordinate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Delivery</h1>

      <div className="flex flex-col">
        <label className="text-lg font-medium">Address:</label>
        <div className="flex">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input input-primary"
          />
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Display the list of coordinates */}
      <div className="mt-4">
        {coordinates.length < 1 && (<h2 className="text-lg font-medium mb-2">Choose Address:</h2>)}

        {coordinates.map((coord, index) => (
          <div
            key={index}
            className={`py-2 px-4 rounded ${selectedCoordinate === coord ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            onClick={() => handleCoordinateSelect(coord)}
          >
            {coord.address}
          </div>
        ))}
      </div>

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
