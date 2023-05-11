import { ReactElement } from "react";
import {getRoutes, getSuggestions, renameRoute, saveRoute, saveUserPreference, setDefaultOptions, setStartAndEndAddress} from "../../helpers/routesHelper";
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
  //!!NON_FUNCTIONAL - Operation should be executed after successful registration
  const handleSaveUserPreference = async () => {
    const userPreferance = await saveUserPreference();
    console.log(userPreferance);
  }
  //!
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
    return(
        <>
        <Button onClick={handleSaveRoute}>Add Route</Button>
        <Button onClick={handleGetRoutes}>Get Routes</Button>
        <Button onClick={handleSuggestions}>Get Suggestions</Button>
        <Button onClick={handleSetStartAndEndAddress}>Set Start and End address</Button>
        <Button onClick={handleNameChange}>Change Name</Button>
        <Button onClick={handleSetDefaultStartAndEndAddress}>Set Default Start and End address</Button>
        <Button onClick={handleSetDefaultTheme}>Set Default Theme</Button>
        </>
      );
}

export default GraphqlTesting;