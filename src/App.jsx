import React, { useState, useEffect, useRef, useDeferredValue, memo, useCallback, useTransition } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import PreviewSection from './components/PreviewSection';
import ExportModal from './components/ExportModal';
import TikTok from './components/TikTok';
import { LAYOUT_OPTIONS, SIDEBAR_ITEMS, FONTS, THEMES, PLATFORMS, ANIMATION_OPTIONS } from './data/constants';

// Appearance Sub-components
import HeaderSettings from './components/Appearance/HeaderSettings';
import ThemeSettings from './components/Appearance/ThemeSettings';
import WallpaperSettings from './components/Appearance/WallpaperSettings';
import ButtonSettings from './components/Appearance/ButtonSettings';
import FooterSettings from './components/Appearance/FooterSettings';
import SocialSettings from './components/Appearance/SocialSettings';
import BackgroundAudioSettings from './components/Appearance/BackgroundAudioSettings';
import {
    PanelLeft, Palette, Settings, LogOut, ExternalLink,
    Plus, Search, Github, Twitter, Instagram, Youtube, Linkedin,
    MoreHorizontal, Share2, PanelRight, Smartphone, Eye, EyeOff, Layout, Type, PaintRoller,
    Image, Zap, Bell, QrCode, Globe, Clock, Shield, Trash2, Edit2, Link2,
    Check, ChevronRight, ChevronLeft, X, Star, BarChart2, Calendar, Lock, Upload, Copy, Heart,
    ArrowRight, GripVertical, Edit3, LayoutGrid, Monitor, ShoppingBag, Music,
    FileText, Lightbulb, Tag, Link as LinkIcon,
    ArrowUp, ArrowDown, Circle, ChevronDown, Video, User, Square, Paintbrush,
    LayoutTemplate, MousePointer2, Droplets, Footprints, Wand2, AlignLeft,
    AlignCenter, AlignRight, Layers, Maximize, Box, Share, Wand, FileCode, Download,
    Rss, Laptop, Tablet,
    AtSign, Hash, MessageCircle, Send, Mail, MessageSquare, Wallet, Landmark, PiggyBank, CreditCard, Banknote,
    Receipt, DollarSign, Coins, ShoppingCart, Store, Package, Truck, Ticket, Code, FileJson,
    Terminal, Database, Server, Cpu, HardDrive, Keyboard, Mouse, Speaker, Cast, Tv,
    Headphones, Mic, Aperture, Brush, Contrast, Move, Scissors, Eraser, Columns, Grid,
    Minimize, Scaling, Pencil, Highlighter, PenTool, Book, BookOpen, Briefcase, Award,
    Trophy, Medal, Target, Flag, GraduationCap, Activity, HeartPulse, Thermometer, Gem,
    Crown, Sparkles, Rocket, Telescope, Microscope, Atom, FlaskConical, Brain, Fingerprint,
    Scan, Barcode, Coffee, Pizza, Utensils, GlassWater, Beer, Wine, Cake,
    Ghost, Gamepad2, Puzzle, Sun, Moon, Cloud, CloudRain, CloudSnow,
    CloudLightning, Umbrella, Plane, Train, Bus, Car, Bike, Flame, Leaf, TreeDeciduous,
    PawPrint, Dog, Cat, Bird, Fish, Bug, Mountain, Waves, Wind, Map, Navigation, Pin,
    ThumbsUp, ThumbsDown, Laugh, Smile, Frown, Meh, Angry, Annoyed, CheckCircle2, HelpCircle,
    Info, AlertCircle, AlertTriangle, ShieldCheck, ShieldAlert, ShieldQuestion, Unlock, Key,
    Sliders, Filter, Home, Building, Hotel, MapPin, Archive, FolderOpen, Clipboard,
    History, Timer, TimerReset, Hourglass, FileVideo, FileAudio, FileImage, Camera
} from 'lucide-react';
const ICON_LIST = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'Github', icon: Github },
    { name: 'Youtube', icon: Youtube },
    { name: 'TikTok', icon: TikTok },
    { name: 'Linkedin', icon: Linkedin },
    { name: 'Mail', icon: Mail },
    { name: 'AtSign', icon: AtSign },
    { name: 'MessageSquare', icon: MessageSquare },
    { name: 'MessageCircle', icon: MessageCircle },
    { name: 'Send', icon: Send },
    { name: 'Globe', icon: Globe },
    { name: 'Rss', icon: Rss },

    { name: 'Music', icon: Music },
    { name: 'Headphones', icon: Headphones },
    { name: 'Mic', icon: Mic },
    { name: 'Video', icon: Video },
    { name: 'Camera', icon: Camera },
    { name: 'Image', icon: Image },
    { name: 'Aperture', icon: Aperture },

    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'Store', icon: Store },
    { name: 'Package', icon: Package },
    { name: 'Truck', icon: Truck },
    { name: 'Tag', icon: Tag },
    { name: 'Ticket', icon: Ticket },

    { name: 'Wallet', icon: Wallet },
    { name: 'CreditCard', icon: CreditCard },
    { name: 'Banknote', icon: Banknote },
    { name: 'Coins', icon: Coins },
    { name: 'DollarSign', icon: DollarSign },
    { name: 'Landmark', icon: Landmark },
    { name: 'PiggyBank', icon: PiggyBank },
    { name: 'Receipt', icon: Receipt },

    { name: 'Briefcase', icon: Briefcase },
    { name: 'Award', icon: Award },
    { name: 'Trophy', icon: Trophy },
    { name: 'Medal', icon: Medal },
    { name: 'Target', icon: Target },
    { name: 'Flag', icon: Flag },

    { name: 'GraduationCap', icon: GraduationCap },
    { name: 'Book', icon: Book },
    { name: 'BookOpen', icon: BookOpen },
    { name: 'Lightbulb', icon: Lightbulb },
    { name: 'Brain', icon: Brain },
    { name: 'Rocket', icon: Rocket },

    { name: 'Coffee', icon: Coffee },
    { name: 'Utensils', icon: Utensils },
    { name: 'Pizza', icon: Pizza },
    { name: 'GlassWater', icon: GlassWater },
    { name: 'Beer', icon: Beer },
    { name: 'Wine', icon: Wine },
    { name: 'Cake', icon: Cake },

    { name: 'Gamepad2', icon: Gamepad2 },
    { name: 'Puzzle', icon: Puzzle },
    { name: 'Ghost', icon: Ghost },

    { name: 'User', icon: User },
    { name: 'Heart', icon: Heart },
    { name: 'Star', icon: Star },
    { name: 'Zap', icon: Zap },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Wand2', icon: Wand2 },

    { name: 'ThumbsUp', icon: ThumbsUp },
    { name: 'ThumbsDown', icon: ThumbsDown },
    { name: 'Smile', icon: Smile },
    { name: 'Laugh', icon: Laugh },
    { name: 'Frown', icon: Frown },
    { name: 'Meh', icon: Meh },
    { name: 'Angry', icon: Angry },

    { name: 'Sun', icon: Sun },
    { name: 'Moon', icon: Moon },
    { name: 'Cloud', icon: Cloud },
    { name: 'CloudRain', icon: CloudRain },
    { name: 'CloudSnow', icon: CloudSnow },
    { name: 'CloudLightning', icon: CloudLightning },
    { name: 'Umbrella', icon: Umbrella },
    { name: 'Flame', icon: Flame },
    { name: 'Leaf', icon: Leaf },
    { name: 'TreeDeciduous', icon: TreeDeciduous },
    { name: 'Mountain', icon: Mountain },
    { name: 'Waves', icon: Waves },
    { name: 'Wind', icon: Wind },

    { name: 'Dog', icon: Dog },
    { name: 'Cat', icon: Cat },
    { name: 'Bird', icon: Bird },
    { name: 'Fish', icon: Fish },
    { name: 'Bug', icon: Bug },
    { name: 'PawPrint', icon: PawPrint },
    { name: 'Footprints', icon: Footprints },

    { name: 'Home', icon: Home },
    { name: 'MapPin', icon: MapPin },
    { name: 'Map', icon: Map },
    { name: 'Navigation', icon: Navigation },
    { name: 'Pin', icon: Pin },
    { name: 'Building', icon: Building },
    { name: 'Hotel', icon: Hotel },

    { name: 'Smartphone', icon: Smartphone },
    { name: 'Tablet', icon: Tablet },
    { name: 'Laptop', icon: Laptop },
    { name: 'Monitor', icon: Monitor },
    { name: 'Tv', icon: Tv },
    { name: 'Speaker', icon: Speaker },
    { name: 'Cast', icon: Cast },
    { name: 'Gamepad2', icon: Gamepad2 },

    { name: 'Code', icon: Code },
    { name: 'Terminal', icon: Terminal },
    { name: 'Database', icon: Database },
    { name: 'Server', icon: Server },
    { name: 'Cpu', icon: Cpu },
    { name: 'HardDrive', icon: HardDrive },
    { name: 'Keyboard', icon: Keyboard },
    { name: 'Mouse', icon: Mouse },
    { name: 'FileCode', icon: FileCode },
    { name: 'FileJson', icon: FileJson },

    { name: 'FileText', icon: FileText },
    { name: 'FileVideo', icon: FileVideo },
    { name: 'FileAudio', icon: FileAudio },
    { name: 'FileImage', icon: FileImage },
    { name: 'Archive', icon: Archive },
    { name: 'FolderOpen', icon: FolderOpen },
    { name: 'Clipboard', icon: Clipboard },

    { name: 'Clock', icon: Clock },
    { name: 'History', icon: History },
    { name: 'Timer', icon: Timer },
    { name: 'TimerReset', icon: TimerReset },
    { name: 'Hourglass', icon: Hourglass },

    { name: 'Pencil', icon: Pencil },
    { name: 'PenTool', icon: PenTool },
    { name: 'Brush', icon: Brush },
    { name: 'Palette', icon: Palette },
    { name: 'Contrast', icon: Contrast },
    { name: 'Scissors', icon: Scissors },
    { name: 'Eraser', icon: Eraser },
    { name: 'Highlighter', icon: Highlighter },

    { name: 'Bell', icon: Bell },
    { name: 'Shield', icon: Shield },
    { name: 'ShieldCheck', icon: ShieldCheck },
    { name: 'ShieldAlert', icon: ShieldAlert },
    { name: 'Lock', icon: Lock },
    { name: 'Unlock', icon: Unlock },
    { name: 'Key', icon: Key },
    { name: 'Scan', icon: Scan },
    { name: 'QrCode', icon: QrCode },
    { name: 'Barcode', icon: Barcode },
    { name: 'Eye', icon: Eye },

    { name: 'Activity', icon: Activity },
    { name: 'HeartPulse', icon: HeartPulse },
    { name: 'Thermometer', icon: Thermometer },

    { name: 'Settings', icon: Settings },
    { name: 'Sliders', icon: Sliders },
    { name: 'Filter', icon: Filter },
    { name: 'Search', icon: Search },
    { name: 'ExternalLink', icon: ExternalLink },
    { name: 'Plus', icon: Plus },
    { name: 'Check', icon: Check },
    { name: 'CheckCircle2', icon: CheckCircle2 },
    { name: 'HelpCircle', icon: HelpCircle },
    { name: 'Info', icon: Info },
    { name: 'AlertCircle', icon: AlertCircle },
    { name: 'AlertTriangle', icon: AlertTriangle }
];

