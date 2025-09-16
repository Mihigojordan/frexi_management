import { createContext, useContext, useEffect, useState } from "react";
import employeeAuthService from "../services/employeeAuthService";

// eslint-disable-next-line react-refresh/only-export-components
export const EmployeeAuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    lockEmployee: () => { },
    unlockEmployee: () => { },
    isAuthenticated: false,
    isLocked: false,
    isLoading: true
})

export const EmployeeAuthContextProvider = ({ children }) => {
    // Initialize state with default values
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Helper function to update state
    const updateAuthState = (authData) => {
        const { user: userData, isAuthenticated: authStatus, isLocked: lockStatus } = authData

        setUser(userData)
        setIsAuthenticated(authStatus)
        setIsLocked(lockStatus)
    }

    const login = async (data) => {
        try {
            const { email, password } = data
            const response = await employeeAuthService.login({ email, password })

            if (response.authenticated) {
                // Fetch user profile after successful login
                try {
                    const userProfile = await employeeAuthService.getProfile()
                    
                    updateAuthState({
                        user: userProfile,
                        isAuthenticated: true,
                        isLocked: userProfile.isLocked || false
                    })
                } catch (profileError) {
                    console.log('Error fetching user profile after login:', profileError)
                    
                    // Still update auth status even if profile fetch fails
                    updateAuthState({
                        user: null,
                        isAuthenticated: true,
                        isLocked: false
                    })
                }
            }

            return response

        } catch (error) {
            throw new Error(error.message);
        }
    }

    const logout = async () => {
        try {
            const response = await employeeAuthService.logout()
            
            // Clear auth state
            updateAuthState({
                user: null,
                isAuthenticated: false,
                isLocked: false
            })

            return response

        } catch (error) {
            // Still clear local state even if logout request fails
            updateAuthState({
                user: null,
                isAuthenticated: false,
                isLocked: false
            })
            throw new Error(error.message);
        }
    }

    const lockEmployee = async () => {
        try {
            const response = await employeeAuthService.lockAccount()
            
            updateAuthState({
                user,
                isAuthenticated,
                isLocked: true
            })
            
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const unlockEmployee = async (password) => {
        try {
            const response = await employeeAuthService.unlockAccount({ password })
            
            updateAuthState({
                user,
                isAuthenticated,
                isLocked: false
            })
            
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const checkAuthStatus = async () => {
        setIsLoading(true)
        
        try {
            // Use the validateSession method to check authentication and lock status
            const validation = await employeeAuthService.validateSession()

            if (validation.isValid) {
                updateAuthState({
                    user: validation.employee,
                    isAuthenticated: true,
                    isLocked: validation.isLocked
                })
            } else {
                // Server says we're not authenticated
                updateAuthState({
                    user: null,
                    isAuthenticated: false,
                    isLocked: false
                })
            }

        } catch (error) {
            console.log('Error from checkAuthStatus:', error)
            
            // Clear auth state on any error
            updateAuthState({
                user: null,
                isAuthenticated: false,
                isLocked: false
            })

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const values = {
        login,
        logout,
        lockEmployee,
        unlockEmployee,
        user,
        isLoading,
        isAuthenticated,
        isLocked
    }

    return (
        <EmployeeAuthContext.Provider value={values}>
            {children}
        </EmployeeAuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useEmployeeAuth() {
    const context = useContext(EmployeeAuthContext)
    
    if (!context) {
        throw new Error('useEmployeeAuth must be used within EmployeeAuthContextProvider')
    }

    return context
}