import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, User, Bell, Settings, LogOut, Phone, Mail, Globe, Home, Calendar, MapPin, CreditCard, FileText, HelpCircle, Menu, X } from 'lucide-react';

const UserDashboardHome = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  });
  
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('messages');
  const messagesEndRef = useRef(null);

  // Navigation items
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Messages', id: 'messages', icon: MessageCircle },
    { name: 'My Bookings', id: 'bookings', icon: Calendar },
    { name: 'Tours', id: 'tours', icon: MapPin },
    { name: 'Payments', id: 'payments', icon: CreditCard },
    { name: 'Documents', id: 'documents', icon: FileText },
    { name: 'Support', id: 'support', icon: HelpCircle },
  ];

  // Sample initial chats (simulating existing conversations)
  useEffect(() => {
    // Simulate receiving booking data from tour page URL
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('tourId');
    const tourName = urlParams.get('tourName');
    const tourPrice = urlParams.get('price');
    const tourLocation = urlParams.get('location');
    
    if (tourId && tourName) {
      createAdminChat({
        id: tourId,
        title: tourName,
        price: tourPrice || '0',
        location: tourLocation || 'Rwanda'
      });
    } else {
      // Load existing chats
      setChats([
        {
          id: 'admin-1',
          participantName: 'Frexi Admin',
          participantAvatar: '👨‍💼',
          lastMessage: 'Your Volcanoes Park booking has been confirmed!',
          timestamp: new Date(Date.now() - 3600000),
          isAdminChat: true,
          messages: [
            {
              id: 1,
              sender: 'admin',
              content: 'Hello! Thank you for booking the Volcanoes National Park tour. Your booking reference is FRX-VP-2024-001.',
              timestamp: new Date(Date.now() - 7200000),
              isSystemMessage: false
            },
            {
              id: 2,
              sender: 1,
              content: 'Thank you! When do I need to make the payment?',
              timestamp: new Date(Date.now() - 5400000),
              isSystemMessage: false
            },
            {
              id: 3,
              sender: 'admin',
              content: 'Your Volcanoes Park booking has been confirmed! Payment is due 48 hours before travel date.',
              timestamp: new Date(Date.now() - 3600000),
              isSystemMessage: false
            }
          ],
          unreadCount: 1
        }
      ]);
    }
  }, []);

  const createAdminChat = (tourData) => {
    const adminChatId = `admin-${Date.now()}`;
    const initialMessage = {
      id: Date.now(),
      sender: 'system',
      content: `🎯 New Booking Inquiry\n\nTour: ${tourData.title}\nLocation: ${tourData.location}\nPrice: $${tourData.price}\n\nCustomer: ${currentUser.name}\nEmail: ${currentUser.email}\n\nCustomer is interested in this tour and ready to book!\n\nBooking Reference: FRX-${tourData.id}-${Date.now()}`,
      timestamp: new Date(),
      isSystemMessage: true
    };

    const newChat = {
      id: adminChatId,
      participantName: 'Frexi Admin',
      participantAvatar: '👨‍💼',
      lastMessage: 'New booking inquiry received',
      timestamp: new Date(),
      isAdminChat: true,
      tourData: tourData,
      messages: [initialMessage],
      unreadCount: 0
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    setActiveSection('messages');
  };

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser.id,
      content: message,
      timestamp: new Date(),
      isSystemMessage: false
    };

    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id 
        ? { 
            ...chat, 
            messages: [...chat.messages, newMessage],
            lastMessage: message,
            timestamp: new Date()
          }
        : chat
    ));

    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessage('');

    // Simulate admin response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! I'll get back to you shortly.",
        "Let me check the availability for your requested dates.",
        "I'll send you the detailed itinerary within the next hour.",
        "Great! I'll prepare the booking confirmation for you.",
        "Do you have any specific requirements for this tour?"
      ];
      
      const adminResponse = {
        id: Date.now() + 1,
        sender: 'admin',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isSystemMessage: false
      };

      setChats(prev => prev.map(chat => 
        chat.id === activeChat.id 
          ? { 
              ...chat, 
              messages: [...chat.messages, adminResponse],
              lastMessage: adminResponse.content,
              timestamp: new Date()
            }
          : chat
      ));

      if (activeChat) {
        setActiveChat(prev => ({
          ...prev,
          messages: [...prev.messages, adminResponse]
        }));
      }
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric'
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {currentUser.name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-gray-600">Active Bookings</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-primary-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{chats.length}</p>
                    <p className="text-gray-600">Messages</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600">Tours Completed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <p className="text-gray-700">New message from Frexi Admin</p>
                  <p className="text-gray-500 text-sm">2 minutes ago</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">Volcanoes Park tour booking confirmed</p>
                  <p className="text-gray-500 text-sm">1 hour ago</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <p className="text-gray-700">Payment received for Lake Kivu tour</p>
                  <p className="text-gray-500 text-sm">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/4 border-r bg-white">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                <p className="text-sm text-gray-600">Chat with Frexi team</p>
              </div>
              
              <div className="overflow-y-auto h-full">
                {chats.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  chats.map(chat => (
                    <div 
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${activeChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{chat.participantAvatar}</span>
                          <div>
                            <span className="font-medium text-gray-900">{chat.participantName}</span>
                            {chat.tourData && (
                              <p className="text-xs text-gray-500">Re: {chat.tourData.title}</p>
                            )}
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
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  ))
                )}
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
                  <div className="p-4 border-b bg-white">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{activeChat.participantAvatar}</span>
                      <div>
                        <span className="font-medium text-gray-900">{activeChat.participantName}</span>
                        <p className="text-sm text-primary-600">Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {activeChat.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isSystemMessage 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200 whitespace-pre-line max-w-lg' 
                            : msg.sender === currentUser.id 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-white text-gray-900 shadow-sm'
                        }`}>
                          <p className={`text-sm ${msg.isSystemMessage ? 'font-medium' : ''}`}>
                            {msg.content}
                          </p>
                          <span className={`text-xs ${
                            msg.isSystemMessage 
                              ? 'text-blue-600' 
                              : msg.sender === currentUser.id 
                                ? 'text-primary-200' 
                                : 'text-gray-500'
                          } block mt-1`}>
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 bg-white border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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

      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
              <p className="text-gray-600">This section is coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Frexi</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  activeSection === item.id ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
                {item.id === 'messages' && chats.length > 0 && (
                  <span className="ml-auto bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    {chats.reduce((acc, chat) => acc + chat.unreadCount, 0) || chats.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b lg:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-gray-500" />
                <Settings className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};


export default UserDashboardHome