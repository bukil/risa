import React, { useState } from 'react';
import {
    Compass, Grid, Layout, FileText, Settings,
    Plus, Search, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';

const AppShell = ({ activeTab, onTabChange, children }) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

    const navItems = [
        { id: 'omni', icon: Compass, label: 'Omni Search' },
        { id: 'canvas', icon: Layout, label: 'Canvas' },
        { id: 'insights', icon: FileText, label: 'Insights' },
        { id: 'analytics', icon: Grid, label: 'Analytics' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'hsl(var(--bg-app))' }}>

            {/* 1. Left Sidebar (Navigation & Spaces) */}
            <aside className="acrylic-sidebar" style={{
                width: '240px',
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--space-md)',
                zIndex: 20
            }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '12px', height: '12px', borderRadius: '50%',
                        background: 'hsl(var(--primary))', boxShadow: '0 0 10px hsla(var(--primary), 0.5)'
                    }} />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Research Space</span>
                </div>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    background: isActive ? 'hsla(var(--primary), 0.1)' : 'transparent',
                                    color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? 500 : 400
                                }}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid hsla(var(--border-subtle))' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: '100%', padding: '8px', border: 'none', background: 'transparent',
                        color: 'hsl(var(--text-muted))', cursor: 'pointer'
                    }}>
                        <Settings size={16} />
                        <span style={{ fontSize: '0.85rem' }}>Settings</span>
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
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid hsla(var(--border-subtle))'
            }}>
                {/* Top Bar (Search/Context) */}
                <header style={{
                    height: '50px',
                    borderBottom: '1px solid hsla(var(--border-subtle))',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 var(--space-md)',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'hsl(var(--text-muted))' }}>
                        <ChevronLeft size={18} />
                        <ChevronRight size={18} />
                    </div>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'hsla(var(--bg-app), 0.5)',
                        padding: '6px 16px', borderRadius: 'var(--radius-full)',
                        width: '400px', border: '1px solid hsla(var(--border-subtle))'
                    }}>
                        <Search size={14} color="hsl(var(--text-muted))" />
                        <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>Search or ask agent...</span>
                    </div>

                    <div style={{ width: '60px' }}></div> {/* Spacer */}
                </header>

                {/* View Content */}
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    {children}
                </div>
            </main>

            {/* 3. Right Panel (Agent/Inspector) */}
            <aside style={{
                width: isRightPanelOpen ? '300px' : '0px',
                transition: 'width 0.3s ease',
                borderLeft: '1px solid hsla(var(--border-subtle))',
                background: 'hsla(var(--bg-sidebar), 0.5)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid hsla(var(--border-subtle))', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="hsl(var(--primary))" />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Agent Assistant</span>
                </div>

                <div style={{ flex: 1, padding: 'var(--space-md)', overflowY: 'auto' }}>
                    <div style={{
                        background: 'white', padding: '12px', borderRadius: 'var(--radius-sm)',
                        border: '1px solid hsla(var(--border-subtle))', marginBottom: '12px',
                        fontSize: '0.85rem', lineHeight: '1.5', color: 'hsl(var(--text-muted))'
                    }}>
                        I'm tracking your research on "Sustainable Packaging". I've found 3 new relevant sources in the Omni Search.
                    </div>

                    {/* Mock Agent Suggestions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button className="card-surface" style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Summarize Findings</div>
                            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Create a brief from pinned items.</div>
                        </button>
                    </div>
                </div>
            </aside>

        </div>
    );
};

export default AppShell;
