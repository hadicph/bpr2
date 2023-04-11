import { ReactElement } from "react";
import {Authenticator, Text} from '@aws-amplify/ui-react';
import React from "react";
import { Auth } from "aws-amplify";

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
        const [user, setUser] = React.useState<User | null>(null);;
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user as User))
      .catch(() => console.log('Not signed in'));
  }, []);
  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <Authenticator>
      <main>
          <Text>Hello {user?.username}</Text>
          <button onClick={signOut}>Sign out</button>
        </main>
        {children}
        </Authenticator>
  );
}

export default AuthComponent;