import React from 'react'

const UserDashboard = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 border border-dark" style={{ height: "100vh" }}>
                        <a className="navbar-brand text-center d-flex justify-content-center" href="/">
                            <h3 className='text-white text-center m-4 '><i class="bi bi-backpack4"></i> Itineri.<span>AI</span></h3>
                        </a>


                        <ul className='m-4 '>
                            <li className='fs-5 my-2 p-2 border border-rounded fw-bold'><a href="/trip-planner" className='text-dark'>Trip Planner</a></li>
                            <li className='fs-5 my-2 p-2'><a href="/travel-expense" className='text-dark'>Travel Expense</a></li>
                            <li className='fs-5 my-2 p-2'><a href="/history" className='text-dark'>History</a></li>
                            <li className='fs-5 my-2 p-2'><a href="/collaborator" className='text-dark'>Collaborator</a></li>
                            <li className='fs-5 my-2 p-2'><a href="/recommendations" className='text-dark'>Recommendations</a></li>
                        </ul>
                    </div>
                    <div className="col-8">
                        right
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserDashboard
