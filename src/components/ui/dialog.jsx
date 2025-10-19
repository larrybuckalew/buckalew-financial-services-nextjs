import React, { useEffect } from 'react';
export function Dialog({ open, onOpenChange, children }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };
        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, onOpenChange]);
    if (!open)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)}/>
      {/* Dialog content */}
      <div className="relative z-50 w-full max-w-lg">
        {children}
      </div>
    </div>);
}
export function DialogContent({ children, className = '' }) {
    return (<div className={`bg-white rounded-lg shadow-lg p-6 mx-4 ${className}`}>
      {children}
    </div>);
}
export function DialogHeader({ children }) {
    return (<div className="mb-4">
      {children}
    </div>);
}
export function DialogTitle({ children }) {
    return (<h2 className="text-lg font-semibold leading-none tracking-tight">
      {children}
    </h2>);
}
export function DialogTrigger({ children }) {
    return <>{children}</>;
}
