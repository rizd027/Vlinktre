import React, { memo } from 'react';
import { Share2, Layers, Square, Type, ArrowUp, ArrowDown, AlignLeft, AlignCenter, AlignRight, LayoutGrid, Paintbrush, Check, Zap } from 'lucide-react';
import { FONTS, ANIMATION_OPTIONS, PLATFORMS } from '../../data/constants';
import SelectField from '../SelectField';

const SocialSettings = memo(({ theme, setTheme, socials, setSocials }) => {
    return (
        <div className="flex flex-col gap-10">
            {/* Tab Title */}
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                    <Share2 size={24} className="text-purple-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Social Icons</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Platform Connections</p>
                </div>
            </div>

            {/* Style & Layout Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                            <Layers size={12} className="text-purple-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Display & Position</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Display Style</span>
                        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                            <button
                                onClick={() => setTheme({ socialStyle: 'icons-only' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialStyle === 'icons-only' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <Square size={14} />
                            </button>
                            <button
                                onClick={() => setTheme({ socialStyle: 'icon-text' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialStyle === 'icon-text' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <Type size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Position</span>
                        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                            <button
                                onClick={() => setTheme({ socialPosition: 'top' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialPosition === 'top' ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={() => setTheme({ socialPosition: 'bottom' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialPosition === 'bottom' ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <ArrowDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Alignment</span>
                        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                            <button
                                onClick={() => setTheme({ socialAlignment: 'left' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'left' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <AlignLeft size={14} />
                            </button>
                            <button
                                onClick={() => setTheme({ socialAlignment: 'center' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'center' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <AlignCenter size={14} />
                            </button>
                            <button
                                onClick={() => setTheme({ socialAlignment: 'right' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.socialAlignment === 'right' ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <AlignRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                            <LayoutGrid size={12} className="text-purple-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Size & Spacing</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="social-icon-size" className="text-xs font-bold text-white/60">Icon Size</label>
                            <span className="text-[10px] font-black text-purple-400">{theme.socialSize}px</span>
                        </div>
                        <input
                            id="social-icon-size"
                            name="social-icon-size"
                            type="range"
                            min="16"
                            max="48"
                            value={theme.socialSize || 20}
                            onChange={(e) => setTheme({ socialSize: parseInt(e.target.value) })}
                            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="social-icon-spacing" className="text-xs font-bold text-white/60">Spacing</label>
                            <span className="text-[10px] font-black text-purple-400">{theme.socialSpacing}px</span>
                        </div>
                        <input
                            id="social-icon-spacing"
                            name="social-icon-spacing"
                            type="range"
                            min="8"
                            max="40"
                            value={theme.socialSpacing || 16}
                            onChange={(e) => setTheme({ socialSpacing: parseInt(e.target.value) })}
                            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="social-margin-top" className="text-xs font-bold text-white/60">Margin Top</label>
                            <span className="text-[10px] font-black text-purple-400">{theme.socialMarginTop}px</span>
                        </div>
                        <input
                            id="social-margin-top"
                            name="social-margin-top"
                            type="range"
                            min="0"
                            max="100"
                            value={theme.socialMarginTop ?? 20}
                            onChange={(e) => setTheme({ socialMarginTop: parseInt(e.target.value) })}
                            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="social-margin-bottom" className="text-xs font-bold text-white/60">Margin Bottom</label>
                            <span className="text-[10px] font-black text-purple-400">{theme.socialMarginBottom}px</span>
                        </div>
                        <input
                            id="social-margin-bottom"
                            name="social-margin-bottom"
                            type="range"
                            min="0"
                            max="100"
                            value={theme.socialMarginBottom ?? 20}
                            onChange={(e) => setTheme({ socialMarginBottom: parseInt(e.target.value) })}
                            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Color Section */}
            <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Paintbrush size={14} className="text-purple-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Color Customization</span>
                    </div>
                    <div className="flex p-0.5 bg-black/40 rounded-lg border border-white/5">
                        {['auto', 'brand', 'custom'].map(type => (
                            <button
                                key={type}
                                onClick={() => setTheme({ socialColorType: type })}
                                className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialColorType === type ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/50'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {theme.socialColorType === 'custom' && (
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="relative group">
                            <input
                                id="social-custom-color-picker"
                                name="social-custom-color-picker"
                                type="color"
                                value={theme.socialCustomColor || '#ffffff'}
                                onChange={(e) => setTheme({ socialCustomColor: e.target.value })}
                                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="social-custom-color-hex" className="text-[10px] font-black uppercase tracking-widest text-white/60">Custom Hex</label>
                            <input
                                id="social-custom-color-hex"
                                name="social-custom-color-hex"
                                type="text"
                                value={theme.socialCustomColor || '#ffffff'}
                                onChange={(e) => setTheme({ socialCustomColor: e.target.value })}
                                className="bg-transparent border-none text-xl font-black uppercase tracking-tighter text-white/90 outline-none w-32"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Typography & Interaction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                            <Type size={12} className="text-indigo-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Typography</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Font Family</span>
                        <div className="grid grid-cols-2 gap-2">
                            {FONTS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setTheme({ socialFont: f })}
                                    className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${theme.socialFont === f ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-lg' : 'bg-white/3 border-white/5 text-white/60 hover:text-white/60'}`}
                                    style={{ fontFamily: f }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Text Weight</span>
                        <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                            {[400, 700, 900].map(weight => (
                                <button
                                    key={weight}
                                    onClick={() => setTheme({ socialTextWeight: weight })}
                                    className={`flex-1 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${theme.socialTextWeight === weight ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/50'}`}
                                >
                                    {weight === 400 ? 'Regular' : weight === 700 ? 'Bold' : 'Black'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
                            <Zap size={12} className="text-orange-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Interactions</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-white/60">Hover Animation</span>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'none', label: 'None', icon: Square },
                                { id: 'lift', label: 'Lift', icon: ArrowUp },
                                { id: 'scale', label: 'Zoom', icon: LayoutGrid },
                                { id: 'glow', label: 'Glow', icon: Zap }
                            ].map(hover => (
                                <button
                                    key={hover.id}
                                    onClick={() => setTheme({ socialHover: hover.id })}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${theme.socialHover === hover.id ? 'bg-orange-500/10 border-orange-500/30 text-white shadow-lg shadow-orange-500/5' : 'bg-white/3 border-white/5 text-white/60 hover:text-white/60'}`}
                                >
                                    <hover.icon size={12} className={theme.socialHover === hover.id ? 'text-orange-400' : ''} />
                                    {hover.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <SelectField
                            id="social-animation-select"
                            name="social-animation"
                            label="Active Animation"
                            value={theme.socialAnimation || 'none'}
                            onChange={(e) => setTheme({ socialAnimation: e.target.value })}
                        >
                            {ANIMATION_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                            ))}
                        </SelectField>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Platform Links</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {PLATFORMS.map((p) => {
                    const currentSocial = socials.find(s => s.platform === p.id);
                    const Icon = p.icon;
                    return (
                        <div key={p.id} className="group relative flex flex-col gap-3 p-6 rounded-3xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all shadow-xl shadow-black/5">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-white/2 ${p.color} border border-white/5 group-hover:bg-white/5 transition-colors shadow-inner`}>
                                        <Icon size={16} />
                                    </div>
                                    <label htmlFor={`social-${p.id}`} className="text-[10px] font-black uppercase tracking-widest text-white/50 group-focus-within:text-purple-400 transition-colors">
                                        {p.name}
                                    </label>
                                </div>
                                {currentSocial?.url && currentSocial.url.length > 0 && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 shadow-sm shadow-green-500/5">
                                        <span className="text-[9px] font-black text-green-500/60 uppercase tracking-tighter">Active</span>
                                        <Check size={10} className="text-green-500" />
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id={`social-${p.id}`}
                                    name={`social-${p.id}`}
                                    type="text"
                                    value={currentSocial?.url || ''}
                                    onChange={(e) => {
                                        setSocials(prev => {
                                            const exists = prev.some(s => s.platform === p.id);
                                            if (exists) {
                                                return prev.map(s => s.platform === p.id ? { ...s, url: e.target.value } : s);
                                            }
                                            return [...prev, { platform: p.id, url: e.target.value }];
                                        });
                                    }}
                                    placeholder={p.placeholder}
                                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-white outline-none focus:border-purple-500/20 focus:bg-black/30 transition-all placeholder:text-white/5"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default SocialSettings;
