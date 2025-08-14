import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, MapPin, Image, Check, AlertTriangle, Eye, RefreshCw, ChevronLeft, ChevronRight, Calendar, User, Mail, Phone, X, Upload } from 'lucide-react';
import partnerService from '../../../services/partnerService';
// Import the actual partner service
// Delete Partner Modal Component
const DeletePartnerModal = ({ isOpen, onClose, onConfirm, partner, isLoading }) => {
  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Partner</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>{partner.name}</strong>?
              This will permanently remove all partner data.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <RefreshCw size={16} className="animate-spin" />}
              Delete Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeletePartnerModal