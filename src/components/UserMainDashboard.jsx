import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFitnessProfileContext } from "../context/FitnessProfileContext.jsx"

import "../styles/pageStyles/dashboardStyles.css"


export default function UserMainDashboard() {

    const { currentProfile, isLoading } = useFitnessProfileContext()

    function getDisplayedStreak(streakFromDatabase, lastCompletedAt, timezone) {
        if (!lastCompletedAt || !timezone) {
            return 0
        }

        const now = new Date()

        const today = new Intl.DateTimeFormat("en-CA", {
            timeZone: timezone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(now)

        const lastCompletedDate = new Intl.DateTimeFormat("en-CA", {
            timeZone: timezone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date(lastCompletedAt))

        // Completed today
        if (lastCompletedDate === today) {
            return streakFromDatabase
        }

        // Calculate yesterday in the user's timezone
        const yesterdayDate = new Date(now)

        yesterdayDate.setDate(yesterdayDate.getDate() - 1)

        const yesterday = new Intl.DateTimeFormat("en-CA", {
            timeZone: timezone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(yesterdayDate)

        // Completed yesterday
        if (lastCompletedDate === yesterday) {
            return streakFromDatabase
        }

        // Missed at least one full local calendar day
        return 0
    }

    const displayedStreak = getDisplayedStreak(currentProfile?.currentStreak, currentProfile?.lastCompletedAt, currentProfile?.timezone)

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
                <p>streak: {displayedStreak}</p>
                <br></br>
                <Link to="/todays-challenge">go to today's challenge page</Link>
                <p>start a new workout -</p>
                <Link to="/edit-daily-routine">customize daily routine</Link>
            </div>
        )
    }
}