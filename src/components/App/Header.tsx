import { ReactElement } from "react";

type HeaderProps = {
    children?: ReactElement;
  };

const Header: React.FC<HeaderProps> = ({ children }) => {
    return(
        <>Header component</>
      );
}

export default Header;