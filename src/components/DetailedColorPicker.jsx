import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from '../utils/colorUtils';
import { Copy, Check, Pipette } from 'lucide-react';

const DetailedColorPicker = ({ color, onChange }) => {
    const [hsv, setHsv] = useState(() => {
        const rgb = hexToRgb(color || '#ffffff');
        return rgbToHsv(rgb.r, rgb.g, rgb.b);
    });

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const rgb = hexToRgb(color || '#ffffff');
        const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        if (Math.round(newHsv.h) !== Math.round(hsv.h) || 
            Math.round(newHsv.s) !== Math.round(hsv.s) || 
            Math.round(newHsv.v) !== Math.round(hsv.v)) {
            setHsv(newHsv);
        }
    }, [color]);

    const handleHsvChange = (newHsv) => {
        setHsv(newHsv);
        const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
        onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(color.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEyedropper = async () => {
        if (!window.EyeDropper) return;
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            onChange(result.sRGBHex.toUpperCase());
        } catch (e) {
            console.error('Eyedropper failed:', e);
        }
    };

    const rgb = useMemo(() => hsvToRgb(hsv.h, hsv.s, hsv.v), [hsv]);

    return (
        <div className="flex flex-col gap-5 w-72 p-5 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden select-none rounded-[1.5rem]">
            {/* Saturation/Value Area */}
            <SaturationArea hsv={hsv} onChange={(s, v) => handleHsvChange({ ...hsv, s, v })} />

            <div className="flex gap-4 items-center px-1">
                {/* Visual Color Preview */}
                <div 
                    className="w-12 h-12 rounded-xl border border-white/10 shrink-0 shadow-lg relative overflow-hidden"
                    style={{ backgroundColor: color }}
                >
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    {/* Hue Slider */}
                    <HueSlider h={hsv.h} onChange={(h) => handleHsvChange({ ...hsv, h })} />
                </div>
            </div>

            {/* Inputs & Actions */}
            <div className="flex flex-col gap-3">
                {/* Hex Row */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-4 h-11 transition-all duration-200 focus-within:bg-white/10 group">
                        <span className="text-white/20 font-black text-[9px] uppercase tracking-widest">Hex</span>
                        <input
                            type="text"
                            value={color.replace('#', '').toUpperCase()}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^[0-9A-F]{0,6}$/i.test(val)) {
                                    if (val.length === 3 || val.length === 6) {
                                        onChange('#' + val);
                                    }
                                }
                            }}
                            className="bg-transparent border-none outline-none text-xs font-mono w-full text-white placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-1">
                        <button 
                            onClick={handleCopy}
                            className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90"
                            title="Copy Hex"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                        {window.EyeDropper && (
                            <button 
                                onClick={handleEyedropper}
                                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90"
                                title="Pick from Screen"
                            >
                                <Pipette size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* RGB Row */}
                <div className="grid grid-cols-3 gap-2">
                    <RgbField label="R" value={rgb.r} onChange={(v) => handleHsvChange(rgbToHsv(v, rgb.g, rgb.b))} />
                    <RgbField label="G" value={rgb.g} onChange={(v) => handleHsvChange(rgbToHsv(rgb.r, v, rgb.b))} />
                    <RgbField label="B" value={rgb.b} onChange={(v) => handleHsvChange(rgbToHsv(rgb.r, rgb.g, v))} />
                </div>
            </div>
        </div>
    );
};

const SaturationArea = ({ hsv, onChange }) => {
    const areaRef = useRef(null);

    const handleMove = useCallback((e) => {
        if (!areaRef.current) return;
        const rect = areaRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const s = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const v = Math.max(0, Math.min(100, (1 - (clientY - rect.top) / rect.height) * 100));
        onChange(s, v);
    }, [onChange]);

    const onMouseDown = (e) => {
        handleMove(e);
        const onMouseMove = (moveEvent) => handleMove(moveEvent);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div 
            ref={areaRef}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            className="relative w-full aspect-square rounded-2xl cursor-crosshair overflow-hidden border border-white/10 group/area"
            style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
        >
            <div className="absolute inset-0 bg-linear-to-r from-white to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
            
            {/* Pointer */}
            <div 
                className="absolute w-5 h-5 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                style={{ 
                    left: `${hsv.s}%`, 
                    top: `${100 - hsv.v}%`,
                    backgroundColor: `hsl(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
                }}
            />
        </div>
    );
};

const HueSlider = ({ h, onChange }) => {
    const sliderRef = useRef(null);

    const handleMove = useCallback((e) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        onChange((x / rect.width) * 360);
    }, [onChange]);

    const onMouseDown = (e) => {
        handleMove(e);
        const onMouseMove = (moveEvent) => handleMove(moveEvent);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div 
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            className="relative w-full h-3 rounded-full cursor-pointer border border-white/10 shadow-inner"
            style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
        >
            <div 
                className="absolute top-1/2 w-5 h-5 rounded-full bg-white border border-black/10 shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${(h / 360) * 100}%` }}
            />
        </div>
    );
};

const RgbField = ({ label, value, onChange }) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-lg px-2 h-9">
            <span className="text-[8px] font-black text-white/20 uppercase w-3">{label}</span>
            <input
                type="number"
                min="0"
                max="255"
                value={Math.round(value)}
                onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (!isNaN(v)) onChange(Math.max(0, Math.min(255, v)));
                }}
                className="bg-transparent border-none outline-none text-[10px] font-bold w-full text-white text-right"
            />
        </div>
    </div>
);

export default DetailedColorPicker;

