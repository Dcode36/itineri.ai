import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../landingpage/Navbar';
import gif from '../landingpage/assets/loader.gif'; // Assuming you have a loader GIF
import MapComponent from '../map/map';

const Planner = () => {
    const [coords, setCords] = useState();
    const location = useLocation();
    const data = location.state?.formData;
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                let ndata = JSON.stringify({
                    city: data.personalDetails.city,
                    interest: data.itineraryDetails.selectedTabs,
                    days: data.budget.travelDays,
                });

                let config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: "https://t83s14q4-4000.inc1.devtunnels.ms/suggestTrip",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: ndata,
                };

                // Set a timeout of 15 seconds
                setTimeout(async () => {
                    try {
                        const response = await axios.request(config);
                        const parsedData = JSON.parse(response.data);
                        console.log(parsedData);
                        setDashData(parsedData);
                        console.log(parsedData[0].placesToVisit)
                        // Extract and set coordinatesconst locationsArray = [];

                        // Extract places to visit
                        let coord = [];
                        parsedData[0].placesToVisit.forEach(place => {
                            coord.push({
                                name: place.name,
                                lng: place.location.longitude,
                                lat: place.location.latitude,
                                type: "place"
                            });
                        });

                        // Extract restaurants to dine at
                        parsedData[0].restaurantsToDineAt.forEach(restaurant => {
                            coord.push({
                                name: restaurant.name,
                                lng: restaurant.location.longitude,
                                lat: restaurant.location.latitude,
                                type: "restaurant"
                            });
                        });

                        // Extract hotel to stay in
                        coord.push({
                            name: parsedData[0].hotelToStayIn.name,
                            lng: parsedData[0].hotelToStayIn.location.longitude,
                            lat: parsedData[0].hotelToStayIn.location.latitude,
                            type: "hotel"
                        });
                        setCords(coord)


                        setLoading(false);
                    } catch (error) {
                        console.error("Error fetching data:", error);
                        setError(error.message);
                        setLoading(false);
                    }
                }, 100); // 15 seconds
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [data]);

    const handleExport = () => {
        window.print();
    };
    return (
        <div>
            <Navbar />
            {loading ? (
                <div style={{ height: "100vh", flexDirection: 'column' }} className='container d-flex justify-content-center align-items-center' >
                    <img src={gif} height='150px' width='150px' alt="Loading..." />
                    <p>Wait! Generating suggestions just for you :</p>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <section className=" pb-5">
                    <div className="container-fluid">

                        <div className="row">
                            <h3 className='m-5'>Hotels</h3>
                            <div className=" d-flex justify-content-end flex-wrap" style={{ justifyContent: "flex-start" }}>

                                {dashData && dashData.length > 0 ? (
                                    dashData.map((item, index) => (
                                        <div key={index} className="p-3" style={{ margin: '0 auto' }}>



                                            <div className="d-flex align-items-start justify-content-start p-3" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '15px', maxWidth: '400px', minHeight: "330px" }}>
                                                <div className="blog-image">
                                                    <a href="">
                                                        <img src={item.hotelToStayIn.imageUrl} height="200px" width="350px" alt="Blog" style={{ borderRadius: '15px' }} />
                                                        <h6 className='px-2 py-3'>Day {item.day}</h6>
                                                    </a>
                                                </div>
                                                <div className="blog-content m-2 p-2">
                                                    <a href="" className="category text-dark">{item.hotelToStayIn.openingHours}</a>
                                                    <h5 className="blog-title py-1">
                                                        <a href="" className='text-dark fw-bold'>
                                                            {item.hotelToStayIn.name}
                                                        </a>
                                                    </h5>
                                                    <span><b>Price:</b> {item.hotelToStayIn.priceRange}</span> <br />
                                                    <span className='py-1'><b>Opening Time:</b> {item.hotelToStayIn.openingHours}</span> <br />
                                                    <span><b>Cusines:</b> {item.hotelToStayIn.cuisineTypes?.join(', ') || 'NA'}</span> <br />
                                                    <p className="text">
                                                        {item.hotelToStayIn.description}
                                                    </p>
                                                    <a className="more text-dark" href="">Contact: {item.hotelToStayIn.contactNumber}</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available.</p>
                                )}
                            </div>
                            <div className='row'>

                                <div className="col-9">
                                    <div className="">
                                        <div className="row">
                                            <h3 className='m-5'>Places To Visit</h3>
                                            <div className="col-12 d-flex flex-wrap">
                                                {dashData && dashData.length > 0 && dashData[0].placesToVisit ? (
                                                    dashData[0].placesToVisit.map((item, index) => (
                                                        <div key={index} className="p-3" style={{ margin: '' }}>
                                                            <div className=" p-3" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '15px', maxWidth: '400px', maxHeight: '400px' }}>
                                                                <div className="blog-image">
                                                                    <a href={item.mapLink || "#"} target="_blank" rel="noopener noreferrer">
                                                                        <img src={item.imageUrl} height="150px" width="100%" alt={item.name} style={{ borderRadius: '15px' }} />
                                                                    </a>
                                                                </div>
                                                                <div className="blog-content m-2 p-2">
                                                                    <a href="#" className="category text-dark">{item.category?.join(', ') || 'NA'}</a>
                                                                    <h5 className="blog-title py-1">
                                                                        <a href="#" className='text-dark fw-bold' style={{ fontSize: '16px' }}>
                                                                            {item.name}
                                                                        </a>
                                                                    </h5>
                                                                    <span className='fs-6' style={{ fontSize: '16px' }}><b>Price Per Adult:</b> ${item.pricePerAdult}</span> <br />
                                                                    <span className='py-1 '><b>Duration:</b> {item.duration}</span> <br />
                                                                    <span><b>Address:</b> {item.location.address}</span> <br />
                                                                    <p className="text" style={{ fontSize: '16px' }}>
                                                                        {item.description}
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No data available.</p>
                                                )}
                                            </div>

                                        </div>
                                        <div className='col-12'>
                                            <h3 className='m-5'>Restaurants & Dine In</h3>
                                            {dashData && dashData.length > 0 && dashData[0].restaurantsToDineAt ? (
                                                <div className="row">
                                                    {dashData[0].restaurantsToDineAt.map((item, index) => (
                                                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                                            <div className="card h-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '15px' }}>
                                                                <div className="card-img-top">
                                                                    <a href={item.mapLink || "#"} target="_blank" rel="noopener noreferrer">
                                                                        <img src={item.imageUrl} alt={item.name} style={{ borderRadius: '15px 15px 0 0', height: '250px', objectFit: 'cover', width: '100%' }} />
                                                                    </a>
                                                                </div>
                                                                <div className="card-body p-3">
                                                                    <a href="#" className="category text-dark" style={{ fontSize: '14px' }}>{item.category?.join(', ') || 'NA'}</a>
                                                                    <h5 className="card-title py-1" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                                        <a href="#" className='text-dark' style={{ textDecoration: 'none' }}>
                                                                            {item.name}
                                                                        </a>
                                                                    </h5>
                                                                    <p className='mb-1' style={{ fontSize: '14px' }}><b>Duration:</b> {item.duration}</p>
                                                                    <p className='mb-1' style={{ fontSize: '14px' }}><b>Address:</b> {item.location.address}</p>
                                                                    <p className="text" style={{ fontSize: '13px' }}>
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No data available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <MapComponent coordinates={coords} />

                            <div className='row my-5 justify-content-end'>
                                <p className='btn btn-primary' onClick={handleExport}>Export</p>
                            </div>
                        </div>
                    </div>
                </section >
            )
            }
        </div >
    );
};

export default Planner;
