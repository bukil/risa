import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, Play, Pause, RotateCcw, Zap, BrainCircuit,
    Globe, Code, FileDigit, ArrowRight, Loader2, Sparkles
} from 'lucide-react';

const TaskSimulator = ({ searchQuery, agentPrompt, isAgentActive, onAddResult, onTaskComplete }) => {
    const [stage, setStage] = useState('idle'); // idle, parsing, working, done
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedModel, setSelectedModel] = useState('Gemini 1.5 Pro');
    const [planningMode, setPlanningMode] = useState('Deep Research');
    const [enabledTools, setEnabledTools] = useState(['Web Search']);
    const [prompt, setPrompt] = useState('');

    // Handle external triggers (from main search bar)
    useEffect(() => {
        if (isAgentActive && agentPrompt && stage === 'idle') {
            setPrompt(agentPrompt);
            runSimulation(agentPrompt);
        }
    }, [isAgentActive, agentPrompt]);

    const addLog = (message) => {
        setLogs(prev => [message, ...prev]);
    };

    const toggleTool = (tool) => {
        setEnabledTools(prev =>
            prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
        );
    };

    const runSimulation = (overridePrompt) => {
        const activePrompt = overridePrompt || prompt;
        if (!activePrompt.trim()) return;

        setStage('working');
        setLogs([]);
        setProgress(0);
        addLog(`> Initializing ${selectedModel} agent...`);
        addLog(`> Mode: ${planningMode}`);
        addLog(`> Tools: ${enabledTools.join(', ')}`);

        // Simulation steps
        setTimeout(() => {
            addLog('> Parsing user request...');
            setProgress(10);
        }, 800);

        setTimeout(() => {
            addLog(`> Deconstructing task: "${activePrompt}"`);
            setProgress(25);
        }, 1600);

        setTimeout(() => {
            addLog('> Searching knowledge base...');
            // Add a mock result to the main app
            onAddResult({
                id: Date.now(),
                title: `Analysis: ${activePrompt}`,
                type: 'pdf',
                source: 'Research Agent',
                snippet: 'Generated insights based on deep analysis of available data sources...'
            });
            setProgress(40);
        }, 2500);

        setTimeout(() => {
            addLog('> Querying external sources (Web, Academic)...');
            setProgress(60);
        }, 3500);

        setTimeout(() => {
            addLog('> Synthesizing findings...');
            setProgress(80);
        }, 4500);

        setTimeout(() => {
            addLog('> Finalizing report...');
            setProgress(90);
        }, 5500);

        setTimeout(() => {
            addLog('> Task complete.');
            setStage('done');
            setProgress(100);
            if (onTaskComplete) onTaskComplete();
        }, 6500);
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'hsl(var(--bg-sidebar))',
            borderLeft: '1px solid hsla(var(--border-subtle))',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Header */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid hsla(var(--border-subtle))',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'hsla(var(--bg-surface), 0.5)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '24px', height: '24px', borderRadius: '6px',
                        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px hsla(var(--primary), 0.3)'
                    }}>
                        <Sparkles size={14} color="white" />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Agent Activity</span>
                </div>
                {stage === 'working' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Loader2 size={14} className="animate-spin" color="hsl(var(--primary))" />
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Working</span>
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '100px' }}>

                {/* Configuration Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Model Selection */}
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(var(--text-muted))', marginBottom: '10px', display: 'block', letterSpacing: '0.05em' }}>MODEL</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { id: 'Gemini 1.5 Pro', grad: 'var(--gradient-gemini)' },
                                { id: 'GPT-4o', grad: 'var(--gradient-gpt)' },
                                { id: 'Claude 3.5', grad: 'var(--gradient-claude)' }
                            ].map(model => {
                                const isSelected = selectedModel === model.id;
                                return (
                                    <button
                                        key={model.id}
                                        onClick={() => setSelectedModel(model.id)}
                                        style={{
                                            flex: 1, padding: '12px 8px', borderRadius: '12px',
                                            border: 'none',
                                            position: 'relative',
                                            background: isSelected ? 'hsla(var(--bg-surface), 0.8)' : 'hsla(var(--bg-surface), 0.4)',
                                            color: 'hsl(var(--text-main))',
                                            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                            boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {isSelected && (
                                            <div style={{
                                                position: 'absolute', inset: 0, padding: '1px', borderRadius: '12px',
                                                background: model.grad,
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                                pointerEvents: 'none'
                                            }} />
                                        )}
                                        <div style={{
                                            width: '100%', height: '4px', borderRadius: '2px', marginBottom: '8px',
                                            background: model.grad, opacity: isSelected ? 1 : 0.3
                                        }} />
                                        {model.id.split(' ')[0]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Planning Mode */}
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(var(--text-muted))', marginBottom: '10px', display: 'block', letterSpacing: '0.05em' }}>PLANNING MODE</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setPlanningMode('Fast Task')}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid',
                                    borderColor: planningMode === 'Fast Task' ? 'hsl(var(--primary))' : 'hsla(var(--border-subtle))',
                                    background: planningMode === 'Fast Task' ? 'hsla(var(--primary), 0.1)' : 'transparent',
                                    color: planningMode === 'Fast Task' ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ padding: '6px', borderRadius: '50%', background: 'white', display: 'flex' }}>
                                    <Zap size={14} color="hsl(var(--warning))" fill="hsl(var(--warning))" />
                                </div>
                                Fast
                            </button>
                            <button
                                onClick={() => setPlanningMode('Deep Research')}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid',
                                    borderColor: planningMode === 'Deep Research' ? 'hsl(var(--secondary))' : 'hsla(var(--border-subtle))',
                                    background: planningMode === 'Deep Research' ? 'hsla(var(--secondary), 0.1)' : 'transparent',
                                    color: planningMode === 'Deep Research' ? 'hsl(var(--secondary))' : 'hsl(var(--text-muted))',
                                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ padding: '6px', borderRadius: '50%', background: 'white', display: 'flex' }}>
                                    <BrainCircuit size={14} color="hsl(var(--color-code))" />
                                </div>
                                Deep
                            </button>
                        </div>
                    </div>

                    {/* MCP Tools */}
                    <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(var(--text-muted))', marginBottom: '10px', display: 'block', letterSpacing: '0.05em' }}>MCP TOOLS</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { id: 'Web Search', icon: Globe, color: 'var(--color-web)' }
                            ].map(tool => {
                                const isActive = enabledTools.includes(tool.id);
                                return (
                                    <div key={tool.id}
                                        onClick={() => toggleTool(tool.id)}
                                        className="card-surface"
                                        style={{
                                            padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            cursor: 'pointer',
                                            border: isActive ? `1px solid ${tool.color}` : '1px solid transparent',
                                            boxShadow: isActive ? `0 0 12px ${tool.color}20` : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                padding: '6px', borderRadius: '8px',
                                                background: isActive ? tool.color : 'hsla(var(--text-muted), 0.1)',
                                                color: isActive ? 'white' : 'hsl(var(--text-muted))',
                                                transition: 'all 0.2s'
                                            }}>
                                                <tool.icon size={16} />
                                            </div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tool.id}</span>
                                        </div>
                                        <div style={{
                                            width: '40px', height: '22px', borderRadius: '12px',
                                            background: isActive ? tool.color : 'hsla(var(--text-muted), 0.3)',
                                            position: 'relative', transition: 'background 0.2s'
                                        }}>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                                                position: 'absolute', top: '2px',
                                                left: isActive ? '20px' : '2px',
                                                transition: 'left 0.2s',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '20px',
                    borderTop: '1px solid hsla(var(--border-subtle))',
                    display: 'flex', flexDirection: 'column', gap: '8px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--primary))', opacity: 0.5 }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-muted))', letterSpacing: '0.05em' }}>ACTIVITY LOG</span>
                    </div>

                    {logs.length === 0 && (
                        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', fontStyle: 'italic', opacity: 0.7 }}>
                            Waiting for tasks...
                        </span>
                    )}

                    {logs.map((log, i) => (
                        <div key={i} className="animate-in slide-in-from-left-2 duration-300" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ minWidth: '16px', display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'hsl(var(--border-subtle))' }}></div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', lineHeight: '1.5' }}>
                                {log.replace('> ', '')}
                            </span>
                        </div>
                    ))}
                    {stage === 'working' && (
                        <div className="animate-pulse" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ minWidth: '16px' }}></div>
                            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--primary))' }}>Processing...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Input Footer */}
            <div style={{
                padding: '20px',
                background: 'linear-gradient(to top, hsl(var(--bg-app)) 80%, transparent)',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10
            }}>
                <div style={{
                    position: 'relative',
                    background: 'hsla(var(--bg-surface), 0.6)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px solid hsla(var(--border-subtle))',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                }}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask the agent to research..."
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: 'hsl(var(--text-main))',
                            padding: '16px 50px 16px 16px',
                            fontSize: '0.9rem',
                            resize: 'none',
                            outline: 'none',
                            height: '60px',
                            fontFamily: 'inherit'
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                runSimulation();
                            }
                        }}
                    />
                    <button
                        onClick={() => runSimulation()}
                        disabled={stage !== 'idle' && stage !== 'done'}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            bottom: '8px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'hsl(var(--primary))',
                            color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: stage === 'idle' || stage === 'done' ? 'pointer' : 'not-allowed',
                            opacity: stage === 'idle' || stage === 'done' ? 1 : 0.5,
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px hsla(var(--primary), 0.4)'
                        }}
                    >
                        {stage === 'working' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskSimulator;
