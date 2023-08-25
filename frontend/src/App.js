import './App.css';
import useGeoLocation from './Components/GeoLocation';
import AlignItemsList from './Components/ServiceList';
import BasicTabs from './Components/Tab';

function App() {
  const location = useGeoLocation();

  if (location.error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ROADSIDE</h1>
          <p>Geolocation Error: {location.error.message}</p>
        </header>
      </div>
    );
  }

  if (!location.loaded) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ROADSIDE</h1>
          <p>Loading geolocation...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROADSIDE</h1>
        <p>Welcome to roadside assistance service!!!!</p>
        <AlignItemsList />
        <BasicTabs />
      </header>
    </div>
  );
}



export default App;
