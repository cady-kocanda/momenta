import { useFinancial } from '../contexts/FinancialContext'
import { useNavigation } from '../contexts/NavigationContext'

export default function FinancialOverviewPage() {
  const { getFinancialStats } = useFinancial()
  const stats = getFinancialStats()
  const { navigateToFinance } = useNavigation()

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '76px 32px 16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          className="nav-item"
          onClick={navigateToFinance}
          style={{ padding: '8px 12px', border: 'none', borderRadius: '8px', background: 'var(--bg)', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, fontFamily: "'LiebeHeide', 'Caveat', cursive" }}>Overview</h1>
        <div />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 32px 24px 32px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'

        }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '6px' }}>Net Worth</div>
            <div style={{ fontSize: '30px', fontWeight: 700 }}>${stats.netWorth.toLocaleString()}</div>
          </div>
          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '6px' }}>Total Savings</div>
            <div style={{ fontSize: '30px', fontWeight: 700 }}>${stats.totalSavings.toLocaleString()}</div>
          </div>
          <div style={{ background: 'var(--card-bg)', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '6px' }}>This Month Spent</div>
            <div style={{ fontSize: '30px', fontWeight: 700 }}>${stats.totalExpenses.toLocaleString()}</div>
          </div>
        </div>

        {/* Placeholder sections for future details */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '12px', padding: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 8px 0', fontFamily: "'LiebeHeide', 'Caveat', cursive" }}>Highlights</h2>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-dark)' }}>
            <li>Top spending category shown here</li>
            <li>Recent transactions summary</li>
            <li>Quick tips and insights</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


