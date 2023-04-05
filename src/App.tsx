import React from 'react';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Text, withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(awsconfig);

// function App({signOut, user}) {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
interface User {
  username: string;
  attributes: {
    email: string;
    phone_number: string;
  }
}

function App() {
  const [user, setUser] = React.useState<User | null>(null);;
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user as User))
      .catch(() => console.log('Not signed in'));
  }, []);
  async function signOut() {
    console.log(user);
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <>
      <main>
          <Text>Hello {user?.username}</Text>
          <button onClick={signOut}>Sign out</button>
        </main>
    </>
  );
}

export default withAuthenticator(App);
