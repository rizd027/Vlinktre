import React, { memo } from 'react';
import { Footprints, Heart, Palette, Layers, Zap } from 'lucide-react';
import { FONTS, ANIMATION_OPTIONS } from '../../data/constants';
import SelectField from '../SelectField';

const FooterSettings = memo(({ theme, setTheme, footerDesignSubTab, setFooterDesignSubTab }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                    <Footprints size={24} className="text-purple-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Footer</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Minimalist & Compact Layout</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Greeting Card Section */}
                <div className="flex flex-col gap-6 p-6 rounded-2xl bg-white/3 border border-white/5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <Heart size={16} className="text-purple-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Greeting Card</span>
                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Visibility Control</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setTheme({ showFooter: !theme.showFooter })}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.showFooter ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-white/60'}`}
                        >
                            {theme.showFooter ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>

                    {theme.showFooter && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="footer-greeting-title" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Greeting Title</label>
                                <input
                                    id="footer-greeting-title"
                                    name="footer-greeting-title"
                                    type="text"
                                    value={theme.footerGreetingTitle}
                                    onChange={(e) => setTheme({ footerGreetingTitle: e.target.value })}
                                    placeholder="Enter title..."
                                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-purple-500/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="footer-greeting-desc" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Message Description</label>
                                <textarea
                                    id="footer-greeting-desc"
                                    name="footer-greeting-desc"
                                    value={theme.footerGreetingDesc}
                                    onChange={(e) => setTheme({ footerGreetingDesc: e.target.value })}
                                    placeholder="Enter description..."
                                    rows={2}
                                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white/60 outline-none focus:border-purple-500/30 resize-none leading-relaxed"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Styling Section */}
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/10">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <Palette size={16} className="text-orange-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Appearance</span>
                            <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Design & Aesthetics</span>
                        </div>
                    </div>

                    {/* Style Presets */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Style</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'solid', label: 'Solid', icon: <div className="w-10 h-5 bg-current rounded-sm" /> },
                                { id: 'glass', label: 'Glass', icon: <div className="w-10 h-5 bg-current/20 rounded-sm border border-current/20" /> },
                                { id: 'outline', label: 'Outline', icon: <div className="w-10 h-5 bg-transparent border-2 border-current rounded-sm" /> }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => setTheme({ footerBtnStyle: opt.id })}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 ${theme.footerBtnStyle === opt.id
                                        ? 'bg-white text-black border-white shadow-2xl shadow-white/10'
                                        : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {opt.icon}
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Corner Roundness */}
                    <div className="flex flex-col gap-3 py-6 border-y border-white/5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="footer-corner-roundness" className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Corner Roundness</label>
                            <span className="text-[10px] font-bold text-white">{theme.footerBtnRadius}px</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                id="footer-corner-roundness"
                                name="footer-corner-roundness"
                                type="range"
                                min="0"
                                max="40"
                                value={theme.footerBtnRadius}
                                onChange={(e) => setTheme({ footerBtnRadius: parseInt(e.target.value) })}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                            />
                            <div className="flex justify-between px-0.5">
                                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Square</span>
                                <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Full</span>
                            </div>
                        </div>
                    </div>

                    {/* Animation */}
                    <div className="py-6 border-t border-white/5">
                        <SelectField
                            id="footer-animation-select"
                            name="footer-animation"
                            label="Animation"
                            value={theme.footerAnimation || 'none'}
                            onChange={(e) => setTheme({ footerAnimation: e.target.value })}
                        >
                            {ANIMATION_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                            ))}
                        </SelectField>
                    </div>

                    {/* Body / Text Toggle */}
                    <div className="flex flex-col gap-4">
                        <div className="flex bg-white/5 rounded-2xl p-1.5 self-start">
                            <button
                                onClick={() => setFooterDesignSubTab('body')}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${footerDesignSubTab === 'body' ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
                            >
                                Body
                            </button>
                            <button
                                onClick={() => setFooterDesignSubTab('text')}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${footerDesignSubTab === 'text' ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
                            >
                                Text
                            </button>
                        </div>

                        {/* Mode Selector */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                {footerDesignSubTab === 'body' ? 'Background Mode' : 'Text Mode'}
                            </label>
                            <div className="flex bg-white/5 rounded-lg p-0.5">
                                {['solid', 'gradient', 'pattern'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            const key = footerDesignSubTab === 'body' ? 'footerBtnColorType' : 'footerBtnTextColorType';
                                            setTheme({ [key]: type });
                                        }}
                                        className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${(footerDesignSubTab === 'body' ? theme.footerBtnColorType : theme.footerBtnTextColorType) === type
                                            ? 'bg-white/20 text-white shadow-sm shadow-black/20'
                                            : 'text-white/50 hover:text-white'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sub-tab Content: BODY */}
                        {footerDesignSubTab === 'body' && (
                            <div className="flex flex-col gap-4 mt-2">
                                {theme.footerBtnColorType === 'solid' && (
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group focus-within:border-white/10">
                                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                            <input
                                                id="footer-body-color"
                                                name="footer-body-color"
                                                type="color"
                                                value={theme.footerBtnColor || '#ffffff'}
                                                onChange={(e) => setTheme({ footerBtnColor: e.target.value })}
                                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-[25%] -translate-y-[25%] cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <input
                                                id="footer-body-color-hex"
                                                name="footer-body-color-hex"
                                                type="text"
                                                value={theme.footerBtnColor || '#ffffff'}
                                                onChange={(e) => setTheme({ footerBtnColor: e.target.value })}
                                                className="bg-transparent text-sm font-bold text-white outline-none uppercase"
                                            />
                                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Footer Base</span>
                                        </div>
                                    </div>
                                )}

                                {theme.footerBtnColorType === 'gradient' && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-body-gradient-1"
                                                name="footer-body-gradient-1"
                                                type="color"
                                                value={theme.footerBtnColorGradient1 || '#8228d9'}
                                                onChange={(e) => setTheme({ footerBtnColorGradient1: e.target.value })}
                                                className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColorGradient1}</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-body-gradient-2"
                                                name="footer-body-gradient-2"
                                                type="color"
                                                value={theme.footerBtnColorGradient2 || '#6366f1'}
                                                onChange={(e) => setTheme({ footerBtnColorGradient2: e.target.value })}
                                                className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColorGradient2}</span>
                                        </div>
                                    </div>
                                )}

                                {theme.footerBtnColorType === 'pattern' && (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="grid grid-cols-4 gap-2 w-full">
                                                {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                    <button
                                                        key={p}
                                                        disabled={p === 'custom' && !theme.footerBtnColorCustomPattern}
                                                        onClick={() => setTheme({ footerBtnColorPattern: p })}
                                                        className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${theme.footerBtnColorPattern === p
                                                            ? 'bg-white text-black shadow-lg'
                                                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                                                            } ${p === 'custom' && !theme.footerBtnColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                    >
                                                        {p === 'custom' && theme.footerBtnColorCustomPattern ? (
                                                            <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerBtnColorCustomPattern}) center/cover` }} />
                                                        ) : p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[9px] text-white/50 font-bold uppercase">Color Filter</span>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        id="footer-body-pattern-color"
                                                        name="footer-body-pattern-color"
                                                        type="color"
                                                        value={theme.footerBtnColor || '#ffffff'}
                                                        onChange={(e) => setTheme({ footerBtnColor: e.target.value })}
                                                        className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                                    />
                                                    <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnColor}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                                                <input
                                                    type="file"
                                                    id="footer-body-pattern-upload"
                                                    name="footer-body-pattern-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setTheme({ footerBtnColorCustomPattern: reader.result, footerBtnColorPattern: 'custom' });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="footer-body-pattern-upload"
                                                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[9px] font-bold text-white uppercase cursor-pointer whitespace-nowrap"
                                                >
                                                    Upload +
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sub-tab Content: TEXT */}
                        {footerDesignSubTab === 'text' && (
                            <div className="flex flex-col gap-4 mt-2">
                                {/* Footer Typography Settings */}
                                <div className="flex flex-col gap-4 border-b border-white/5 pb-4 mb-2">
                                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Typography</label>

                                    {/* Font Family */}
                                    <SelectField
                                        id="footer-font-select"
                                        name="footer-font"
                                        label="Font Family"
                                        value={theme.footerFont || 'Inter'}
                                        onChange={(e) => setTheme({ footerFont: e.target.value })}
                                    >
                                        {FONTS.map(font => (
                                            <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                        ))}
                                    </SelectField>

                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Font Weight */}
                                        <SelectField
                                            id="footer-weight-select"
                                            name="footer-weight"
                                            label="Weight"
                                            value={theme.footerWeight || 400}
                                            onChange={(e) => setTheme({ footerWeight: parseInt(e.target.value) })}
                                        >
                                            <option value="300" className="bg-[#121212]">Light</option>
                                            <option value="400" className="bg-[#121212]">Regular</option>
                                            <option value="500" className="bg-[#121212]">Medium</option>
                                            <option value="600" className="bg-[#121212]">Semibold</option>
                                            <option value="700" className="bg-[#121212]">Bold</option>
                                        </SelectField>

                                        {/* Text Transform */}
                                        <SelectField
                                            id="footer-transform-select"
                                            name="footer-transform"
                                            label="Transform"
                                            value={theme.footerTransform || 'none'}
                                            onChange={(e) => setTheme({ footerTransform: e.target.value })}
                                        >
                                            <option value="none" className="bg-[#121212]">None</option>
                                            <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                            <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                            <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                                        </SelectField>
                                    </div>

                                    {/* Font Size */}
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="footer-font-size" className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Size</label>
                                            <span className="text-[9px] font-bold text-white">{theme.footerFontSize || 12}px</span>
                                        </div>
                                        <input
                                            id="footer-font-size"
                                            name="footer-font-size"
                                            type="range"
                                            min="10"
                                            max="24"
                                            value={theme.footerFontSize || 12}
                                            onChange={(e) => setTheme({ footerFontSize: parseInt(e.target.value) })}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                    </div>
                                </div>
                                {theme.footerBtnTextColorType === 'solid' && (
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 focus-within:border-white/10">
                                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                            <input
                                                id="footer-text-color"
                                                name="footer-text-color"
                                                type="color"
                                                value={theme.footerBtnTextColor || '#ffffff'}
                                                onChange={(e) => setTheme({ footerBtnTextColor: e.target.value })}
                                                className="absolute inset-0 w-[150%] h-[150%] -translate-x-[25%] -translate-y-[25%] cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <input
                                                id="footer-text-color-hex"
                                                name="footer-text-color-hex"
                                                type="text"
                                                value={theme.footerBtnTextColor || '#ffffff'}
                                                onChange={(e) => setTheme({ footerBtnTextColor: e.target.value })}
                                                className="bg-transparent text-sm font-bold text-white outline-none uppercase"
                                            />
                                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Text Style</span>
                                        </div>
                                    </div>
                                )}

                                {theme.footerBtnTextColorType === 'gradient' && (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-text-gradient-1"
                                                name="footer-text-gradient-1"
                                                type="color"
                                                value={theme.footerBtnTextColorGradient1 || '#ffffff'}
                                                onChange={(e) => setTheme({ footerBtnTextColorGradient1: e.target.value })}
                                                className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnTextColorGradient1}</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-text-gradient-2"
                                                name="footer-text-gradient-2"
                                                type="color"
                                                value={theme.footerBtnTextColorGradient2 || '#cbd5e1'}
                                                onChange={(e) => setTheme({ footerBtnTextColorGradient2: e.target.value })}
                                                className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerBtnTextColorGradient2}</span>
                                        </div>
                                    </div>
                                )}

                                {theme.footerBtnTextColorType === 'pattern' && (
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-4 gap-2">
                                            {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                <button
                                                    key={p}
                                                    disabled={p === 'custom' && !theme.footerBtnTextColorCustomPattern}
                                                    onClick={() => setTheme({ footerBtnTextColorPattern: p })}
                                                    className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest ${theme.footerBtnTextColorPattern === p
                                                        ? 'bg-white text-black shadow-lg'
                                                        : 'text-white/50 hover:bg-white/5 hover:text-white'
                                                        } ${p === 'custom' && !theme.footerBtnTextColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                >
                                                    {p === 'custom' && theme.footerBtnTextColorCustomPattern ? (
                                                        <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerBtnTextColorCustomPattern}) center/cover` }} />
                                                    ) : p}
                                                </button>
                                            ))}
                                        </div>
                                        {theme.footerBtnTextColorPattern === 'custom' && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="file"
                                                    id="footer-text-pattern-upload"
                                                    name="footer-text-pattern-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setTheme({ footerBtnTextColorCustomPattern: reader.result, footerBtnTextColorPattern: 'custom' });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor="footer-text-pattern-upload"
                                                    className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-white/40 text-[10px] font-bold text-white/60 uppercase cursor-pointer"
                                                >
                                                    Change Custom Pattern
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Shadow Section */}
                    <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                                <Layers size={16} className="text-pink-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Shadow</span>
                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Depth & Dimension</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'X Offset', key: 'footerShadowX', min: -20, max: 20 },
                                { label: 'Y Offset', key: 'footerShadowY', min: -20, max: 20 },
                                { label: 'Blur', key: 'footerShadowBlur', min: 0, max: 50 },
                                { label: 'Spread', key: 'footerShadowSpread', min: -10, max: 20 },
                                { label: 'Opacity', key: 'footerShadowOpacity', min: 0, max: 1, step: 0.1 }
                            ].map(s => (
                                <div key={s.key} className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor={`footer-shadow-${s.key}`} className="text-[8px] font-bold text-white/50 uppercase">{s.label}</label>
                                        <span className="text-[8px] font-bold text-white">{theme[s.key]}{s.label === 'Opacity' ? '' : 'px'}</span>
                                    </div>
                                    <input
                                        id={`footer-shadow-${s.key}`}
                                        name={`footer-shadow-${s.key}`}
                                        type="range"
                                        min={s.min}
                                        max={s.max}
                                        step={s.step || 1}
                                        value={theme[s.key]}
                                        onChange={(e) => setTheme({ [s.key]: parseFloat(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Shadow Type Selector */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                            <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Shadow Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['solid', 'gradient', 'pattern'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTheme({ footerShadowType: type })}
                                        className={`py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${theme.footerShadowType === type
                                            ? 'bg-white text-black border-white'
                                            : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Conditional Shadow Inputs */}
                        {theme.footerShadowType === 'solid' && (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="footer-shadow-color" className="text-[8px] font-bold text-white/50 uppercase">Color</label>
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                                    <input
                                        id="footer-shadow-color"
                                        name="footer-shadow-color"
                                        type="color"
                                        value={theme.footerShadowColor}
                                        onChange={(e) => setTheme({ footerShadowColor: e.target.value })}
                                        className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                    />
                                    <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColor}</span>
                                </div>
                            </div>
                        )}

                        {theme.footerShadowType === 'gradient' && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Gradient Colors</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-shadow-gradient-1"
                                                name="footer-shadow-gradient-1"
                                                type="color"
                                                value={theme.footerShadowColorGradient1 || '#000000'}
                                                onChange={(e) => setTheme({ footerShadowColorGradient1: e.target.value })}
                                                className="w-6 h-6 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColorGradient1}</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                                            <input
                                                id="footer-shadow-gradient-2"
                                                name="footer-shadow-gradient-2"
                                                type="color"
                                                value={theme.footerShadowColorGradient2 || '#000000'}
                                                onChange={(e) => setTheme({ footerShadowColorGradient2: e.target.value })}
                                                className="w-6 h-6 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColorGradient2}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {theme.footerShadowType === 'pattern' && (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Select Pattern</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                            <button
                                                key={p}
                                                disabled={p === 'custom' && !theme.footerShadowCustomPattern}
                                                onClick={() => setTheme({ footerShadowPattern: p })}
                                                className={`py-2 px-1 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.footerShadowPattern === p
                                                    ? 'bg-white/20 text-white border border-white/20'
                                                    : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
                                                    } ${p === 'custom' && !theme.footerShadowCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                            >
                                                {p === 'custom' && theme.footerShadowCustomPattern ? (
                                                    <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.footerShadowCustomPattern}) center/cover` }} />
                                                ) : p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Pattern Color</span>
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 group focus-within:border-white/10 transition-all">
                                        <input
                                            id="footer-shadow-pattern-color"
                                            name="footer-shadow-pattern-color"
                                            type="color"
                                            value={theme.footerShadowColor || '#000000'}
                                            onChange={(e) => setTheme({ footerShadowColor: e.target.value })}
                                            className="w-6 h-6 rounded-md overflow-hidden cursor-pointer border border-white/10"
                                        />
                                        <span className="text-[10px] font-bold text-white uppercase">{theme.footerShadowColor}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                                    <input
                                        type="file"
                                        id="footer-shadow-pattern-upload"
                                        name="footer-shadow-pattern-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTheme({ footerShadowCustomPattern: reader.result, footerShadowPattern: 'custom' });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="footer-shadow-pattern-upload"
                                        className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-white/40 text-[10px] font-bold text-white/60 uppercase cursor-pointer"
                                    >
                                        Upload Pattern +
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Branding Section */}
                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/3 border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <Zap size={16} className="text-indigo-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Vlink Branding</span>
                            <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Logo Attribution</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setTheme({ showBranding: !theme.showBranding })}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.showBranding ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-white/5 border-white/10 text-white/60'}`}
                    >
                        {theme.showBranding ? 'Visible' : 'Hidden'}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default FooterSettings;
