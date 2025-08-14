import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, MapPin, Image, Check, AlertTriangle, Eye, RefreshCw, ChevronLeft, ChevronRight, Calendar, User, Mail, Phone, X, Upload } from 'lucide-react';
import partnerService from '../../../services/partnerService';

// View Partner Modal Component
const ViewPartnerModal = ({ isOpen, onClose, partner }) => {
  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Partner Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Partner Image */}
          <div className="text-center mb-6">
            {partnerService.getImageUrl(partner) ? (
              <img
                src={partnerService.getImageUrl(partner)}
                alt={partner.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold text-2xl mx-auto">
                {partner.name?.charAt(0)?.toUpperCase() || <User size={32} />}
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mt-3">
              {partner.name || 'Unnamed Partner'}
            </h3>
          </div>

          {/* Partner Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{partner.email || 'No email'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">
                  {partner.phone ? partnerService.formatPhone(partner.phone) : 'No phone'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">{partner.address || 'No address'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date Added</p>
                <p className="text-gray-900">
                  {new Date(partner.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPartnerModal