import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../landingpage/Navbar';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const TravelExpense = () => {
  const [value, setValue] = useState('1');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelData, setTravelData] = useState({ buses: [], trains: [], flights: [] });
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async () => {
    try {
      // Fetch travel data
      const travelResponse = await axios.post('https://test.collegestorehub.com/travel', {
        source,
        destination,
      });
      setTravelData(travelResponse.data);

      // Fetch weather data
      const apiKey = '12ee96497996d8cb1141d61d89d7b5cf';
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <div className='mt-5'>
        <h3 className='text-center py-2'>
          Find the Best <span className='text-primary'>Travel Option</span>
        </h3>
        <p className='text-center'>Add your location and destination</p>

        <div className='d-flex justify-content-center align-items-center mt-3 flex-column'>
          <div className='d-flex align-items-center gap-2'>
            <TextField
              id="outlined-basic"
              label="Source"
              variant="outlined"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <i className="bi bi-arrow-left-right fw-bold fs-3"></i>
            <TextField
              id="outlined-basic"
              label="Destination"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button
              className="my-2 py-3 px-3"
              variant="contained"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Weather Information */}
        {weatherData && (
          <div className='mt-3'>
            <h4>Weather in {weatherData.name}</h4>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}

        {/* Travel Options */}
        <div className='mt-3'>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Flights" value="1" />
                  <Tab label="Bus" value="2" />
                  <Tab label="Train" value="3" />
                </TabList>
              </Box>

              {/* Flights */}
              <TabPanel value="1">
                {travelData.flights.length > 0 ? (
                  travelData.flights.map((flight) => (
                    <Card
                      key={flight._id}
                      variant="outlined"
                      className="p-2 mb-3"
                      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px' }}
                    >
                      <div>
                        <p className='m-2 fw-bold fs-5'><i className="bi bi-airplane-engines"></i> {flight.airline}</p>
                        <div className="p-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h4>{flight.source}</h4>
                            <h6>{new Date(flight.departureTime).toLocaleTimeString()}</h6>
                          </div>
                          <div>
                            <h4>{flight.duration}</h4>
                          </div>
                          <div>
                            <h4>{flight.destination}</h4>
                            <h6>{new Date(flight.arrivalTime).toLocaleTimeString()}</h6>
                          </div>
                          <div>
                            <h4>Rs. {flight.prices.economy}</h4>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>No flights available</p>
                )}
              </TabPanel>

              {/* Buses */}
              <TabPanel value="2">
                {travelData.buses.length > 0 ? (
                  travelData.buses.map((bus) => (
                    <Card
                      key={bus._id}
                      variant="outlined"
                      className="p-2 mb-3"
                      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px' }}
                    >
                      <div className='p-2'>
                        <p className="text-center">Bus Name : {bus.busName}</p>
                        <div className='d-flex justify-content-evenly'>
                          <div>
                            <h4>{bus.source}</h4>
                          </div>
                          <i className="bi bi-arrow-left-right fw-bold fs-3"></i>
                          <div>
                            <h4>{bus.destination}</h4>
                          </div>
                        </div>
                        <div>
                          <p><b>Boarding Time:</b> {new Date(bus.departureTime).toLocaleTimeString()}</p>
                          <p><b>Arrival Time:</b> {new Date(bus.arrivalTime).toLocaleTimeString()}</p>
                          <p><b>Duration:</b> {bus.duration}</p>
                          <p><b>Price (Regular):</b> Rs. {bus.prices.regular}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>No buses available</p>
                )}
              </TabPanel>

              {/* Trains */}
              <TabPanel value="3">
                {travelData.trains.length > 0 ? (
                  travelData.trains.map((train) => (
                    <Card
                      key={train._id}
                      variant="outlined"
                      className="p-2 mb-3"
                      style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px' }}
                    >
                      <div className='p-2'>
                        <p className="text-center">Train Name : {train.trainName}</p>
                        <div className='d-flex justify-content-evenly'>
                          <div>
                            <h4>{train.source}</h4>
                          </div>
                          <i className="bi bi-arrow-left-right fw-bold fs-3"></i>
                          <div>
                            <h4>{train.destination}</h4>
                          </div>
                        </div>
                        <div>
                          <p><b>Departure Time:</b> {new Date(train.departureTime).toLocaleTimeString()}</p>
                          <p><b>Arrival Time:</b> {new Date(train.arrivalTime).toLocaleTimeString()}</p>
                          <p><b>Duration:</b> {train.duration}</p>
                          <p><b>Price (Sleeper):</b> Rs. {train.prices.sleeper}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>No trains available</p>
                )}
              </TabPanel>

            </TabContext>
          </Box>
        </div>
      </div>
    </div >
  );
}

export default TravelExpense;
