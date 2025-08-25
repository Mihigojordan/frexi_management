import React, { useState } from 'react'
import Message from './Message';
import { MessageCircle, Send, Image, X } from 'lucide-react';
import { useSocketEvent } from '../../../../context/SocketContext';

const ChatMessages = ({
    setMessage, message, activeChat, messagesEndRef, sendMessage, user,
    selectedImage, imagePreview, onImageSelect, onRemoveImage, fileInputRef,isOnline = true
}) => {

  
    return (
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
                    <div className="p-4 border-b bg-white flex-shrink-0 relative ">
                        <div className="flex items-center gap-3 ">
                              <div className="p-2 rounded-full bg-gray-200 relative">
                        <span className="text-lg ">{'👨‍💼'}</span>
                        {isOnline && <span className='h-3 w-3 right-0 top-0 rounded-full bg-green-500 absolute'></span>}

                    </div>
                            <div>
                                <span className="font-medium text-gray-900">{'Frexi Admin'}</span>
                               { isOnline && <p className="text-sm text-primary-600">Online</p>}
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
                                <Message key={msg.id} msg={msg} isOwnMessage={msg?.senderUserId === user.id} />
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 bg-white border-t flex-shrink-0">
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mb-3 relative inline-block">
                                <img 
                                    src={imagePreview} 
                                    alt="Selected" 
                                    className="max-w-32 max-h-32 rounded-lg border"
                                />
                                <button
                                    onClick={onRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                        
                        <div className="flex space-x-2">
                            <div className="flex space-x-2">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={onImageSelect}
                                    accept="image/*"
                                    className="hidden"
                                />
                                
                                {/* Image upload button */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 p-2 rounded-lg transition-colors"
                                    title="Attach image"
                                >
                                    <Image className="h-5 w-5" />
                                </button>
                            </div>
                            
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
                                rows={2}
                            />
                            
                            <button
                                onClick={sendMessage}
                                disabled={!message.trim() && !selectedImage}
                                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ChatMessages