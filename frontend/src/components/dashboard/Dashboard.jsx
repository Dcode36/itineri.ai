import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Tabs, Tab } from '@mui/material';
import Navbar from '../landingpage/Navbar';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
const steps = ['Destination', 'No of Travelers', 'Days', 'Interest', 'Review & Proceed'];
const TAB_ENUM = [
    'Historical',
    'Romantic',
    'Family',
    'Must Visit',
    'Adventure',
    'Religious',
    'Night Life',
    'Outdoor'
];
const DAYS_OPTIONS = ['3', '5', '7'];

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        personalDetails: {},
        travelPreferences: {},
        budget: {},
        itineraryDetails: {},
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setFormData({
            personalDetails: {},
            travelPreferences: {},
            budget: {},
            itineraryDetails: {},
        });
    };

    const handleSubmit = () => {
        // Submit logic here
        navigate('/plan', { state: { formData } })


    };

    const handleChange = (step, data) => {
        setFormData((prevData) => ({
            ...prevData,
            [step]: data,
        }));
    };

    const renderForm = () => {
        switch (activeStep) {
            case 0:
                return <PersonalDetailsForm data={formData.personalDetails} onChange={(data) => handleChange('personalDetails', data)} />;
            case 1:
                return <TravelPreferencesForm data={formData.travelPreferences} onChange={(data) => handleChange('travelPreferences', data)} />;
            case 2:
                return <BudgetForm data={formData.budget} onChange={(data) => handleChange('budget', data)} />;
            case 3:
                return <ItineraryDetailsForm data={formData.itineraryDetails} onChange={(data) => handleChange('itineraryDetails', data)} />;
            case 4:
                return <ReviewForm data={formData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>
                                    <Typography sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, color: 'black' }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 2 }}>
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {renderForm()}
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                {activeStep === steps.length - 1 ? (
                                    <Button onClick={handleSubmit} className='btn btn-primary' color="primary" // This sets the button color to primary
                                        variant="contained">Submit</Button>
                                ) : (
                                    <Button onClick={handleNext} className='btn btn-primary' color="primary" // This sets the button color to primary
                                        variant="contained">Next</Button>
                                )}
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    );
};

const PersonalDetailsForm = ({ data, onChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className='container'>
            <div className='my-5'>
                <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>What’s your next travel spot?</Typography>
                <Box sx={{ minWidth: 120 }} className="d-flex justify-content-center">
                    <FormControl style={{ width: "50%" }}>
                        <InputLabel id="city-select-label">City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            id="city-select"
                            value={data.city || ''} // Ensure the value points to the correct property
                            label="City"
                            onChange={handleInputChange}
                            name='city'
                            style={{
                                borderRadius: '30px',
                                border: '1px solid gray',
                                fontSize: '1rem'
                            }}
                        >
                            <MenuItem value='Kolhapur'>Kolhapur</MenuItem>
                            <MenuItem value='Navi Mumbai'>Navi Mumbai</MenuItem>
                            <MenuItem value='Pune'>Pune</MenuItem>
                            <MenuItem value='Panjim'>Panjim</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </div>
    );
};

