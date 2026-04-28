import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import DetailedColorPicker from './DetailedColorPicker';
import { Copy, Check } from 'lucide-react';

const ColorPickerRow = memo(({ label, value, onChange, colorId, activeColor = 'emerald' }) => {
    const [localValue, setLocalValue] = useState(value || '#ffffff');
    const [showPicker, setShowPicker] = useState(false);
    const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const swatchRef = useRef(null);
    const popoverRef = useRef(null);
    const lastUpdate = useRef(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (value !== localValue) {
            setLocalValue(value || '#ffffff');
        }
    }, [value]);

    // Measure and position popover
    useEffect(() => {
        if (!showPicker) {
            setIsVisible(false);
            return;
        }

        const updatePosition = () => {
            if (!swatchRef.current) return;
            
            const swatchRect = swatchRef.current.getBoundingClientRect();
            const margin = 12;
            const viewportPadding = 16;
            
            // Initial estimate based on DetailedColorPicker's w-72 (288px) 
            const estWidth = 288;
            const estHeight = 360;

            let top = swatchRect.bottom + margin;
            let left = swatchRect.right - estWidth;

            // If we have the actual element, use its real size for precision
            if (popoverRef.current) {
                const popRect = popoverRef.current.getBoundingClientRect();
                left = swatchRect.right - popRect.width;
                
                // Flip vertically if needed
                if (top + popRect.height > window.innerHeight - viewportPadding) {
                    top = swatchRect.top - popRect.height - margin;
                }

                // Clamp to screen boundaries
                top = Math.max(viewportPadding, Math.min(top, window.innerHeight - popRect.height - viewportPadding));
                left = Math.max(viewportPadding, Math.min(left, window.innerWidth - popRect.width - viewportPadding));
                
                // Once we have a real measurement and position, show it
                setIsVisible(true);
            } else {
                // Fallback estimate placement
                if (top + estHeight > window.innerHeight - viewportPadding) {
                    top = swatchRect.top - estHeight - margin;
                }
                top = Math.max(viewportPadding, Math.min(top, window.innerHeight - estHeight - viewportPadding));
                left = Math.max(viewportPadding, Math.min(left, window.innerWidth - estWidth - viewportPadding));
            }

            setPickerPosition({ top, left });
        };

        // Run initially
        updatePosition();

        // Run again after a tiny delay to catch the ref once rendered
        const rafId = requestAnimationFrame(() => {
            updatePosition();
        });

        const handleScrollBlur = () => setShowPicker(false);
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target) && !swatchRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };

        window.addEventListener('scroll', handleScrollBlur, true);
        window.addEventListener('resize', updatePosition);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScrollBlur, true);
            window.removeEventListener('resize', updatePosition);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    const handleColorChange = (val) => {
        setLocalValue(val);
        const now = Date.now();
        const throttleInterval = 32;

        if (now - lastUpdate.current > throttleInterval) {
            onChange(val);
            lastUpdate.current = now;
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                onChange(val);
                lastUpdate.current = Date.now();
            }, throttleInterval);
        }
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(localValue.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const accentColor = activeColor === 'emerald' ? 'emerald-500' :
        activeColor === 'purple' ? 'purple-500' :
            activeColor === 'orange' ? 'orange-500' : 'white';

    const safeColorId = colorId || `color-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`relative flex items-center justify-between p-3.5 rounded-2xl bg-black/20 border border-white/5 group focus-within:border-${accentColor}/20 transition-all duration-300`}>
            <div className="flex flex-col gap-1 flex-1">
                <label htmlFor={safeColorId} className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{label || 'Color Hex'}</label>
                <div className="flex items-center gap-2">
                    <input
                        id={safeColorId}
                        name={safeColorId}
                        type="text"
                        value={localValue}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="bg-transparent border-none outline-none font-mono text-sm uppercase w-full text-white placeholder:text-white/30"
                        placeholder="#FFFFFF"
                    />
                    <button 
                        onClick={handleCopy}
                        className="p-1 px-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-all"
                        title="Copy color"
                    >
                        {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    </button>
                </div>
            </div>
            
            <div 
                ref={swatchRef}
                className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg cursor-pointer hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => setShowPicker(!showPicker)}
            >
                <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: localValue }}
                />
            </div>

            {showPicker && createPortal(
                <div 
                    ref={popoverRef}
                    className="fixed z-[9999] transition-all duration-150 ease-out"
                    style={{ 
                        top: pickerPosition.top,
                        left: pickerPosition.left,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
                        pointerEvents: isVisible ? 'auto' : 'none'
                    }}
                >
                    <DetailedColorPicker 
                        color={localValue} 
                        onChange={handleColorChange} 
                    />
                </div>,
                document.body
            )}
        </div>
    );
});

export default ColorPickerRow;

