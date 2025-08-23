import React from 'react'

const Conversation = ({ handleChatSelect, chat, activeChat, isOnline }) => {
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

    return (
        <div

            onClick={() => handleChatSelect(chat)}
            className={`p-4  border-b hover:bg-gray-50 cursor-pointer ${activeChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3  ">
                    <div className="p-2 rounded-full bg-gray-200 relative">
                        <span className="text-lg ">{'👨‍💼'}</span>
                        {isOnline && <span className='h-3 w-3 right-0 top-0 rounded-full bg-green-500 absolute'></span>}

                    </div>
                    <div>
                        <span className="font-medium text-gray-900">{'Frexi Admin'}</span>
                    </div>


                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500">{formatDate(chat.createdAt)}</span>
                    {/* {chat.unreadCount > 0 && (
                        <span className="inline-block bg-primary-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                            {chat.unreadCount}
                        </span>
                    )} */}
                </div>
            </div>
            <p className="text-sm text-gray-600 truncate">
                {chat.messages.length === 0 ? 'Click to start chatting with our team' : chat.messages[chat.messages.length - 1]?.text}
            </p>
        </div>
    )
}

export default Conversation