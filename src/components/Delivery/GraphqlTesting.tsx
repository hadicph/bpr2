import { ReactElement } from "react";
import {getRoutes, saveRoute, saveUserPreferance, updateUserPreferenceCustom} from "../../helpers/routesHelper";
import { Button } from "@aws-amplify/ui-react";



type GraphqlTestingProps = {
    children?: ReactElement;
  };

const GraphqlTesting: React.FC<GraphqlTestingProps> = ({ children }) => {
  const route_name = "test";

  const FakeCoordinates=
    {
      latitude: 1,
      longitude: 1,
      address: "switched"
    };
  const handleSaveRoute = async () => {
    const response = await saveRoute(
      route_name
    )
    console.log(response);
  }
  const handleGetRoutes = async () => {
    const routes = await getRoutes(true);
    console.log(routes);
  }
  const handleSaveUserPreferance = async () => {
    const userPreferance = await saveUserPreferance();
    console.log(userPreferance);
  }

  const handleUpdateUserPreference = async () => {
  const userPreferance = await updateUserPreferenceCustom("955aeb52-c658-45a5-bef4-73333317733e",{start_address: FakeCoordinates, end_address: FakeCoordinates, theme: "dark"});
    console.log(userPreferance);
  }
    return(
        <>
        <Button onClick={handleSaveRoute}>Add Route</Button>
        <Button onClick={handleGetRoutes}>Get Routes</Button>
        <Button onClick={handleSaveUserPreferance}>Save User Preferance</Button>
        <Button onClick={handleUpdateUserPreference}>Update User Preference</Button>
        </>
      );
}

export default GraphqlTesting;