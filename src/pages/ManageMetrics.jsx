import { useState, useEffect } from 'react'
import { PRESET_METRICS } from '../utils/presets'
import { getSavedMetrics, setSavedMetrics, generateId } from '../utils/storage'

export default function ManageMetrics() {
  const [saved, setSaved] = useState([])
  const [customName, setCustomName] = useState('')
  const [customUnit, setCustomUnit] = useState('')

  useEffect(() => {
    setSaved(getSavedMetrics())
  }, [])

  function togglePreset(item) {
    const exists = saved.find((s) => s.id === item.id)
    let next
    if (exists) {
      next = saved.filter((s) => s.id !== item.id)
    } else {
      next = [...saved, item]
    }
    setSaved(next)
    setSavedMetrics(next)
  }

  function removeMetric(id) {
    const next = saved.filter((s) => s.id !== id)
    setSaved(next)
    setSavedMetrics(next)
  }

  function addCustom() {
    if (!customName) return
    const item = { id: generateId('metric'), name: customName, unit: customUnit }
    const next = [...saved, item]
    setSaved(next)
    setSavedMetrics(next)
    setCustomName('')
    setCustomUnit('')
  }

  function updateUnit(id, unit) {
    const next = saved.map((s) => (s.id === id ? { ...s, unit } : s))
    setSaved(next)
    setSavedMetrics(next)
  }

  return (
    <div className="page page-manage">
      <section className="card">
        <h2 className="card-title">选择你常用的复查指标</h2>
        <p>以后记录时会自动显示这些项目，只需要填写数值。</p>
        <div className="preset-grid">
          {PRESET_METRICS.map((p) => {
            const active = saved.find((s) => s.id === p.id)
            return (
              <button key={p.id} className={"preset-btn " + (active ? 'active' : '')} onClick={() => togglePreset(p)}>
                {p.name}
                <div className="unit">{p.unit}</div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h3>已选择的常用指标</h3>
        {saved.length === 0 && <div className="empty">暂无已选指标</div>}
        <ul className="saved-list">
          {saved.map((s) => (
            <li key={s.id} className="saved-item">
              <div className="s-left">
                <strong>{s.name}</strong>
                <input className="unit-input" value={s.unit || ''} onChange={(e) => updateUnit(s.id, e.target.value)} />
              </div>
              <div className="s-right">
                <button className="btn small" onClick={() => removeMetric(s.id)}>删除</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h3>添加自定义常用指标</h3>
        <input placeholder="指标名称" value={customName} onChange={(e) => setCustomName(e.target.value)} />
        <input placeholder="单位（可选）" value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} />
        <div className="row">
          <button className="btn primary" onClick={addCustom}>添加自定义指标</button>
        </div>
      </section>
    </div>
  )
}
