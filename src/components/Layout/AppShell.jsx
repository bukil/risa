import React, { useState } from 'react';
import {
    Compass, Grid, Layout, FileText, Settings,
    Plus, Search, ChevronLeft, ChevronRight, Sparkles, Info
} from 'lucide-react';

const NavItem = ({ item, isActive, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={onClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'white' : 'transparent',
                    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    width: '100%',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
            </button>

            {/* Hover Detail Card */}
            {isHovered && !isActive && (
                <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(12px)',
                    background: 'hsla(var(--bg-surface), 0.9)',
                    backdropFilter: 'blur(12px)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    width: '180px',
                    zIndex: 50,
                    border: '1px solid hsla(var(--border-subtle))',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: 'hsl(var(--text-main))' }}>
                        {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', lineHeight: '1.4' }}>
                        {item.detail}
                    </div>
                    {/* Arrow */}
                    <div style={{
                        position: 'absolute',
                        left: '-6px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(45deg)',
                        width: '12px',
                        height: '12px',
                        background: 'hsla(var(--bg-surface), 0.9)',
                        borderLeft: '1px solid hsla(var(--border-subtle))',
                        borderBottom: '1px solid hsla(var(--border-subtle))',
                    }} />
                </div>
            )}
        </div>
    );
};

const AppShell = ({ activeTab, onTabChange, children }) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

    const navItems = [
        { id: 'omni', icon: Compass, label: 'Omni Search', detail: 'Explore 142 sources across journals and reports.' },
        { id: 'canvas', icon: Layout, label: 'Canvas', detail: 'Organize 12 clusters of findings spatially.' },
        { id: 'insights', icon: FileText, label: 'Insights', detail: 'Drafting "Sustainable Packaging" strategy.' },
        { id: 'analytics', icon: Grid, label: 'Analytics', detail: 'Track exploration depth and agent impact.' },
    ];

    return (
        <div className="noise-bg" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* 1. Left Sidebar (Navigation & Spaces) */}
            <aside className="acrylic-sidebar" style={{
                width: '260px',
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--space-md)',
                zIndex: 20
            }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
                    <div style={{
                        width: '24px', height: '24px', borderRadius: '8px',
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px hsla(var(--primary), 0.3)'
                    }}>
                        <Sparkles size={14} color="white" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>Research Space</span>
                </div>

                {/* Segmented Navigation */}
                <div style={{
                    background: 'hsla(var(--text-muted), 0.08)',
                    padding: '4px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            item={item}
                            isActive={activeTab === item.id}
                            onClick={() => onTabChange(item.id)}
                        />
                    ))}
                </div>

                {/* Bottom Actions */}
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        width: '100%', padding: '12px', border: 'none', background: 'transparent',
                        color: 'hsl(var(--text-muted))', cursor: 'pointer',
                        borderRadius: 'var(--radius-md)',
                        transition: 'background 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'hsla(var(--text-muted), 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <Settings size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Settings</span>
                    </button>
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <main style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                margin: 'var(--space-sm)',
                background: 'hsl(var(--bg-surface))',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid hsla(var(--border-subtle))',
                zIndex: 10
            }}>
                {/* Top Bar (Search/Context) */}
                <header style={{
                    height: '60px',
                    borderBottom: '1px solid hsla(var(--border-subtle))',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 var(--space-lg)',
                    justifyContent: 'space-between',
                    background: 'hsla(var(--bg-surface), 0.8)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', color: 'hsl(var(--text-muted))' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}><ChevronLeft size={20} /></button>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'hsla(var(--bg-app), 0.5)',
                        padding: '8px 20px', borderRadius: 'var(--radius-full)',
                        width: '480px', border: '1px solid hsla(var(--border-subtle))',
                        transition: 'all 0.2s ease',
                        cursor: 'text'
                    }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'hsl(var(--primary))'}
                    >
                        <Search size={16} color="hsl(var(--text-muted))" />
                        <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>Search or ask agent...</span>
                    </div>

                    <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                            style={{
                                padding: '8px', borderRadius: '50%', border: '1px solid hsla(var(--border-subtle))',
                                background: isRightPanelOpen ? 'hsl(var(--primary))' : 'transparent',
                                color: isRightPanelOpen ? 'white' : 'hsl(var(--text-muted))',
                                cursor: 'pointer'
                            }}
                        >
                            <Sparkles size={18} />
                        </button>
                    </div>
                </header>

                {/* View Content */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    {children}
                </div>
            </main>

            {/* 3. Right Panel (Agent/Inspector) */}
            <aside style={{
                width: isRightPanelOpen ? '320px' : '0px',
                transition: 'width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                borderLeft: '1px solid hsla(var(--border-subtle))',
                background: 'hsla(var(--bg-sidebar), 0.6)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 20
            }}>
                <div style={{ padding: 'var(--space-lg)', borderBottom: '1px solid hsla(var(--border-subtle))', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={18} color="hsl(var(--primary))" />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Agent Assistant</span>
                </div>

                <div style={{ flex: 1, padding: 'var(--space-lg)', overflowY: 'auto' }}>
                    <div style={{
                        background: 'white', padding: '16px', borderRadius: 'var(--radius-md)',
                        border: '1px solid hsla(var(--border-subtle))', marginBottom: '16px',
                        fontSize: '0.9rem', lineHeight: '1.6', color: 'hsl(var(--text-main))',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        I'm tracking your research on "Sustainable Packaging". I've found 3 new relevant sources in the Omni Search.
                    </div>

                    {/* Mock Agent Suggestions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="card-surface" style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Summarize Findings</div>
                            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Create a brief from pinned items.</div>
                        </button>
                        <button className="card-surface" style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Compare Markets</div>
                            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Generate a table for EU vs APAC.</div>
                        </button>
                    </div>
                </div>
            </aside>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(8px); }
          to { opacity: 1; transform: translateY(-50%) translateX(12px); }
        }
      `}</style>
        </div>
    );
};

export default AppShell;
