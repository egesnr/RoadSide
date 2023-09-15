import './App.css';
import useGeoLocation from './Components/GeoLocation';
import MyComponent from './Components/MyComponent'; // Import the MyComponent here
import AlignItemsList from './Components/ServiceList';
import BasicTabs from './Components/Tab';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import image from 'C:/Users/Ege/Desktop/RoadSide/frontend/src/frontend_logo.jpg'  
import { useEffect, useState } from 'react';



const Home = () => (
  <div>
    <h1>ROADSIDE</h1>
    <p>Welcome to roadside assistance service!!!!</p>
    <BasicTabs>
      <div label="Tab 1"> {/* Content for the first tab */}
        <AlignItemsList />
        <MyComponent />
      </div>
      <div label="Tab 2"> {/* Content for the second tab */}
        {/* Add content for the second tab here */}
      </div>
      <div label="Tab 3"> {/* Content for the third tab */}
        {/* Add content for the third tab here */}
      </div>
    </BasicTabs>
  </div>
);
const Services = () => <div>Our Services</div>;
const About = () => <div>About Us</div>;
const Contact = () => <div>Contact Us</div>;


function App() {
  const sendPostRequest = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
  const location = useGeoLocation();
  
  const [inputText, setInputText] = useState('');

  const handleButtonClick = () => {
    
    sendPostRequest('http://127.0.0.1:8080/sendMessage', inputText);

    console.log('Text from text field:', inputText);
  };

  
  
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
          <img src={image} alt = "" className="logo-image"/>
        </Link>
        </div>
        <div>
      <h1>React Text Field Example</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleButtonClick}>Send Text</button>
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


}



export default App;