const ReorderLinkItem = memo(({
    link,
    updateLink,
    openLinkModal,
    activeLinkLayoutDropdown,
    setActiveLinkLayoutDropdown
}) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={link}
            id={link.id}
            layout="position"
            dragListener={false}
            dragControls={controls}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 1,
                opacity: { duration: 0.2 }
            }}
            whileDrag={{
                scale: 1.02,
                zIndex: 100,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                userSelect: "none"
            }}
            className={`flex flex-col bg-[#1a1a1a] rounded-[1rem] border border-white/10 relative group/card ${activeLinkLayoutDropdown === link.id ? 'z-50' : 'z-auto'} hover:border-white/20`}
        >
            <div className="flex">
                {/* Drag Handle Column */}
                <div
                    onPointerDown={(e) => {
                        e.preventDefault();
                        controls.start(e);
                    }}
                    className="w-14 md:w-10 flex items-center justify-center border-r border-white/5 text-white/40 hover:text-white/60 rounded-l-[inherit] cursor-grab active:cursor-grabbing transition-all select-none active:bg-white/5 touch-none"
                >
                    <motion.div whileTap={{ scale: 1.2 }}>
                        <GripVertical className="size-5 md:size-4" />
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        {/* Title and URL Inputs */}
                        <div className="flex-1 flex items-start gap-4">
                            {/* Thumbnail Preview */}
                            <div
                                onClick={() => openLinkModal(link.id, 'thumbnail')}
                                className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 cursor-pointer hover:bg-white/10 transition-all overflow-hidden group/thumb"
                            >
                                {link.thumbnail ? (
                                    <img src={link.thumbnail} alt="" className="w-full h-full object-cover" />
                                ) : link.icon ? (
                                    (() => {
                                        const Icon = ICON_LIST.find(i => i.name === link.icon)?.icon || Image;
                                        return <Icon size={20} className="text-white/60 group-hover/thumb:text-white transition-colors" />;
                                    })()
                                ) : (
                                    <Image size={20} className="text-white/40 group-hover/thumb:text-white/60 transition-colors" />
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                {/* Title Row */}
                                <div className="flex items-center gap-2 group/title">
                                    <label htmlFor={`link-title-${link.id}`} className="sr-only">Link title</label>
                                    <input
                                        id={`link-title-${link.id}`}
                                        name={`link-title-${link.id}`}
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                        className="font-bold text-white text-base bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-white/40"
                                        placeholder="Link title"
                                    />
                                </div>

                                {/* URL Row */}
                                <div className="flex items-center gap-2 group/url">
                                    <label htmlFor={`link-url-${link.id}`} className="sr-only">Link URL</label>
                                    <input
                                        id={`link-url-${link.id}`}
                                        name={`link-url-${link.id}`}
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                        className="text-xs text-white/60 bg-transparent border-none outline-none focus:ring-0 p-0 w-full placeholder:text-white/30 font-mono"
                                        placeholder="https://your-link.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Top Right Controls: Share + Toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openLinkModal(link.id, 'share')}
                                className="text-white/60 hover:text-white"
                            >
                                <Share2 size={16} />
                            </button>
                            <button
                                onClick={() => updateLink(link.id, 'active', !link.active)}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-300 ease-in-out ${link.active ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <div className={`
                                    absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm 
                                    transition-transform duration-500 
                                    ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                                    ${link.active ? 'translate-x-5' : 'translate-x-0'}
                                `} />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                            <div className="relative">
                                <button
                                    onClick={() => setActiveLinkLayoutDropdown(activeLinkLayoutDropdown === link.id ? null : link.id)}
                                    className={`p-2 rounded-lg ${activeLinkLayoutDropdown === link.id ? 'bg-[#8228d9] text-white shadow-[0_0_15px_rgba(130,40,217,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                    title="Layout"
                                >
                                    <Layout size={16} />
                                </button>

                                {activeLinkLayoutDropdown === link.id && (
                                    <div className="absolute bottom-[calc(100%+12px)] left-0 w-[420px] p-6 rounded-[2rem] bg-[#121212] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-50">
                                        <h4 className="text-sm font-medium text-white/60 mb-5 px-1">Choose a layout for your link</h4>

                                        <div className="flex flex-col gap-3 mb-6">
                                            {[
                                                {
                                                    id: 'classic', name: 'Classic', desc: 'Efficient, direct and compact.', preview: (
                                                        <div className="w-24 h-12 rounded-lg bg-[#274d4d] flex items-center px-2 gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-orange-500 shrink-0" />
                                                            <div className="h-1.5 w-full bg-white/10 rounded-full" />
                                                        </div>
                                                    )
                                                },
                                                {
                                                    id: 'featured', name: 'Featured', desc: 'Make your link stand out with a larger, more attractive display.', preview: (
                                                        <div className="w-24 h-12 rounded-lg bg-linear-to-r from-orange-400 to-orange-600 relative overflow-hidden">
                                                            <div className="absolute bottom-1 left-1 right-1 h-3 bg-black/20 rounded-sm" />
                                                        </div>
                                                    )
                                                }
                                            ].map(option => {
                                                const isActive = link.layout === option.id || (!link.layout && option.id === 'classic');

                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => {
                                                            updateLink(link.id, 'layout', option.id);
                                                            setActiveLinkLayoutDropdown(null);
                                                        }}
                                                        className={`flex items-center gap-4 p-4 rounded-2xl w-full text-left border-2 transition-all
                                                            ${isActive ? 'bg-white/3 border-white/20' : 'bg-transparent border-transparent hover:bg-white/2'}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white bg-white' : 'border-white/20'}`}>
                                                            {isActive && <div className="w-2 h-2 rounded-full bg-black" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-bold text-white text-sm">{option.name}</div>
                                                            <div className="text-[11px] text-white/60 leading-tight">{option.desc}</div>
                                                        </div>
                                                        {option.preview}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => openLinkModal(link.id, 'thumbnail')}
                                className="p-2 rounded-lg text-white/60 hover:text-purple-400 hover:bg-white/5" title="Thumbnail"
                            >
                                <Image size={16} />
                            </button>
                            <button
                                onClick={() => openLinkModal(link.id, 'priority')}
                                className={`p-2 rounded-lg hover:bg-white/5 ${link.priority ? 'text-yellow-400' : 'text-white/60 hover:text-yellow-400'}`} title="Priority"
                            >
                                <Star size={16} fill={link.priority ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <button
                            onClick={() => openLinkModal(link.id, 'delete')}
                            className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-white/5"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </Reorder.Item>
    );
});

function App() {
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('vlinktree_links');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Instagram', url: 'https://instagram.com/', active: true }
        ];
    });

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('vlinktree_profile');
        return saved ? JSON.parse(saved) : {
            username: 'Your Username',
            bio: 'Your Bio',
            avatar: null, // Default to null for icon
            headerLayout: 'classic',
            heroModel: 'joined',
            headerSize: 'small',
            showAvatar: true,
            showTitle: true,
            showBio: true
        };
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('vlinktree_theme');
        const defaultTheme = {
            bg: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
            wallpaperStyle: 'gradient',
            gradientColor1: '#FF512F',
            gradientColor2: '#DD2476',
            gradientDirection: 'linear-up',
            blurColor: '#ffffff',
            blurIntensity: 20,
            patternColor: '#000000',
            patternOpacity: 0.1,
            patternBlur: 0,
            backgroundImage: null,
            imageOpacity: 1,
            imageBlur: 0,
            backgroundVideo: null,
            videoOpacity: 1,
            videoBlur: 0,
            videoAudioEnabled: false,
            videoVolume: 50,
            noise: false,
            btnStyle: 'glass',
            btnRadius: 12,
            btnShadowX: 0,
            btnShadowY: 4,
            btnShadowBlur: 10,
            btnShadowSpread: 0,
            btnShadowOpacity: 0.2,
            showFooter: true,
            footerGreetingTitle: 'Terima kasih sudah berkunjung!',
            footerGreetingDesc: 'Senang sekali bisa berbagi perjalanan ini denganmu. Jangan ragu untuk terhubung kembali di lain waktu!',
            footerBtnStyle: 'glass',
            footerBtnRadius: 16,
            footerBtnColor: '#ffffff',
            footerBtnColorType: 'solid',
            footerBtnColorGradient1: '#8228d9',
            footerBtnColorGradient2: '#6366f1',
            footerBtnColorPattern: 'dots',
            footerBtnColorCustomPattern: null,
            footerBtnTextColor: '#ffffff',
            footerBtnTextColorType: 'solid',
            footerBtnTextColorGradient1: '#ffffff',
            footerBtnTextColorGradient2: '#cbd5e1',
            footerBtnTextColorPattern: 'dots',
            footerBtnTextColorCustomPattern: null,
            footerShadowType: 'solid',
            footerShadowColor: '#000000',
            footerShadowX: 0,
            footerShadowY: 4,
            footerShadowBlur: 15,
            footerShadowSpread: 0,
            footerShadowOpacity: 0.1,
            footerShadowColorGradient1: '#000000',
            footerShadowColorGradient2: '#000000',
            footerShadowPattern: 'dots',
            btnFont: 'Inter',
            btnFontSize: 14,
            btnTextWeight: 600,
            btnTextTransform: 'none',
            footerFont: 'Inter',
            footerFontSize: 12,
            footerWeight: 400,
            footerTransform: 'none',
            pageFont: 'Inter',
            pageWeight: 400,
            pageTransform: 'none',
            pageColor: '#ffffff',
            titleWeight: 700,
            titleTransform: 'none',
            footerShadowCustomPattern: null,
            showVlink: true,
            btnShadowColor: '#000000',
            btnShadowType: 'solid',
            btnShadowColorGradient1: '#000000',
            btnShadowColorGradient2: '#000000',
            btnShadowPattern: 'dots',
            btnShadowCustomPattern: null,
            btnColor: '#8228d9',
            btnColorType: 'solid',
            btnColorGradient1: '#8228d9',
            btnColorGradient2: '#6366f1',
            btnColorPattern: 'dots',
            btnColorCustomPattern: null,
            btnTextColor: '#ffffff',
            btnTextColorType: 'solid',
            btnTextColorGradient1: '#ffffff',
            btnTextColorGradient2: '#cbd5e1',
            btnTextColorPattern: 'dots',
            btnTextColorCustomPattern: null,
            color: '#ffffff',
            accentColor: '#8228d9',
            titleColor: '#FFFFFF',
            pageSize: 14,
            titleSize: 20,
            titleFont: 'Inter',
            titleStyle: 'text',
            btnHeight: 14,
            btnWidth: 100,
            btnSpacing: 12,
            socialSize: 20,
            socialStyle: 'icons-only',
            socialPosition: 'bottom',
            socialColorType: 'auto',
            socialCustomColor: '#ffffff',
            socialAlignment: 'center',
            socialFont: 'Inter',
            socialTextWeight: 700,
            socialHover: 'lift',
            socialSpacing: 16,
            socialMarginTop: 20,
            socialMarginBottom: 20,
            btnHoverEffect: 'lift',
            btnPressEffect: 'push',
            btnAnimation: 'none',
            titleAnimation: 'none',
            headerAnimation: 'none',
            footerAnimation: 'none',
            socialAnimation: 'none',
            pageAnimation: 'none',
            titleLogo: null,
            titleLogoSize: 100,
            backgroundAudio: null,
            audioAutoplay: true,
            audioVolume: 50,
        };
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...defaultTheme, ...parsed };
        }
        return defaultTheme;
    });

    const [socials, setSocials] = useState(() => {
        const saved = localStorage.getItem('vlinktree_socials');
        return saved ? JSON.parse(saved) : [
            { platform: 'instagram', url: 'https://instagram.com/' },
            { platform: 'twitter', url: '' },
            { platform: 'youtube', url: '' },
            { platform: 'github', url: '' },
            { platform: 'linkedin', url: '' },
            { platform: 'mail', url: '' }
        ];
    });

    const [layoutType, setLayoutType] = useState('stack');
    const [previewDevice, setPreviewDevice] = useState('mobile');

    // Defer heavy updates for PreviewSection
    const deferredLinks = useDeferredValue(links);
    const deferredProfile = useDeferredValue(profile);
    const deferredTheme = useDeferredValue(theme);
    const deferredSocials = useDeferredValue(socials);
    const deferredLayoutType = useDeferredValue(layoutType);
    const [isPending, startTransition] = useTransition();

    // Stable handlers for high-frequency updates
    const updateTheme = useCallback((updates) => {
        startTransition(() => {
            setTheme(prev => ({ ...prev, ...updates }));
        });
    }, []);

    const updateProfile = useCallback((updates) => {
        startTransition(() => {
            setProfile(prev => ({ ...prev, ...updates }));
        });
    }, []);

    const updateSocials = useCallback((newSocials) => {
        startTransition(() => {
            setSocials(newSocials);
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('vlinktree_links', JSON.stringify(links));
            localStorage.setItem('vlinktree_profile', JSON.stringify(profile));
            localStorage.setItem('vlinktree_theme', JSON.stringify(theme));
            localStorage.setItem('vlinktree_socials', JSON.stringify(socials));
        }, 1000); // 1s debounce to prevent UI lag during frequent updates

        return () => clearTimeout(timer);
    }, [links, profile, theme, socials]);

    const [activeTab, setActiveTab] = useState('links');
    const [appearanceSubTab, setAppearanceSubTab] = useState('header');
    const [isEditorHidden, setIsEditorHidden] = useState(false);
    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const handleTabClick = (tabId) => {
        if (activeTab === tabId) {
            setIsEditorHidden(!isEditorHidden);
        } else {
            setActiveTab(tabId);
            setIsEditorHidden(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-[#050505] text-white/90 selection:bg-purple-500/30 overflow-hidden relative">
            {/* Solid Background for better perforance */}
            <div className="fixed inset-0 bg-[#050505] -z-10" />

            {/* Mobile/Tablet Header */}
            <header
                className="md:hidden fixed top-0 left-0 right-0 h-16 px-6 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-60 shadow-[0_4px_30px_rgba(130,40,217,0.1)]"
                style={{
                    boxShadow: '0 1px 0 0 rgba(130,40,217,0.3)',
                }}
            >
                <div className="flex items-center gap-3">
                    {activeTab === 'appearance' && !isMobilePreview ? (
                        <button
                            onClick={() => setActiveTab('links')}
                            className="p-2 -ml-2 text-white/60 hover:text-white"
                        >
                            <ChevronLeft size={24} className="text-purple-500" />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setActiveTab('links');
                                setIsMobilePreview(false);
                                setIsEditorHidden(false);
                            }}
                            className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                        >
                            V
                        </button>
                    )}
                    {activeTab === 'appearance' && !isMobilePreview && (
                        <h1 className="text-lg font-bold text-white">Appearance</h1>
                    )}
                </div>
                <button
                    onClick={() => setIsExportModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1c1e] border border-white/10 text-white hover:bg-white/5 transition-all active:scale-95"
                >
                    <FileCode size={18} className="text-purple-400" />
                    <span className="text-sm font-bold">Export</span>
                </button>
            </header>

            {/* Sidebar Navigation - Permanent Bar on Desktop, Bottom Bar on Mobile */}
            <aside className={`fixed bottom-0 left-0 right-0 h-[88px] md:relative md:h-full transition-all duration-500 ease-in-out md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-around md:justify-start md:py-8 md:gap-8 bg-[#080808]/95 backdrop-blur-lg md:bg-[#080808] z-50 shrink-0 overflow-hidden
                ${isEditorHidden ? 'md:w-0 md:opacity-0 md:-translate-x-full md:pointer-events-none' : 'md:w-24 md:opacity-100 md:translate-x-0 translate-y-0 opacity-100'}`}
            >
                <button
                    onClick={() => setIsEditorHidden(!isEditorHidden)}
                    className="hidden md:flex w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-600 items-center justify-center font-black text-2xl shadow-xl shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0 group relative"
                    title="Hide Editor"
                >
                    <span>V</span>
                    <PanelLeft size={20} className="absolute transition-all opacity-0 group-hover:opacity-100" />
                </button>

                <nav className="flex flex-row md:flex-col shrink-0 md:shrink items-center w-full md:w-auto md:flex-1 justify-around md:justify-start px-2 md:px-0 h-full md:h-auto overflow-x-auto md:overflow-y-auto md:overflow-x-hidden hide-scrollbar md:gap-2 pb-2 md:pb-8">
                    {activeTab === 'appearance' ? (
                        SIDEBAR_ITEMS.map((item) => (
                            <NavItem
                                key={item.id}
                                icon={<item.icon size={22} />}
                                label={item.label}
                                active={appearanceSubTab === item.id}
                                onClick={() => setAppearanceSubTab(item.id)}
                                className="min-w-[70px]"
                            />
                        ))
                    ) : (
                        <>
                            <NavItem
                                icon={<LayoutGrid size={24} />}
                                label="Add Link"
                                active={activeTab === 'links' && !isMobilePreview}
                                onClick={() => { handleTabClick('links'); setIsMobilePreview(false); }}
                            />
                            <NavItem
                                icon={<Palette size={24} />}
                                label="Appearance"
                                active={activeTab === 'appearance' && !isMobilePreview}
                                onClick={() => { handleTabClick('appearance'); setIsMobilePreview(false); }}
                            />
                            <NavItem
                                icon={<Settings size={24} />}
                                label="Settings"
                                active={activeTab === 'settings' && !isMobilePreview}
                                onClick={() => { handleTabClick('settings'); setIsMobilePreview(false); }}
                            />

                            <NavItem
                                icon={<Eye size={24} />}
                                label="View"
                                active={isMobilePreview}
                                onClick={() => setIsMobilePreview(true)}
                                className="md:hidden"
                            />
                        </>
                    )}
                </nav>
            </aside>

            {/* Premium Floating Toggle - Always accessible but subtle when editor is hidden */}
            <button
                onClick={() => setIsEditorHidden(!isEditorHidden)}
                className={`fixed top-6 left-6 w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500/80 to-indigo-600/80 backdrop-blur-md items-center justify-center text-white shadow-2xl shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer z-100 md:flex hidden
                    ${isEditorHidden ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
                title="Show Editor"
            >
                <PanelLeft size={20} />
            </button>

            {/* Editor Panel */}
            <main className={`flex flex-col overflow-hidden bg-[#0a0a0a] z-10 transition-all duration-500 ease-in-out mt-16 md:mt-0 
                ${isMobilePreview ? 'hidden md:flex w-0 opacity-0' : (isEditorHidden ? 'flex-none md:flex-none' : 'flex-1 opacity-100')}
                ${isEditorHidden ? 'md:w-0 md:opacity-0 md:pointer-events-none' : 'md:flex-1 md:opacity-100'}
                pb-[88px] md:pb-0`}
            >
                {/* Editor Header — hidden on mobile (top mobile header handles this) */}
                <header className="hidden md:flex h-16 md:h-20 px-6 md:px-8 border-b border-white/5 items-center justify-between bg-transparent shrink-0">
                    <div className="flex items-center gap-4">
                        {activeTab === 'appearance' && (
                            <button
                                onClick={() => setActiveTab('links')}
                                className="p-2 -ml-2 text-white/60 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={24} className="text-purple-500" />
                            </button>
                        )}
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <h1 className="text-lg md:text-xl font-bold capitalize flex items-center gap-2 text-white/90">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                {activeTab}
                            </h1>
                            <p className="text-[10px] md:text-xs text-white/60">Manage your {activeTab}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsExportModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs md:text-sm transition-all"
                        >
                            <FileCode size={14} className="md:size-[16px] text-purple-400" />
                            <span className="hidden xs:inline">Export</span>
                        </button>
                    </div>
                </header>

                <div className={`flex-1 ${activeTab === 'appearance' ? 'overflow-hidden p-0' : 'overflow-y-auto p-4 md:p-8 pb-10 md:pb-8'} custom-scrollbar gpu-scroll scroll-smooth`}>
                    {activeTab === 'links' && <LinkEditor links={links} setLinks={setLinks} layoutType={layoutType} setLayoutType={setLayoutType} profile={profile} setProfile={updateProfile} theme={theme} setTheme={updateTheme} socials={socials} setSocials={updateSocials} setAppearanceSubTab={setAppearanceSubTab} setActiveTab={setActiveTab} />}
                    {activeTab === 'appearance' && <AppearanceEditor theme={theme} setTheme={updateTheme} profile={profile} setProfile={updateProfile} socials={socials} setSocials={updateSocials} subTab={appearanceSubTab} setSubTab={setAppearanceSubTab} />}
                    {activeTab === 'settings' && <SettingsEditor links={links} setLinks={setLinks} profile={profile} setProfile={updateProfile} theme={theme} setTheme={updateTheme} socials={socials} setSocials={updateSocials} />}
                </div>
            </main>

            {/* Preview Panel */}
            <div className={`transition-all duration-500 ease-in-out mt-16 md:mt-0 pb-[88px] md:pb-0 ${isMobilePreview || isEditorHidden ? 'flex-1' : 'md:flex-none hidden md:flex'}`}>
                <PreviewSection
                    theme={deferredTheme}
                    profile={deferredProfile}
                    links={deferredLinks}
                    socials={deferredSocials}
                    layoutType={deferredLayoutType}
                    previewDevice={previewDevice}
                    setPreviewDevice={setPreviewDevice}
                    isEditorHidden={isEditorHidden}
                    isMobileView={isMobilePreview}
                />
            </div>

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                profile={deferredProfile}
                links={deferredLinks}
                socials={deferredSocials}
                theme={deferredTheme}
                layoutType={deferredLayoutType}
                previewDevice={previewDevice}
            />
        </div>
    );
}

function NavItem({ icon, active, onClick, label, className = "" }) {
    return (
        <button
            onClick={onClick}
            className={`group relative flex-1 md:flex-none flex flex-col items-center justify-center gap-1 transition-all duration-300 h-full md:h-auto md:py-4 md:w-full ${active ? 'text-purple-500' : 'text-white/60 hover:text-white/60'} ${className}`}
        >
            <div className={`px-6 py-2 rounded-2xl transition-all duration-500 relative flex items-center justify-center
                ${active && 'border border-purple-500/50 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.15)]'}
            `}>
                {icon}
                {active && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 opacity-20 blur-sm pointer-events-none" />
                )}
            </div>
            <span className="text-[10px] font-bold tracking-tight whitespace-nowrap mt-1">
                {label}
            </span>
        </button>
    );
}


const AddLinkModal = memo(function AddLinkModal({ isOpen, onClose, addLink }) {
    const [url, setUrl] = useState('');

    if (!isOpen) return null;

    const handleAdd = () => {
        if (url) {
            addLink(url);
            setUrl('');
            onClose();
        }
    };

    const suggestedLinks = [
        { name: 'Instagram', url: 'https://instagram.com/', icon: <Instagram size={20} className="text-purple-400" /> },
        { name: 'TikTok', url: 'https://tiktok.com/', icon: <TikTok size={20} className="text-white" /> },
        { name: 'YouTube', url: 'https://youtube.com/', icon: <Youtube size={20} className="text-red-500" /> },
        { name: 'Spotify', url: 'https://spotify.com/', icon: <Music size={20} className="text-green-500" /> },
    ];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Enter URL</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="relative group">
                    <label htmlFor="modal-link-url" className="sr-only">Enter URL</label>
                    <input
                        autoFocus
                        id="modal-link-url"
                        name="modal-link-url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder="https://example.com"
                        className="w-full h-14 pl-6 pr-16 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/30 focus:bg-white/8 text-white outline-none transition-all placeholder:text-white/40 font-medium"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={!url}
                        className="absolute right-2 top-2 h-10 px-4 rounded-xl bg-purple-600 text-white font-black text-xs uppercase tracking-widest disabled:opacity-30 disabled:grayscale transition-all active:scale-95"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Quick presets</span>
                    <div className="grid grid-cols-2 gap-3">
                        {suggestedLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => { addLink({ title: link.name, url: link.url }); onClose(); }}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left"
                            >
                                <div className="p-2 rounded-lg bg-white/5">
                                    {link.icon}
                                </div>
                                <span className="text-sm font-bold text-white/70">{link.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const ShareCollectionModal = memo(function ShareCollectionModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Share Mode</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-6">
                    {/* URL Field */}
                    <div className="relative group">
                        <label htmlFor="collection-url" className="absolute top-2.5 left-5 text-[9px] font-black uppercase tracking-widest text-white/40">Short URL</label>
                        <input
                            id="collection-url"
                            name="collection-url"
                            type="text"
                            readOnly
                            value="vlink.id/tr.ee/link"
                            className="w-full h-15 pl-5 pr-14 rounded-2xl border border-white/5 bg-white/2 text-white outline-none pt-4 text-sm font-bold"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/5 rounded-xl p-2 border border-white/5">
                            <Lock size={14} className="text-white/60" />
                        </div>
                    </div>

                    {/* Actions List */}
                    <div className="flex flex-col gap-1">
                        {[
                            { icon: Copy, label: 'Copy link', action: 'copy' },
                            { icon: QrCode, label: 'QR code', extra: <ArrowRight size={14} className="text-white/30" /> },
                            { icon: Bell, label: 'Notify subscribers', extra: <ArrowRight size={14} className="text-white/30" /> },
                            { icon: Upload, label: 'Share to socials', extra: <ArrowRight size={14} className="text-white/30" /> },
                            { icon: Globe, label: 'Open in Browser', extra: <ExternalLink size={14} className="text-white/30" /> }
                        ].map((item, idx) => (
                            <button key={idx} className="flex items-center justify-between p-3.5 -mx-2 rounded-2xl hover:bg-white/5 transition-all group">
                                <div className="flex items-center gap-4">
                                    <item.icon size={18} className="text-white/40 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                {item.extra}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const LogoImageModal = memo(function LogoImageModal({ isOpen, onClose, theme, setTheme }) {
    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTheme({ ...theme, titleLogo: reader.result });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setTheme({ ...theme, titleLogo: null });
        onClose();
    };

    const fileInputRef = useRef(null);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Logo Editor</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-3">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-white/5 transition-all text-left group cursor-pointer border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                                <Image size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Upload Logo</span>
                                <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">Supports JPG, PNG, SVG</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/30 group-hover:text-blue-400 transition-all" />
                        <input
                            id="logo-upload"
                            name="logo-upload"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            onClick={(e) => e.target.value = null}
                        />
                    </div>

                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-red-500/5 transition-all text-left group border border-transparent hover:border-red-500/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-all">
                                <Trash2 size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Remove Logo</span>
                                <span className="text-[10px] text-red-500/40 font-black uppercase tracking-widest">Revert to text</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/30 group-hover:text-red-500 transition-all" />
                    </button>
                </div>
            </div>
        </div>
    );
});

const ProfileImageModal = memo(function ProfileImageModal({ isOpen, onClose, profile, setProfile }) {
    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setProfile({ ...profile, avatar: null });
        onClose();
    };

    const fileInputRef = useRef(null);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Profile Image</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-3">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-white/5 transition-all text-left group cursor-pointer border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all">
                                <Image size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Upload Picture</span>
                                <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">Supports JPG, PNG, SVG</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/30 group-hover:text-purple-400 transition-all" />
                        <input
                            id="profile-upload"
                            name="profile-upload"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            onClick={(e) => e.target.value = null}
                        />
                    </div>

                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-between p-4 -mx-2 rounded-2xl hover:bg-red-500/5 transition-all text-left group border border-transparent hover:border-red-500/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-all">
                                <Trash2 size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white text-sm">Remove Picture</span>
                                <span className="text-[10px] text-red-500/40 font-black uppercase tracking-widest">Revert to default</span>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-white/30 group-hover:text-red-500 transition-all" />
                    </button>
                </div>
            </div>
        </div>
    );
});

const TitleBioModal = memo(function TitleBioModal({ isOpen, onClose, profile, setProfile }) {
    const [title, setTitle] = useState(profile?.username || '');
    const [bio, setBio] = useState(profile?.bio || '');

    useEffect(() => {
        if (isOpen) {
            setTitle(profile?.username || '');
            setBio(profile?.bio || '');
        }
    }, [isOpen, profile]);

    const handleSave = () => {
        setProfile({ ...profile, username: title, bio: bio });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white italic tracking-tight">Profile Style</h2>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-2 flex flex-col gap-5">
                    {/* Title Input */}
                    <div className="bg-white/3 border border-white/5 rounded-2xl px-5 py-4 relative group focus-within:border-purple-500/30 transition-all">
                        <label htmlFor="modal-profile-title" className="text-[10px] text-white/50 font-black uppercase tracking-widest block mb-2">Profile Title</label>
                        <input
                            id="modal-profile-title"
                            name="modal-profile-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={30}
                            className="w-full bg-transparent text-white font-bold outline-none text-base placeholder:text-white/30"
                            placeholder="@username"
                        />
                        <div className="text-right text-[9px] font-black text-white/40 mt-2 uppercase tracking-widest">{title.length} / 30</div>
                    </div>

                    {/* Bio Input */}
                    <div className="bg-white/3 border border-white/5 rounded-2xl px-5 py-4 relative group focus-within:border-purple-500/30 transition-all">
                        <label htmlFor="modal-profile-bio" className="text-[10px] text-white/50 font-black uppercase tracking-widest block mb-2">Short Bio</label>
                        <textarea
                            id="modal-profile-bio"
                            name="modal-profile-bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={80}
                            className="w-full bg-transparent text-white font-medium outline-none text-sm resize-none h-24 placeholder:text-white/30 leading-relaxed"
                            placeholder="Tell your story..."
                        />
                        <div className="text-right text-[9px] font-black text-white/40 mt-2 uppercase tracking-widest">{bio.length} / 80</div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_20px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(147,51,234,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
});


const LinkActionModal = memo(function LinkActionModal({ isOpen, onClose, title, children, dark = true }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border ${dark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-transparent'}`} onClick={e => e.stopPropagation()}>
                <div className="px-8 pt-8 pb-2 flex items-center justify-between">
                    <h2 className={`text-[11px] font-black uppercase tracking-[0.2em] ${dark ? 'text-white/50' : 'text-gray-400'}`}>{title}</h2>
                    <button onClick={onClose} className={`p-2.5 rounded-xl transition-all ${dark ? 'hover:bg-white/5 text-white/50 hover:text-white' : 'hover:bg-gray-100 text-gray-500'}`}>
                        <X size={18} />
                    </button>
                </div>
                <div className="p-8 pt-4">
                    {children}
                </div>
            </div>
        </div>
    );
});



