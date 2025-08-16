import { createContext, useContext, useEffect, useState } from "react";
import userAuthService from "../services/userAuthService";

// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    register: () => { },
    updateProfile: () => { },
    changePassword: () => { },
    deleteAccount: () => { },
    isAuthenticated: false,
    isLoading: true
})

export const UserAuthContextProvider = ({ children }) => {
    // Initialize state with default values
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Helper function to update state
    const updateAuthState = (authData) => {
        const { user: userData, isAuthenticated: authStatus } = authData

        setUser(userData)
        setIsAuthenticated(authStatus)
    }

    const register = async (userData) => {
        try {
            // Validate registration data first
            const validation = userAuthService.validateUserRegistrationData(userData)
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '))
            }

            const response = await userAuthService.registerUser(userData)

            // After successful registration, automatically log the user in
            if (response.success) {
                try {
                    const loginResponse = await userAuthService.userLogin({
                        email: userData.email,
                        password: userData.password
                    })

                    if (loginResponse.token) {
                        // Fetch user profile after successful login
                        const userProfile = await userAuthService.getUserProfile()
                        
                        updateAuthState({
                            user: userProfile,
                            isAuthenticated: true
                        })
                    }
                } catch (loginError) {
                    console.log('Auto-login after registration failed:', loginError)
                    // Registration was successful, but auto-login failed
                    // User will need to log in manually
                }
            }

            return response

        } catch (error) {
            throw new Error(error.message);
        }
    }

    const login = async (loginData) => {
        try {
            // Validate login data first
            const validation = userAuthService.validateUserLoginData(loginData)
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '))
            }

            const response = await userAuthService.userLogin(loginData)

            if (response.token) {
                // Fetch user profile after successful login
                try {
                    const userProfile = await userAuthService.getUserProfile()
                    
                    updateAuthState({
                        user: userProfile,
                        isAuthenticated: true
                    })
                } catch (profileError) {
                    console.log('Error fetching user profile after login:', profileError)
                    
                    // Still update auth status even if profile fetch fails
                    updateAuthState({
                        user: null,
                        isAuthenticated: true
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
            const response = await userAuthService.logout()
            
            // Clear auth state
            updateAuthState({
                user: null,
                isAuthenticated: false
            })

            return response

        } catch (error) {
            // Still clear local state even if logout request fails
            updateAuthState({
                user: null,
                isAuthenticated: false
            })
            throw new Error(error.message);
        }
    }

    const updateProfile = async (profileData) => {
        try {
            // Validate profile data first
            const validation = userAuthService.validateProfileUpdateData(profileData)
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '))
            }

            const response = await userAuthService.updateUserProfile(profileData)
            
            // Update user state with new profile data
            if (response.user) {
                setUser(response.user)
            }
            
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const changePassword = async (passwordData) => {
        try {
            // Validate password data first
            const validation = userAuthService.validatePasswordChangeData(passwordData)
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '))
            }

            const response = await userAuthService.changeUserPassword(passwordData)
            
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const deleteAccount = async () => {
        try {
            const response = await userAuthService.deleteUserAccount()
            
            // Clear auth state after account deletion
            updateAuthState({
                user: null,
                isAuthenticated: false
            })
            
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const checkAuthStatus = async () => {
        setIsLoading(true)
        
        try {
            // Try to fetch profile data to verify authentication
            const response = await userAuthService.getUserProfile()

            if (response) {
                updateAuthState({
                    user: response,
                    isAuthenticated: true
                })
            } else {
                // Server says we're not authenticated
                updateAuthState({
                    user: null,
                    isAuthenticated: false
                })
            }

        } catch (error) {
            console.log('Error from checkAuthStatus:', error)
            
            // Clear auth state on any error
            updateAuthState({
                user: null,
                isAuthenticated: false
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
        register,
        updateProfile,
        changePassword,
        deleteAccount,
        user,
        isLoading,
        isAuthenticated
    }

    return (
        <UserAuthContext.Provider value={values}>
            {children}
        </UserAuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useUserAuth() {
    const context = useContext(UserAuthContext)
    
    if (!context) {
        throw new Error('useUserAuth must be used within UserAuthContextProvider')
    }
    return context
}