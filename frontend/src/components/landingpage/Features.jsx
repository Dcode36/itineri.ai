import React from 'react'
import './css/Features.css'
const Features = () => {
    return (

        <section class="features-area features-one" id='feature'>
            <div class="container">
                <div class="row justify-content-center" data-aos="flip-left">
                    <div class="col-lg-6">
                        <div class="section-title text-center" data-aos="fade-up">
                            <h3 class="title">Key Features of Itineri.AI
                            </h3>
                            <p class="text">
                                What we offer
                            </p>
                        </div>

                    </div>
                </div>

                <div class="row justify-content-center" >
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="features-style-one text-center bg-dark" data-aos="flip-left">
                            <div class="features-icon">
                                <i class="bi bi-backpack2-fill"></i>
                            </div>
                            <div class="features-content">
                                <h4 class="features-title text-white">Trip Planner</h4>
                                <div class="features-btn rounded-buttons">
                                    <a
                                        class="btn primary-btn-outline rounded-full"
                                        href=""
                                    >
                                        KNOW MORE
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="features-style-one text-center  bg-dark" data-aos="flip-left">
                            <div class="features-icon">

                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div class="features-content">
                                <h4 class="features-title text-white" >Collabrative Trip Planner</h4>

                                <div class="features-btn rounded-buttons">
                                    <a
                                        class="btn primary-btn-outline rounded-full"
                                        href=""
                                    >
                                        KNOW MORE
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="features-style-one text-center  bg-dark" data-aos="flip-left">
                            <div class="features-icon">
                                <i class="bi bi-geo-alt-fill"></i>
                            </div>
                            <div class="features-content">
                                <h4 class="features-title text-white">Location</h4>

                                <div class="features-btn rounded-buttons">
                                    <a
                                        class="btn primary-btn-outline rounded-full"
                                        href=""
                                    >
                                        KNOW MORE
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>

    )
}

export default Features
