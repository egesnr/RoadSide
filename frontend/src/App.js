import './App.css';
import useGeoLocation from './Components/GeoLocation';
import AlignItemsList from './Components/ServiceList';
import BasicTabs from './Components/Tab';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import image from 'C:/Users/Ege/Desktop/RoadSide/frontend/src/frontend_logo.jpg'  
const Home = () => <div> <h1>ROADSIDE</h1>
<p>Welcome to roadside assistance service!!!!</p>
<AlignItemsList />
<BasicTabs /></div>;
const Services = () => <div>Our Services</div>;
const About = () => <div>About Us</div>;
const Contact = () => <div>Contact Us</div>;


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
    <Router>
      {/* Your navigation bar */}
      <header className="header">
        <div className="logo">
        <Link to="/" onClick={(event) => event.preventDefault()}>
          <img src={image} className="logo-image"/>
            </Link>
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
          </ul>
        </nav>
      </header>

      {/* Your route components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );


/*
    <div className="App">
      <header className="App-header">
        <h1>ROADSIDE</h1>
        <p>Welcome to roadside assistance service!!!!</p>
        <AlignItemsList />
        <BasicTabs />
      </header>
    </div>
  );
  */
}



export default App;
