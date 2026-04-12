import React, { memo } from 'react';
import { 
    Image, Layers, Square, Wand2, LayoutGrid, 
    Video, Zap, Trash2, Upload, X, Sparkles 
} from 'lucide-react';
import { BG_EFFECT_OPTIONS } from '../../data/bg-effects';

const WallpaperSettings = memo(({ theme, setTheme }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-xl shadow-emerald-500/5">
                    <Image size={24} className="text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Wallpaper</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Customize your background</p>
                </div>
            </div>

            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                        <Layers size={12} className="text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Wallpaper Style</span>
                </div>

                <div className="grid grid-cols-6 gap-3">
                    {[
                        { id: 'fill', label: 'Fill', icon: Square },
                        { id: 'gradient', label: 'Gradient', icon: Layers },
                        { id: 'blur', label: 'Blur', icon: Wand2 },
                        { id: 'pattern', label: 'Pattern', icon: LayoutGrid },
                        { id: 'image', label: 'Image', icon: Image, premium: true },
                        { id: 'video', label: 'Video', icon: Video, premium: true }
                    ].map(style => {
                        const Icon = style.icon;
                        return (
                            <div key={style.id} className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => setTheme({ wallpaperStyle: style.id })}
                                    className={`w-full aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-300 ${theme.wallpaperStyle === style.id ? 'border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/5' : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'}`}
                                >
                                    {style.id === 'fill' && <div className="w-6 h-6 rounded-lg bg-gray-400/50 shadow-sm" />}
                                    {style.id === 'gradient' && <div className="w-6 h-6 rounded-lg bg-linear-to-br from-gray-300/50 to-gray-600/50 shadow-sm" />}
                                    {style.id === 'blur' && (
                                        <div className="relative w-6 h-6 flex items-center justify-center">
                                            <div className="w-5 h-5 rounded-full bg-gray-400/40 blur-[2px]" />
                                        </div>
                                    )}
                                    {style.id === 'pattern' && (
                                        <div className="grid grid-cols-2 gap-0.5 opacity-40">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="w-2.5 h-2.5 bg-gray-300 rounded-[1px]" />)}
                                        </div>
                                    )}
                                    {(style.id === 'image' || style.id === 'video') && <Icon size={20} className="text-white/40" />}

                                    {style.premium && (
                                        <div className="absolute top-1.5 right-1.5 p-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20">
                                            <Zap size={6} className="text-white fill-white" />
                                        </div>
                                    )}
                                </button>
                                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${theme.wallpaperStyle === style.id ? 'text-emerald-400' : 'text-white/30'}`}>{style.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fill Specific Controls */}
            {theme.wallpaperStyle === 'fill' && (
                <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Square size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Solid Background</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="bg-fill-color" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Color Hex</label>
                            <input
                                id="bg-fill-color"
                                name="bg-fill-color"
                                type="text"
                                value={theme.bg || '#ffffff'}
                                onChange={(e) => setTheme({ bg: e.target.value })}
                                className="bg-transparent border-none outline-none font-mono text-sm uppercase w-full text-white"
                            />
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                            <input
                                id="bg-fill-color-picker"
                                name="bg-fill-color-picker"
                                type="color"
                                value={theme.bg || '#ffffff'}
                                onChange={(e) => setTheme({ bg: e.target.value })}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Gradient Specific Controls */}
            {theme.wallpaperStyle === 'gradient' && (
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Layers size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Gradient Config</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'start', key: '1', val: theme.gradientColor1 || '#ffffff', label: 'Start' },
                            { id: 'end', key: '2', val: theme.gradientColor2 || '#000000', label: 'End' }
                        ].map(c => (
                            <div key={c.key} className="flex items-center justify-between p-3 rounded-xl bg-black/10 border border-white/5">
                                <div className="flex flex-col gap-0.5">
                                    <label htmlFor={`gradient-${c.id}-color`} className="text-[8px] font-black text-white/40 uppercase tracking-widest">{c.label}</label>
                                    <span className="text-[10px] font-mono text-white/60 uppercase">{c.val}</span>
                                </div>
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                                    <input
                                        id={`gradient-${c.id}-color`}
                                        name={`gradient-${c.id}-color`}
                                        type="color"
                                        value={c.val}
                                        onChange={(e) => setTheme({ [`gradientColor${c.key}`]: e.target.value })}
                                        className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <label htmlFor="gradient-angle-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Direction / Angle</label>
                            <span className="text-[10px] font-bold text-white">{theme.gradientAngle || 135}°</span>
                        </div>
                        <input
                            id="gradient-angle-slider"
                            name="gradient-angle"
                            type="range"
                            min="0"
                            max="360"
                            value={theme.gradientAngle || 135}
                            onChange={(e) => setTheme({ gradientAngle: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>
            )}

            {/* Blur Specific Controls */}
            {theme.wallpaperStyle === 'blur' && (
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Wand2 size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Aurora Design</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="aurora-tint-color" className="text-[8px] font-black text-white/40 uppercase tracking-widest">Base Tint</label>
                            <span className="text-[10px] font-mono text-white/60 uppercase">{theme.blurColor || '#ffffff'}</span>
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <input
                                id="aurora-tint-color"
                                name="aurora-tint-color"
                                type="color"
                                value={theme.blurColor || '#ffffff'}
                                onChange={(e) => setTheme({ blurColor: e.target.value })}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <label htmlFor="aurora-intensity-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Intensity</label>
                            <span className="text-[10px] font-bold text-white">{theme.blurIntensity}%</span>
                        </div>
                        <input
                            id="aurora-intensity-slider"
                            name="aurora-intensity"
                            type="range"
                            min="0"
                            max="100"
                            value={theme.blurIntensity}
                            onChange={(e) => setTheme({ blurIntensity: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>
            )}

            {/* Pattern Specific Controls */}
            {theme.wallpaperStyle === 'pattern' && (
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <LayoutGrid size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Pattern Config</span>
                    </div>

                    {/* Pattern Style Selector */}
                    <div className="flex flex-col gap-4">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Pattern Style</label>
                        <div className="grid grid-cols-5 gap-2">
                            {[
                                { id: 'dots', label: 'Dots' },
                                { id: 'stripes', label: 'Stripes' },
                                { id: 'grid', label: 'Grid' },
                                { id: 'diagonal', label: 'Diagonal' },
                                { id: 'waves', label: 'Waves' },
                                { id: 'circles', label: 'Circles' },
                                { id: 'hexagon', label: 'Hexagon' },
                                { id: 'triangles', label: 'Triangles' },
                                { id: 'zigzag', label: 'Zigzag' },
                                { id: 'checkerboard', label: 'Checker' },
                                { id: 'custom', label: 'Custom' }
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    disabled={p.id === 'custom' && !theme.customPatternImage}
                                    onClick={() => setTheme({ patternType: p.id })}
                                    className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.patternType === p.id
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-lg'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                                        } ${p.id === 'custom' && !theme.customPatternImage ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Upload Custom Pattern */}
                    {theme.patternType === 'custom' ? (
                        <div className="flex flex-col gap-3">
                            <input
                                type="file"
                                id="wallpaper-pattern-upload"
                                name="wallpaper-pattern-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setTheme({ customPatternImage: reader.result, patternType: 'custom' });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {theme.customPatternImage ? (
                                <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 group">
                                    <img src={theme.customPatternImage} alt="Custom pattern" className="w-full h-24 object-cover" />
                                    <button
                                        onClick={() => setTheme({ customPatternImage: null, patternType: 'dots' })}
                                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="wallpaper-pattern-upload"
                                    className="w-full text-center px-4 py-6 rounded-xl bg-white/5 border-2 border-dashed border-emerald-500/30 hover:border-emerald-500/60 text-[10px] font-bold text-white/60 uppercase cursor-pointer transition-all flex flex-col items-center gap-2"
                                >
                                    <Upload size={20} className="text-emerald-400" />
                                    Upload Custom Pattern
                                </label>
                            )}
                        </div>
                    ) : null}

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="pattern-base-color" className="text-[8px] font-black text-white/40 uppercase tracking-widest">Base Color</label>
                            <span className="text-[10px] font-mono text-white/60 uppercase">{theme.patternColor || '#000000'}</span>
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <input
                                id="pattern-base-color"
                                name="pattern-base-color"
                                type="color"
                                value={theme.patternColor || '#000000'}
                                onChange={(e) => setTheme({ patternColor: e.target.value })}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="pattern-bg-color" className="text-[8px] font-black text-white/40 uppercase tracking-widest">Background Color</label>
                            <span className="text-[10px] font-mono text-white/60 uppercase">{theme.patternBackgroundColor || theme.bg || '#000000'}</span>
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <input
                                id="pattern-bg-color"
                                name="pattern-bg-color"
                                type="color"
                                value={theme.patternBackgroundColor || theme.bg || '#000000'}
                                onChange={(e) => setTheme({ patternBackgroundColor: e.target.value })}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <label htmlFor="pattern-opacity-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Opacity</label>
                                <span className="text-[10px] font-bold text-white">{Math.round((theme.patternOpacity ?? 0.1) * 100)}%</span>
                            </div>
                            <input
                                id="pattern-opacity-slider"
                                name="pattern-opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={theme.patternOpacity ?? 0.1}
                                onChange={(e) => setTheme({ patternOpacity: parseFloat(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <label htmlFor="pattern-blur-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Blur</label>
                                <span className="text-[10px] font-bold text-white">{theme.patternBlur ?? 0}px</span>
                            </div>
                            <input
                                id="pattern-blur-slider"
                                name="pattern-blur"
                                type="range"
                                min="0"
                                max="20"
                                value={theme.patternBlur ?? 0}
                                onChange={(e) => setTheme({ patternBlur: parseInt(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Image Specific Controls */}
            {theme.wallpaperStyle === 'image' && (
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Image size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Background Image</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {theme.backgroundImage ? (
                            <div className="flex flex-col gap-6">
                                <div className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10">
                                    <img src={theme.backgroundImage} className="w-full h-full object-cover" alt="Wallpaper" />
                                    <button
                                        onClick={() => setTheme({ backgroundImage: null })}
                                        className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label htmlFor="wallpaper-image-opacity" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Opacity</label>
                                            <span className="text-[10px] font-bold text-white">{Math.round((theme.imageOpacity ?? 1) * 100)}%</span>
                                        </div>
                                        <input
                                            id="wallpaper-image-opacity"
                                            name="wallpaper-image-opacity"
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={theme.imageOpacity ?? 1}
                                            onChange={(e) => setTheme({ imageOpacity: parseFloat(e.target.value) })}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label htmlFor="wallpaper-image-blur" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Blur</label>
                                            <span className="text-[10px] font-bold text-white">{theme.imageBlur ?? 0}px</span>
                                        </div>
                                        <input
                                            id="wallpaper-image-blur"
                                            name="wallpaper-image-blur"
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={theme.imageBlur ?? 0}
                                            onChange={(e) => setTheme({ imageBlur: parseInt(e.target.value) })}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="bg-image-upload" className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border-2 border-dashed border-white/5 bg-white/2 hover:bg-white/5 hover:border-emerald-500/20 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-3 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all">
                                    <Upload size={20} className="text-white/40 group-hover:text-emerald-400" />
                                </div>
                                <span className="text-xs font-bold text-white/60">Choose Wallpaper Image</span>
                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">PNG, JPG, GIF up to 10MB</span>
                                <input
                                    id="bg-image-upload"
                                    name="bg-image-upload"
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif, image/webp"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setTheme({ backgroundImage: reader.result });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </div>
            )}

            {/* Video Specific Controls */}
            {theme.wallpaperStyle === 'video' && (
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Video size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Background Video</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {theme.backgroundVideo ? (
                            <div className="flex flex-col gap-6">
                                <div className="relative aspect-video rounded-2xl overflow-hidden group border border-white/10">
                                    <video src={theme.backgroundVideo} className="w-full h-full object-cover" autoPlay muted loop />
                                    <button
                                        onClick={() => setTheme({ backgroundVideo: null })}
                                        className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500/80 text-white rounded-full transition-all flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label htmlFor="wallpaper-video-opacity" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Opacity</label>
                                            <span className="text-[10px] font-bold text-white">{Math.round((theme.videoOpacity ?? 1) * 100)}%</span>
                                        </div>
                                        <input
                                            id="wallpaper-video-opacity"
                                            name="wallpaper-video-opacity"
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={theme.videoOpacity ?? 1}
                                            onChange={(e) => setTheme({ videoOpacity: parseFloat(e.target.value) })}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label htmlFor="wallpaper-video-blur" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Blur</label>
                                            <span className="text-[10px] font-bold text-white">{theme.videoBlur ?? 0}px</span>
                                        </div>
                                        <input
                                            id="wallpaper-video-blur"
                                            name="wallpaper-video-blur"
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={theme.videoBlur ?? 0}
                                            onChange={(e) => setTheme({ videoBlur: parseInt(e.target.value) })}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                </div>

                                {/* Audio Controls */}
                                <div className="flex flex-col gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Enable Audio</span>
                                            <span className="text-[8px] text-white/60">Include video sound (may require interaction)</span>
                                        </div>
                                        <button
                                            onClick={() => setTheme({ videoAudioEnabled: !theme.videoAudioEnabled })}
                                            className={`w-10 h-5 rounded-full relative transition-colors ${theme.videoAudioEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${theme.videoAudioEnabled ? 'left-6 bg-white' : 'left-1 bg-white/40'}`} />
                                        </button>
                                    </div>

                                    {theme.videoAudioEnabled && (
                                        <div className="flex flex-col gap-4 pt-3 border-t border-white/5">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="wallpaper-video-volume" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Volume</label>
                                                <span className="text-[10px] font-bold text-white">{theme.videoVolume ?? 50}%</span>
                                            </div>
                                            <input
                                                id="wallpaper-video-volume"
                                                name="wallpaper-video-volume"
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={theme.videoVolume ?? 50}
                                                onChange={(e) => setTheme({ videoVolume: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="bg-video-upload" className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border-2 border-dashed border-white/5 bg-white/2 hover:bg-white/5 hover:border-emerald-500/20 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-3 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all">
                                    <Video size={20} className="text-white/40 group-hover:text-emerald-400" />
                                </div>
                                <span className="text-xs font-bold text-white/60">Choose Wallpaper Video</span>
                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">MP4, MOV up to 50MB</span>
                                <input
                                    id="bg-video-upload"
                                    name="bg-video-upload"
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setTheme({ backgroundVideo: url });
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </div>
            )}

            {/* Noise Toggle */}
            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 mt-4">
                <div className="flex flex-col gap-1">
                    <span id="noise-toggle-label" className="text-sm font-bold text-white">Noise</span>
                    <span className="text-xs text-white/60">Add a subtle grain texture</span>
                </div>
                <button
                    id="noise-toggle"
                    aria-labelledby="noise-toggle-label"
                    onClick={() => setTheme({ noise: !theme.noise })}
                    className={`w-12 h-6 rounded-full relative transition-colors ${theme.noise ? 'bg-emerald-500' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${theme.noise ? 'left-7 bg-white' : 'left-1 bg-white/40'}`} />
                </button>
            </div>

            {/* Dynamic Animated Icons */}
            <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5 mt-2">
                <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                        <Sparkles size={12} className="text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Background Animation</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {BG_EFFECT_OPTIONS.map(effect => {
                        const Icon = effect.icon;
                        return (
                            <button
                                key={effect.id}
                                onClick={() => setTheme({ bgEffect: effect.id })}
                                className={`py-3 px-2 rounded-2xl border flex flex-col items-center justify-center min-h-[72px] gap-2 transition-all duration-300 ${theme.bgEffect === effect.id ? 'border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/5' : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'}`}
                            >
                                {Icon ? <Icon size={18} className={theme.bgEffect === effect.id ? 'text-emerald-400' : 'text-white/60'} /> : <div className="w-4 h-4"></div>}
                                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${theme.bgEffect === effect.id ? 'text-emerald-400' : 'text-white/50'}`}>{effect.label}</span>
                            </button>
                        );
                    })}
                </div>

                {theme.bgEffect && theme.bgEffect !== 'none' && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group focus-within:border-emerald-500/20 transition-all mt-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="bg-effect-color" className="text-[8px] font-black text-white/40 uppercase tracking-widest">Effect Base Color</label>
                            <span className="text-[10px] font-mono text-white/60 uppercase">{theme.bgEffectColor || '#ffffff'}</span>
                        </div>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <input
                                id="bg-effect-color"
                                name="bg-effect-color"
                                type="color"
                                value={theme.bgEffectColor || '#ffffff'}
                                onChange={(e) => setTheme({ bgEffectColor: e.target.value })}
                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default WallpaperSettings;
