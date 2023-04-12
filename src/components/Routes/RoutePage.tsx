import React from "react";
import { Route } from "../../types/Route";
import { useParams } from "react-router-dom";

//delete
import routesData from './data_temp.json';
import NavBar from "../App/NavBar";

// type RoutePageProps = {
//   route?: Route; 
// };

const RoutePage: React.FC = () => {
    const { id } = useParams();

    // ToDo call services to get route by id
    const route: Route = {
        "id": "1",
        "routename": "The coolest route",
        "start_address": {
            "longitude": -122.12345,
            "latitude": 45.67890
        },
        "end_address": {
            "longitude": -122.98765,
            "latitude": 45.54321
        },
        "userid": "1",
        "deliveries": [
            {
                "id": "1",
                "address": "1234 Elm Street",
                "status": "pending",
                "phone_number": "123-456-7890",
                "package_number": "PKG001",
                "name": "John Smith",
                "created_at": "2022-04-10T09:00:00Z",
                "updated_at": "2022-04-10T09:00:00Z",
                "point": {
                    "longitude": -122.12345,
                    "latitude": 45.67890
                }
            },
            {
                "id": "2",
                "address": "5678 Oak Street",
                "status": "pending",
                "phone_number": "987-654-3210",
                "package_number": "PKG002",
                "name": "Jane Doe",
                "created_at": "2022-04-10T09:30:00Z",
                "updated_at": "2022-04-10T09:30:00Z",
                "point": {
                    "longitude": -122.98765,
                    "latitude": 45.54321
                }
            },
            {
                "id": "3",
                "address": "9876 Maple Avenue",
                "status": "pending",
                "phone_number": "555-555-5555",
                "package_number": "PKG003",
                "name": "Bob Johnson",
                "created_at": "2022-04-10T10:00:00Z",
                "updated_at": "2022-04-10T10:00:00Z",
                "point": {
                    "longitude": -122.56789,
                    "latitude": 45.78901
                }
            }
        ],
        "status": "active",
        "optimized": true,
        "created_at": "2022-04-10T08:30:00Z",
        "updated_at": "2022-04-10T12:45:00Z",
        "hasStarted": false,
        "estimated_time": 60,
        "estimated_distance": 10.5
    };



    return (
        <>
            <NavBar />
            <div className="p-2">
                <h1 className="text-2xl font-bold mb-4 ">Name: {route.routename}</h1>
                <h1>Route id that u came from: {id}</h1>
                <h1>{route.deliveries[0].address}</h1>
            </div>
        </>
    );
};

export default RoutePage;
