import { ReactElement } from "react";
import RouteList from "../Routes/RouteList";
import NavBar from "./NavBar";

type HomeProps = {
  children?: ReactElement;
};

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <RouteList />
    </>
  );
}

export default Home;