import { ReactElement } from "react";
import RouteList from "../Routes/RouteList";

type HomeProps = {
    children?: ReactElement;
  };

const Home: React.FC<HomeProps> = ({ children }) => {
    return(
        <>
        <RouteList/>
        </>
      );
}

export default Home;