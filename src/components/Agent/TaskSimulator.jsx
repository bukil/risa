import React, { useState, useEffect } from 'react';
import {
    CheckCircle2, Circle, Loader2, Sparkles,
    ArrowRight, BrainCircuit, Terminal, Zap, Box, Globe, Code, FileDigit, Play
} from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

const TaskItem = ({ task, depth = 0 }) => {
    const getIcon = () => {
        if (task.status === 'completed') return <CheckCircle2 size={16} color="hsl(var(--secondary))" />;
        if (task.status === 'running') return <Loader2 size={16} className="animate-spin" color="hsl(var(--primary))" />;
        return <Circle size={16} color="hsl(var(--text-muted))" />;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: depth * 16 + 'px',
            marginBottom: '8px',
            opacity: task.status === 'pending' ? 0.6 : 1,
            transition: 'opacity 0.3s'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getIcon()}
                <span style={{
                    fontSize: '0.85rem',
                    fontWeight: task.status === 'running' ? 600 : 400,
                    color: task.status === 'completed' ? 'hsl(var(--text-muted))' : 'hsl(var(--text-main))',
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                }}>
                    {task.label}
                </span>
            </div>
            {task.subtasks && task.subtasks.map(sub => (
                <TaskItem key={sub.id} task={sub} depth={depth + 1} />
            ))}
        </div>
    );
};

