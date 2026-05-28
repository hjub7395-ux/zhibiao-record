import './App.css'
import './theme.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import NewRecord from './pages/NewRecord'
import HistoryTrend from './pages/HistoryTrend'
import ManageMetrics from './pages/ManageMetrics'
import ModifyNextCheck from './pages/ModifyNextCheck'

function App() {
  const loc = useLocation()
  const path = loc.pathname || '/'
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-title-group">
          <h1>指标记录本</h1>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewRecord />} />
          <Route path="/history" element={<HistoryTrend />} />
          <Route path="/metrics" element={<ManageMetrics />} />
          <Route path="/next-check" element={<ModifyNextCheck />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className={"nav-btn " + (path === '/' ? 'active' : '')}>首页</Link>
        <Link to="/new" className={"nav-btn " + (path === '/new' ? 'active' : '')}>记录</Link>
        <Link to="/history" className={"nav-btn " + (path === '/history' ? 'active' : '')}>历史</Link>
        <Link to="/metrics" className={"nav-btn " + (path === '/metrics' ? 'active' : '')}>指标</Link>
      </nav>
    </div>
  )
}

export default App
