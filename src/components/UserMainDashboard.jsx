import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCurrentUserSettingsService } from "../services/userProfileSettings.service"

import LogOut from './Auth/LogOut'

export default function UserMainDashboard( setUser ) {

    const [currentProfile, setProfile] = useState(null)

    const getProfileData = async () => {
        console.log("running get profile data")
        try {
            const profile = await getCurrentUserSettingsService()
            setProfile(profile)
        } catch (err) {
            console.error("Failed to load profile:", err)
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    return (
        <div className='page'>
            <LogOut />
            <p className='page-title'>You made it! I am the fitness user dashboard beep boop bop</p>
            <p>go to user profile -</p>
            <p>current user: {currentProfile.userId}</p>
            <p>level: {currentProfile.currentLevel}</p>
            <p>streak: {currentProfile.currentStreak}</p>
            <br></br>
            <p>go to today's challenge page -</p>
            <p>start a new workout -</p>
        </div>
    )
}