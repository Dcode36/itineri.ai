import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import './css/Navbar.css'
import { useUser } from '@clerk/clerk-react'
const Navbar = () => {
    const { user, isSignedIn } = useUser();
    // Toggle active class on the navbar-toggler when clicked
    const toggleNavbar = () => {
        const navbarToggler = document.querySelector(".navbar-one .navbar-toggler");
        navbarToggler.classList.toggle("active");
    };

    return (
        <>
            {/*====== NAVBAR ONE PART START ======*/}
            <section className="navbar-area navbar-one" style={{ borderBottom: '1px solid #0001' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg" >
                                <a className="navbar-brand" href="/">
                                    <h3 className='text-white fs-italic'><i class="bi bi-backpack4"></i> Itineri.<span>AI</span></h3>
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarOne"
                                    aria-controls="navbarOne"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                    onClick={toggleNavbar}
                                >
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                <div
                                    className="collapse navbar-collapse sub-menu-bar"
                                    id="navbarOne"
                                >
                                    <ul className="navbar-nav m-auto pb-1" style={{ borderBottom: '1px solid #0001' }}>
                                        <li className="nav-item">
                                            <a href="/about" className='fs-5'>About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/recommendations" className='fs-5'>TripSage</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/travel-expense" className='fs-5'>TA</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#contact" className='fs-5'>Contact</a>
                                        </li>
                                        <div className="d-lg-none d-sm-block m-auto" >
                                            <ul>
                                                <li>

                                                    <SignedOut>
                                                        <SignInButton className="sign-in-btn btn " />

                                                    </SignedOut>
                                                    <SignedIn>
                                                        <div className='d-flex align-items-center gap-3'>
                                                            {
                                                                isSignedIn ? (
                                                                    <>
                                                                        < span className='fs-5 text-dark'>Hello! <span className='fs-6'>{user.firstName}</span></span>

                                                                        < UserButton />
                                                                    </>
                                                                ) : (<SignInButton className="sign-in-btn btn " />)
                                                            }


                                                        </div>

                                                    </SignedIn>
                                                </li>
                                            </ul>
                                        </div>
                                    </ul>
                                </div>
                                <div className="navbar-btn d-none d-sm-inline-block">
                                    <ul>
                                        <li>

                                            <SignedOut>
                                                <SignInButton className="sign-in-btn btn " />

                                            </SignedOut>
                                            <SignedIn>
                                                <div className='d-flex align-items-center gap-3'>
                                                    {
                                                        isSignedIn ? (
                                                            <>
                                                                < span className='fs-6 text-dark'>Hello! <span className='fs-6'>{user.firstName}</span></span>

                                                                < UserButton />
                                                            </>
                                                        ) : (<SignInButton className="sign-in-btn btn " />)
                                                    }


                                                </div>

                                            </SignedIn>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            {/* navbar */}
                        </div>
                    </div>
                    {/* row */}
                </div >
                {/* container */}
            </section >
            {/*====== NAVBAR ONE PART ENDS ======*/}
        </>
    );
};

export default Navbar;
