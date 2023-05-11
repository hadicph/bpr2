import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import AuthComponent from './components/App/AuthComponent';
import RouterComponent from './components/App/Router';
import { BrowserRouter } from 'react-router-dom';
Amplify.configure(awsconfig);



const App: React.FC = () => {
  return (
    <AuthComponent>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </AuthComponent>
  );
}
export default App;
