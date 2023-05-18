import React from 'react';

const ButtonPage = () => {
  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-1/2 p-2">
        <button className="w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 1
        </button>
      </div>
      <div className="w-1/2 p-2">
        <button className="w-full h-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Button 2
        </button>
      </div>
      <div className="w-1/2 p-2">
        <button className="w-full h-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Button 3
        </button>
      </div>
      <div className="w-1/2 p-2">
        <button className="w-full h-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Button 4
        </button>
      </div>
    </div>
  );
};

export default ButtonPage;
