import React, { useEffect } from 'react';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider';

const Slider = () => {
    useEffect(() => {
        // Initialize Tiny Slider
        tns({
            autoplay: true,
            autoplayButtonOutput: false,
            mouseDrag: true,
            gutter: 0,
            container: '.slider-items-active',
            center: false,
            controls: false,
            nav: false, // Disable navigation buttons
            speed: 400,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
            },
        });
    }, []);

    return (
        <section className="slider-three " data-aos="fade-down" data-aos-duration="2000" style={{ backgroundColor: 'transparent' }}>
            <div className="container bg-transparent">
                <div className="slider-items-wrapper">
                    <div className="row slider-items-active">
                        <div className="col-lg-4">
                            <div className="single-items-one">
                                <img
                                    src="https://images.unsplash.com/photo-1707343848552-893e05dba6ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dHJhdmVsfGVufDB8fDB8fHww"
                                    alt="Slider Item 1"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-items-one">
                                <img
                                    src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww"
                                    alt="Slider Item 2"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-items-one">
                                <img
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsfGVufDB8fDB8fHww"
                                    alt="Slider Item 3"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="single-items-one">
                                <img
                                    src="https://images.unsplash.com/photo-1719937206491-ed673f64be1f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MTV8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Slider Item 4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slider;
