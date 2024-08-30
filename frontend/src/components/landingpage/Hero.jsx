import React from 'react';
import './css/Hero.css'; // Import your CSS file if needed
import Slider from './Slider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'
import swal from 'sweetalert';

const Hero = () => {
    const navigate = useNavigate();

    const { isSignedIn } = useUser();
    const handleClick = () => {
        if (isSignedIn) {
            navigate('/preferences')
        } else {
            swal("Sign In First!", "Please Sign In before you Use Itineri.AI!", "error");
        }

    }
    return (
        <>
            <div className='grid'>
                <div className="container hero d-flex justify-content-center align-items-center overflow-hidden flex-direction-column" style={{ flexDirection: 'column', borderBottom: '1px solid #0001' }} >
                    <div className="heading text-center py-5 mt-5">
                        <h1 className=' text-dark' style={{ fontSize: "58px", fontWeight: "bold" }} data-aos="fade-up"
                            data-aos-duration="2000">Plan Your <span style={{ color: 'orange' }}>Perfect Trip</span> with <span className='text-primary'>Ease</span> </h1>
                        <p style={{ fontSize: "25px" }} className='my-2 text-dark' data-aos="fade-up"
                            data-aos-duration="2000">Dynamic, Personalized Travel Itineraries Tailored Just for You</p>

                        <button className='btn btn-dark get-started mx-2' style={{ borderRadius: '30px' }} data-aos="fade-up"
                            data-aos-duration="2000" onClick={handleClick}>Get Started <i class="bi bi-arrow-right"></i></button>

                        <button className='btn btn-white readmore' style={{ borderRadius: '30px' }} data-aos="fade-up"
                            data-aos-duration="2000"> <a href="#about" className='text-dark'>Read More</a> </button>
                    </div>
                    <Slider />


                </div>

            </div>
        </>
    );
};

export default Hero;
