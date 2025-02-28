import React from 'react';
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom';
import animationData from '../assets/Landing.json';

const Landing = () => {

    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-12">
            {/* Left side - Text and buttons */}
            <div className="w-full md:w-1/2 pr-0 md:pr-10 mb-10 ml-24 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Discover What's Possible
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                    Transform the way you work with our powerful platform. Streamline your workflow, boost productivity, and unlock new opportunities.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="px-8 py-3 cursor-pointer bg-[#3182ce] hover:bg-[#2B6CB0] font-medium rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
                        onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button className="px-8 py-3 cursor-pointer bg-white text-[#3182ce] font-medium rounded-lg shadow-md border border-indigo-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
                        onClick={() => navigate("/register")}>
                        Register
                    </button>
                </div>
            </div>

            {/* Right side - Lottie animation */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-md h-64 md:h-96">
                    <Lottie
                        animationData={animationData}
                        options={defaultOptions}
                        isClickToPauseDisabled={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Landing;