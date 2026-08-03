import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFitnessProfileContext } from "../context/FitnessProfileContext.jsx"

import "../styles/pageStyles/dashboardStyles.css"


export default function UserMainDashboard() {

    const { currentProfile, isLoading } = useFitnessProfileContext()

    if (isLoading) {
        return (
            <div>Loading skeleton component here...</div>
        )
    } else {
        return (
            <div >
                <p className='page-title'>dashboard</p>
                <p>current user: {currentProfile?.userId}</p>
                <p>level: {currentProfile?.currentLevel}</p>
                <p>streak: {currentProfile?.currentStreak}</p>
                <br></br>
                <Link to="/todays-challenge">go to today's challenge page</Link>
                <p>start a new workout -</p>
                <Link to="/edit-daily-routine">customize daily routine</Link>
            </div>
        )
    }
}