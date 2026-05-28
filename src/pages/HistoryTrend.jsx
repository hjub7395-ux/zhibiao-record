import { useState, useEffect } from 'react'
import { getRecords, setRecords, getSavedMetrics } from '../utils/storage'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function Chart({ data, name, unit }) {
  if (!data || data.length < 2) return <div className="empty">记录次数较少，继续记录后可查看趋势变化</div>
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="checkDate" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-note">最近一次：{data[data.length-1].value} {unit}</div>
    </div>
  )
}

export default function HistoryTrend() {
  const [records, setRecs] = useState([])
  const [metrics, setMetrics] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setRecs(getRecords().slice().reverse())
    setMetrics(getSavedMetrics())
  }, [])

  function del(id) {
    if (!confirm('确认删除这条记录吗？')) return
    const all = getRecords().filter((r) => r.id !== id)
    setRecords(all)
    setRecs(all.slice().reverse())
  }

  const allMetricOptions = [...metrics]
  records.forEach(r => r.items.forEach(i => {
    if (!allMetricOptions.find(m => m.name === i.name)) allMetricOptions.push({ id: i.metricId || i.name, name: i.name, unit: i.unit })
  }))

  const series = selected
    ? records
        .map((r) => {
          const it = r.items.find((i) => (i.metricId || i.name) === selected)
          return it ? { checkDate: r.checkDate, value: Number(it.value) } : null
        })
        .filter(Boolean)
        .reverse()
    : []

  return (
    <div className="page page-history">
      <section className="card">
        <h2>历史记录</h2>
        {records.length === 0 && <div className="empty">还没有检查记录，点击“记录新检查”开始添加。</div>}
        <ul className="record-list">
          {records.map((r) => (
            <li key={r.id} className="record-item">
              <div className="r-top">
                <div className="r-date">{r.checkDate}</div>
                <div>
                  <button className="btn small" onClick={() => {}}>编辑</button>
                  <button className="btn small danger" onClick={() => del(r.id)}>删除</button>
                </div>
              </div>
              <div className="r-items">
                {r.items.map((it, idx) => (
                  <div key={idx} className="r-item">{it.name}: {it.value} {it.unit}</div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h3>查看指标趋势</h3>
        <div className="select-row">
          <select value={selected || ''} onChange={(e) => setSelected(e.target.value || null)}>
            <option value="">请选择指标</option>
            {allMetricOptions.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        {selected && <Chart data={series} name={selected} unit={(allMetricOptions.find(m => m.id === selected) || {}).unit || ''} />}
      </section>
    </div>
  )
}
