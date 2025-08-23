import React from 'react'
import Conversation from './Conversation'

const ChatList = ({ handleChatSelect , chats, activeChat }) => {
  return (
    <div>
      <div className="w-96 border-r bg-white flex flex-col">
                <div className="p-4 border-b flex-shrink-0">
                    <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                    <p className="text-sm text-gray-600">Chat with Frexi team</p>
                </div>

                <div className="flex-1  overflow-y-auto">
                    {chats.map((chat) => (
                       <Conversation key={chat.id} activeChat={activeChat} handleChatSelect={handleChatSelect} chat={chat} />
                    ))}
                </div>
            </div>
    </div>
  )
}

export default ChatList