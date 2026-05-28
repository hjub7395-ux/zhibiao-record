import { useState, useEffect } from 'react'
import { getSavedMetrics, getRecords, setRecords, generateId, getSettings, setSettings } from '../utils/storage'

export default function NewRecord() {
  const [savedMetrics, setSavedMetrics] = useState([])
  const [date, setDate] = useState('')
  const [values, setValues] = useState({})
  const [note, setNote] = useState('')

  useEffect(() => {
    setSavedMetrics(getSavedMetrics())
    const today = new Date().toISOString().slice(0, 10)
    setDate(today)
  }, [])

  function handleChange(id, v) {
    setValues({ ...values, [id]: v })
  }

  function addTemp() {
    const name = prompt('临时指标名称')
    if (!name) return
    const unit = prompt('单位（可选）') || ''
    const tempId = generateId('temp')
    setSavedMetrics([...savedMetrics, { id: tempId, name, unit }])
  }

  function save() {
    const records = getRecords()
    const items = []
    for (const m of savedMetrics) {
      const raw = values[m.id]
      if (raw === undefined || raw === '') continue
      const v = Number(raw)
      items.push({ metricId: m.id.startsWith('metric_') ? m.id : null, name: m.name, value: isNaN(v) ? raw : v, unit: m.unit })
    }
    const rec = { id: generateId('record'), checkDate: date, items, nextCheckDate: null, note }
    records.push(rec)
    setRecords(records)
    alert('保存成功')
    // reset values
    setValues({})
    setNote('')
  }

  if (savedMetrics.length === 0) {
    return (
      <div className="page page-new">
        <div className="card empty">
          你还没有设置常用复查指标。
          <div>请先选择常用指标，之后记录时会自动显示这些项目。</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page page-new">
      <section className="card">
        <label>检查日期</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </section>

      <section className="card">
        <h3>检查项（只填写有数值的项）</h3>
        {savedMetrics.map((m) => (
          <div key={m.id} className="metric-row">
            <label className="metric-name">{m.name}</label>
            <input inputMode="decimal" className="metric-input" value={values[m.id] || ''} onChange={(e) => handleChange(m.id, e.target.value)} />
            <div className="metric-unit">{m.unit}</div>
          </div>
        ))}

        <div className="row">
          <button className="btn" onClick={addTemp}>添加临时指标</button>
        </div>
      </section>

      <section className="card">
        <label>备注（可选）</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="row">
          <button className="btn primary" onClick={save}>保存检查记录</button>
        </div>
      </section>
    </div>
  )
}
