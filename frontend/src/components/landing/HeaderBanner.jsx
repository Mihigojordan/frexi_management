import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

const HeaderBanner = ({title}) => {
    return (

        <div className="relative h-80 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">

                {/* Main Title */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        {title || "Explore Frexi"}
                    </h1>
                    {/* Breadcrumb */}
                    <div className=" flex items-center justify-center">
                        <nav className="flex items-center space-x-2 text-sm font-medium">
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white/80">{title || 'Frexi'}</span>
                        </nav>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default HeaderBanner