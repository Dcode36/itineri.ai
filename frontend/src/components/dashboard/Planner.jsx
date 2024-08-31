import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import gif from '../landingpage/assets/loader.gif';
import Navbar from '../landingpage/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Planner = () => {
    const location = useLocation();
    const data = location.state?.formData;

    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null); // State to track selected day for the modal
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const fetchItineraryData = async () => {
        try {
            const response = await axios.post('http://192.168.137.11:3000/suggestTrip', {
                city: data?.personalDetails?.city,
                interest: data?.itineraryDetails?.selectedTabs,
                days: data?.budget?.travelDays,
            });
            console.log(response)
            const data2 = JSON.parse(response.data.jsonString);
            console.log(data2);
            setItinerary(data2);
        } catch (error) {
            console.error("Error fetching itinerary data:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchItineraryData();
    }, []);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <div>
            <Navbar />
            {error && <p>Error: {error}</p>}
            {itinerary ? (
                <div className='container'>
                    <h2 className='text-center fs-4 my-2'><span className='text-primary'>Congratulations!</span> Your Trip Plan Is Ready.....</h2>
                    <div className='my-2 d-flex justify-content-center'>
                        {/* Tabs for each day */}
                        {itinerary.trip?.map((day, index) => (
                            <Button
                                key={index}
                                variant="outline-primary"
                                color='primary'
                                className="m-2"
                                onClick={() => handleDayClick(day)}
                            >
                                Day {day.day}
                            </Button>
                        ))}
                    </div>
                    <div className="container text-center">
                        click on the perticular day to know about what you can do on that day
                    </div>
                    {/* Modal for displaying day details */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Day {selectedDay?.day} Itinerary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedDay && (
                                <div>
                                    <h4 className='fs-6'>Places to Visit</h4>
                                    {selectedDay.placesToVisit?.map((place, idx) => (
                                        <div key={idx} className='my-2'>
                                            <p className='fw-bold'> {place.name}</p>
                                            <p className='fw-bold'>
                                                {place.category?.map((cat, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            backgroundColor: 'green',
                                                            color: 'white',
                                                            padding: '0.2rem 0.4rem',
                                                            borderRadius: '5px',
                                                            marginRight: '0.5rem',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </p>
                                            <p className='fw-bold'> {place.location?.address}</p>
                                            <p className='fw-bold'> {place.description}</p>
                                            <img height="150px" style={{ borderRadius: "15px" }} src={place.imageUrl} alt="" />
                                        </div>
                                    ))}

                                    <h4>Restaurants to Dine At</h4>
                                    {selectedDay.restaurantsToDineAt?.map((restaurant, idx) => (
                                        <div key={idx}>
                                            <p><strong>Name:</strong> {restaurant.name}</p>
                                            <p><strong>Cuisine Types:</strong> {restaurant.cuisineTypes?.join(', ')}</p>
                                            <p><strong>Address:</strong> {restaurant.location?.address}</p>
                                            <p><strong>Description:</strong> {restaurant.description}</p>
                                        </div>
                                    ))}

                                    <h4>Activities to Enjoy</h4>
                                    {selectedDay.activitiesToEnjoy?.map((activity, idx) => (
                                        <div key={idx}>
                                            <p><strong>Name:</strong> {activity.name}</p>
                                            <p><strong>Description:</strong> {activity.description}</p>
                                        </div>
                                    ))}

                                    <h4>Hotel to Stay In</h4>
                                    <p><strong>Name:</strong> {selectedDay.hotelToStayIn?.name}</p>
                                    <p><strong>Address:</strong> {selectedDay.hotelToStayIn?.location?.address}</p>
                                    <p><strong>Description:</strong> {selectedDay.hotelToStayIn?.description}</p>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : (
                <div style={{ height: "100vh", flexDirection: "column" }} className='container d-flex justify-content-center align-items-center'>
                    <img src={gif} height='150px' width='150px' alt="" />
                    Preparing Your Plan.....
                </div>
            )}
        </div>
    );
};

export default Planner;
