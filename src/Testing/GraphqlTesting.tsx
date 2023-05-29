import { ReactElement } from "react";
import { deleteDeliveryById, getRouteById, getRoutes, getSuggestions, listUserPreference, optimizeRoute, renameRoute
  , saveRoute, setDefaultOptions, setDeliveryStatusHelper, setRouteStatus, setStartAndEndAddress, updateRouteDeliveries} from "../helpers/routesHelper";
import { Button } from "@aws-amplify/ui-react";
import { DeliveryInput, Route, UserPreference } from "../API";
import { v4 as uuidv4 } from 'uuid';
import React from "react";


type GraphqlTestingProps = {
    children?: ReactElement;
  };

const GraphqlTesting: React.FC<GraphqlTestingProps> = ({ children }) => {
  const route_name = "test";
  //Create state for one of the existing routes
  const [route, setRoute] = React.useState<Route>();
  const [userPreference, setUserPreference] = React.useState<UserPreference>();
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
    if(response){
    console.log(response);
    setRoute(response);
    console.log("Save Route Test passed")
    }
    else console.log("Save Route Test failed")
  }
  const handleGetRoutes = async () => {
    const routes = await getRoutes(false);
    console.log(routes);
    if(routes){
      console.log("Get Routes Test passed")
    }
    else console.log("Get Routes Test failed")

  }
  const handleSuggestions = async () => {
    const suggestions = await getSuggestions("horsensvej");
    console.log(suggestions);
    if(suggestions){
      console.log("Get Suggestions Test passed")
    }
    else console.log("Get Suggestions Test failed")
  }

  const handleSetStartAndEndAddress = async () => {
    const response = await setStartAndEndAddress(route?.id||"",{start_address: FakeCoordinates, end_address: FakeCoordinates});
    console.log(response);
    if(response&&response.start_address?.address===FakeCoordinates.address&&response.end_address?.address===FakeCoordinates.address){
      console.log("Set Start and End Address Test passed")
    }
    else console.log("Set Start and End Address Test failed")
      
    };

  const handleNameChange = async () => {
    const response = await renameRoute(route?.id||"", "ChangedName");
    console.log(response);
    if(response&&response.route_name==="ChangedName"){
      console.log("Name Change Test passed")
    }
    else console.log("Name Change Test failed")
  };
  const handleListUserPreferences = async () => {
    const response = await listUserPreference();
    console.log(response);
    if(response){
      console.log("List User Preferences Test passed")
      setUserPreference(response[0]);
    }
    else console.log("List User Preferences Test failed")
  };
  const handleSetDefaultStartAndEndAddress = async () => {
    const response = await setDefaultOptions(userPreference?.id||"",{start_address: FakeCoordinates, end_address: FakeCoordinates});
    console.log(response);
    if(response&&response.start_address?.address===FakeCoordinates.address&&response.end_address?.address===FakeCoordinates.address){
      console.log("Set Default Start and End Address Test passed")
    }
    else console.log("Set Default Start and End Address Test failed")
  };
  const handleSetDefaultTheme = async () => {
    const response = await setDefaultOptions(userPreference?.id||"",{theme: "switched"});
    console.log(response);
    if(response&&response.theme==="switched"){

      console.log("Set Default Theme Test passed")
    }
    else console.log("Set Default Theme Test failed")
  };
  
  const handleUpdateRouteDeliveries = async () => {
    const fakedeliveries = FakeDeliveries;
    const response = await updateRouteDeliveries(route?.id||"",{deliveries: fakedeliveries})
    console.log(response);
    if(response&&response.deliveries===fakedeliveries){
      console.log("Update Route Deliveries Test passed")
    }
    else console.log("Update Route Deliveries Test failed")
  };
  const handleGetRouteById = async () => {
  const repsonse = await getRouteById(route?.id||"");
  console.log(repsonse);
  if(repsonse&&repsonse.id===route?.id){
    console.log("Get Route By Id Test passed")
  }
  else console.log("Get Route By Id Test failed")
  };
  const handleOptimizeRoute= async () => {
    const response = await optimizeRoute(route?.id||"")
    console.log(response);
    if(response&&response.optimized?.optimized===true){
      console.log("Optimize Route Test passed")
    }
    else console.log("Optimize Route Test failed")
  };
  
 const handleDeleteDelivery = async () => {
  const response = await deleteDeliveryById(route?.id||"", route?.deliveries[0]?.id||"")
  console.log(response);
  if(response){
    console.log("Delete Delivery Test passed")
  }
  else console.log("Delete Delivery Test failed")
};
const handleSetRouteStatus = async () => {
  const response = await setRouteStatus(route?.id||"", "finished")
  console.log(response);
  if(response&&response.status==="finished"){
    console.log("Set Route Status Test passed")
  }
  else console.log("Set Route Status Test failed")
};
const handleSetDeliveryStatus= async () => {
  const reponse = await setDeliveryStatusHelper(route?.deliveries[0]?.id||"",route?.id||"","DELIVERED")
  console.log(reponse);
  if(reponse&&reponse.setDeliveryStatus===true){
    console.log("Set Delivery Status Test passed")
  }
  else console.log("Set Delivery Status Test failed")
};

    return(
        <>
        <Button onClick={handleSaveRoute}>Add Route</Button>
        <Button onClick={handleGetRoutes}>Get Routes</Button>
        <Button onClick={handleSuggestions}>Get Suggestions</Button>
        <Button onClick={handleListUserPreferences}>List User Preferences</Button>
        <Button onClick={handleSetStartAndEndAddress}>Set Start and End address</Button>
        <Button onClick={handleNameChange}>Change Name</Button>
        <Button onClick={handleSetDefaultStartAndEndAddress}>Set Default Start and End address</Button>
        <Button onClick={handleSetDefaultTheme}>Set Default Theme</Button>
        <Button onClick={handleUpdateRouteDeliveries}>Update Route Deliveries</Button>
        <Button onClick={handleGetRouteById}>Get Route By Id</Button>
        <Button onClick={handleOptimizeRoute}>Optimize Route</Button>
        <Button onClick={handleSetDeliveryStatus}>Set Delivery To delivered</Button>
        <Button onClick={handleDeleteDelivery}>Delete Delivery</Button>
        <Button onClick={handleSetRouteStatus}>Set Route To Finished</Button>
        </>
      );
}

export default GraphqlTesting;