import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCw, Maximize, Scissors } from 'lucide-react';

const FaviconCropModal = ({ isOpen, onClose, image, onCrop }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
    const [borderRadius, setBorderRadius] = useState(12); // Percentage or px? Let's use % for easier scaling
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const isDragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (isOpen) {
            setCrop({ x: 0, y: 0, scale: 1 });
            setBorderRadius(12);
        }
    }, [isOpen]);

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        setImgSize({ width, height });
        
        const containerSize = containerRef.current?.offsetWidth || 300;
        const initialScale = containerSize / Math.min(width, height);
        setCrop(prev => ({ ...prev, scale: initialScale }));
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setCrop(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleApply = () => {
        const canvas = document.createElement('canvas');
        const size = 128; // Increased size for better quality before browser scaling
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const rect = containerRef.current.getBoundingClientRect();
        const imgRect = imgRef.current.getBoundingClientRect();
        
        const drawScale = size / rect.width;
        
        // Apply clipping path for rounded corners
        const radius = (borderRadius / 100) * size;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(0, 0, size, size, radius);
        } else {
            // Fallback for older browsers
            ctx.moveTo(radius, 0);
            ctx.lineTo(size - radius, 0);
            ctx.quadraticCurveTo(size, 0, size, radius);
            ctx.lineTo(size, size - radius);
            ctx.quadraticCurveTo(size, size, size - radius, size);
            ctx.lineTo(radius, size);
            ctx.quadraticCurveTo(0, size, 0, size - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
        }
        ctx.clip();

        // Draw image
        const dx = (imgRect.left - rect.left) * drawScale;
        const dy = (imgRect.top - rect.top) * drawScale;
        const dw = imgRect.width * drawScale;
        const dh = imgRect.height * drawScale;

        ctx.drawImage(imgRef.current, dx, dy, dw, dh);
        
        onCrop(canvas.toDataURL('image/png', 0.9));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/10">
                                <Scissors size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-white italic tracking-tight leading-none">Crop Icon</h2>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Position & Shape</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Cropper Area */}
                    <div className="p-8 flex flex-col gap-6">
                        <div 
                            ref={containerRef}
                            className="aspect-square w-full bg-[#111] relative overflow-hidden ring-1 ring-white/10 cursor-move touch-none"
                            style={{ borderRadius: `${borderRadius}%` }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <img
                                ref={imgRef}
                                src={image}
                                alt="To crop"
                                onLoad={onImageLoad}
                                draggable="false"
                                className="absolute pointer-events-none select-none max-w-none"
                                style={{
                                    transform: `translate(${crop.x}px, ${crop.y}px) scale(${crop.scale})`,
                                    transformOrigin: 'top left',
                                    transition: isDragging.current ? 'none' : 'transform 0.1s ease-out'
                                }}
                            />
                            {/* Overlay Guide */}
                            <div className="absolute inset-0 pointer-events-none border-2 border-green-500/30" style={{ borderRadius: `${borderRadius}%` }} />
                            <div className="absolute inset-0 pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-6">
                            {/* Shape Selector */}
                            <div className="flex flex-col gap-3">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Select Frame Shape</span>
                                <div className="flex gap-2">
                                    {[
                                        { id: 'square', label: 'Square', radius: 0, icon: <div className="w-4 h-4 border-2 border-current rounded-[2px]" /> },
                                        { id: 'rounded', label: 'Rounded', radius: 15, icon: <div className="w-4 h-4 border-2 border-current rounded-[4px]" /> },
                                        { id: 'squircle', label: 'Squircle', radius: 30, icon: <div className="w-4 h-4 border-2 border-current rounded-[8px]" /> },
                                        { id: 'circle', label: 'Circle', radius: 50, icon: <div className="w-4 h-4 border-2 border-current rounded-full" /> },
                                    ].map(shape => (
                                        <button
                                            key={shape.id}
                                            onClick={() => setBorderRadius(shape.radius)}
                                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 ${
                                                borderRadius === shape.radius
                                                    ? 'bg-green-500/10 border-green-500/40 text-green-400'
                                                    : 'bg-white/3 border-white/5 text-white/40 hover:bg-white/5 hover:text-white/60'
                                            }`}
                                        >
                                            {shape.icon}
                                            <span className="text-[8px] font-bold uppercase tracking-widest">{shape.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Zoom</span>
                                        <span className="text-[10px] font-bold text-white/60">{Math.round(crop.scale * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="3"
                                        step="0.01"
                                        value={crop.scale}
                                        onChange={(e) => setCrop(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Radius</span>
                                        <span className="text-[10px] font-bold text-white/60">{Math.round(borderRadius)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        step="1"
                                        value={borderRadius}
                                        onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 rounded-2xl bg-white/5 text-white/70 font-bold text-sm hover:bg-white/10 transition-all border border-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="flex-1 py-4 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_20px_-5px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 group"
                            >
                                <Check size={16} />
                                <span>Apply & Compress</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default FaviconCropModal;
