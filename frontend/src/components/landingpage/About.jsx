import React from 'react'
import './css/About.css'
import img from './assets/about.jpg'
const About = () => {
    return (
        <div className='container-fluid about-container text-white p-2'
            id='about'
        >
            <div className="container about" >
                <h1 style={{ letterSpacing: '6px'}} className='prithvi_title '>About Us</h1>
                <div className="row">
                    <div className="col-lg-6 col-md-5 col-sm-10 col-xs-10">
                        <img style={{ borderRadius: '10px' }} src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="col-lg-6 col-md-5 col-sm-10 col-xs-10">
                        <p className="fs-1">Why Choose Our Travel Itinerary Planner?</p>
                        <p className='fs-5'>At Dynamic Travel Itinerary Planner, we believe that every journey should be as unique as you are. Our app provides a seamless planning experience by integrating real-time data and intelligent suggestions. Here’s what sets us apart:"

                            Personalized Recommendations: Get tailored travel suggestions based on your interests and budget.
                            Real-Time Updates: Stay informed with live weather updates and local events to enhance your travel experience.
                            Automatic Adjustments: Our smart algorithm adjusts your itinerary on the go, ensuring you make the most of your trip.
                            Expense Tracking: Keep track of your travel expenses effortlessly with built-in tools.
                            Social Sharing: Collaborate with friends and family to create the ultimate travel experience together.</p>
                    </div>
                </div>
                <section class="client-logo-area client-logo-one">

                    <div class="section-title-two">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="content" data-aos="zoom-in">
                                        <span className='fs-2'> Our Technology </span>
                                        <p className='fs-4'>
                                            Leveraging advanced technologies to enhance backend efficiency and maximize platform capabilities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-3 col-6" data-aos="zoom-in">
                                <div class="single-client text-center">
                                    <img height="100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1nDh4RzoMtf14WYP6gq4v5Mcnsilz9ciRuw&s" alt="Logo" />
                                </div>

                            </div>
                            <div class="col-md-3 col-6" data-aos="zoom-in">
                                <div class="single-client text-center">
                                    <img height="70px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5DJtYjOTKzRoq-8s3G04e9T38cRptPkjPg&s" alt="Logo" />
                                </div>

                            </div>
                        </div>

                    </div>

                </section>

            </div>


        </div>

    )
}

export default About
