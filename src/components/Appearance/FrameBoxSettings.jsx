import React, { memo } from 'react';
import { Monitor, MoveHorizontal, Compass, Droplets, Maximize, Target, Flame, Snowflake, Sun, Zap, Grid, Fingerprint } from 'lucide-react';
import ColorPickerRow from '../ColorPickerRow';

const FrameBoxSettings = memo(({ theme, setTheme }) => {

    // Helper to safely convert hex to rgba for the preview if needed, but we rely on tailwind/css in preview
    const effects = [
        { id: 'none', label: 'None', icon: Monitor, desc: 'Clean standard frame' },
        { id: 'flames', label: 'Flames', icon: Flame, desc: 'Animated fiery border glow' },
        { id: 'ice', label: 'Ice', icon: Snowflake, desc: 'Cold frosted shimmer' },
        { id: 'summer', label: 'Summer Time', icon: Sun, desc: 'Warm sunny flares' },
        { id: 'neon', label: 'Neon Pulse', icon: Zap, desc: 'Dynamic futuristic neon glow' },
        { id: 'custom-glow', label: 'Custom Glow', icon: Fingerprint, desc: 'Your own colored aura' },
    ];

    return (
        <div className="flex flex-col gap-10">
            {/* Tab Title */}
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shadow-xl shadow-fuchsia-500/5">
                    <Monitor size={24} className="text-fuchsia-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Frame Box</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Manage desktop content wrapper</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">

                {/* Dimensions and Glassmorphism Properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                <Maximize size={12} className="text-emerald-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Dimensions</span>
                        </div>

                        {/* Max Width */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-white/80 flex items-center gap-2"><MoveHorizontal size={14} className="text-white/40" /> Max Width</label>
                                <span className="text-xs font-black text-emerald-400">{theme.frameWidth || 420}px</span>
                            </div>
                            <div className="relative flex items-center group">
                                <input
                                    type="range"
                                    min="320"
                                    max="600"
                                    step="10"
                                    value={theme.frameWidth !== undefined ? theme.frameWidth : 420}
                                    onChange={(e) => setTheme({ ...theme, frameWidth: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 ${((theme.frameWidth || 420) - 320) / (600 - 320) * 100}%, rgba(255, 255, 255, 0.05) ${((theme.frameWidth || 420) - 320) / (600 - 320) * 100}%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Border Radius */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-white/80 flex items-center gap-2"><Compass size={14} className="text-white/40" /> Border Radius</label>
                                <span className="text-xs font-black text-emerald-400">{theme.frameRadius !== undefined ? theme.frameRadius : 32}px</span>
                            </div>
                            <div className="relative flex items-center group">
                                <input
                                    type="range"
                                    min="0"
                                    max="64"
                                    value={theme.frameRadius !== undefined ? theme.frameRadius : 32}
                                    onChange={(e) => setTheme({ ...theme, frameRadius: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 ${((theme.frameRadius !== undefined ? theme.frameRadius : 32) / 64) * 100}%, rgba(255, 255, 255, 0.05) ${((theme.frameRadius !== undefined ? theme.frameRadius : 32) / 64) * 100}%)`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Glass Properties */}
                    <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                                <Droplets size={12} className="text-blue-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Glassmorphism</span>
                        </div>

                        {/* Background Opacity */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-white/80">Background Opacity</label>
                                <span className="text-xs font-black text-blue-400">{theme.frameBgOpacity !== undefined ? theme.frameBgOpacity : 3}%</span>
                            </div>
                            <div className="relative flex items-center group">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={theme.frameBgOpacity !== undefined ? theme.frameBgOpacity : 3}
                                    onChange={(e) => setTheme({ ...theme, frameBgOpacity: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 ${theme.frameBgOpacity !== undefined ? theme.frameBgOpacity : 3}%, rgba(255, 255, 255, 0.05) ${theme.frameBgOpacity !== undefined ? theme.frameBgOpacity : 3}%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Border Opacity */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-white/80">Border Opacity</label>
                                <span className="text-xs font-black text-blue-400">{theme.frameBorderOpacity !== undefined ? theme.frameBorderOpacity : 10}%</span>
                            </div>
                            <div className="relative flex items-center group">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={theme.frameBorderOpacity !== undefined ? theme.frameBorderOpacity : 10}
                                    onChange={(e) => setTheme({ ...theme, frameBorderOpacity: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 ${theme.frameBorderOpacity !== undefined ? theme.frameBorderOpacity : 10}%, rgba(255, 255, 255, 0.05) ${theme.frameBorderOpacity !== undefined ? theme.frameBorderOpacity : 10}%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Border Color */}
                        <div className="-mx-1">
                            <ColorPickerRow
                                label="Border Color Base"
                                value={theme.frameBorderColor || '#ffffff'}
                                onChange={(val) => setTheme({ ...theme, frameBorderColor: val })}
                                colorId="frame-border-color"
                                activeColor="blue"
                            />
                        </div>

                        {/* Blur Intensity */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-white/80">Backdrop Blur</label>
                                <span className="text-xs font-black text-blue-400">{theme.frameBlur !== undefined ? theme.frameBlur : 2}px</span>
                            </div>
                            <div className="relative flex items-center group">
                                <input
                                    type="range"
                                    min="0"
                                    max="40"
                                    value={theme.frameBlur !== undefined ? theme.frameBlur : 2}
                                    onChange={(e) => setTheme({ ...theme, frameBlur: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 ${((theme.frameBlur !== undefined ? theme.frameBlur : 2) / 40) * 100}%, rgba(255, 255, 255, 0.05) ${((theme.frameBlur !== undefined ? theme.frameBlur : 2) / 40) * 100}%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Drop Shadow Toggle */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 mt-2">
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Drop Shadow</span>
                            </div>
                            <button
                                onClick={() => setTheme({ ...theme, frameShadow: theme.frameShadow === undefined ? false : !theme.frameShadow })}
                                className={`w-12 h-6 rounded-full relative transition-all duration-300 shrink-0 ${theme.frameShadow !== false ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${theme.frameShadow !== false ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Outer Effects */}
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
                            <Target size={12} className="text-orange-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Outer Effect (For Desktop View)</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {effects.map((effect) => {
                            const isSelected = (theme.frameEffect || 'none') === effect.id;
                            const Icon = effect.icon;
                            let activeColorClass = 'border-white bg-white text-black';
                            let iconColorClass = 'text-white/40';

                            if (isSelected) {
                                if (effect.id === 'flames') activeColorClass = 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
                                else if (effect.id === 'ice') activeColorClass = 'border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]';
                                else if (effect.id === 'summer') activeColorClass = 'border-yellow-400 bg-yellow-400/10 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]';
                                else if (effect.id === 'neon') activeColorClass = 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]';
                                else if (effect.id === 'custom-glow') activeColorClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                                else activeColorClass = 'border-white/50 bg-white/10 text-white';

                                iconColorClass = effect.id !== 'none' ? activeColorClass.split(' ')[2] : 'text-white';
                            }

                            return (
                                <button
                                    key={effect.id}
                                    onClick={() => setTheme({ ...theme, frameEffect: effect.id })}
                                    className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden
                                        ${isSelected ? activeColorClass : 'border-white/5 bg-transparent hover:bg-white/5 hover:border-white/20'}
                                    `}
                                >
                                    <Icon size={24} className={iconColorClass} />
                                    <div className="flex flex-col relative z-10">
                                        <span className={`font-bold text-sm ${isSelected ? '' : 'text-white/80'}`}>{effect.label}</span>
                                        <span className={`text-[10px] mt-1 ${isSelected ? 'opacity-80' : 'text-white/40'}`}>{effect.desc}</span>
                                    </div>

                                    {/* Subtitle Accent matching preview */}
                                    {isSelected && effect.id === 'flames' && <div className="absolute inset-0 bg-linear-to-b from-orange-500/0 to-orange-600/20 pointer-events-none"></div>}
                                    {isSelected && effect.id === 'ice' && <div className="absolute inset-0 bg-linear-to-b from-cyan-400/0 to-cyan-500/20 pointer-events-none"></div>}
                                    {isSelected && effect.id === 'summer' && <div className="absolute inset-0 bg-linear-to-b from-yellow-300/0 to-yellow-500/20 pointer-events-none"></div>}
                                    {isSelected && effect.id === 'neon' && <div className="absolute inset-0 bg-linear-to-b from-fuchsia-500/0 to-purple-600/20 pointer-events-none"></div>}
                                    {isSelected && effect.id === 'custom-glow' && <div className="absolute inset-0 bg-linear-to-b from-emerald-500/0 to-emerald-600/20 pointer-events-none"></div>}
                                </button>
                            );
                        })}
                    </div>

                    {(theme.frameEffect === 'custom-glow') && (
                        <div className="mt-4 pt-6 border-t border-white/5 -mx-1">
                            <ColorPickerRow
                                label="Custom Glow Effect Color"
                                value={theme.frameEffectColor || '#a855f7'}
                                onChange={(val) => setTheme({ ...theme, frameEffectColor: val })}
                                colorId="frame-effect-color"
                                activeColor="emerald"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default FrameBoxSettings;
