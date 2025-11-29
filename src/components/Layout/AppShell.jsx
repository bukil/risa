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
                className={isActive ? 'light-panel' : ''}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'hsl(0, 0%, 90%)' : 'transparent', // Light grey for active
                    color: isActive ? '#000000' : 'hsl(var(--text-muted))', // Black text for active
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400,
                    width: '100%',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                {/* Icon Weight Transition: 2px (Regular) -> 2.5px/3px (Active/Bold) */}
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.75} style={{ transition: 'stroke-width 0.2s ease' }} />
                {item.label}
            </button>

            {/* Hover Detail Card */}
            {isHovered && !isActive && (
                <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(12px)',
                    background: 'rgba(255, 255, 255, 0.6)', // Light frosted glass
                    backdropFilter: 'blur(16px) saturate(180%)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    width: '180px',
                    zIndex: 50,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#000' }}> {/* Dark text */}
                        {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#333', lineHeight: '1.4' }}> {/* Dark text */}
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
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(16px)',
                        borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    }} />
                </div>
            )}
        </div>
    );
};

import HighlightOverlay from '../Overlay/HighlightOverlay';
import TaskSimulator from '../Agent/TaskSimulator';

const AppShell = ({ activeTab, onTabChange, children }) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [agentPrompt, setAgentPrompt] = useState('');
    const [isAgentActive, setIsAgentActive] = useState(false);

    // AI Explanation State
    const [isExplaining, setIsExplaining] = useState(false);
    const [explanationStep, setExplanationStep] = useState(0);

    const explanationSteps = [
        {
            targetId: 'agent-panel',
            explanation: `I've analyzed your request "${agentPrompt}" using the selected model. The agent has processed multiple data sources to generate these findings.`
        },
        {
            targetId: 'main-content',
            explanation: "Based on the analysis, I've curated these search results and insights. You can explore each item for more detailed information."
        },
        {
            targetId: 'sidebar-nav',
            explanation: "You can use the navigation to switch between different views like Canvas or Insights to further organize this research."
        }
    ];

    const handleTaskComplete = () => {
        setIsExplaining(true);
        setExplanationStep(0);
    };

    const handleNextExplanation = () => {
        if (explanationStep < explanationSteps.length - 1) {
            setExplanationStep(prev => prev + 1);
        } else {
            setIsExplaining(false);
            setExplanationStep(0);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setAgentPrompt(searchQuery);
        setIsAgentActive(true);
        setIsRightPanelOpen(true); // Auto-open panel
    };

    const navItems = [
        { id: 'omni', icon: Compass, label: 'Omni Search', detail: 'Explore 142 sources across journals and reports.' },
        { id: 'canvas', icon: Layout, label: 'Canvas', detail: 'Organize 12 clusters of findings spatially.' },
        { id: 'insights', icon: FileText, label: 'Insights', detail: 'Drafting "Sustainable Packaging" strategy.' },
        { id: 'analytics', icon: Grid, label: 'Analytics', detail: 'Track exploration depth and agent impact.' },
    ];

    return (
        <div className="noise-bg" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {isExplaining && (
                <HighlightOverlay
                    targetId={explanationSteps[explanationStep].targetId}
                    explanation={explanationSteps[explanationStep].explanation}
                    onNext={handleNextExplanation}
                    isLastStep={explanationStep === explanationSteps.length - 1}
                />
            )}

            {/* 1. Left Sidebar (Navigation & Spaces) */}
            <aside id="sidebar-nav" className="acrylic-sidebar" style={{
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
            <main id="main-content" style={{
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

                    <form onSubmit={handleSearch} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'hsla(var(--bg-app), 0.5)',
                        padding: '8px 20px', borderRadius: 'var(--radius-full)',
                        width: '480px', border: '1px solid hsla(var(--border-subtle))',
                        transition: 'all 0.2s ease',
                        cursor: 'text'
                    }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'hsl(var(--primary))'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'hsla(var(--border-subtle))'}
                    >
                        <Search size={16} color="hsl(var(--text-muted))" />
                        <input
                            type="text"
                            placeholder="Search or ask agent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                border: 'none', background: 'transparent', outline: 'none',
                                width: '100%', fontSize: '0.9rem', color: 'hsl(var(--text-main))'
                            }}
                        />
                    </form>

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
            <aside id="agent-panel" style={{
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
                <div style={{ flex: 1, padding: 'var(--space-md)', overflow: 'hidden' }}>
                    <TaskSimulator
                        prompt={agentPrompt}
                        isActive={isAgentActive}
                        onTaskComplete={handleTaskComplete}
                    />
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
