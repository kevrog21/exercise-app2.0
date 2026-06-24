import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFitnessProfileContext } from "../context/FitnessProfileContext.jsx"

import LogOut from './Auth/LogOut'

export default function UserMainDashboard() {

    const { currentProfile, isLoading } = useFitnessProfileContext()

    if (isLoading) {
        return (
            <div>Loading skeleton component here...</div>
        )
    } else {
        return (
            <div className='page'>
                <LogOut />
                <p className='page-title'>You made it! I am the fitness user dashboard beep boop bop</p>
                <p>go to user profile -</p>
                <p>current user: {currentProfile?.userId}</p>
                <p>level: {currentProfile?.currentLevel}</p>
                <p>streak: {currentProfile?.currentStreak}</p>
                <br></br>
                <p>go to today's challenge page -</p>
                <p>start a new workout -</p>
                <Link to="/edit-daily-routine">customize daily routine</Link>
            </div>
        )
    }
}