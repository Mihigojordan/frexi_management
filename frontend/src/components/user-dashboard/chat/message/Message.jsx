import React from 'react'

const Message = ({ msg ,isOwnMessage }) => {
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
           
            className={`flex ${ isOwnMessage ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwnMessage
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                    }`}
            >
                <p className="text-sm whitespace-pre-line">{msg?.text}</p>
                <span
                    className={`text-xs ${isOwnMessage ? 'text-primary-200' : 'text-gray-500'
                        } block mt-1`}
                >
                    {formatTime(msg?.createdAt)}
                </span>
            </div>
        </div>
    )
}

export default Message