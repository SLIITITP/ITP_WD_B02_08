import React from 'react'
import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/solid';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <InformationCircleIcon className="w-full h-full text-blue-500" />
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="z-50 w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">Popup Title</h2>
            <p className="mb-4">This is the content of the popup box.</p>
            <button
              className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;