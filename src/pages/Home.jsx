import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSettings, getSavedMetrics, getRecords } from '../utils/storage'

export default function Home() {
  const [settings, setSettings] = useState({})
  const [savedMetrics, setSaved] = useState([])
  const [latest, setLatest] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setSettings(getSettings())
    setSaved(getSavedMetrics())
    const recs = getRecords()
    if (recs && recs.length) setLatest(recs[recs.length - 1])
  }, [])

  function fmtDate(d) {
    if (!d) return null
    try {
      const dt = new Date(d)
      return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`
    } catch (e) {
      return d
    }
  }

  return (
    <div className="page page-home">
      <div className="home-container">
        <section className="card">
          <h3 className="card-title">下次复查预计时间</h3>
          {settings.nextCheckDate ? (
            <div className="next-date">{fmtDate(settings.nextCheckDate)}</div>
          ) : (
            <div className="empty">还没有设置下次复查预计时间</div>
          )}
          <div className="row">
            <button className="btn" onClick={() => navigate('/next-check')}>{settings.nextCheckDate ? '修改复查时间' : '添加复查时间'}</button>
          </div>
        </section>

        <section className="card">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <button className="big-btn primary-big" onClick={() => navigate('/new')} aria-label="记录新检查">记录新检查</button>
          </div>
        </section>

        <section className="card">
          <h3 className="card-title">常用指标</h3>
          {savedMetrics.length === 0 ? (
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div className="empty">还没有设置常用复查指标。请先选择你平时复查会看的指标。</div>
              <button className="big-btn secondary" onClick={() => navigate('/metrics')}>选择常用指标</button>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <div className="metrics-summary">已设置 {savedMetrics.length} 个常用指标</div>
              <div className="hint">使用底部“指标”页面管理常用项目</div>
            </div>
          )}
        </section>

        <section className="card">
          <h3 className="card-title">最近一次检查</h3>
          {latest ? (
            <div>
              <div className="next-date">{fmtDate(latest.checkDate)}</div>
              <div style={{marginTop:8}}>
                {latest.items.map((it, idx) => (
                  <div key={idx} className="r-item">{it.name}: {it.value} {it.unit}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty">还没有检查记录，点击底部“记录”开始添加。</div>
          )}
        </section>
      </div>
    </div>
  )
}
