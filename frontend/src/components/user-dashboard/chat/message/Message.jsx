import React, { useState } from 'react'
import { Maximize2, Download, X } from 'lucide-react'
import { API_URL } from '../../../../api/api'

const Message = ({ msg, isOwnMessage }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)

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

    const openModal = () => {
        setIsModalOpen(true)
        setZoomLevel(1) // Reset zoom when opening
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setZoomLevel(1) // Reset zoom when closing
    }

    const downloadImage = async () => {
        try {
            const imageUrl = `${API_URL}/${msg.imageUrl}`
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `image_${Date.now()}.jpg`
            document.body.appendChild(link)
            link.click()
            
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading image:', error)
        }
    }

    const handleWheel = (e) => {
        e.preventDefault()
        const delta = e.deltaY * -0.001
        const newZoom = Math.min(Math.max(0.5, zoomLevel + delta), 5)
        setZoomLevel(newZoom)
    }

    const handleImageClick = (e) => {
        e.stopPropagation()
        // Double click to reset zoom
        if (e.detail === 2) {
            setZoomLevel(1)
        }
    }

    return (
        <>
            <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwnMessage
                            ? 'bg-zinc-600 text-white'
                            : 'bg-neutral-300 text-gray-900 shadow-sm'
                    }`}
                >
                    {msg?.imageUrl && (
                        <div className="mb-2 relative group">
                            <img
                                src={`${API_URL}/${msg.imageUrl}`}
                                alt="Shared image"
                                className="max-w-full max-h-80 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex cursor-pointer items-center justify-center" onClick={openModal}>
                                <Maximize2 
                                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                                    size={24}
                                />
                            </div>
                        </div>
                    )}
                    
                    {msg?.text && (
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    )}
                    
                    <span
                        className={`text-xs ${
                            isOwnMessage ? 'text-primary-200' : 'text-gray-500'
                        } block mt-1`}
                    >
                        {formatTime(msg?.createdAt)}
                    </span>
                </div>
            </div>

            {/* Simplified Modal with Zoom */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 min-h-screen w-screen z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        {/* Close button - only way to close */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
                        >
                            <X size={24} />
                        </button>

                        {/* Download button */}
                        <button
                            onClick={downloadImage}
                            className="absolute top-4 right-16 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
                            title="Download image"
                        >
                            <Download size={20} />
                        </button>

                        {/* Zoomable Image Container */}
                        <div 
                            className="cursor-grab active:cursor-grabbing"
                            onWheel={handleWheel}
                        >
                            <img
                                src={`${API_URL}/${msg.imageUrl}`}
                                alt="Shared image"
                                className="max-w-none transition-transform duration-200 select-none"
                                style={{ 
                                    transform: `scale(${zoomLevel})`,
                                    maxHeight: '90vh',
                                    maxWidth: '90vw'
                                }}
                                onClick={handleImageClick}
                                draggable={false}
                            />
                        </div>

                        {/* Zoom indicator */}
                        <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                            {Math.round(zoomLevel * 100)}% • {formatDate(msg?.createdAt)} • {formatTime(msg?.createdAt)}
                        </div>

                        {/* Zoom instructions */}
                        <div className="absolute bottom-4 right-4 text-white text-xs bg-black bg-opacity-50 px-3 py-1 rounded">
                            Scroll to zoom • Double-click to reset
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Message