import React from "react";
import { ReactElement } from "react";
import { CoordinatesInput, UserPreference } from "../../API";
import AddressInput from "../Delivery/AddressInput";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { listUserPreference, setDefaultOptions } from "../../helpers/routesHelper";

type AddressStartEndProps = {
    children?: ReactElement;
};

const AddressStartEnd: React.FC<AddressStartEndProps> = ({ children }) => {
    const [startCoordinate, setStartCoordinate] = React.useState<CoordinatesInput>({
        longitude: 0,
        latitude: 0,
        address: null,
    });
    const [endCoordinate, setEndCoordinate] = React.useState<CoordinatesInput>({
        longitude: 0,
        latitude: 0,
        address: null,
    });

    const [userPreferences, setUserPreferences] = React.useState<UserPreference>();

    React.useEffect(() => {
        handleListUserPreferences();
    }, []);


    const handleListUserPreferences = async () => {
        const response = await listUserPreference().then((response) => setUserPreferences(response[0]));
        if (userPreferences?.start_address && userPreferences?.end_address) {
            setStartCoordinate(userPreferences?.start_address);
            setEndCoordinate(userPreferences?.end_address);
        }


    };

    const navigate = useNavigate();


    // Handle the submission of startCoordinate and endCoordinate
    const handleSubmit = async () => {
        try {
            if (userPreferences?.id) {
                const response = await setDefaultOptions(userPreferences.id, {
                    start_address: startCoordinate,
                    end_address: endCoordinate,
                });
                // Check for positive response here
                if (response) {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <>
            <NavBar />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Set Default Addresses</h1>

                <div className="mt-8">
                    <h2 className="text-lg font-bold">Start Address</h2>
                    <AddressInput setCoordinate={setStartCoordinate} />
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-bold">End Address</h2>
                    <AddressInput setCoordinate={setEndCoordinate} />
                </div>

                <div className="mt-8">
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
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressStartEnd;