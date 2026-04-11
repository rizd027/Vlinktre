import React, { memo } from 'react';
import { Palette, Paintbrush, Zap } from 'lucide-react';
import { THEMES } from '../../data/constants';

const ThemeSettings = memo(({ theme, setTheme }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shadow-xl shadow-orange-500/5">
                    <Palette size={24} className="text-orange-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Themes</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Select a visual preset</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {THEMES.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTheme({ ...t, pageColor: t.color, titleColor: t.color })}
                        className="flex flex-col items-center gap-4 group relative"
                    >
                        <div
                            className={`w-full aspect-4/5 rounded-[2rem] border-2 p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${theme.id === t.id ? 'border-orange-500/40 bg-orange-500/5 shadow-2xl shadow-orange-500/10' : 'border-white/5 bg-white/2 group-hover:border-white/10 group-hover:bg-white/5 group-hover:scale-[1.02]'}`}
                            style={{
                                background: theme.id === t.id ? undefined : t.bg,
                                backgroundImage: (t.bg && t.bg.includes('gradient')) ? t.bg : undefined
                            }}
                        >
                            {t.id === 'custom' ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <Paintbrush size={24} className="text-white/60" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Create Custom</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center w-full gap-4">
                                    <span className="text-3xl font-black mb-2 filter drop-shadow-lg" style={{ color: t.color }}>Aa</span>
                                    <div className="w-full flex flex-col gap-2 p-2 rounded-xl bg-black/20 border border-white/5 backdrop-blur-sm">
                                        <div className="w-full h-4 rounded-lg shadow-sm" style={{ backgroundColor: t.accentColor, border: t.btnStyle === 'outline' ? `1px solid ${t.color}` : 'none' }} />
                                        <div className="w-2/3 h-1.5 rounded-full bg-white/10" />
                                        <div className="w-1/2 h-1.5 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            )}

                            {theme.id === t.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-500 border border-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/50 scale-110 active:scale-95 transition-transform">
                                    <Zap size={12} className="text-white fill-white" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${theme.id === t.id ? 'text-orange-400' : 'text-white/40 group-hover:text-white/60'}`}>{t.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
});

export default ThemeSettings;
