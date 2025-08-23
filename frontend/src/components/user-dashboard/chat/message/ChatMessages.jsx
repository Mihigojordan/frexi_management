import React from 'react'
import Message from './Message';
import { MessageCircle, Send } from 'lucide-react';

const ChatMessages = ({setMessage,message,activeChat, messagesEndRef, sendMessage ,user }) => {
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
                    <div className="p-4 border-b bg-white flex-shrink-0">
                        <div className="flex items-center">
                            <span className="text-lg mr-3">{'👨‍💼'}</span>
                            <div>
                                <span className="font-medium text-gray-900">{'Frexi Admin'}</span>
                                {/* <p className="text-sm text-primary-600">Online</p> */}
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
    )
}

export default ChatMessages