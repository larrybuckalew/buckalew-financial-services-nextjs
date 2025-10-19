import { useEffect, useState } from 'react';
export function Notification({ message, type, onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);
    const baseClasses = "fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300";
    const typeClasses = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white"
    };
    return (<div className={`${baseClasses} ${typeClasses[type]} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
      <div className="flex items-center">
        <span className="mr-3">{message}</span>
        <button onClick={() => setIsVisible(false)} className="text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>);
}
