import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteDestinationModal = ({ isOpen, onClose, onConfirm, destination, isLoading }) => {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Delete Destination</h2>
        </div>

        {/* Modal Body */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete the destination{' '}
            <span className="font-semibold text-gray-900">
              "{destination.title || 'Unnamed Destination'}"
            </span>
            ?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone. All associated data, including images, will be permanently removed.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Trash2 size={18} />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDestinationModal;