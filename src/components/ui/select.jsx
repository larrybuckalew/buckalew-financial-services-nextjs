import React, { useState, useRef, useEffect } from 'react';
export function Select({ value, onValueChange, disabled = false, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (<div className="relative" ref={selectRef}>
      {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, {
                        onClick: () => !disabled && setIsOpen(!isOpen),
                        disabled,
                        isOpen
                    });
                }
                if (child.type === SelectContent) {
                    return isOpen ? React.cloneElement(child, {
                        onSelect: (itemValue) => {
                            onValueChange?.(itemValue);
                            setIsOpen(false);
                        },
                        value
                    }) : null;
                }
            }
            return child;
        })}
    </div>);
}
export function SelectTrigger({ children, className = '', onClick, disabled, isOpen }) {
    return (<button type="button" onClick={onClick} disabled={disabled} className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
      <svg className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
      </svg>
    </button>);
}
export function SelectContent({ children, onSelect, value }) {
    return (<div className="absolute top-full z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      <div className="p-1">
        {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    onSelect,
                    isSelected: child.props.value === value
                });
            }
            return child;
        })}
      </div>
    </div>);
}
export function SelectItem({ value, children, onSelect, isSelected }) {
    return (<div className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${isSelected ? 'bg-blue-100 text-blue-900' : ''}`} onClick={() => onSelect?.(value)}>
      {isSelected && (<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </span>)}
      {children}
    </div>);
}
export function SelectValue({ placeholder }) {
    return <span className="text-gray-500">{placeholder}</span>;
}