const ThumbnailModal = memo(function ThumbnailModal({ isOpen, onClose, link, onUpdate }) {
    const [view, setView] = useState('main'); // 'main' or 'icons'
    const [search, setSearch] = useState('');
    const fileInputRef = useRef(null);

    if (!link) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate(link.id, { thumbnail: reader.result, icon: null });
                onClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconSelect = (iconName) => {
        onUpdate(link.id, { icon: iconName, thumbnail: null });
        onClose();
    };

    const handleRemove = () => {
        onUpdate(link.id, { icon: null, thumbnail: null });
        onClose();
    };

    const filteredIcons = ICON_LIST.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LinkActionModal isOpen={isOpen} onClose={() => { setView('main'); onClose(); }} title="Thumbnail">
            {view === 'main' ? (
                <div className="flex flex-col gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors border border-purple-500/10"><Upload size={20} /></div>
                        <div className="flex-1">
                            <div className="font-bold text-white">Upload Image</div>
                            <div className="text-xs text-white/60">For custom thumbnails</div>
                        </div>
                    </button>
                    <button
                        onClick={() => setView('icons')}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors border border-blue-500/10"><Search size={20} /></div>
                        <div className="flex-1">
                            <div className="font-bold text-white">Choose from Icons</div>
                            <div className="text-xs text-white/60">Select a vector icon</div>
                        </div>
                    </button>
                    {(link.thumbnail || link.icon) && (
                        <button
                            onClick={handleRemove}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left group mt-2"
                        >
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20 transition-colors border border-red-500/10"><Trash2 size={20} /></div>
                            <div className="flex-1">
                                <div className="font-bold text-red-400">Remove</div>
                                <div className="text-xs text-red-400/40">Clear thumbnail or icon</div>
                            </div>
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 focus-within:border-white/10 transition-all">
                        <Search size={16} className="text-white/40" />
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search icons..."
                            className="bg-transparent border-none outline-none text-sm text-white w-full"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                        {filteredIcons.map((i) => (
                            <button
                                key={i.name}
                                onClick={() => handleIconSelect(i.name)}
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                            >
                                <div className="text-white/60 group-hover:text-white transition-colors">
                                    <i.icon size={20} />
                                </div>
                                <span className="text-[8px] text-white/40 group-hover:text-white/60 truncate w-full text-center">{i.name}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setView('main')}
                        className="text-xs text-white/60 hover:text-white transition-colors py-2"
                    >
                        Back to options
                    </button>
                </div>
            )}
        </LinkActionModal>
    );
});

const PrioritizeModal = memo(function PrioritizeModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Prioritize">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group focus-within:border-purple-500/20 transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100/10 flex items-center justify-center text-yellow-600 border border-yellow-500/20"><Star size={20} /></div>
                    <div>
                        <div id={`spotlight-label-${link.id}`} className="font-bold text-white">Spotlight Link</div>
                        <div className="text-xs text-white/60">Highlight this link with animation</div>
                    </div>
                </div>
                <button
                    aria-labelledby={`spotlight-label-${link.id}`}
                    aria-pressed={link.priority}
                    onClick={() => onUpdate(link.id, 'priority', !link.priority)}
                    className={`w-11 h-6 rounded-full relative transition-all duration-300 ${link.priority ? 'bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/10'}`}
                >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${link.priority ? 'left-5' : 'left-0.5'}`} />
                </button>
            </div>
        </LinkActionModal>
    );
});

const ScheduleModal = memo(function ScheduleModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Schedule">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="schedule-start" className="text-xs font-bold text-white/60 uppercase">Start Time</label>
                    <input
                        id="schedule-start"
                        name="schedule-start"
                        type="datetime-local"
                        className="w-full bg-white/5 border-none rounded-lg text-sm p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-white invert-[0.9] brightness-[1.5]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="schedule-end" className="text-xs font-bold text-white/60 uppercase">End Time</label>
                    <input
                        id="schedule-end"
                        name="schedule-end"
                        type="datetime-local"
                        className="w-full bg-white/5 border-none rounded-lg text-sm p-3 outline-none focus:ring-2 focus:ring-purple-500/20 text-white invert-[0.9] brightness-[1.5]"
                    />
                </div>
            </div>
        </LinkActionModal>
    );
});

const LockModal = memo(function LockModal({ isOpen, onClose, link, onUpdate }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Lock">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <Lock size={18} className="text-white/60 group-hover:text-white" />
                        <span id="sensitive-toggle-label" className="font-medium text-white">Sensitive Content</span>
                    </div>
                    <button
                        aria-labelledby="sensitive-toggle-label"
                        className="w-11 h-6 rounded-full relative bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-white/60 group-hover:text-white" />
                        <span id="age-gate-label" className="font-medium text-white">Age Gate</span>
                    </div>
                    <button
                        aria-labelledby="age-gate-label"
                        className="w-11 h-6 rounded-full relative bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
            </div>
        </LinkActionModal>
    );
});

const AnalyticsModal = memo(function AnalyticsModal({ isOpen, onClose, link }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Analytics">
            <div className="flex flex-col gap-4 text-center py-4">
                <div className="w-full h-32 bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10">
                    <BarChart2 size={32} className="text-white/40" />
                </div>
                <div>
                    <div className="text-3xl font-black text-white">0</div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-wider">Total Clicks</div>
                </div>
            </div>
        </LinkActionModal>
    );
});


const DeleteConfirmationModal = memo(function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Delete Link">
            <div className="flex flex-col gap-4">
                <p className="text-white/60 text-sm">Are you sure you want to delete this link? This action cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">Cancel</button>
                    <button onClick={onDelete} className="flex-1 py-3 rounded-xl bg-red-500/80 text-white font-bold hover:bg-red-500 transition-colors">Delete</button>
                </div>
            </div>
        </LinkActionModal>
    );
});

const ShareLinkModal = memo(function ShareLinkModal({ isOpen, onClose, link }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link?.url || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: 'WhatsApp', icon: '📱', url: `https://wa.me/?text=${encodeURIComponent('Check this out: ' + (link?.url || ''))}` },
        { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check this out: ' + (link?.url || ''))}` },
        { name: 'Facebook', icon: '👥', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link?.url || '')}` }
    ];

    return (
        <LinkActionModal isOpen={isOpen} onClose={onClose} title="Share Link">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="share-link-url" className="text-[10px] font-black uppercase tracking-widest text-white/60">Link URL</label>
                    <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                        <input
                            id="share-link-url"
                            name="share-link-url"
                            readOnly
                            value={link?.url || ''}
                            className="bg-transparent border-none focus:ring-0 text-sm flex-1 outline-none text-white font-mono overflow-hidden text-ellipsis"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg ${copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-black hover:bg-white/90'}`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Share via</span>
                    <div className="grid grid-cols-3 gap-3">
                        {shareOptions.map(option => (
                            <a
                                key={option.name}
                                href={option.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">{option.icon}</span>
                                <span className="text-[10px] font-bold text-gray-500 group-hover:text-purple-600 uppercase tracking-widest">{option.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </LinkActionModal>
    );
});

const LinkEditor = memo(function LinkEditor({ links, setLinks, layoutType, setLayoutType, profile, setProfile, theme, setTheme, socials, setSocials, setAppearanceSubTab, setActiveTab }) {
    const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [titleBioModalOpen, setTitleBioModalOpen] = useState(false);
    const [quickUrl, setQuickUrl] = useState('');

    // Link Action Modals State
    const [activeLinkModal, setActiveLinkModal] = useState({ id: null, type: null });
    const [activeLinkLayoutDropdown, setActiveLinkLayoutDropdown] = useState(null);

    const openLinkModal = React.useCallback((id, type) => {
        setActiveLinkLayoutDropdown(null);
        setActiveLinkModal({ id, type });
    }, []);
    const closeLinkModal = React.useCallback(() => setActiveLinkModal({ id: null, type: null }), []);

    const addLink = React.useCallback((data = '') => {
        let title = '';
        let url = '';

        if (typeof data === 'string') {
            url = data;
        } else if (typeof data === 'object') {
            title = data.title || '';
            url = data.url || '';
        }

        const newLink = { id: Date.now(), title, url, active: true };
        setLinks(prevLinks => [newLink, ...prevLinks]);
    }, [setLinks]);

    const updateLink = React.useCallback((id, field, value) => {
        setLinks(prevLinks => prevLinks.map(link => {
            if (link.id === id) {
                if (typeof field === 'object') {
                    return { ...link, ...field };
                }
                return { ...link, [field]: value };
            }
            return link;
        }));
    }, [setLinks]);

    const deleteLink = React.useCallback((id) => {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
    }, [setLinks]);

    const handleQuickAdd = React.useCallback(() => {
        if (quickUrl) {
            addLink(quickUrl);
            setQuickUrl('');
        }
    }, [quickUrl, addLink]);



    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-12 pb-32 md:pb-24 px-2 md:px-0">
            <AddLinkModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} addLink={addLink} />
            <ShareCollectionModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />
            <ProfileImageModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} profile={profile} setProfile={setProfile} />
            <TitleBioModal isOpen={titleBioModalOpen} onClose={() => setTitleBioModalOpen(false)} profile={profile} setProfile={setProfile} />

            {/* Header Section */}
            <header className="p-4 md:p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 text-center sm:text-left">
                    <div
                        onClick={() => setProfileModalOpen(true)}
                        className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shrink-0 cursor-pointer hover:opacity-80 transition-opacity ring-4 ring-purple-500/20 flex items-center justify-center bg-white/5"
                    >
                        {profile?.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile?.username}
                                loading="lazy"
                                decoding="async"
                                width="96"
                                height="96"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                        ) : null}
                        {(!profile?.avatar) || (profile?.avatar === '') ? (
                            <User size={32} className="text-white/40" />
                        ) : (
                            <User size={32} className="text-white/40 hidden" />
                        )}
                    </div>
                    <div className="flex flex-col gap-2 pt-2 flex-1">
                        <div
                            onClick={() => setTitleBioModalOpen(true)}
                            className="cursor-pointer hover:opacity-80 transition-opacity group"
                        >
                            <h2 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">{profile?.username}</h2>
                            <p className="text-base text-white/60 font-medium leading-relaxed max-w-xl">{profile?.bio}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() => { setActiveTab('appearance'); setAppearanceSubTab('socials'); }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white border border-white/5 active:scale-[0.98]"
                            >
                                <Share2 size={14} className="text-purple-400" />
                                <span>Social Footer</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Isi (Content) Section */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 bg-white/3 border border-white/5 p-1.5 rounded-2xl w-fit mb-4">
                    <button
                        onClick={() => setAddModalOpen(true)}
                        className="h-11 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                    >
                        <Plus size={18} />
                        Add Link
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1"></div>

                    {/* Layout Button with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${layoutDropdownOpen ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <Layout size={18} />
                            <span>Layout</span>
                        </button>

                        {/* Layout Dropdown Panel */}
                        {layoutDropdownOpen && (
                            <div className="absolute top-[calc(100%+12px)] left-0 w-[340px] p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in duration-200">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-6 px-1">Display as</h4>

                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {LAYOUT_OPTIONS.map(option => {
                                        const IconComponent = option.icon;
                                        const isActive = layoutType === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setLayoutType(option.id);
                                                    setLayoutDropdownOpen(false);
                                                }}
                                                className="flex flex-col items-center gap-3 group"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${isActive
                                                    ? 'bg-white/10 border-white/20 shadow-inner'
                                                    : 'bg-white/3 border-transparent group-hover:bg-white/5'}`}
                                                >
                                                    <IconComponent size={24} className={`transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/60'}`} />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                                                    {option.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-5 border-t border-white/5">
                                    <p className="text-xs text-white/50 leading-relaxed font-medium italic">
                                        {LAYOUT_OPTIONS.find(opt => opt.id === layoutType)?.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Reorder.Group
                    axis="y"
                    values={links}
                    onReorder={setLinks}
                    className="flex flex-col gap-4"
                >
                    {links.map((link) => (
                        <ReorderLinkItem
                            key={link.id}
                            link={link}
                            updateLink={updateLink}
                            openLinkModal={openLinkModal}
                            activeLinkLayoutDropdown={activeLinkLayoutDropdown}
                            setActiveLinkLayoutDropdown={setActiveLinkLayoutDropdown}
                        />
                    ))}
                </Reorder.Group>
            </div>

            {/* Compact Footer Section */}
            <footer className="mt-8 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-white/3 border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-5 w-full">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <Heart size={16} className="text-purple-400 fill-purple-400/10" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-white tracking-tight">Greeting Card</h3>
                                    <p className="text-[10px] text-white/50 font-medium">Appears at the very bottom of your live page.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateTheme({ showFooter: !theme.showFooter })}
                                className={`px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-white/5 ${theme.showFooter ? 'text-white' : 'text-white/60'}`}
                            >
                                {theme.showFooter ? <EyeOff size={12} /> : <Eye size={12} />}
                                {theme.showFooter ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {theme.showFooter && (
                            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="preview-greeting-title" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Greeting Title</label>
                                    <input
                                        id="preview-greeting-title"
                                        name="preview-greeting-title"
                                        type="text"
                                        value={theme.footerGreetingTitle}
                                        onChange={(e) => updateTheme({ footerGreetingTitle: e.target.value })}
                                        placeholder="e.g. Terima kasih sudah berkunjung!"
                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white outline-none focus:border-purple-500/30 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="preview-greeting-desc" className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Message Description</label>
                                    <textarea
                                        id="preview-greeting-desc"
                                        name="preview-greeting-desc"
                                        value={theme.footerGreetingDesc}
                                        onChange={(e) => updateTheme({ footerGreetingDesc: e.target.value })}
                                        placeholder="Enter your message..."
                                        rows={2}
                                        className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/70 font-medium outline-none focus:border-purple-500/30 transition-all resize-none leading-relaxed"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Minimalist Branding Toggle */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Zap size={16} className="text-indigo-400" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold text-white tracking-tight">Vlink Branding</h3>
                                    <p className="text-[10px] text-white/50 font-medium italic">"Made with Vlink.id x rizddf" link.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateTheme({ showVlink: !theme.showVlink })}
                                className={`px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-white/5 ${theme.showVlink ? 'text-white' : 'text-white/60'}`}
                            >
                                {theme.showVlink ? <EyeOff size={12} /> : <Eye size={12} />}
                                {theme.showVlink ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Render Active Link Modal */}
            {
                activeLinkModal.id && (
                    <>
                        <ThumbnailModal
                            isOpen={activeLinkModal.type === 'thumbnail'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                            onUpdate={updateLink}
                        />
                        <PrioritizeModal
                            isOpen={activeLinkModal.type === 'priority'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                            onUpdate={updateLink}
                        />
                        <ShareLinkModal
                            isOpen={activeLinkModal.type === 'share'}
                            onClose={closeLinkModal}
                            link={links.find(l => l.id === activeLinkModal.id)}
                        />
                        <DeleteConfirmationModal
                            isOpen={activeLinkModal.type === 'delete'}
                            onClose={closeLinkModal}
                            onDelete={() => { deleteLink(activeLinkModal.id); closeLinkModal(); }}
                        />
                    </>
                )
            }
        </div>
    );
}
);

const AppearanceEditor = memo(function AppearanceEditor({ theme, setTheme, profile, setProfile, socials, setSocials, subTab, setSubTab }) {
    const [buttonDesignSubTab, setButtonDesignSubTab] = useState('body');
    const [footerDesignSubTab, setFooterDesignSubTab] = useState('body');
    const [profileImageModalOpen, setProfileImageModalOpen] = useState(false);
    const [logoImageModalOpen, setLogoImageModalOpen] = useState(false);



    const randomizeTheme = () => {
        const presets = THEMES.filter(t => t.id !== 'custom');
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];

        // Random Wallpaper Logic
        const wallpaperStyles = ['fill', 'gradient', 'blur', 'pattern'];
        const randomStyle = wallpaperStyles[Math.floor(Math.random() * wallpaperStyles.length)];

        const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

        const wallpaperSettings = {
            wallpaperStyle: randomStyle,
            bg: randomStyle === 'fill' ? randomHex() : undefined,
            gradientColor1: randomStyle === 'gradient' ? randomHex() : undefined,
            gradientColor2: randomStyle === 'gradient' ? randomHex() : undefined,
            gradientDirection: randomStyle === 'gradient' ? ['linear-up', 'linear-down', 'radial'][Math.floor(Math.random() * 3)] : undefined,
            blurColor: randomStyle === 'blur' ? randomHex() : undefined,
            blurIntensity: randomStyle === 'blur' ? Math.floor(Math.random() * 50) + 10 : undefined,
            patternColor: randomStyle === 'pattern' ? randomHex() : undefined,
        };

        setTheme({
            ...theme,
            ...randomPreset,
            pageColor: randomPreset.color,
            titleColor: randomPreset.color,
            ...wallpaperSettings
        });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row overflow-hidden h-full text-white">
                {/* Main Content Area */}
                <main className="flex-1 p-4 md:p-12 pb-24 md:pb-12 bg-[#0a0a0a] flex flex-col gap-8 md:gap-12 overflow-y-auto custom-scrollbar gpu-scroll">
                    <>

                        {subTab === 'header' && (
                            <HeaderSettings
                                profile={profile}
                                setProfile={setProfile}
                                theme={theme}
                                setTheme={setTheme}
                                setProfileImageModalOpen={setProfileImageModalOpen}
                                setLogoImageModalOpen={setLogoImageModalOpen}
                            />
                        )}

                        {subTab === 'theme' && (
                            <ThemeSettings
                                theme={theme}
                                setTheme={setTheme}
                            />
                        )}

                        {subTab === 'wallpaper' && (
                            <WallpaperSettings
                                theme={theme}
                                setTheme={setTheme}
                            />
                        )}

                        {subTab === 'buttons' && (
                            <ButtonSettings
                                theme={theme}
                                setTheme={setTheme}
                                buttonDesignSubTab={buttonDesignSubTab}
                                setButtonDesignSubTab={setButtonDesignSubTab}
                            />
                        )}

                        {subTab === 'footer' && (
                            <FooterSettings
                                theme={theme}
                                setTheme={setTheme}
                                footerDesignSubTab={footerDesignSubTab}
                                setFooterDesignSubTab={setFooterDesignSubTab}
                            />
                        )}

                        {subTab === 'socials' && (
                            <SocialSettings
                                theme={theme}
                                setTheme={setTheme}
                                socials={socials}
                                setSocials={setSocials}
                            />
                        )}

                        {subTab === 'audio' && (
                            <BackgroundAudioSettings
                                theme={theme}
                                setTheme={setTheme}
                            />
                        )}
                    </>
                </main >
            </div >
            <ProfileImageModal
                isOpen={profileImageModalOpen}
                onClose={() => setProfileImageModalOpen(false)}
                profile={profile}
                setProfile={setProfile}
            />
            <LogoImageModal
                isOpen={logoImageModalOpen}
                onClose={() => setLogoImageModalOpen(false)}
                theme={theme}
                setTheme={setTheme}
            />
        </>
    );
});

const SettingsEditor = memo(function SettingsEditor({ links, setLinks, profile, setProfile, theme, setTheme, socials, setSocials }) {
    const fileInputRef = useRef(null);

    const exportConfig = () => {
        const config = { links, profile, theme, socials };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "vlinktree_config.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importConfig = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    if (config.links) setLinks(config.links);
                    if (config.profile) setProfile(config.profile);
                    if (config.theme) setTheme(config.theme);
                    if (config.socials) setSocials(config.socials);
                    alert('Configuration imported successfully!');
                } catch (error) {
                    console.error('Error importing config:', error);
                    alert('Error importing configuration. Invalid file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-24 md:pb-0">
            <section className="p-12 rounded-[3rem] bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-white/5 flex flex-col items-center gap-8 text-center shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-purple-500 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                    <Settings size={40} className="text-white" />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black italic uppercase tracking-widest">Configuration</h2>
                    <p className="text-white/60 max-w-md">Save your current VLink Builder layout and data. You can re-import this file later or use it for backup.</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <button
                        onClick={exportConfig}
                        className="px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 shadow-xl shadow-white/10 flex items-center gap-3 transition-transform active:scale-95"
                    >
                        <Download size={20} />
                        Export Config
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 shadow-xl shadow-black/20 flex items-center gap-3 transition-transform active:scale-95"
                    >
                        <Upload size={20} />
                        Import Config
                    </button>
                    <input
                        id="import-config-field"
                        name="import-config"
                        type="file"
                        ref={fileInputRef}
                        onChange={importConfig}
                        accept=".json"
                        className="hidden"
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-white/40">Statistics</span>
                    <div className="text-2xl font-black">{links.length} ACTIVE LINKS</div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(links.length / 10) * 100}%` }}></div>
                    </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/2 border border-white/5 flex flex-col gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-white/40">System Status</span>
                    <div className="text-2xl font-black flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        ALL SYSTEMS GO
                    </div>
                    <p className="text-[10px] text-white/40">VLink Builder 1.0 is running on local persistence.</p>
                </div>
            </div>

            {/* Suggestion Box & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Suggestion Box */}
                <div className="p-8 rounded-[2rem] bg-white/3 border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Suggestion Box</h3>
                            <p className="text-xs text-white/60">Help us improve VLink Builder</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="suggestion-text" className="sr-only">Suggestion text</label>
                        <textarea
                            id="suggestion-text"
                            name="suggestion-text"
                            placeholder="Type your suggestion here..."
                            className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white resize-none focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-white/30"
                        ></textarea>
                        <button
                            onClick={() => {
                                const text = document.getElementById('suggestion-text').value;
                                if (text) {
                                    window.open(`mailto:alfarizd027@gmail.com?subject=Suggestion for VLink Builder&body=${encodeURIComponent(text)}`);
                                }
                            }}
                            className="py-3 rounded-xl bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                        >
                            Send Suggestion
                        </button>
                    </div>
                </div>

                {/* Support / Donation */}
                <div className="p-8 rounded-[2rem] bg-linear-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 flex flex-col gap-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                            <Heart size={24} className="fill-yellow-500/20" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Support Project</h3>
                            <p className="text-xs text-white/60">Traktir creator es teh 🍵</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end gap-4 relative z-10">
                        <p className="text-sm text-white/60 leading-relaxed">
                            If you find VLink Builder useful, consider supporting the development. Your support helps keep the project alive!
                        </p>
                        <a
                            href="https://saweria.co/frd027"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-4 rounded-xl bg-yellow-500 text-black font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all text-center shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
                        >
                            <Zap size={16} className="fill-black" />
                            Traktir Es Teh
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default App;
