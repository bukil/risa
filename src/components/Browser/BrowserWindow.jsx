import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, RotateCw, Star, Sparkles, MessageSquare, Plus } from 'lucide-react';

const BrowserWindow = () => {
    const [url, setUrl] = useState('https://jira.atlassian.com/browse/PROJ-123');
    const [isAgentActive, setIsAgentActive] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'hsl(var(--bg-app))' }}>
            {/* Browser Top Bar */}
            <div className="glass-surface" style={{
                padding: 'var(--space-sm) var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                borderBottom: '1px solid hsla(var(--text-main), 0.1)'
            }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-muted))' }}><ArrowLeft size={18} /></button>
                    <button style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-muted))' }}><ArrowRight size={18} /></button>
                    <button style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-muted))' }}><RotateCw size={18} /></button>
                </div>

                {/* Address Bar */}
                <div style={{
                    flex: 1,
                    background: 'hsla(var(--bg-surface), 0.5)',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    border: '1px solid hsla(var(--text-main), 0.1)'
                }}>
                    <Search size={14} color="hsl(var(--text-muted))" />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'hsl(var(--text-main))',
                            width: '100%',
                            outline: 'none',
                            fontSize: '0.9rem'
                        }}
                    />
                    <Star size={14} color="hsl(var(--text-muted))" />
                </div>

                {/* Agent Toggle */}
                <button
                    onClick={() => setIsAgentActive(!isAgentActive)}
                    style={{
                        background: isAgentActive ? 'hsl(var(--primary))' : 'hsla(var(--bg-surface), 0.5)',
                        border: '1px solid hsla(var(--text-main), 0.1)',
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: isAgentActive ? 'white' : 'hsl(var(--text-muted))',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Sparkles size={16} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Agent</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                {/* Mock Web Page Content (SaaS Dashboard) */}
                <div style={{ flex: 1, padding: 'var(--space-xl)', overflowY: 'auto' }}>
                    <div className="light-panel" style={{
                        background: 'white',
                        borderRadius: '8px',
                        minHeight: '100%',
                        padding: '40px',
                        color: '#333',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Project Alpha / Board</h1>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd' }}></div>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd' }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            {['To Do', 'In Progress', 'Done'].map(col => (
                                <div key={col} style={{ flex: 1, background: '#f4f5f7', padding: '16px', borderRadius: '6px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: 'hsl(var(--text-muted))' }}>{col}</h3>
                                    <div style={{ background: 'hsl(var(--bg-surface))', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid hsla(var(--border-subtle))' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Update Documentation</div>
                                        <div style={{ fontSize: '11px', color: 'hsl(var(--text-dim))' }}>PROJ-101 • Medium</div>
                                    </div>
                                    <div style={{ background: 'hsl(var(--bg-surface))', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid hsla(var(--border-subtle))' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Fix Navigation Bug</div>
                                        <div style={{ fontSize: '11px', color: 'hsl(var(--text-dim))' }}>PROJ-102 • Low</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Agent Sidebar Overlay */}
                {isAgentActive && (
                    <div className="glass-panel" style={{
                        width: '320px',
                        borderLeft: '1px solid hsla(var(--text-main), 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid hsla(var(--text-main), 0.1)' }}>
                            <h3 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sparkles size={16} color="hsl(var(--primary))" />
                                Agent Assistant
                            </h3>
                        </div>

                        <div style={{ flex: 1, padding: 'var(--space-md)', overflowY: 'auto' }}>
                            {/* Agent Thought Process */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Context</div>
                                <div style={{
                                    background: 'hsla(var(--bg-surface), 0.5)',
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.4',
                                    border: '1px solid hsla(var(--primary), 0.2)'
                                }}>
                                    I see you're on the <strong>Project Alpha Board</strong>. I can help you create tasks, summarize card details, or analyze sprint progress.
                                </div>
                            </div>

                            {/* Suggested Actions */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Suggested Actions</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <button className="glass-surface" style={{
                                        padding: '10px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid hsla(var(--text-main), 0.1)',
                                        color: 'hsl(var(--text-main))',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <Plus size={14} /> Create task from selection
                                    </button>
                                    <button className="glass-surface" style={{
                                        padding: '10px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid hsla(var(--text-main), 0.1)',
                                        color: 'hsl(var(--text-main))',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <BarChart2 size={14} /> Analyze sprint velocity
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div style={{ padding: 'var(--space-md)', borderTop: '1px solid hsla(var(--text-main), 0.1)' }}>
                            <div style={{
                                background: 'hsla(var(--bg-surface), 0.5)',
                                borderRadius: 'var(--radius-md)',
                                padding: '8px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <MessageSquare size={16} color="hsl(var(--text-muted))" />
                                <input
                                    type="text"
                                    placeholder="Ask agent..."
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'hsl(var(--text-main))',
                                        width: '100%',
                                        outline: 'none',
                                        fontSize: '0.85rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default BrowserWindow;
