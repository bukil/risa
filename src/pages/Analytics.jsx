import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertCircle, PieChart } from 'lucide-react';

const MetricCard = ({ label, value, trend, icon: Icon, color }) => (
    <div className="card-surface" style={{ padding: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
            <div style={{
                background: `hsla(${color}, 0.15)`,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                color: `hsl(${color})`
            }}>
                <Icon size={20} />
            </div>
            <span style={{
                fontSize: '0.8rem',
                color: trend > 0 ? 'hsl(var(--success))' : 'hsl(var(--error))',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 500
            }}>
                {trend > 0 ? '+' : ''}{trend}% <TrendingUp size={12} />
            </span>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px', letterSpacing: '-1px' }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>{label}</div>
    </div>
);

const Analytics = () => {
    return (
        <div style={{ padding: 'var(--space-xl)', height: '100%', overflowY: 'auto' }}>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Research Analytics</h1>
                <p style={{ color: 'hsl(var(--text-muted))' }}>Insights into your exploration depth and agent collaboration.</p>
            </div>

            {/* Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-xl)'
            }}>
                <MetricCard label="Sources Explored" value="142" trend={12} icon={PieChart} color="var(--primary)" />
                <MetricCard label="Agent Assists" value="85%" trend={8} icon={CheckCircle} color="var(--secondary)" />
                <MetricCard label="Human Intervention" value="15%" trend={-2} icon={AlertCircle} color="var(--accent)" />
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-lg)' }}>

                {/* Main Chart: Exploration Depth */}
                <div className="card-surface" style={{ padding: 'var(--space-xl)', minHeight: '400px' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>Exploration Depth (Topic Branching)</h3>

                    {/* Tree Chart Mockup */}
                    <div style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            width: '12px', height: '12px', background: 'hsl(var(--primary))', borderRadius: '50%',
                            position: 'absolute', left: '10%', top: '50%', zIndex: 2
                        }} />

                        {/* Branches */}
                        <div style={{ position: 'absolute', left: '10%', width: '80%', height: '2px', background: 'hsla(var(--border-subtle))' }} />

                        {[20, 40, 60, 80].map((left, i) => (
                            <div key={i} style={{
                                position: 'absolute', left: `${left}%`, top: i % 2 === 0 ? '20%' : '80%',
                                width: '2px', height: '30%', background: 'hsla(var(--border-subtle))'
                            }}>
                                <div style={{
                                    width: '8px', height: '8px',
                                    background: i % 2 === 0 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
                                    borderRadius: '50%',
                                    position: 'absolute', [i % 2 === 0 ? 'top' : 'bottom']: '-4px', left: '-3px'
                                }} />
                            </div>
                        ))}

                        <div style={{
                            position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center',
                            color: 'hsl(var(--text-muted))', fontSize: '0.8rem'
                        }}>
                            Visualizing the branching of research topics over time.
                        </div>
                    </div>
                </div>

                {/* Side Stats: Domain Diversity */}
                <div className="card-surface" style={{ padding: 'var(--space-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>Source Diversity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {[
                            { label: 'Academic Journals', val: 45, color: 'var(--primary)' },
                            { label: 'Industry Reports', val: 30, color: 'var(--secondary)' },
                            { label: 'News Articles', val: 15, color: 'var(--accent)' },
                            { label: 'Social Media', val: 10, color: 'var(--text-muted)' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                    <span>{item.label}</span>
                                    <span style={{ color: 'hsl(var(--text-muted))' }}>{item.val}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'hsla(var(--bg-app), 1)', borderRadius: 'var(--radius-full)' }}>
                                    <div style={{
                                        width: `${item.val}%`,
                                        height: '100%',
                                        background: `hsl(${item.color})`,
                                        borderRadius: 'var(--radius-full)'
                                    }} />
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
