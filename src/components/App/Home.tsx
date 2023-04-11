import { ReactElement } from "react";

type HomeProps = {
    children?: ReactElement;
  };

const Home: React.FC<HomeProps> = ({ children }) => {
    return(
        <>Home Page</>
      );
}

export default Home;