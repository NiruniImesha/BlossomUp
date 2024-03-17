import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

import Sidebar from '../Image_Identification/components/sidebar/Sidebar.jsx';
import "../../Pages/Image_Identification/home/home.scss";
import Table from "../../Pages/Image_Identification/components/table/DiseasePredictionModelManage.jsx";

import './DiseasePredictionModelManage.css'; // Import custom CSS file

const DiseasePredictionModelManage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const countdownRef = useRef(null);

    useEffect(() => {
        const storedTimestamp = localStorage.getItem('retrainTimestamp');
        if (storedTimestamp) {
            const storedTime = parseInt(storedTimestamp, 10);
            const currentTime = Date.now();
            const timeDifference = Math.floor((currentTime - storedTime) / 1000);
            if (timeDifference < 600) {
                setCountdown(600 - timeDifference);
                startCountdown(600 - timeDifference);
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            clearInterval(countdownRef.current);
        };
    }, []);

    const startCountdown = (initialCountdown) => {
        countdownRef.current = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
    };

    // Function to format time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Function to handle re-training process
    const handleModelReTrain = () => {
        if (countdown > 0) {
            Swal.fire({
                icon: 'info',
                title: 'Retraining Already Started',
                text: `The retraining process has already started. Please wait until: ${formatTime(countdown)}.`,
            });
        } else {
            setIsLoading(true);
            setCountdown(600); // Set countdown to 10 minutes (600 seconds)

            // Save the current timestamp in localStorage
            localStorage.setItem('retrainTimestamp', Date.now().toString());

            // Call the API using axios
            axios.post('http://localhost:8080/automl/start-retraining')
                .then(response => {
                    // Handle successful response
                    // No need to set isLoading to false here, it will be handled by the countdown
                })
                .catch(error => {
                    // Handle error
                    setIsLoading(false); // Set loading to false after API call
                });

            Swal.fire({
                icon: 'success',
                title: 'Retraining Started',
                text: 'The retraining process has been started successfully in the background. You will receive an email once the retraining is complete.',
            });

            // Start the countdown timer
            startCountdown(600);
        }
    };

    return (
        <div>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Table />
                    <div className="text-center">

                        <button
                            className="custom-button large-text" // Apply custom class
                            onClick={handleModelReTrain}
                            disabled={isLoading} // Disable button while re-training is in progress
                        >
                            {isLoading ? 'Retraining...' : 'Model Re-Train'}
                        </button>
                        
                        {countdown > 0 && (
                             <div className="text-center">
                                <div className="progress-line">
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(countdown / 600) * 100}%` }} aria-valuenow={countdown} aria-valuemin="0" aria-valuemax="600"></div>
                                </div>
                                </div>
                                
                                <p class="h3">Retraining already started. Please wait until: {formatTime(countdown)}.</p>
                               
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseasePredictionModelManage;
