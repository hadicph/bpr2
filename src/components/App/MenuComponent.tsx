import { ReactElement } from "react";

type MenuProps = {
    children?: ReactElement;
  };

const MenuComponent: React.FC<MenuProps> = ({ children }) => {
    return(
        <>Menu component</>
      );
}

export default MenuComponent;