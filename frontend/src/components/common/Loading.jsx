import React from 'react';

const Loading = ({ fullScreen = false, text = 'Yükleniyor...' }) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary-light border-t-primary-gold animate-spin"></div>
      </div>
      {text && <p className="text-primary-gold font-semibold">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinnerContent}
    </div>
  );
};

export default Loading;
