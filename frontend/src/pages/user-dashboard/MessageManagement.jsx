import { Send, MessageCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import tourService from '../../services/toursServices';
import useUserAuth from '../../context/UserAuthContext'; // Adjust path if needed
import { useLocation, useNavigate } from 'react-router-dom';

const MessageManagement = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [chats, setChats] = useState([]);

    const { user: currentUser } = useUserAuth(); // Assuming context provides user
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize with default admin chat
    useEffect(() => {
        // Always create a default admin chat for customers to start conversations
        const defaultAdminChat = {
            id: 'admin-default',
            participantName: 'Frexi Admin',
            participantAvatar: '👨‍💼',
            lastMessage: 'Start a conversation with our team',
            timestamp: new Date(),
            isAdminChat: true,
            messages: [],
            unreadCount: 0,
        };

        setChats([defaultAdminChat]);

        // Handle URL parameters for new bookings and active chat
        const params = new URLSearchParams(location.search);
        const tourId = params.get('tourId');
        const chatId = params.get('chatId');

        if (tourId) {
            fetchTourDetails(tourId);
        }

        // Set active chat from query if present
        if (chatId) {
            const selectedChat = [defaultAdminChat].find((chat) => chat.id === chatId);
            if (selectedChat) {
                setActiveChat(selectedChat);
            }
        }
    }, [location.search]);

    const buildBookingMessage = (tour) => {
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
    `;
    };

    const fetchTourDetails = async (tourId) => {
        try {
            setLoading(true);
            const tourData = await tourService.getTourById(tourId);
            if (tourData) {
                const bookingMessage = buildBookingMessage(tourData);
                setMessage(bookingMessage.trim());
                // Automatically select the default admin chat for the booking message
                setActiveChat(chats[0] || null);
            }
        } catch (err) {
            console.log(err.message || 'Failed to fetch tour details');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = () => {
        if (!message.trim() || !activeChat) return;

        const newMessage = {
            id: Date.now(),
            sender: currentUser?.id,
            content: message,
            timestamp: new Date(),
            isSystemMessage: false,
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === activeChat.id
                    ? {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        lastMessage: message,
                        timestamp: new Date(),
                    }
                    : chat
            )
        );

        setActiveChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
        }));

        setMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Function to handle chat selection and update URL query
    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        const params = new URLSearchParams(location.search);
        params.set('chatId', chat.id);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    return (
        <div className="flex h-full">
            {/* Chat List */}
            <div className="w-96 border-r bg-white flex flex-col">
                <div className="p-4 border-b flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                    <p className="text-sm text-gray-600">Chat with Frexi team</p>
                </div>

                <div className="flex-1  overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat)}
                            className={`p-4  border-b hover:bg-gray-50 cursor-pointer ${activeChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <span className="text-lg mr-3">{chat.participantAvatar}</span>
                                    <div>
                                        <span className="font-medium text-gray-900">{chat.participantName}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-500">{formatDate(chat.timestamp)}</span>
                                    {chat.unreadCount > 0 && (
                                        <span className="inline-block bg-primary-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                                {chat.messages.length === 0 ? 'Click to start chatting with our team' : chat.lastMessage}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
                {!activeChat ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
                        <div className="text-center">
                            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg mb-2">Select a conversation</p>
                            <p className="text-sm">Choose a message from the list to start chatting</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b bg-white flex-shrink-0">
                            <div className="flex items-center">
                                <span className="text-lg mr-3">{activeChat.participantAvatar}</span>
                                <div>
                                    <span className="font-medium text-gray-900">{activeChat.participantName}</span>
                                    <p className="text-sm text-primary-600">Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {activeChat.messages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg mb-2">Start the conversation</p>
                                    <p className="text-sm">Send a message to begin chatting with our team</p>
                                </div>
                            ) : (
                                activeChat.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === currentUser?.id
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-white text-gray-900 shadow-sm'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                            <span
                                                className={`text-xs ${msg.sender === currentUser?.id ? 'text-primary-200' : 'text-gray-500'
                                                    } block mt-1`}
                                            >
                                                {formatTime(msg.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t flex-shrink-0">
                            <div className="flex space-x-2">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                                    rows={4}
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-colors"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessageManagement;