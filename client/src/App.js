import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import Income from './components/Income';
import Transactionlist from './components/Transactionlist';
import Add from './components/Add';
import { GlobalProvider } from './components/context/GlobalState';
function App() {
  return (
    < GlobalProvider>
      <Header />
      <div className="container">
      <Balance />
      <Income />
      <Transactionlist />
      <Add />
      </div>
    </ GlobalProvider>
  );
}

export default App;
