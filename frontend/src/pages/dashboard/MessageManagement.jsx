import { Send, MessageCircle, Users, User } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import useAdminAuth from '../../context/AdminAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatList from '../../components/dashboard/chat/conversation/ChatList'; // Admin version
import ChatMessages from '../../components/dashboard/chat/message/ChatMessages'; // Admin version
import conversationService from '../../services/conversationService';
import { useSocket, useSocketEvent } from '../../context/SocketContext';

const AdminMessageManagement = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [error, setError] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [conversationsFetched, setConversationsFetched] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredConversations, setFilteredConversations] = useState([]);
    
    const messagesEndRef = useRef(null);
    const { user: currentAdmin } = useAdminAuth();
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

    // Helper function to sort conversations by most recent activity
    const sortConversationsByActivity = (conversations) => {
        if (!conversations || !Array.isArray(conversations)) return [];
        
        return [...conversations].sort((a, b) => {
            const aTime = new Date(a.updatedAt || a.createdAt);
            const bTime = new Date(b.updatedAt || b.createdAt);
            return bTime - aTime; // Sort descending (most recent first)
        });
    };

     const hasJoinedRoom = useRef(false);
    
      // Join room when user is available and socket is connected
      useEffect(() => {
        if (currentAdmin?.id && activeChat?.id && isConnected && !hasJoinedRoom.current) {
          console.log('Joining room for currentAdmin:', currentAdmin.id);
          emit('joinRoom', { adminId: currentAdmin.id, conversationId:activeChat?.id });
          hasJoinedRoom.current = true;
        }
      }, [currentAdmin?.id, isConnected, activeChat?.id , emit]);
    
      // Reset room join flag when disconnected
      useEffect(() => {
        if (!isConnected) {
          hasJoinedRoom.current = false;
        }
      }, [isConnected]);
    

    // Listen for real-time messages from all conversations
    useSocketEvent('newMessage', (data) => {
       
        
        if (data.conversation) {
            const updatedConversation = data.conversation;
            
            // Sort messages in the updated conversation
            const sortedMessages = sortMessagesByCreatedAt(updatedConversation.messages || []);
            
            // Update conversations list with new message
            setConversations(prevConversations => {
                const updatedConversations = prevConversations.map(conv => 
                    conv.id === updatedConversation.id 
                        ? {
                            ...conv,
                            messages: sortedMessages,
                            lastMessage: sortedMessages[sortedMessages.length - 1]?.text || '',
                            updatedAt: new Date(),
                            // Mark as unread if not the active chat and message is from user
                            unreadCount: conv.id !== activeChat?.id && 
                                        sortedMessages[sortedMessages.length - 1]?.senderType === 'USER'
                                        ? (conv.unreadCount || 0) + 1 
                                        : conv.unreadCount || 0
                        }
                        : conv
                );
                
                // Resort conversations by activity
                return sortConversationsByActivity(updatedConversations);
            });
            
            // Update active chat if it matches
            if (activeChat?.id === updatedConversation.id) {
                setActiveChat(prevChat => ({
                    ...prevChat,
                    messages: sortedMessages,
                    unreadCount: 0 // Reset unread count when viewing
                }));
            }
        }
    }, [activeChat?.id]);

    // Fetch all conversations for admin
    const fetchAllConversations = useCallback(async () => {
        if (conversationsFetched) return;
        
        try {
            setLoading(true);
            setError(null);
            
            const data = await conversationService.getAllConversations();
            console.log('All conversations fetched:', data);
            
            // Sort conversations by most recent activity and sort messages within each conversation
            const processedConversations = data.map(conv => ({
                ...conv,
                messages: sortMessagesByCreatedAt(conv.messages || []),
                unreadCount: 0, // Initialize, you can calculate actual unread count from messages
                lastMessage: (() => {
                    const sortedMessages = sortMessagesByCreatedAt(conv.messages || []);
                    return sortedMessages[sortedMessages.length - 1]?.text || 'No messages yet';
                })()
            }));

            const sortedConversations = sortConversationsByActivity(processedConversations);
            
            setConversations(sortedConversations);
            setConversationsFetched(true);
            
        } catch (err) {
            setError(err.message || 'Failed to fetch conversations');
            console.error('Error fetching conversations:', err);
        } finally {
            setLoading(false);
        }
    }, [conversationsFetched]);

    // Filter conversations based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredConversations(conversations);
        } else {
            const filtered = conversations.filter(conv => {
                const userName = `${conv.user?.firstName || ''} ${conv.user?.lastName || ''}`.toLowerCase();
                const userEmail = conv.user?.email?.toLowerCase() || '';
                const lastMessage = conv.lastMessage?.toLowerCase() || '';
                const query = searchQuery.toLowerCase();
                
                return userName.includes(query) || 
                       userEmail.includes(query) || 
                       lastMessage.includes(query);
            });
            setFilteredConversations(filtered);
        }
    }, [conversations, searchQuery]);

    // Handle chat selection and update URL
    const handleChatSelect = useCallback((conversation) => {
        // Sort messages before setting active chat
        const sortedMessages = sortMessagesByCreatedAt(conversation.messages || []);
        
        setActiveChat({
            ...conversation,
            messages: sortedMessages,
            unreadCount: 0 // Reset unread count when selecting
        });
        
        // Update conversations to mark as read
        setConversations(prev => 
            prev.map(conv => 
                conv.id === conversation.id 
                    ? { ...conv, unreadCount: 0 }
                    : conv
            )
        );
        
        const params = new URLSearchParams(location.search);
        params.set('conversationId', conversation.id);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, [location.search, navigate]);

    // Initialize conversations when admin is available
    useEffect(() => {
        if (currentAdmin?.id && !conversationsFetched) {
            fetchAllConversations();
        }
    }, [currentAdmin?.id, fetchAllConversations, conversationsFetched]);

    // Handle URL parameters and set active conversation
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const conversationId = params.get('conversationId');

        // Set active conversation from URL parameter
        if (conversationId && conversations.length > 0) {
            const selectedConversation = conversations.find((conv) => conv.id === conversationId);
            if (selectedConversation && selectedConversation.id !== activeChat?.id) {
                // Sort messages before setting active chat
                const sortedMessages = sortMessagesByCreatedAt(selectedConversation.messages || []);
                
                setActiveChat({
                    ...selectedConversation,
                    messages: sortedMessages,
                    unreadCount: 0
                });
                
                // Mark as read
                setConversations(prev => 
                    prev.map(conv => 
                        conv.id === conversationId 
                            ? { ...conv, unreadCount: 0 }
                            : conv
                    )
                );
            }
        }
    }, [location.search, conversations, activeChat, navigate]);

    // Send message function with admin-specific data
    const sendMessage = useCallback(async () => {
        if (!message.trim() || !activeChat || !currentAdmin?.id || !isConnected) {
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
            senderId: currentAdmin.id,
            senderAdminId: currentAdmin.id,
            senderType: 'ADMIN',
            text: messageText,
            createdAt: new Date(),
            conversationId: activeChat.id,
            // Add sender admin data for UI
            senderAdmin: {
                id: currentAdmin.id,
                names: currentAdmin.adminName,
                email: currentAdmin.adminEmail,
            }
        };

        try {
            setSendingMessage(true);
            setError(null);

            // Optimistically update UI with sorted messages
            setConversations((prevConversations) =>
                prevConversations.map((conv) =>
                    conv.id === activeChat.id
                        ? {
                            ...conv,
                            messages: sortMessagesByCreatedAt([...(conv.messages || []), optimisticMessage]),
                            lastMessage: messageText,
                            updatedAt: new Date(),
                        }
                        : conv
                )
            );

            setActiveChat((prevChat) => ({
                ...prevChat,
                messages: sortMessagesByCreatedAt([...(prevChat.messages || []), optimisticMessage]),
            }));

            // Clear message input immediately
            setMessage('');

            // Send message via socket with admin-specific data
            const messageData = {
                conversationId: activeChat.id,
                senderType: 'ADMIN',
                senderAdminId: currentAdmin.id,
                text: messageText
            };

            emit('sendMessage', messageData, (response) => {
                // Handle socket response if needed
                if (response?.error) {
                    console.error('Message sending failed:', response.error);
                    setError('Failed to send message. Please try again.');
                    
                    // Remove optimistic message on error
                    setConversations((prevConversations) =>
                        prevConversations.map((conv) =>
                            conv.id === activeChat.id
                                ? {
                                    ...conv,
                                    messages: sortMessagesByCreatedAt(
                                        conv.messages.filter(msg => msg.id !== tempId)
                                    ),
                                }
                                : conv
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
                    console.log('Admin message sent successfully');
                }
            });

        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
            
            // Remove optimistic message on error
            setConversations((prevConversations) =>
                prevConversations.map((conv) =>
                    conv.id === activeChat.id
                        ? {
                            ...conv,
                            messages: sortMessagesByCreatedAt(
                                conv.messages.filter(msg => msg.id !== tempId)
                            ),
                        }
                        : conv
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
    }, [message, activeChat, currentAdmin?.id, isConnected, emit]);

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

    // Calculate total unread messages
    const totalUnreadMessages = conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0);

    // Loading state
    if (loading && conversations.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading conversations...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && conversations.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-red-600">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Error: {error}</p>
                    <button 
                        onClick={() => {
                            setError(null);
                            setConversationsFetched(false);
                            if (currentAdmin?.id) {
                                fetchAllConversations();
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
            {error && conversations.length > 0 && (
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

            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold">All Conversations</h2>
                        </div>
                        {totalUnreadMessages > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {totalUnreadMessages}
                            </span>
                        )}
                    </div>
                    
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                            <p>{searchQuery ? 'No conversations found' : 'No conversations yet'}</p>
                        </div>
                    ) : (
                        filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => handleChatSelect(conversation)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                    activeChat?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        {conversation.user?.profilePicture ? (
                                            <img
                                                src={conversation.user.profilePicture}
                                                alt={`${conversation.user.firstName} ${conversation.user.lastName}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-gray-600" />
                                            </div>
                                        )}
                                        {(conversation.unreadCount || 0) > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {conversation.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="font-medium text-gray-900 truncate">
                                                                              <span className="font-medium text-gray-900">{conversation?.user.firstname} {conversation?.user.lastname} {(!conversation?.user.lastname || !conversation?.user.firstname )&& conversation.user.email} </span>
                                            </p>
                                            <span className="text-xs text-gray-500 ml-2">
                                                {new Date(conversation.updatedAt || conversation.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                      
                                        <p className="text-sm text-gray-500 truncate mt-1">
                                            {conversation.lastMessage || 'No messages yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <ChatMessages
                activeChat={activeChat}
                message={message}
                messagesEndRef={messagesEndRef}
                sendMessage={sendMessage}
                setMessage={setMessage}
                user={currentAdmin}
                userType="ADMIN"
                onKeyPress={handleKeyPress}
                loading={loading || sendingMessage}
                isConnected={isConnected}
                disabled={!isConnected || sendingMessage}
                placeholder={
                    activeChat 
                        ? `Message ${activeChat.user?.firstName} ${activeChat.user?.lastName}...`
                        : 'Select a conversation to start messaging...'
                }
            />
        </div>
    );
};

export default AdminMessageManagement;