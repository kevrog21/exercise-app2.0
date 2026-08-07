import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUserSettingsService, updateTimezoneService } from "../services/userProfileSettings.service"
import { useAuth } from "./AuthContext.jsx"

const FitnessProfileContext = createContext()

export function FitnessProfileProvider({ children }) {

        const { user } = useAuth()
        const [currentProfile, setProfile] = useState(null)
        const [isLoading, setIsLoading] = useState(true)
    
        const getProfileData = async () => {
            try {
                const profile = await getCurrentUserSettingsService()

                const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

                if (profile.timezone !== currentTimezone) {
                    const updatedProfile = await updateTimezoneService(currentTimezone)

                    setProfile(updatedProfile)
                } else {
                    setProfile(profile)
                }
            } catch (err) {
                console.error("Failed to load profile:", err)
            } finally {
                setIsLoading(false)
            }
        }
    
        useEffect(() => {
            if (!user) {
                setProfile(null)
                setIsLoading(false)
                return
            }

            getProfileData()
        }, [user])

        return (
            <FitnessProfileContext.Provider value={{ currentProfile, setProfile, getProfileData, isLoading }}>
                {children}
            </FitnessProfileContext.Provider>
        )
}

export function useFitnessProfileContext() {
    return useContext(FitnessProfileContext)
}