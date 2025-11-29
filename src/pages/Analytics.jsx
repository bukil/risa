import React from 'react';
import { BarChart3, Users, Zap, ArrowUpRight } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

const MetricCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="frosted-glass card-surface light-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: `hsla(${color}, 0.1)` }}>
                <Icon size={20} color={`hsl(${color})`} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpRight size={14} /> {trend}
            </span>
        </div>
        <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</div>
            <div style={{ fontSize: '0.9rem', color: 'hsl(var(--text-muted))' }}>{label}</div>
        </div>
    </div>
);

const Analytics = () => {
    const { metrics } = useWorkflow();

    return (
        <div style={{ padding: 'var(--space-lg)', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-lg)', letterSpacing: '-0.03em' }}>Research Analytics</h2>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: 'var(--space-xl)' }}>
                <MetricCard
                    icon={Zap}
                    label="Sources Explored"
                    value={metrics.sourcesExplored}
                    trend="+12%"
                    color="var(--primary)"
                />
                <MetricCard
                    icon={BarChart3}
                    label="Agent Assists"
                    value={metrics.agentAssists}
                    trend="+5%"
                    color="var(--secondary)"
                />
                <MetricCard
                    icon={Users}
                    label="Human Intervention"
                    value={metrics.humanInterventions}
                    trend="Low"
                    color="var(--accent)"
                />
            </div>

            {/* Visualizations */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Main Chart */}
                <div className="frosted-glass card-surface light-panel" style={{ padding: '24px', height: '400px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Exploration Depth (Topic Branching)</h3>
                    {/* CSS-only Tree Chart Mockup */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%', justifyContent: 'center' }}>
                        <div style={{ padding: '8px 16px', background: 'hsl(var(--primary))', color: 'white', borderRadius: '20px', fontSize: '0.9rem' }}>Sustainable Packaging</div>
                        <div style={{ width: '2px', height: '30px', background: 'hsla(var(--border-subtle))' }}></div>
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{ padding: '8px 16px', border: '1px solid hsl(var(--primary))', color: 'hsl(var(--primary))', borderRadius: '20px', fontSize: '0.8rem' }}>Bioplastics</div>
                                <div style={{ width: '2px', height: '20px', background: 'hsla(var(--border-subtle))' }}></div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'hsl(var(--secondary))' }}></div>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'hsl(var(--secondary))' }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{ padding: '8px 16px', border: '1px solid hsl(var(--primary))', color: 'hsl(var(--primary))', borderRadius: '20px', fontSize: '0.8rem' }}>Regulations</div>
                                <div style={{ width: '2px', height: '20px', background: 'hsla(var(--border-subtle))' }}></div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'hsl(var(--secondary))' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Stats */}
                <div className="frosted-glass card-surface light-panel" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Source Diversity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { label: 'Academic Journals', val: 45, color: 'var(--primary)' },
                            { label: 'Industry Reports', val: 30, color: 'var(--secondary)' },
                            { label: 'News Media', val: 15, color: 'var(--accent)' },
                            { label: 'Other', val: 10, color: '240 10% 80%' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                                    <span>{item.label}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'hsla(var(--bg-app), 0.5)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${item.val}%`, height: '100%', background: `hsl(${item.color})`, borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
