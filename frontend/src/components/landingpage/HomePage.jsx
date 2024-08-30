import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Features from './Features'
import Contact from './Contact'
import gif from './assets/loader.gif'
const HomePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);
    return (
        <div>
            {
                loading ? <>
                    <div style={{ height: "100vh" }} className='container d-flex justify-content-center align-items-center'>
                        <img src={gif} height='150px' width='150px' alt="" />
                    </div>
                </> :
                    <>
                        <div className="fs-1 fw-bold">
                            <Navbar />
                            <Hero />
                            <Features />
                            <About />
                            <Contact />
                        </div>
                    </>
            }

        </div>
    )
}

export default HomePage
