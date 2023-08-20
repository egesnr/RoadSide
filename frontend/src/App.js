import './App.css';
import useGeoLocation from './Components/GeoLocation';
import AlignItemsList from './Components/ServiceList';

function App() {
  const location = useGeoLocation();

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROADSIDE</h1>
        <p>Welcome to roadside assistance service!!!!</p>
        <AlignItemsList />
      </header>
      
    </div>
  );
}

export default App;
