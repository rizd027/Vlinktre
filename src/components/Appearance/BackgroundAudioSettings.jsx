import React, { memo, useRef, useState } from 'react';
import { Music, Upload, Trash2, Volume2, Link as LinkIcon, PlayCircle, Power } from 'lucide-react';

const BackgroundAudioSettings = memo(({ theme, setTheme }) => {
    const fileInputRef = useRef(null);
    const [urlInput, setUrlInput] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTheme({ ...theme, backgroundAudio: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('audio/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTheme({ ...theme, backgroundAudio: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlAdd = () => {
        if (urlInput) {
            setTheme({ ...theme, backgroundAudio: urlInput });
            setUrlInput('');
        }
    };

    const handleRemoveAudio = () => {
        setTheme({ ...theme, backgroundAudio: null });
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Tab Title */}
            <div className="flex items-center gap-4 px-1">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shadow-xl shadow-fuchsia-500/5">
                    <Music size={24} className="text-fuchsia-400" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white tracking-tight">Background Audio</h2>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Add music to your page</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Audio Upload/Input Area */}
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/10">
                            <Upload size={12} className="text-fuchsia-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Audio Source</span>
                    </div>

                    {!theme.backgroundAudio ? (
                        <>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer group ${isDragging ? 'border-fuchsia-500 bg-fuchsia-500/10 scale-[1.02]' : 'border-white/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5'}`}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-fuchsia-400 group-hover:scale-110 transition-all">
                                    <Music size={32} />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-white text-sm">Upload Audio File</div>
                                    <div className="text-xs text-white/50 mt-1">MP3, WAV, or OGG</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/5"></div>
                                <span className="text-[10px] font-bold text-white/40 uppercase">OR</span>
                                <div className="h-px flex-1 bg-white/5"></div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-bold text-white/60">Enter Audio URL</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                                            <LinkIcon size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            placeholder="https://example.com/audio.mp3"
                                            className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-fuchsia-500/30 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                    <button
                                        onClick={handleUrlAdd}
                                        disabled={!urlInput}
                                        className="px-6 py-3 rounded-xl bg-fuchsia-600 text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-fuchsia-500 transition-all active:scale-95"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shrink-0">
                                        <PlayCircle size={24} />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-bold text-white text-sm truncate">Audio Track Added</span>
                                        <span className="text-[10px] text-fuchsia-400/80 font-black uppercase tracking-widest truncate">{theme.backgroundAudio.startsWith('data:') ? 'Local Upload' : 'External Link'}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRemoveAudio}
                                    className="p-3 rounded-xl hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all shrink-0"
                                    title="Remove Audio"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="audio/*"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>

                {/* Playback Controls */}
                <div className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col gap-8 ${theme.backgroundAudio ? 'bg-white/3 border-white/5 opacity-100' : 'bg-white/2 border-transparent opacity-50 pointer-events-none'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                            <Volume2 size={12} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Playback</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-sm">Autoplay</span>
                            <span className="text-[10px] text-white/50 w-4/5 pt-1">Start playing automatically when visitors load your page (some browsers may restrict this).</span>
                        </div>
                        <button
                            onClick={() => setTheme({ ...theme, audioAutoplay: !theme.audioAutoplay })}
                            className={`w-12 h-6 rounded-full relative transition-all duration-300 shrink-0 ${theme.audioAutoplay ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${theme.audioAutoplay ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="audio-volume" className="text-sm font-bold text-white/80">Default Volume</label>
                            <span className="text-xs font-black text-emerald-400">{theme.audioVolume}%</span>
                        </div>
                        <div className="relative flex items-center group">
                            <input
                                id="audio-volume"
                                type="range"
                                min="0"
                                max="100"
                                value={theme.audioVolume || 50}
                                onChange={(e) => setTheme({ ...theme, audioVolume: parseInt(e.target.value) })}
                                className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer relative z-10 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(16,185,129,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                style={{
                                    background: `linear-gradient(to right, #10b981 ${theme.audioVolume}%, rgba(255, 255, 255, 0.05) ${theme.audioVolume}%)`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BackgroundAudioSettings;
