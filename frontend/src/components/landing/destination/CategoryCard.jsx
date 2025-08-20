// CategorySidebar.jsx
import React from 'react';
import img from '../../../assets/image/gorilla1.jpg'

const CategorySidebar = () => {
  const categories = [
    { name: 'City Tour', count: 8, icon: '🏙️' },
    { name: 'Beach Tours', count: 6, icon: '🏖️' },
    { name: 'Wildlife Tours', count: 2, icon: '🦁' },
    { name: 'News & Tips', count: 7, icon: '📰' },
    { name: 'Adventure Tours', count: 9, icon: '🏔️' },
    { name: 'Mountain Tours', count: 10, icon: '⛰️' },
  ];

  const recentPosts = [
    {
      title: 'Exploring The Green Spaces Of The Island Maldives',
      date: '22/6/2024',
      image: img
    },
    {
      title: 'Harmony With Nature Of Belgium Tour And Travel',
      date: '25/6/2024',
      image: img
    },
    {
      title: 'Exploring The Green Spaces Of Realar Residence',
      date: '27/6/2024',
      image: img
    }
  ];

  const popularTags = [
    'Tour', 'Adventure', 'Rent', 'Innovate', 'Hotel', 
    'Modern', 'Luxury', 'Travel'
  ];

  return (
    <div className="w-full lg:w-80 space-y-8 text-black ">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-2">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li key={index} className="flex items-center justify-between py-2 hover:text-teal-600 cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <span className="text-gray-500">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-2">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="flex space-x-3">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800 hover:text-teal-600 cursor-pointer line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">📅 {post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-2">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-100 hover:text-teal-700 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;