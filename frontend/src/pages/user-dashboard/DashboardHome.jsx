import React, { useState, useEffect, useRef } from 'react';
import useUserAuth from '../../context/UserAuthContext';
import { Send, MessageCircle, User, Bell, Settings, LogOut, Phone, Mail, Globe, Home, Calendar, MapPin, CreditCard, FileText, HelpCircle, Menu, X } from 'lucide-react';


const UserDashboardHome = () => {
 const {user:currentUser} =useUserAuth()
  const [chats, setChats] = useState([]);
  

      return (
          <div className="p-6 overflow-y-auto h-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {currentUser.firstname} {currentUser.lastname}!</h1>
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
                {chats.length > 0 ? (
                  chats.slice(0, 3).map((chat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <p className="text-gray-700">
                        {chat.messages.length > 0 
                          ? `New message in ${chat.participantName}` 
                          : `${chat.participantName} available for chat`}
                      </p>
                      <p className="text-gray-500 text-sm">Just now</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        );
}

export default UserDashboardHome