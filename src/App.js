import Router from './route/Router';
import './App.css';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
