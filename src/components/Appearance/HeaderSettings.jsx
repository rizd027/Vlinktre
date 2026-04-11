import React, { memo } from 'react';
import { 
    User, Edit3, EyeOff, Eye, LayoutGrid, Wand2, 
    Image, Layers, Type, Maximize, Box, MousePointer2, Zap,
    Trash2
} from 'lucide-react';
import { FONTS, ANIMATION_OPTIONS } from '../../data/constants';
import ColorPickerRow from '../ColorPickerRow';
import ModeSelector from '../ModeSelector';
import SelectField from '../SelectField';

const HeaderSettings = memo(({ profile, setProfile, theme, setTheme, setProfileImageModalOpen, setLogoImageModalOpen }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4 px-1">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-xl shadow-purple-500/5">
                        <User size={24} className="text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white tracking-tight">Header</h2>
                        <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Update your profile info</p>
                    </div>
                </div>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl md:rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt="Avatar"
                                    loading="lazy"
                                    decoding="async"
                                    width="80"
                                    height="80"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                            ) : null}
                            {(!profile.avatar) || (profile.avatar === '') ? (
                                <User size={32} className="text-white/40" />
                            ) : (
                                <User size={32} className="text-white/40 hidden" />
                            )}
                            <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Profile Avatar</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setProfileImageModalOpen(true)}
                                className="px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 text-white transition-all hover:scale-105 shadow-xl shadow-white/5"
                            >
                                <Edit3 size={12} />
                                Change Image
                            </button>
                            <button
                                onClick={() => setProfile({ showAvatar: !profile.showAvatar })}
                                className={`px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-white/5 ${profile.showAvatar ? 'text-white' : 'text-white/60'}`}
                            >
                                {profile.showAvatar ? <EyeOff size={12} /> : <Eye size={12} />}
                                {profile.showAvatar ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Avatar Size Section */}
                <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
                                <LayoutGrid size={12} className="text-orange-400" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Avatar Size</span>
                        </div>
                        <div className="text-[10px] font-bold text-white/60 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                            {typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : 100)}%
                        </div>
                    </div>

                    <div className="flex items-center gap-4 px-1">
                        <label htmlFor="header-size-range" className="sr-only">Header Size Range</label>
                        <span className="text-[10px] font-bold text-white/50">20%</span>
                        <input
                            id="header-size-range"
                            name="header-size-range"
                            type="range"
                            min="20"
                            max="150"
                            step="5"
                            value={typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))}
                            onChange={(e) => setProfile({ headerSize: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
                        />
                        <span className="text-[10px] font-bold text-white/50">150%</span>
                    </div>

                    <div className="flex gap-2">
                        {[80, 100, 120].map(size => (
                            <button
                                key={size}
                                onClick={() => setProfile({ headerSize: size })}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${(typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))) === size
                                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                                    : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                                    }`}
                            >
                                {size === 80 ? 'Small' : size === 100 ? 'Normal' : 'Large'}
                            </button>
                        ))}
                        <div className="flex-1"></div>
                        <label htmlFor="header-size-number" className="sr-only">Header Size Number</label>
                        <div className="w-16 input-premium-container !h-9">
                            <input
                                id="header-size-number"
                                name="header-size-number"
                                type="number"
                                min="20"
                                max="150"
                                value={typeof profile.headerSize === 'number' ? profile.headerSize : (profile.headerSize === 'small' ? 80 : (profile.headerSize === 'large' ? 120 : 100))}
                                onChange={(e) => {
                                    let val = parseInt(e.target.value);
                                    if (val > 150) val = 150;
                                    if (val < 20) val = 20;
                                    setProfile({ headerSize: val });
                                }}
                                className="w-full bg-transparent text-center text-[11px] font-black text-white outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Avatar Animation Section */}
                <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                            <Wand2 size={12} className="text-pink-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Avatar Animation</span>
                    </div>
                    <div className="p-1 bg-black/20 rounded-xl border border-white/5">
                        <SelectField
                            id="header-animation-select"
                            label=""
                            value={theme.headerAnimation || 'none'}
                            onChange={(e) => setTheme({ headerAnimation: e.target.value })}
                            className="bg-transparent border-none text-[11px] font-bold"
                        >
                            {ANIMATION_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                            ))}
                        </SelectField>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/10">
                        <User size={12} className="text-purple-400" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Profile Username layout</span>
                </div>
                <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                    {[
                        { id: 'classic', label: 'Classic', icon: User },
                        { id: 'hero', label: 'Hero', icon: LayoutGrid }
                    ].map(option => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.id}
                                onClick={() => setProfile({ headerLayout: option.id })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${profile.headerLayout === option.id ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                            >
                                <Icon size={14} />
                                {option.label}
                            </button>
                        );
                    })}
                </div>

                {/* Display Username Section */}
                <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between px-1">
                        <label htmlFor="editor-profile-title" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Display Username</label>
                        <button
                            onClick={() => setProfile({ showTitle: !profile.showTitle })}
                            className={`px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-white/5 ${profile.showTitle !== false ? 'text-white' : 'text-white/60'}`}
                        >
                            {profile.showTitle !== false ? <EyeOff size={12} /> : <Eye size={12} />}
                            {profile.showTitle !== false ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <input
                        id="editor-profile-title"
                        name="editor-profile-title"
                        value={profile.username}
                        onChange={(e) => setProfile({ username: e.target.value })}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-5 py-3 text-sm font-bold text-white outline-none focus:border-purple-500/20 focus:bg-white/5 transition-all placeholder:text-white/30"
                        placeholder="@username"
                    />
                </div>

                {/* Username Style Section */}
                <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                            <Layers size={12} className="text-blue-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Username style</span>
                    </div>
                    <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                        {[
                            { id: 'text', label: 'Text', icon: Type },
                            { id: 'logo', label: 'Logo', icon: Image }
                        ].map(option => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => setTheme({ titleStyle: option.id })}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${theme.titleStyle === option.id ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-xl shadow-purple-500/5' : 'bg-transparent border-transparent text-white/60 hover:text-white/60'}`}
                                >
                                    <Icon size={14} />
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>

                    {theme.titleStyle === 'logo' && (
                        <div className="flex flex-col gap-6 pt-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                        {theme.titleLogo ? (
                                            <img
                                                src={theme.titleLogo}
                                                alt="Logo Preview"
                                                className="w-full h-full object-contain p-2"
                                            />
                                        ) : (
                                            <Image size={24} className="text-white/30" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <button
                                        onClick={() => setLogoImageModalOpen(true)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit3 size={12} />
                                        {theme.titleLogo ? 'Change Logo' : 'Upload Logo'}
                                    </button>
                                    {theme.titleLogo && (
                                        <button
                                            onClick={() => setTheme({ titleLogo: null })}
                                            className="w-full px-4 py-2 rounded-xl hover:bg-red-500/5 text-red-500/40 hover:text-red-500 text-[9px] font-bold uppercase tracking-widest transition-all"
                                        >
                                            Remove Logo
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Logo Size</span>
                                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/10">{theme.titleLogoSize || 100}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="200"
                                    step="5"
                                    value={theme.titleLogoSize || 100}
                                    onChange={(e) => setTheme({ titleLogoSize: parseInt(e.target.value) })}
                                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Username Text Appearance Section */}
                <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Username Text Appearance</span>

                    <div className="grid grid-cols-1 gap-4">
                        <SelectField
                            id="title-font-select"
                            name="title-font"
                            label="Font Family"
                            value={theme.titleFont || 'Inter'}
                            onChange={(e) => setTheme({ titleFont: e.target.value })}
                        >
                            {FONTS.map(font => (
                                <option key={font} value={font} className="bg-[#121212]">{font}</option>
                            ))}
                        </SelectField>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectField
                                id="title-weight-select"
                                name="title-weight"
                                label="Weight"
                                value={theme.titleWeight || 700}
                                onChange={(e) => setTheme({ titleWeight: parseInt(e.target.value) })}
                            >
                                <option value="300" className="bg-[#121212]">Light</option>
                                <option value="400" className="bg-[#121212]">Regular</option>
                                <option value="500" className="bg-[#121212]">Medium</option>
                                <option value="600" className="bg-[#121212]">Semibold</option>
                                <option value="700" className="bg-[#121212]">Bold</option>
                                <option value="800" className="bg-[#121212]">Extra Bold</option>
                                <option value="900" className="bg-[#121212]">Black</option>
                            </SelectField>
                            <SelectField
                                id="title-transform-select"
                                name="title-transform"
                                label="Transform"
                                value={theme.titleTransform || 'none'}
                                onChange={(e) => setTheme({ titleTransform: e.target.value })}
                            >
                                <option value="none" className="bg-[#121212]">None</option>
                                <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                            </SelectField>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 px-1">
                        <div className="flex items-center justify-between">
                            <label htmlFor="title-size-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Font Size</label>
                            <span className="text-[10px] font-bold text-white">{theme.titleSize || 20}px</span>
                        </div>
                        <input
                            id="title-size-slider"
                            name="title-size"
                            type="range"
                            min="12"
                            max="64"
                            value={theme.titleSize || 20}
                            onChange={(e) => setTheme({ titleSize: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <SelectField
                            id="title-animation-select"
                            name="title-animation"
                            label="Username Animation"
                            value={theme.titleAnimation || 'none'}
                            onChange={(e) => setTheme({ titleAnimation: e.target.value })}
                        >
                            {ANIMATION_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                            ))}
                        </SelectField>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Username Color Mode</label>
                        </div>
                        <ModeSelector
                            mode={theme.titleColorType || 'solid'}
                            onChange={(mode) => setTheme({ titleColorType: mode })}
                            activeColor="purple"
                        />
                    </div>

                    {(!theme.titleColorType || theme.titleColorType === 'solid') && (
                        <ColorPickerRow
                            label="Username Color"
                            value={theme.titleColor || '#ffffff'}
                            onChange={(val) => setTheme({ titleColor: val })}
                            colorId="title-color"
                            activeColor="purple"
                        />
                    )}

                    {theme.titleColorType === 'gradient' && (
                        <div className="flex flex-col gap-4">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Gradient Colors</span>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                    <input
                                        type="color"
                                        id="title-color-gradient-1"
                                        name="title-color-gradient-1"
                                        value={theme.titleColorGradient1 || '#8228d9'}
                                        onChange={(e) => setTheme({ titleColorGradient1: e.target.value })}
                                        className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.titleColorGradient1 || '#8228d9'}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                    <input
                                        type="color"
                                        id="title-color-gradient-2"
                                        name="title-color-gradient-2"
                                        value={theme.titleColorGradient2 || '#6366f1'}
                                        onChange={(e) => setTheme({ titleColorGradient2: e.target.value })}
                                        className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.titleColorGradient2 || '#6366f1'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {theme.titleColorType === 'pattern' && (
                        <div className="flex flex-col gap-4">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Pattern Style</span>
                            <div className="grid grid-cols-3 gap-2">
                                {['dots', 'stripes', 'custom'].map((p) => (
                                    <button
                                        key={p}
                                        disabled={p === 'custom' && !theme.titleColorCustomPattern}
                                        onClick={() => setTheme({ titleColorPattern: p })}
                                        className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.titleColorPattern === p
                                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                                            } ${p === 'custom' && !theme.titleColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <ColorPickerRow
                                label="Pattern Color"
                                value={theme.titleColor || '#ffffff'}
                                onChange={(val) => setTheme({ titleColor: val })}
                                colorId="title-pattern-color"
                                activeColor="purple"
                            />
                            {theme.titleColorPattern === 'custom' && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        id="title-pattern-upload"
                                        name="title-pattern-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTheme({ titleColorCustomPattern: reader.result, titleColorPattern: 'custom' });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="title-pattern-upload"
                                        className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-purple-500/40 text-[10px] font-bold text-white/60 uppercase cursor-pointer transition-all"
                                    >
                                        Upload Pattern +
                                    </label>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {profile.headerLayout === 'hero' && (
                <div className="flex-none flex flex-col gap-4 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-6 h-6 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/10">
                            <Zap size={12} className="text-pink-400" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Hero Model Style</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'joined', label: 'Joined', icon: Layers },
                            { id: 'float', label: 'Float', icon: MousePointer2 },
                            { id: 'minimal', label: 'Minimal', icon: Square },
                            { id: 'glass', label: 'Glass', icon: Box }
                        ].map(option => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => setProfile({ heroModel: option.id })}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${profile.heroModel === option.id ? 'bg-pink-500/20 border-pink-500/40 text-white shadow-xl shadow-pink-500/5' : 'bg-black/20 border-transparent text-white/60 hover:text-white/60'}`}
                                >
                                    <Icon size={14} />
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}


            {/* Typography Section */}
            <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Type size={16} className="text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Typography</span>
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Font & Style</span>
                    </div>
                </div>

                {/* Bio Settings */}
                {/* Bio Input Section */}
                <div className="flex flex-col gap-2 px-2 pb-6">
                    <div className="flex items-center justify-between px-1">
                        <label htmlFor="editor-profile-bio" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Bio Description</label>
                        <button
                            onClick={() => setProfile({ showBio: profile.showBio === false ? true : false })}
                            className={`px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-white/5 ${profile.showBio !== false ? 'text-white' : 'text-white/60'}`}
                        >
                            {profile.showBio !== false ? <EyeOff size={12} /> : <Eye size={12} />}
                            {profile.showBio !== false ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <textarea
                        id="editor-profile-bio"
                        name="editor-profile-bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ bio: e.target.value })}
                        rows={2}
                        className="w-full bg-white/3 border border-white/5 rounded-xl px-5 py-3 text-sm font-medium text-white outline-none focus:border-purple-500/20 focus:bg-white/5 transition-all placeholder:text-white/30 resize-none"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Bio Text Appearance</span>

                    <div className="grid grid-cols-1 gap-4">
                        <SelectField
                            id="bio-font-select"
                            name="bio-font"
                            label="Font Family"
                            value={theme.pageFont || 'Inter'}
                            onChange={(e) => setTheme({ pageFont: e.target.value })}
                        >
                            {FONTS.map(font => (
                                <option key={font} value={font} className="bg-[#121212]">{font}</option>
                            ))}
                        </SelectField>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectField
                                id="bio-weight-select"
                                name="bio-weight"
                                label="Weight"
                                value={theme.pageWeight || 400}
                                onChange={(e) => setTheme({ pageWeight: parseInt(e.target.value) })}
                            >
                                <option value="300" className="bg-[#121212]">Light</option>
                                <option value="400" className="bg-[#121212]">Regular</option>
                                <option value="500" className="bg-[#121212]">Medium</option>
                                <option value="600" className="bg-[#121212]">Semibold</option>
                                <option value="700" className="bg-[#121212]">Bold</option>
                            </SelectField>
                            <SelectField
                                id="bio-transform-select"
                                name="bio-transform"
                                label="Transform"
                                value={theme.pageTransform || 'none'}
                                onChange={(e) => setTheme({ pageTransform: e.target.value })}
                            >
                                <option value="none" className="bg-[#121212]">None</option>
                                <option value="uppercase" className="bg-[#121212]">Uppercase</option>
                                <option value="lowercase" className="bg-[#121212]">Lowercase</option>
                                <option value="capitalize" className="bg-[#121212]">Capitalize</option>
                            </SelectField>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 px-1">
                        <div className="flex items-center justify-between">
                            <label htmlFor="bio-size-slider" className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Bio Size</label>
                            <span className="text-[10px] font-bold text-white">{theme.pageSize || 14}px</span>
                        </div>
                        <input
                            id="bio-size-slider"
                            name="bio-size"
                            type="range"
                            min="10"
                            max="32"
                            value={theme.pageSize || 14}
                            onChange={(e) => setTheme({ pageSize: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    {/* Bio Animation */}
                    <div className="flex flex-col gap-2">
                        <SelectField
                            id="bio-animation-select"
                            name="bio-animation"
                            label="Bio Animation"
                            value={theme.pageAnimation || 'none'}
                            onChange={(e) => setTheme({ pageAnimation: e.target.value })}
                        >
                            {ANIMATION_OPTIONS.map(opt => (
                                <option key={opt.id} value={opt.id} className="bg-[#121212]">{opt.label}</option>
                            ))}
                        </SelectField>
                    </div>


                    {/* Bio Color Mode Selector */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Bio Color Mode</span>
                        </div>
                        <ModeSelector
                            mode={theme.pageColorType || 'solid'}
                            onChange={(mode) => setTheme({ pageColorType: mode })}
                            activeColor="purple"
                        />
                    </div>

                    {/* Bio Color Controls */}
                    {(!theme.pageColorType || theme.pageColorType === 'solid') && (
                        <ColorPickerRow
                            label="Bio Color"
                            value={theme.pageColor || '#ffffff'}
                            onChange={(val) => setTheme({ pageColor: val })}
                            colorId="bio-color"
                            activeColor="purple"
                        />
                    )}

                    {theme.pageColorType === 'gradient' && (
                        <div className="flex flex-col gap-4">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Gradient Colors</span>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                    <input
                                        type="color"
                                        id="page-color-gradient-1"
                                        name="page-color-gradient-1"
                                        value={theme.pageColorGradient1 || '#8228d9'}
                                        onChange={(e) => setTheme({ pageColorGradient1: e.target.value })}
                                        className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.pageColorGradient1 || '#8228d9'}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/20 border border-white/5">
                                    <input
                                        type="color"
                                        id="page-color-gradient-2"
                                        name="page-color-gradient-2"
                                        value={theme.pageColorGradient2 || '#6366f1'}
                                        onChange={(e) => setTheme({ pageColorGradient2: e.target.value })}
                                        className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-white/10"
                                    />
                                    <span className="text-[10px] font-mono font-bold text-white uppercase">{theme.pageColorGradient2 || '#6366f1'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {theme.pageColorType === 'pattern' && (
                        <div className="flex flex-col gap-4">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Pattern Style</span>
                            <div className="grid grid-cols-3 gap-2">
                                {['dots', 'stripes', 'custom'].map((p) => (
                                    <button
                                        key={p}
                                        disabled={p === 'custom' && !theme.pageColorCustomPattern}
                                        onClick={() => setTheme({ pageColorPattern: p })}
                                        className={`py-2.5 px-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${theme.pageColorPattern === p
                                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                                            } ${p === 'custom' && !theme.pageColorCustomPattern ? 'opacity-20 cursor-not-allowed' : ''}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <ColorPickerRow
                                label="Pattern Color"
                                value={theme.pageColor || '#ffffff'}
                                onChange={(val) => setTheme({ pageColor: val })}
                                colorId="bio-pattern-color"
                                activeColor="purple"
                            />
                            {theme.pageColorPattern === 'custom' && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        id="bio-pattern-upload"
                                        name="bio-pattern-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setTheme({ pageColorCustomPattern: reader.result, pageColorPattern: 'custom' });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="bio-pattern-upload"
                                        className="w-full text-center px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-purple-500/40 text-[10px] font-bold text-white/60 uppercase cursor-pointer transition-all"
                                    >
                                        Upload Pattern +
                                    </label>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Header Spacing — standalone frame at the bottom */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl md:rounded-[2rem] bg-white/3 border border-white/5">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/10">
                        <Maximize size={12} className="text-blue-400" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">Header Spacing</span>
                </div>
                <div className="flex flex-col gap-5 px-1">
                    {/* 1. Spacing atas Avatar */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest">↑ Avatar Top</label>
                            <span className="text-[10px] font-bold text-white">{profile.spacingAvatar ?? 16}px</span>
                        </div>
                        <input
                            type="range" min="0" max="120"
                            value={profile.spacingAvatar ?? 16}
                            onChange={(e) => setProfile({ spacingAvatar: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                    {/* 2. Spacing atas Username */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest">↑ Username Top</label>
                            <span className="text-[10px] font-bold text-white">{profile.spacingUsername ?? 12}px</span>
                        </div>
                        <input
                            type="range" min="0" max="80"
                            value={profile.spacingUsername ?? 12}
                            onChange={(e) => setProfile({ spacingUsername: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                    {/* 3. Spacing atas Bio */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest">↑ Bio Top</label>
                            <span className="text-[10px] font-bold text-white">{profile.spacingBio ?? 6}px</span>
                        </div>
                        <input
                            type="range" min="0" max="80"
                            value={profile.spacingBio ?? 6}
                            onChange={(e) => setProfile({ spacingBio: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                    {/* 4. Spacing atas Content (Tombol/Link) */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest">↑ Content Top</label>
                            <span className="text-[10px] font-bold text-white">{profile.spacingContent ?? 32}px</span>
                        </div>
                        <input
                            type="range" min="0" max="120"
                            value={profile.spacingContent ?? 32}
                            onChange={(e) => setProfile({ spacingContent: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HeaderSettings;
