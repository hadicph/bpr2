import { ReactElement } from "react";
import {Authenticator} from '@aws-amplify/ui-react';
import React from "react";
import { Auth, Hub } from "aws-amplify";
import Header from "./Header";

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
  /*
  <main>
          <Text>Hello {user?.username}</Text>
          <button onClick={signOut}>Sign out</button>
        </main>
  */
  return (
    <Authenticator >
        <Header username={user?.username} signOut={signOut}/>
        {children}
        </Authenticator>
  );
}

export default AuthComponent;