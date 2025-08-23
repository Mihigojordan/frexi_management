import { Send, MessageCircle } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import tourService from '../../services/toursServices';
import useUserAuth from '../../context/UserAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatList from '../../components/user-dashboard/chat/conversation/ChatList';
import ChatMessages from '../../components/user-dashboard/chat/message/ChatMessages';
import conversationService from '../../services/conversationService';
import { useSocket, useSocketEvent } from '../../context/SocketContext'; // Adjust path as needed

const MessageManagement = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [error, setError] = useState(null);
    const [chats, setChats] = useState([]);
    const [conversationFetched, setConversationFetched] = useState(false);
    
    const messagesEndRef = useRef(null);
    const { user: currentUser } = useUserAuth();
    const { emit, isConnected } = useSocket();
    const location = useLocation();
    const navigate = useNavigate();

    // Helper function to sort messages by createdAt
    const sortMessagesByCreatedAt = (messages) => {
        if (!messages || !Array.isArray(messages)) return [];
        
        return [...messages].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA - dateB; // Sort ascending (oldest first)
        });
    };

    // Helper function to sort chats by most recent activity
    const sortChatsByActivity = (chats) => {
        if (!chats || !Array.isArray(chats)) return [];
        
        return [...chats].sort((a, b) => {
            const aTime = new Date(a.updatedAt || a.createdAt);
            const bTime = new Date(b.updatedAt || b.createdAt);
            return bTime - aTime; // Sort descending (most recent first)
        });
    };

    // Listen for real-time messages
    useSocketEvent('newMessage', (data) => {
        console.log('Received new message:', data);
        
        if (data.conversation) {
            const updatedConversation = data.conversation;
            
            // Sort messages in the updated conversation
            const sortedMessages = sortMessagesByCreatedAt(updatedConversation.messages || []);
            
            // Update chats state with new message
            setChats(prevChats => {
                const updatedChats = prevChats.map(chat => 
                    chat.id === updatedConversation.id 
                        ? {
                            ...chat,
                            messages: sortedMessages,
                            lastMessage: sortedMessages[sortedMessages.length - 1]?.text || '',
                            updatedAt: new Date()
                        }
                        : chat
                );
                
                // Resort chats by activity
                return sortChatsByActivity(updatedChats);
            });
            
            // Update active chat if it matches
            if (activeChat?.id === updatedConversation.id) {
                setActiveChat(prevChat => ({
                    ...prevChat,
                    messages: sortedMessages
                }));
            }
        }
    }, [activeChat?.id]);

    // Memoized function to build booking message
    const buildBookingMessage = useCallback((tour) => {
        return `
Hello Admin 👋,  
I would like to book a tour.

📍 **Tour Name**: ${tour.name}  
🌍 **Country**: ${tour.country}${tour.city ? `, ${tour.city}` : ''}  
💰 **Estimated Budget**: ${tour.estimatedBudget ? `$${tour.estimatedBudget}` : 'N/A'}  
💳 **Currency Used**: ${tour.currencyUsed || 'N/A'}  
🛂 **Visa Requirements**: ${tour.visaRequirements || 'N/A'}  
🗣️ **Language(s)**: ${tour.language || 'N/A'}  

Could you please share more details about availability, payment, and next steps?  
Thank you 🙏
        `.trim();
    }, []);

    // Fetch or create user conversation - only once
    const fetchUserConversation = useCallback(async (userId) => {
        if (!userId || conversationFetched) return null;
        
        try {
            setLoading(true);
            setError(null);
            
            const data = await conversationService.getOrCreateConversation(userId);
            console.log('Conversation fetched:', data);
            
            // Sort messages in the fetched conversation
            const conversationWithSortedMessages = {
                ...data,
                messages: sortMessagesByCreatedAt(data.messages || [])
            };
            
            // Prevent duplication by checking if conversation already exists
            setChats(prevChats => {
                const existingChatIndex = prevChats.findIndex(chat => chat.id === data.id);
                if (existingChatIndex !== -1) {
                    // Update existing chat instead of adding duplicate
                    const updatedChats = [...prevChats];
                    updatedChats[existingChatIndex] = conversationWithSortedMessages;
                    return sortChatsByActivity(updatedChats);
                }
                return sortChatsByActivity([...prevChats, conversationWithSortedMessages]);
            });
            
            setConversationFetched(true);
            return conversationWithSortedMessages;
            
        } catch (err) {
            setError(err.message || 'Failed to fetch conversation');
            console.error('Error fetching user conversation:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [conversationFetched]);

    // Fetch tour details for booking
    const fetchTourDetails = useCallback(async (tourId) => {
        if (!tourId) return;
        
        try {
            setLoading(true);
            setError(null);
            
            const tourData = await tourService.getTourById(tourId);
            if (tourData) {
                const bookingMessage = buildBookingMessage(tourData);
                setMessage(bookingMessage);
                
                // Clean tourId from URL after setting the message
                const params = new URLSearchParams(location.search);
                params.delete('tourId');
                const newUrl = params.toString() 
                    ? `${location.pathname}?${params.toString()}`
                    : location.pathname;
                navigate(newUrl, { replace: true });
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch tour details');
            console.error('Error fetching tour details:', err);
        } finally {
            setLoading(false);
        }
    }, [buildBookingMessage, location.search, location.pathname, navigate]);

    // Handle chat selection and update URL
    const handleChatSelect = useCallback((chat) => {
        // Sort messages before setting active chat
        const chatWithSortedMessages = {
            ...chat,
            messages: sortMessagesByCreatedAt(chat.messages || [])
        };
        
        setActiveChat(chatWithSortedMessages);
        const params = new URLSearchParams(location.search);
        params.set('chatId', chat.id);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, [location.search, navigate]);

    // Initialize conversation when user is available
    useEffect(() => {
        if (currentUser?.id && !conversationFetched) {
            fetchUserConversation(currentUser.id);
        }
    }, [currentUser?.id, fetchUserConversation, conversationFetched]);

    // Handle URL parameters and set active chat
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tourId = params.get('tourId');
        const chatId = params.get('chatId');

        // Handle tour booking message
        if (tourId) {
            fetchTourDetails(tourId);
        }

        // Set active chat from URL parameter
        if (chatId && chats.length > 0) {
            const selectedChat = chats.find((chat) => chat.id === chatId);
            if (selectedChat && selectedChat.id !== activeChat?.id) {
                // Sort messages before setting active chat
                const chatWithSortedMessages = {
                    ...selectedChat,
                    messages: sortMessagesByCreatedAt(selectedChat.messages || [])
                };
                setActiveChat(chatWithSortedMessages);
            }
        } else if (chats.length > 0 && !activeChat) {
            // Set first chat as active if no specific chat is selected
            const firstChat = chats[0];
            const chatWithSortedMessages = {
                ...firstChat,
                messages: sortMessagesByCreatedAt(firstChat.messages || [])
            };
            setActiveChat(chatWithSortedMessages);
            const params = new URLSearchParams(location.search);
            params.set('chatId', firstChat.id);
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }
    }, [location.search, chats, activeChat, fetchTourDetails, navigate]);

    // Send message function with real-time socket integration
    const sendMessage = useCallback(async () => {
        if (!message.trim() || !activeChat || !currentUser?.id || !isConnected) {
            if (!isConnected) {
                setError('Not connected to server. Please check your connection.');
            }
            return;
        }

        const messageText = message.trim();
        const tempId = `temp-${Date.now()}`;

        // Create optimistic message for immediate UI update
        const optimisticMessage = {
            id: tempId,
            senderId: currentUser.id,
            senderUserId: currentUser.id,
            senderType: 'USER',
            text: messageText,
            createdAt: new Date(),
            conversationId: activeChat.id,
            // Add sender user data for UI
            senderUser: {
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                profilePicture: currentUser.profilePicture
            }
        };

        try {
            setSendingMessage(true);
            setError(null);

            // Optimistically update UI with sorted messages
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === activeChat.id
                        ? {
                            ...chat,
                            messages: sortMessagesByCreatedAt([...(chat.messages || []), optimisticMessage]),
                            lastMessage: messageText,
                            updatedAt: new Date(),
                        }
                        : chat
                )
            );

            setActiveChat((prevChat) => ({
                ...prevChat,
                messages: sortMessagesByCreatedAt([...(prevChat.messages || []), optimisticMessage]),
            }));

            // Clear message input immediately
            setMessage('');

            // Send message via socket
            const messageData = {
                conversationId: activeChat.id,
                senderType: 'USER',
                senderUserId: currentUser.id,
                text: messageText
            };

            emit('sendMessage', messageData, (response) => {
                // Handle socket response if needed
                if (response?.error) {
                    console.error('Message sending failed:', response.error);
                    setError('Failed to send message. Please try again.');
                    
                    // Remove optimistic message on error
                    setChats((prevChats) =>
                        prevChats.map((chat) =>
                            chat.id === activeChat.id
                                ? {
                                    ...chat,
                                    messages: sortMessagesByCreatedAt(
                                        chat.messages.filter(msg => msg.id !== tempId)
                                    ),
                                }
                                : chat
                        )
                    );
                    
                    setActiveChat((prevChat) => ({
                        ...prevChat,
                        messages: sortMessagesByCreatedAt(
                            prevChat.messages.filter(msg => msg.id !== tempId)
                        ),
                    }));
                    
                    // Restore message in input
                    setMessage(messageText);
                } else {
                    console.log('Message sent successfully');
                }
            });

        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
            
            // Remove optimistic message on error
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === activeChat.id
                        ? {
                            ...chat,
                            messages: sortMessagesByCreatedAt(
                                chat.messages.filter(msg => msg.id !== tempId)
                            ),
                        }
                        : chat
                )
            );
            
            setActiveChat((prevChat) => ({
                ...prevChat,
                messages: sortMessagesByCreatedAt(
                    prevChat.messages.filter(msg => msg.id !== tempId)
                ),
            }));
            
            // Restore message in input
            setMessage(messageText);
        } finally {
            setSendingMessage(false);
        }
    }, [message, activeChat, currentUser?.id, isConnected, emit]);
    
    console.log('current chat', activeChat);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeChat?.messages]);

    // Handle Enter key press for sending messages
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }, [sendMessage]);

    // Loading state
    if (loading && chats.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading conversation...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && chats.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-red-600">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Error: {error}</p>
                    <button 
                        onClick={() => {
                            setError(null);
                            setConversationFetched(false);
                            if (currentUser?.id) {
                                fetchUserConversation(currentUser.id);
                            }
                        }}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full">
            {/* Connection Status Indicator */}
            {!isConnected && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white text-center py-1 text-sm z-10">
                    Connecting to server...
                </div>
            )}
            
            {/* Error Message */}
            {error && chats.length > 0 && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-10">
                    <span>{error}</span>
                    <button 
                        onClick={() => setError(null)}
                        className="ml-4 underline hover:no-underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Chat List */}
            <ChatList 
                handleChatSelect={handleChatSelect} 
                chats={chats}
                activeChat={activeChat}
                loading={loading}
            />

            {/* Chat Messages */}
            <ChatMessages
                activeChat={activeChat}
                message={message}
                messagesEndRef={messagesEndRef}
                sendMessage={sendMessage}
                setMessage={setMessage}
                user={currentUser}
                onKeyPress={handleKeyPress}
                loading={loading || sendingMessage}
                isConnected={isConnected}
                disabled={!isConnected || sendingMessage}
            />
        </div>
    );
};

export default MessageManagement;