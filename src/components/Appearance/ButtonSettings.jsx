import React, { memo } from 'react';
import { MousePointer2, LayoutGrid, Upload, Maximize, Type, Box, Zap } from 'lucide-react';
import { FONTS, ANIMATION_OPTIONS } from '../../data/constants';
import ColorPickerRow from '../ColorPickerRow';
import SelectField from '../SelectField';

const ButtonSettings = memo(({ theme, setTheme, buttonDesignSubTab, setButtonDesignSubTab }) => {
    return (
        <div className="flex flex-col gap-8">
            {/* Tab Title */}
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                    <MousePointer2 size={24} className="text-purple-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Buttons</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Styles & Appearance</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <LayoutGrid size={16} className="text-purple-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Button Design</span>
                            <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Base Styles</span>
                        </div>
                    </div>

                    {/* Style Presets */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'solid', label: 'Solid', icon: <div className="w-8 h-4 bg-current rounded-sm shadow-sm" /> },
                            { id: 'glass', label: 'Glass', icon: <div className="w-8 h-4 bg-current/20 rounded-sm border border-current/20 shadow-sm" /> },
                            { id: 'outline', label: 'Outline', icon: <div className="w-8 h-4 bg-transparent border-2 border-current rounded-sm shadow-sm" /> }
                        ].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => setTheme({ btnStyle: opt.id })}
                                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${theme.btnStyle === opt.id
                                    ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/10'
                                    : 'bg-black/20 border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                                    }`}
                            >
                                {opt.icon}
                                <span className="text-[9px] font-black uppercase tracking-[0.15em]">{opt.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Corner Roundness Slider */}
                    <div className="flex flex-col gap-4 py-6 border-y border-white/5">
                        <div className="flex items-center justify-between px-1">
                            <label htmlFor="btn-corner-roundness" className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Corner Roundness</label>
                            <span className="text-[10px] font-bold text-white">{theme.btnRadius}px</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                id="btn-corner-roundness"
                                name="btn-corner-roundness"
                                type="range"
                                min="0"
                                max="50"
                                value={typeof theme.btnRadius === 'number' ? theme.btnRadius : 12}
                                onChange={(e) => setTheme({ btnRadius: parseInt(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="flex justify-between px-0.5">
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Square</span>
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Pill</span>
                            </div>
                        </div>
                    </div>

                    {/* Body / Text Toggle */}
                    <div className="flex flex-col gap-4 pt-4">
                        <div className="flex bg-black/20 rounded-xl p-1 w-fit border border-white/5">
                            <button
                                onClick={() => setButtonDesignSubTab('body')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${buttonDesignSubTab === 'body' ? 'bg-purple-500/20 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5' : 'text-white/50 hover:text-white/50 border border-transparent'}`}
                            >
                                Body
                            </button>
                            <button
                                onClick={() => setButtonDesignSubTab('text')}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${buttonDesignSubTab === 'text' ? 'bg-purple-500/20 text-white border border-purple-500/20 shadow-lg shadow-purple-500/5' : 'text-white/50 hover:text-white/50 border border-transparent'}`}
                            >
                                Text
                            </button>
                        </div>

                        {/* Mode Selector (Solid/Gradient/Pattern) */}
                        <div className="flex items-center justify-between p-2 rounded-2xl bg-black/20 border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-2">Mode</span>
                            <div className="flex bg-white/5 rounded-xl p-0.5">
                                {['solid', 'gradient', 'pattern'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            const key = buttonDesignSubTab === 'body' ? 'btnColorType' : 'btnTextColorType';
                                            setTheme({ [key]: type });
                                        }}
                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${(buttonDesignSubTab === 'body' ? theme.btnColorType : theme.btnTextColorType) === type
                                            ? 'bg-purple-500/30 text-white shadow-xl shadow-purple-500/10 border border-purple-500/20'
                                            : 'text-white/40 hover:text-white'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sub-tab Content: BODY */}
                        {buttonDesignSubTab === 'body' && (
                            <div className="flex flex-col gap-4">
                                {theme.btnColorType === 'solid' && (
                                    <ColorPickerRow
                                        label="Button Color"
                                        value={theme.btnColor || theme.accentColor}
                                        onChange={(color) => setTheme({ btnColor: color })}
                                        colorId="btn-body-color"
                                        activeColor="purple"
                                    />
                                )}

                                {theme.btnColorType === 'gradient' && (
                                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                        <ColorPickerRow
                                            label="Gradient Start"
                                            value={theme.btnColorGradient1 || '#8228d9'}
                                            onChange={(color) => setTheme({ btnColorGradient1: color })}
                                            colorId="btn-body-gradient1"
                                            activeColor="purple"
                                        />
                                        <ColorPickerRow
                                            label="Gradient End"
                                            value={theme.btnColorGradient2 || '#6366f1'}
                                            onChange={(color) => setTheme({ btnColorGradient2: color })}
                                            colorId="btn-body-gradient2"
                                            activeColor="purple"
                                        />
                                        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="btn-body-gradient-angle" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Gradient Angle</label>
                                                <span className="text-[10px] font-bold text-white">{theme.btnGradientAngle || 135}°</span>
                                            </div>
                                            <input
                                                id="btn-body-gradient-angle"
                                                name="btn-body-gradient-angle"
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={theme.btnGradientAngle || 135}
                                                onChange={(e) => setTheme({ btnGradientAngle: parseInt(e.target.value) })}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {theme.btnColorType === 'pattern' && (
                                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                        <div className="flex flex-col gap-3">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Pattern Type</span>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                    <button
                                                        key={p}
                                                        disabled={p === 'custom' && !theme.btnColorCustomPattern}
                                                        onClick={() => setTheme({ btnColorPattern: p })}
                                                        className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${theme.btnColorPattern === p
                                                            ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/10'
                                                            : 'bg-black/20 border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                                                            } ${p === 'custom' && !theme.btnColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                    >
                                                        {p === 'custom' && theme.btnColorCustomPattern ? (
                                                            <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnColorCustomPattern}) center/cover` }} />
                                                        ) : p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <ColorPickerRow
                                            label="Pattern Color"
                                            value={theme.btnColor || theme.accentColor}
                                            onChange={(color) => setTheme({ btnColor: color })}
                                            colorId="btn-body-pattern-color"
                                            activeColor="purple"
                                        />

                                        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                            <label htmlFor="btn-body-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-purple-500/20 transition-all group">
                                                <Upload size={16} className="text-white/40 group-hover:text-purple-400" />
                                                <span className="text-[10px] font-bold text-white/60 group-hover:text-white">Choose Image</span>
                                                <input
                                                    type="file"
                                                    id="btn-body-pattern-upload"
                                                    name="btn-body-pattern-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setTheme({ btnColorCustomPattern: reader.result, btnColorPattern: 'custom' });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Button Dimensions */}
                                <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                                    <div className="flex items-center gap-3 px-1">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                            <Maximize size={16} className="text-emerald-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white">Sizing & Scale</span>
                                            <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Dimensions</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Width Control */}
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="btn-width-slider" className="text-[10px] font-black text-white/40 uppercase tracking-widest">Width</label>
                                                <span className="text-[10px] font-bold text-white">{theme.btnWidth || 100}%</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <input
                                                        id="btn-width-slider"
                                                        name="btn-width"
                                                        type="range"
                                                        min="50"
                                                        max="100"
                                                        value={theme.btnWidth || 100}
                                                        onChange={(e) => setTheme({ btnWidth: parseInt(e.target.value) })}
                                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                    />
                                                </div>
                                                <div className="w-16 input-premium-container">
                                                    <input
                                                        id="btn-width-number"
                                                        name="btn-width-number"
                                                        type="number"
                                                        min="50"
                                                        max="100"
                                                        value={theme.btnWidth || 100}
                                                        onChange={(e) => setTheme({ btnWidth: parseInt(e.target.value) })}
                                                        className="w-full bg-transparent text-center text-[11px] font-black text-white outline-none placeholder:text-white/40"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Height Control */}
                                        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="btn-height-slider" className="text-[10px] font-black text-white/40 uppercase tracking-widest">Height (Vertical Padding)</label>
                                                <span className="text-[10px] font-bold text-white">{theme.btnHeight || 14}px</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <input
                                                        id="btn-height-slider"
                                                        name="btn-height"
                                                        type="range"
                                                        min="8"
                                                        max="32"
                                                        value={theme.btnHeight || 14}
                                                        onChange={(e) => setTheme({ btnHeight: parseInt(e.target.value) })}
                                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                    />
                                                </div>
                                                <div className="w-16 input-premium-container">
                                                    <input
                                                        id="btn-height-number"
                                                        name="btn-height-number"
                                                        type="number"
                                                        min="8"
                                                        max="32"
                                                        value={theme.btnHeight || 14}
                                                        onChange={(e) => setTheme({ btnHeight: parseInt(e.target.value) })}
                                                        className="w-full bg-transparent text-center text-[11px] font-black text-white outline-none placeholder:text-white/40"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Spacing Control */}
                                        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between px-1">
                                                <label htmlFor="btn-spacing-slider" className="text-[10px] font-black text-white/40 uppercase tracking-widest">Button Spacing (Gap)</label>
                                                <span className="text-[10px] font-bold text-white">{theme.btnSpacing || 12}px</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <input
                                                        id="btn-spacing-slider"
                                                        name="btn-spacing"
                                                        type="range"
                                                        min="8"
                                                        max="40"
                                                        value={theme.btnSpacing || 12}
                                                        onChange={(e) => setTheme({ btnSpacing: parseInt(e.target.value) })}
                                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                    />
                                                </div>
                                                <div className="w-16 input-premium-container">
                                                    <input
                                                        id="btn-spacing-number"
                                                        name="btn-spacing-number"
                                                        type="number"
                                                        min="8"
                                                        max="40"
                                                        value={theme.btnSpacing || 12}
                                                        onChange={(e) => setTheme({ btnSpacing: parseInt(e.target.value) })}
                                                        className="w-full bg-transparent text-center text-[11px] font-black text-white outline-none placeholder:text-white/40"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sub-tab Content: TEXT */}
                        {buttonDesignSubTab === 'text' && (
                            <div className="flex flex-col gap-4 mt-2">
                                {/* Helper / Info */}
                                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                                    <Type size={14} className="text-white/60" />
                                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Button Typography</span>
                                </div>

                                {/* Font Family */}
                                <SelectField
                                    id="btn-font-select"
                                    name="btn-font"
                                    label="Font Family"
                                    value={theme.btnFont || 'Inter'}
                                    onChange={(e) => setTheme({ btnFont: e.target.value })}
                                >
                                    {FONTS.map(font => (
                                        <option key={font} value={font} className="bg-[#121212]">{font}</option>
                                    ))}
                                </SelectField>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Font Weight */}
                                    <SelectField
                                        id="btn-weight-select"
                                        name="btn-weight"
                                        label="Weight"
                                        value={theme.btnTextWeight || 600}
                                        onChange={(e) => setTheme({ btnTextWeight: parseInt(e.target.value) })}
                                    >
                                        <option value="300" className="bg-[#121212]">Light</option>
                                        <option value="400" className="bg-[#121212]">Regular</option>
                                        <option value="500" className="bg-[#121212]">Medium</option>
                                        <option value="600" className="bg-[#121212]">Semibold</option>
                                        <option value="700" className="bg-[#121212]">Bold</option>
                                        <option value="800" className="bg-[#121212]">Extra Bold</option>
                                    </SelectField>

                                    {/* Text Transform */}
                                    <SelectField
                                        id="btn-transform-select"
                                        name="btn-transform"
                                        label="Transform"
                                        value={theme.btnTextTransform || 'none'}
                                        onChange={(e) => setTheme({ btnTextTransform: e.target.value })}
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
                                        <label htmlFor="btn-font-size" className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Size</label>
                                        <span className="text-[9px] font-bold text-white">{theme.btnFontSize || 14}px</span>
                                    </div>
                                    <input
                                        id="btn-font-size"
                                        name="btn-font-size"
                                        type="range"
                                        min="10"
                                        max="32"
                                        value={theme.btnFontSize || 14}
                                        onChange={(e) => setTheme({ btnFontSize: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>

                                {/* Separator */}
                                <div className="h-px bg-white/5 my-2"></div>

                                {theme.btnTextColorType === 'solid' && (
                                    <ColorPickerRow
                                        label="Text Color"
                                        value={theme.btnTextColor || '#FFFFFF'}
                                        onChange={(color) => setTheme({ btnTextColor: color })}
                                        colorId="btn-text-color"
                                        activeColor="purple"
                                    />
                                )}

                                {theme.btnTextColorType === 'gradient' && (
                                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                        <ColorPickerRow
                                            label="Gradient Start"
                                            value={theme.btnTextColorGradient1 || '#ffffff'}
                                            onChange={(color) => setTheme({ btnTextColorGradient1: color })}
                                            colorId="btn-text-gradient1"
                                            activeColor="purple"
                                        />
                                        <ColorPickerRow
                                            label="Gradient End"
                                            value={theme.btnTextColorGradient2 || '#cbd5e1'}
                                            onChange={(color) => setTheme({ btnTextColorGradient2: color })}
                                            colorId="btn-text-gradient2"
                                            activeColor="purple"
                                        />
                                    </div>
                                )}

                                {theme.btnTextColorType === 'pattern' && (
                                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                        <div className="flex flex-col gap-3">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Pattern Type</span>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                                    <button
                                                        key={p}
                                                        disabled={p === 'custom' && !theme.btnTextColorCustomPattern}
                                                        onClick={() => setTheme({ btnTextColorPattern: p })}
                                                        className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${theme.btnTextColorPattern === p
                                                            ? 'bg-white text-black shadow-lg'
                                                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                                                            } ${p === 'custom' && !theme.btnTextColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                                    >
                                                        {p === 'custom' && theme.btnTextColorCustomPattern ? (
                                                            <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnTextColorCustomPattern}) center/cover` }} />
                                                        ) : p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <ColorPickerRow
                                            label="Pattern Color"
                                            value={theme.btnTextColor}
                                            onChange={(color) => setTheme({ btnTextColor: color })}
                                            colorId="btn-text-pattern-color"
                                            activeColor="purple"
                                        />

                                        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                            <label htmlFor="btn-text-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-purple-500/20 transition-all group">
                                                <Upload size={16} className="text-white/40 group-hover:text-purple-400" />
                                                <span className="text-[10px] font-bold text-white/60 group-hover:text-white">Choose Image</span>
                                                <input
                                                    type="file"
                                                    id="btn-text-pattern-upload"
                                                    name="btn-text-pattern-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setTheme({ btnTextColorCustomPattern: reader.result, btnTextColorPattern: 'custom' });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Animation Effect */}
                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Entrance Animation</span>
                            <div className="grid grid-cols-2 gap-2">
                                {ANIMATION_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setTheme({ btnAnimation: opt.id })}
                                        className={`py-3 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${(theme.btnAnimation || 'none') === opt.id
                                            ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                            : 'bg-black/20 text-white/50 border-white/5 hover:border-white/10 hover:text-white/60 hover:bg-white/5'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Shadow Panel */}
            <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Box size={16} className="text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Depth & Shadow</span>
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Button Elevation</span>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Shadow Offset & Blur */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Offset X</span>
                                <span className="text-[10px] font-bold text-white">{theme.btnShadowX || 0}px</span>
                            </div>
                            <input
                                type="range" min="-20" max="20"
                                id="btn-shadow-x"
                                name="btn-shadow-x"
                                value={theme.btnShadowX || 0}
                                onChange={(e) => setTheme({ btnShadowX: parseInt(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Offset Y</span>
                                <span className="text-[10px) font-bold text-white">{theme.btnShadowY || 0}px</span>
                            </div>
                            <input
                                type="range" min="-20" max="20"
                                id="btn-shadow-y"
                                name="btn-shadow-y"
                                value={theme.btnShadowY || 0}
                                onChange={(e) => setTheme({ btnShadowY: parseInt(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Blur</span>
                                <span className="text-[10px] font-bold text-white">{theme.btnShadowBlur || 0}px</span>
                            </div>
                            <input
                                type="range" min="0" max="50"
                                id="btn-shadow-blur"
                                name="btn-shadow-blur"
                                value={theme.btnShadowBlur || 0}
                                onChange={(e) => setTheme({ btnShadowBlur: parseInt(e.target.value) })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Opacity</span>
                                <span className="text-[10px] font-bold text-white">{Math.round((theme.btnShadowOpacity || 0) * 100)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100"
                                id="btn-shadow-opacity"
                                name="btn-shadow-opacity"
                                value={(theme.btnShadowOpacity || 0) * 100}
                                onChange={(e) => setTheme({ btnShadowOpacity: parseInt(e.target.value) / 100 })}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Shadow Color Mode Selector */}
                    <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between p-2 rounded-2xl bg-black/20 border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-2">Shadow Mode</span>
                            <div className="flex bg-white/5 rounded-xl p-0.5">
                                {['solid', 'gradient', 'pattern'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTheme({ btnShadowType: type })}
                                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${(theme.btnShadowType || 'solid') === type
                                            ? 'bg-indigo-500/30 text-white shadow-xl shadow-indigo-500/10 border border-indigo-500/20'
                                            : 'text-white/40 hover:text-white'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {(theme.btnShadowType === 'solid' || !theme.btnShadowType) && (
                            <ColorPickerRow
                                label="Shadow Color"
                                value={theme.btnShadowColor || '#000000'}
                                onChange={(color) => setTheme({ btnShadowColor: color })}
                                colorId="btn-shadow-color"
                                activeColor="purple"
                            />
                        )}

                        {theme.btnShadowType === 'gradient' && (
                            <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                <ColorPickerRow
                                    label="Gradient Start"
                                    value={theme.btnShadowColorGradient1 || '#000000'}
                                    onChange={(color) => setTheme({ btnShadowColorGradient1: color })}
                                    colorId="btn-shadow-gradient1"
                                    activeColor="purple"
                                />
                                <ColorPickerRow
                                    label="Gradient End"
                                    value={theme.btnShadowColorGradient2 || '#000000'}
                                    onChange={(color) => setTheme({ btnShadowColorGradient2: color })}
                                    colorId="btn-shadow-gradient2"
                                    activeColor="purple"
                                />
                            </div>
                        )}

                        {theme.btnShadowType === 'pattern' && (
                            <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/3 border border-white/5">
                                <div className="flex flex-col gap-3">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Pattern Type</span>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['dots', 'stripes', 'noise', 'custom'].map((p) => (
                                            <button
                                                key={p}
                                                disabled={p === 'custom' && !theme.btnShadowCustomPattern}
                                                onClick={() => setTheme({ btnShadowPattern: p })}
                                                className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${(theme.btnShadowPattern || 'dots') === p
                                                    ? 'bg-indigo-500/20 border-indigo-500/40 text-white shadow-xl shadow-indigo-500/10'
                                                    : 'bg-black/20 border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                                                    } ${p === 'custom' && !theme.btnShadowCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                            >
                                                {p === 'custom' && theme.btnShadowCustomPattern ? (
                                                    <div className="w-4 h-4 rounded-sm border border-white/10 mx-auto" style={{ background: `url(${theme.btnShadowCustomPattern}) center/cover` }} />
                                                ) : p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <ColorPickerRow
                                    label="Pattern Color"
                                    value={theme.btnShadowColor || '#000000'}
                                    onChange={(color) => setTheme({ btnShadowColor: color })}
                                    colorId="btn-shadow-pattern-color"
                                    activeColor="purple"
                                />

                                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest px-1">Upload Custom Pattern</span>
                                    <label htmlFor="btn-shadow-pattern-upload" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 hover:border-indigo-500/20 transition-all group">
                                        <Upload size={16} className="text-white/40 group-hover:text-indigo-400" />
                                        <span className="text-[10px] font-bold text-white/60 group-hover:text-white">Choose Image</span>
                                        <input
                                            type="file"
                                            id="btn-shadow-pattern-upload"
                                            name="btn-shadow-pattern-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setTheme({ btnShadowCustomPattern: reader.result, btnShadowPattern: 'custom' });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shadow Animation Selector */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Shadow Animation</span>
                        <div className="grid grid-cols-2 gap-2">
                            {ANIMATION_OPTIONS.map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => setTheme({ btnShadowAnimation: opt.id })}
                                    className={`py-3 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${(theme.btnShadowAnimation || 'none') === opt.id
                                        ? 'bg-indigo-500/20 text-white border-indigo-500/40 shadow-xl shadow-indigo-500/10'
                                        : 'bg-black/20 text-white/50 border-white/5 hover:border-white/10 hover:text-white/60 hover:bg-white/5'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Interactions Panel */}
            <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Zap size={16} className="text-amber-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Interactions</span>
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Hover & Effects</span>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Hover Effect */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Hover Response</span>
                        <div className="grid grid-cols-4 gap-2">
                            {['none', 'lift', 'scale', 'glow'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setTheme({ btnHoverEffect: opt })}
                                    className={`py-3 px-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${theme.btnHoverEffect === opt
                                        ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                        : 'bg-black/20 text-white/40 border-white/5 hover:border-white/10 hover:text-white/60'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Press Effect */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Press Response</span>
                        <div className="grid grid-cols-3 gap-3">
                            {['none', 'push', 'inset'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setTheme({ btnPressEffect: opt })}
                                    className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${theme.btnPressEffect === opt
                                        ? 'bg-amber-500/20 text-white border-amber-500/40 shadow-xl shadow-amber-500/10'
                                        : 'bg-black/20 text-white/40 border-white/5 hover:border-white/10 hover:text-white/60'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ButtonSettings;
