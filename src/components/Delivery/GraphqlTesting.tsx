import { ReactElement } from "react";
import {getRouteById, getRoutes, getSuggestions, listUserPreference, optimizeRoute, renameRoute, saveRoute, setDefaultOptions, setStartAndEndAddress, updateRouteDeliveries} from "../../helpers/routesHelper";
import { Button } from "@aws-amplify/ui-react";
import { DeliveryInput } from "../../API";
import { v4 as uuidv4 } from 'uuid';
import Map from "../Map/Map";

type GraphqlTestingProps = {
    children?: ReactElement;
  };

const GraphqlTesting: React.FC<GraphqlTestingProps> = ({ children }) => {
  const route_name = "test";

  function fakeDeliveryGenerator () {
    const fakeDelivery: DeliveryInput = {
      id: uuidv4(),
      status: "test",
      phone_number: "test",
      package_number: "test",
      name: "test",
      point: {
        latitude: 1,
        longitude: 1,
        address: "test"
      },
      optimized: false
    };
    return fakeDelivery;
  }

  const FakeDeliveries:DeliveryInput[] = [
    fakeDeliveryGenerator(),
    fakeDeliveryGenerator(),
    fakeDeliveryGenerator(),
  ];

  const FakeCoordinates=
    {
      latitude: 1,
      longitude: 1,
      address: "switched"
    };
  const handleSaveRoute = async () => {
    const response = await saveRoute(
      route_name,
      FakeCoordinates,
      FakeCoordinates,
    )
    console.log(response);
  }
  const handleGetRoutes = async () => {
    const routes = await getRoutes(true);
    console.log(routes);
  }
  const handleSuggestions = async () => {
    const suggestions = await getSuggestions("horsensvej");
    console.log(suggestions);
  }

  const handleSetStartAndEndAddress = async () => {
    const response = await setStartAndEndAddress("bf094c57-1160-461b-a851-1e18d65de1c1",{start_address: FakeCoordinates, end_address: FakeCoordinates});
    console.log(response);
  };

  const handleNameChange = async () => {
    const response = await renameRoute("66729e6c-b538-47ca-9686-08a6a386a483", "ChangedName");
    console.log(response);
  };

  const handleSetDefaultStartAndEndAddress = async () => {
    const response = await setDefaultOptions("986bf916-5c4d-4987-aa2c-1962f8b72e99",{start_address: FakeCoordinates, end_address: FakeCoordinates});
    console.log(response);
  };
  const handleSetDefaultTheme = async () => {
    const response = await setDefaultOptions("986bf916-5c4d-4987-aa2c-1962f8b72e99",{theme: "switched"});
    console.log(response);
  };
  const handleListUserPreferences = async () => {
    const response = await listUserPreference();
    console.log(response);
  };
  const handleUpdateRouteDeliveries = async () => {
    const response = await updateRouteDeliveries("66729e6c-b538-47ca-9686-08a6a386a483",{deliveries: FakeDeliveries})
    console.log(response);
  };
  const handleGetRouteById = async () => {
  const repsonse = await getRouteById("46644678-8ff7-4a83-a9dd-3dbf2139a8f5");
  console.log(repsonse);
  };
  const handleOptimizeRoute= async () => {
    const response = await optimizeRoute("1fd87fa6-fef1-4847-ba15-8d3f11eb815f")
    console.log(response);
  }

  

    return(
        <>
        <Button onClick={handleSaveRoute}>Add Route</Button>
        <Button onClick={handleGetRoutes}>Get Routes</Button>
        <Button onClick={handleSuggestions}>Get Suggestions</Button>
        <Button onClick={handleSetStartAndEndAddress}>Set Start and End address</Button>
        <Button onClick={handleNameChange}>Change Name</Button>
        <Button onClick={handleSetDefaultStartAndEndAddress}>Set Default Start and End address</Button>
        <Button onClick={handleSetDefaultTheme}>Set Default Theme</Button>
        <Button onClick={handleListUserPreferences}>List User Preferences</Button>
        <Button onClick={handleUpdateRouteDeliveries}>Update Route Deliveries</Button>
        <Button onClick={handleGetRouteById}>Get Route By Id</Button>
        <Button onClick={handleOptimizeRoute}>Optimize Route</Button>
        </>
      );
}

export default GraphqlTesting;

