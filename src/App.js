import Router from './route/Router';
import './App.css';
import { AuthProvider } from './context/auth';
import { TodoProvider } from './context/todo';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router />
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
