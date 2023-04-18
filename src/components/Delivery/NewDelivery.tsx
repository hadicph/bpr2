import { ReactElement } from "react";
import {deleteRouteById, getRoutes, saveRoute} from "../../helpers/routesHelper";
import { Button } from "@aws-amplify/ui-react";
import Delivery from "./Delivery";


type NewDeliveryProps = {
    children?: ReactElement;
  };

const NewDelivery: React.FC<NewDeliveryProps> = ({ children }) => {
  const route_name = "test";

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
  const handleDeleteRoute = async () => {
    const id = "9bdb3098-ec77-47b6-a959-37548812ce77";
    const response = await deleteRouteById(id);
    console.log(response);
  }
    return(

        <>
        <Button onClick={handleSaveRoute}>Add Route</Button>
        <Button onClick={handleGetRoutes}>Get Routes</Button>
        <Button onClick={handleDeleteRoute}>Delete Route</Button>
        New Delivery Page
        <Delivery/>
        
        </>
      );
}

export default NewDelivery;