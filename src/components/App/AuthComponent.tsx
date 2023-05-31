import { ReactElement } from "react";
import {Authenticator, View, useTheme} from '@aws-amplify/ui-react';
import React from "react";
import { Auth, Hub } from "aws-amplify";
import Header from "./Header";
import { DefaultComponents } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useCustomComponents/defaultComponents";

type AuthProps = {
    children?: ReactElement;
  };
  interface User {
    username: string;
    attributes: {
      email: string;
      phone_number: string;
    }
  }
const AuthComponent: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);

React.useEffect(() => {
  checkUser();
  Hub.listen("auth", ({
    payload: {
      event,
      data
    }
  }) => {
    if (event === "signIn") {
      checkUser();
    } else if (event === "signOut") {
      setUser(null);
    }
  });
}, []);

  async function checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user as User);
        setAuthenticated(true);
      })
      .catch(() => {
        console.log('Not signed in');
        setAuthenticated(false);
      });
  };
  
  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  const components = {
  Header() {
  const { tokens } = useTheme();

  return (
  <View textAlign="center" padding={tokens.space.large}>
    <div className="flex justify-center items-center p-8">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1179/1179051.png?w=826&t=st=1685547937~exp=1685548537~hmac=05b47df3ec1b1c2121d7b4822cba5733dbc726c4e6ff5e7ad9b75f0e8d430a6a"
        alt="start route" className="w-20 h-20" />
      <h1 className="text-2xl font-bold">Transportation Optimization System</h1>
    </div>

  </View>
  );
  },
  }
  return (
    <Authenticator components={components}>
        <Header username={user?.username} signOut={signOut}/>
        {children}
        </Authenticator>
  );
}

export default AuthComponent;