const TravelPreferencesForm = ({ data, onChange }) => {
    const TAB_TRAVELERS = ['Solo', 'Couple', 'Group'];

    const handleTabChange = (event, newValue) => {
        onChange({ ...data, numTravelers: newValue });
    };

    return (
        <div className='container'>
            <div className='my-5 d-flex flex-column align-items-center'>
                <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 'bold' }}>
                    What’s the total number of travelers?
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <Tabs
                        value={data.numTravelers || false}
                        aria-label="traveler type tabs"
                        centered
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <div className='d-flex gap-3 flex-wrap justify-content-center my-3'>
                            {TAB_TRAVELERS.map((tabLabel, index) => (
                                <div className='d-flex' key={index}>
                                    <Tab
                                        label={tabLabel}
                                        value={tabLabel}
                                        onClick={(e) => handleTabChange(e, tabLabel)}
                                        sx={{
                                            fontWeight: 'bold',
                                            bgcolor: data.numTravelers === tabLabel ? 'green' : 'transparent',
                                            color: data.numTravelers === tabLabel ? 'white' : 'black',
                                            borderRadius: '30px',
                                            '&:hover': {
                                                bgcolor: 'green',
                                                color: 'white',
                                            },
                                            border: '1px solid green'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tabs>
                </Box>
            </div>
        </div>
    );
};


const BudgetForm = ({ data, onChange }) => {
    const handleTabChange = (event, newValue) => {
        onChange({ ...data, travelDays: newValue });
    };

    return (
        <div className='container'>
            <div className='my-5 d-flex flex-column align-items-center'>
                <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 'bold' }}>
                    How many days do you plan to travel?
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <Tabs
                        value={data.travelDays || false}
                        aria-label="days tabs"
                        centered
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <div className='d-flex gap-3 flex-wrap justify-content-center my-3'>
                            {DAYS_OPTIONS.map((dayLabel, index) => (
                                <div className='d-flex' key={index}>
                                    <Tab
                                        label={dayLabel + " Days"}
                                        value={dayLabel}
                                        onClick={(e) => handleTabChange(e, dayLabel)}
                                        sx={{
                                            fontWeight: 'bold',
                                            bgcolor: data.travelDays === dayLabel ? 'green' : 'transparent',
                                            color: data.travelDays === dayLabel ? 'white' : 'black',
                                            borderRadius: '30px',
                                            '&:hover': {
                                                bgcolor: 'green',
                                                color: 'white',
                                            },
                                            border: '1px solid green'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tabs>
                </Box>
            </div>
        </div>
    );
};

const ItineraryDetailsForm = ({ data, onChange }) => {
    const [selectedTabs, setSelectedTabs] = useState([]);

    const handleTabChange = (event, newValue) => {
        setSelectedTabs(prevSelectedTabs => {
            const newSelectedTabs = [...prevSelectedTabs];
            if (newSelectedTabs.includes(newValue)) {
                const index = newSelectedTabs.indexOf(newValue);
                newSelectedTabs.splice(index, 1);
            } else {
                if (newSelectedTabs.length < 8) {
                    newSelectedTabs.push(newValue);
                }
            }
            onChange({ ...data, selectedTabs: newSelectedTabs });
            return newSelectedTabs;
        });
    };

    return (
        <div className='container'>
            <div className='my-5 d-flex flex-column align-items-center'>
                <Typography variant="h6" className='text-center' sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 'bold' }}>Interests</Typography>
                <p className='text-center my-3'>Select your interests</p>
                <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                    <Tabs
                        value={false}
                        aria-label="interests tabs"
                        centered
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <div className='d-flex gap-3 flex-wrap justify-content-center my-3'>
                            {TAB_ENUM.map((tabLabel, index) => (
                                <div className='d-flex' key={index}>
                                    <Tab
                                        label={tabLabel}
                                        value={tabLabel}
                                        onClick={(e) => handleTabChange(e, tabLabel)}
                                        sx={{
                                            fontWeight: 'bold',
                                            bgcolor: selectedTabs.includes(tabLabel) ? 'green' : 'transparent',
                                            color: selectedTabs.includes(tabLabel) ? 'white' : 'black',
                                            borderRadius: '30px',
                                            '&:hover': {
                                                bgcolor: 'green',
                                                color: 'white',
                                            },
                                            border: '1px solid green'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tabs>
                </Box>
            </div>
        </div>
    );
};

const ReviewForm = ({ data }) => {
    const { personalDetails, travelPreferences, budget, itineraryDetails } = data;

    return (
        <Box className='container' sx={{ p: 4 }}>
            <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: 3 }}>
                Review Your Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Destination</Typography>
                    <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px' }}>
                        <Typography variant="body1"><strong>City:</strong> {personalDetails.city || 'N/A'}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Travel Preferences</Typography>
                    <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px' }}>
                        <Typography variant="body1"><strong>Number of Travelers:</strong> {travelPreferences.numTravelers || 'N/A'}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Travel Duration</Typography>
                    <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px' }}>
                        <Typography variant="body1"><strong>Travel Days:</strong> {budget.travelDays || 'N/A'}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Itinerary Details</Typography>
                    <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px' }}>
                        <Typography variant="body1"><strong>Selected Interests:</strong> {itineraryDetails.selectedTabs?.join(', ') || 'N/A'}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};


export default Dashboard;
