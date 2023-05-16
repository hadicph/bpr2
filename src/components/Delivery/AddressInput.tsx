import React from "react";
import { CoordinatesInput } from "../../API";
import { Place } from "@aws-amplify/geo";
import { getSuggestions } from "../../helpers/routesHelper";

type AddressInputProps = {

    setCoordinate: React.Dispatch<React.SetStateAction<CoordinatesInput>>;
    
};

const AddressInput: React.FC<AddressInputProps> = ({
    setCoordinate,
}) => {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState<CoordinatesInput[]>([]);
    const [selectedCoordinate, setSelectedCoordinate] = React.useState<CoordinatesInput | null>(null);

    const handleSearch = async () => {
        const suggestions: Place[] = await getSuggestions(address);

        setCoordinates(
            suggestions.map((suggestion) => ({
                longitude: suggestion.geometry?.point?.[0] || 0,
                latitude: suggestion.geometry?.point?.[1] || 0,
                address: suggestion.label || '',
            }))
        );
    };

    const handleCoordinateSelect = (selected: CoordinatesInput) => {
        setSelectedCoordinate(selected);
        setCoordinate(selected);
        setAddress(selected.address || '')
        setCoordinates([])
    };


    return (
        <div>
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
                {coordinates.length > 0 && (
                    <h2 className="text-lg font-medium mb-2">Choose Address:</h2>
                )}

                {coordinates.map((coord, index) => (
                    <div
                        key={index}
                        className={`py-2 px-4 rounded ${selectedCoordinate === coord ? "bg-blue-200" : "bg-gray-200"
                            }`}
                        onClick={() => handleCoordinateSelect(coord)}
                    >
                        {coord.address}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressInput;