const TaskSimulator = ({ prompt, isActive }) => {
    const [stage, setStage] = useState('idle'); // idle, parsing, working, done
    const [tasks, setTasks] = useState([]);
    const [logs, setLogs] = useState([]);
    const { addSearchResult } = useWorkflow();

    // Configuration State
    const [selectedModel, setSelectedModel] = useState('Gemini 1.5 Pro');
    const [planningMode, setPlanningMode] = useState('Deep Research');
    const [enabledTools, setEnabledTools] = useState(['Web Search', 'File System']);
    const [inputPrompt, setInputPrompt] = useState('');

    // Mock Plan Generator
    const generatePlan = (promptText) => {
        return [
            {
                id: 1, label: "Analyzing Request Intent", status: 'pending',
                subtasks: [
                    { id: 11, label: "Extracting key entities", status: 'pending' },
                    { id: 12, label: "Checking knowledge base", status: 'pending' }
                ]
            },
            {
                id: 2, label: "Formulating Research Strategy", status: 'pending',
                subtasks: [
                    { id: 21, label: "Querying academic sources", status: 'pending' },
                    { id: 22, label: "Synthesizing cross-references", status: 'pending' }
                ]
            },
            { id: 3, label: "Generating Insights", status: 'pending' }
        ];
    };

    // Handle external prompt (from Search Bar)
    useEffect(() => {
        if (isActive && prompt && stage === 'idle') {
            setInputPrompt(prompt);
            handleRun(prompt);
        }
    }, [isActive, prompt, stage]);

    const handleRun = (text) => {
        setStage('parsing');
        setTasks([]);
        setLogs([]);

        // Simulate Parsing
        setTimeout(() => {
            setTasks(generatePlan(text));
            setStage('working');
        }, 1500);
    };

    const toggleTool = (tool) => {
        setEnabledTools(prev =>
            prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
        );
    };

    // Execution Loop
    useEffect(() => {
        if (stage !== 'working') return;

        let isMounted = true;

        const executeNext = async () => {
            // Find first pending task (DFS)
            const findNext = (list) => {
                for (let t of list) {
                    if (t.status === 'pending') return t;
                    if (t.subtasks) {
                        const sub = findNext(t.subtasks);
                        if (sub) return sub;
                    }
                }
                return null;
            };

            const updateStatus = (id, status) => {
                setTasks(prev => {
                    const updateList = (list) => list.map(t => {
                        if (t.id === id) return { ...t, status };
                        if (t.subtasks) return { ...t, subtasks: updateList(t.subtasks) };
                        return t;
                    });
                    return updateList(prev);
                });
            };

            const nextTask = findNext(tasks);

            if (!nextTask) {
                setStage('done');
                return;
            }

            // Start Task
            updateStatus(nextTask.id, 'running');
            setLogs(prev => [...prev, `> Executing: ${nextTask.label}...`]);

            // Wait (Simulate work)
            await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));

            if (!isMounted) return;

            // Complete Task
            updateStatus(nextTask.id, 'completed');

            // SIDE EFFECT: Add Mock Results when specific tasks finish
            if (nextTask.id === 21) {
                addSearchResult({
                    id: Date.now(),
                    type: 'pdf',
                    title: 'Global Sustainable Packaging Market 2025',
                    source: 'Journal of Cleaner Production',
                    summary: 'Comprehensive analysis of biodegradable materials and market trends.',
                    date: '2 days ago'
                });
                setLogs(prev => [...prev, `> [DATA] Found 1 new PDF source.`]);
            }
            if (nextTask.id === 22) {
                addSearchResult({
                    id: Date.now() + 1,
                    type: 'article',
                    title: 'EU Regulations on Single-Use Plastics',
                    source: 'European Commission',
                    summary: 'Official guidelines on compliance for packaging manufacturers.',
                    date: '1 week ago'
                });
                setLogs(prev => [...prev, `> [DATA] Found 1 new Article source.`]);
            }

            // Loop
            executeNext();
        };

        executeNext();

        return () => { isMounted = false; };
    }, [stage, tasks, addSearchResult]);

    return (
        <div className="frosted-glass" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid hsla(var(--border-subtle))',
                background: 'hsla(var(--bg-surface), 0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BrainCircuit size={18} color="hsl(var(--primary))" />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Agent Activity</span>
                </div>
                {stage === 'working' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Loader2 size={14} className="animate-spin" color="hsl(var(--primary))" />
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Working</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>

                {stage === 'idle' && (
                    <div className="animate-in fade-in zoom-in-95 duration-300" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

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
                                        <Zap size={14} color="#f59e0b" fill="#f59e0b" />
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
                                        <BrainCircuit size={14} color="#8b5cf6" />
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
                                    { id: 'Web Search', icon: Globe, color: 'var(--color-web)' },
                                    { id: 'Code Interpreter', icon: Code, color: 'var(--color-code)' },
                                    { id: 'File System', icon: FileDigit, color: 'var(--color-file)' }
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

                        {/* Input Area */}
                        <div style={{ marginTop: 'auto' }}>
                            <div className="card-surface" style={{ padding: '4px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                                <textarea
                                    value={inputPrompt}
                                    onChange={(e) => setInputPrompt(e.target.value)}
                                    placeholder="Describe your task..."
                                    style={{
                                        flex: 1, border: 'none', background: 'transparent', resize: 'none',
                                        padding: '8px', fontSize: '0.9rem', outline: 'none', minHeight: '60px'
                                    }}
                                />
                                <button
                                    onClick={() => handleRun(inputPrompt)}
                                    disabled={!inputPrompt.trim()}
                                    style={{
                                        padding: '8px', borderRadius: '8px', border: 'none',
                                        background: inputPrompt.trim() ? 'hsl(var(--primary))' : 'hsla(var(--text-muted), 0.2)',
                                        color: 'white', cursor: inputPrompt.trim() ? 'pointer' : 'not-allowed',
                                        marginBottom: '4px', marginRight: '4px'
                                    }}
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                {stage === 'parsing' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'hsl(var(--primary))' }}>
                        <Loader2 className="animate-spin" size={20} />
                        <span style={{ fontWeight: 500 }}>Deconstructing request...</span>
                    </div>
                )}

                {(stage === 'working' || stage === 'done') && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>
                            Goal: <span style={{ color: 'hsl(var(--text-main))', fontWeight: 500 }}>"{inputPrompt}"</span>
                        </div>

                        {tasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}

                        {stage === 'done' && (
                            <button
                                onClick={() => { setStage('idle'); setInputPrompt(''); }}
                                style={{
                                    marginTop: '20px', width: '100%', padding: '10px',
                                    borderRadius: 'var(--radius-md)', border: '1px solid hsla(var(--border-subtle))',
                                    background: 'white', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500
                                }}
                            >
                                Start New Task
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Minimal Activity Footer */}
            <div style={{
                padding: '16px',
                borderTop: '1px solid hsla(var(--border-subtle))',
                background: 'hsla(var(--bg-surface), 0.3)',
                height: '140px',
                overflowY: 'auto',
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
    );
};

export default TaskSimulator;
