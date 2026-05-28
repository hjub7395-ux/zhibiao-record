import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSettings, setSettings } from '../utils/storage'

export default function ModifyNextCheck() {
  const [nextCheckDate, setNextCheckDate] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const settings = getSettings()
    if (settings.nextCheckDate) setNextCheckDate(settings.nextCheckDate)
  }, [])

  function save() {
    const settings = getSettings()
    settings.nextCheckDate = nextCheckDate || null
    setSettings(settings)
    setMessage('复查时间已保存')
  }

  return (
    <div className="page page-next-check">
      <div className="home-container">
        <section className="card">
          <h2 className="card-title">修改复查时间</h2>
          <label style={{display:'block',marginBottom:8,fontSize:15,color:'#21323a'}}>下次复查预计时间</label>
          <input
            type="date"
            value={nextCheckDate || ''}
            onChange={(e) => setNextCheckDate(e.target.value)}
          />
          <div className="row" style={{marginTop:16}}>
            <button className="btn primary" onClick={save}>保存复查时间</button>
          </div>
          {message && <div className="empty" style={{marginTop:12,color:'#0f6b61'}}>{message}</div>}
          <div className="row" style={{marginTop:8}}>
            <button className="btn" onClick={() => navigate('/')}>返回首页</button>
          </div>
        </section>
      </div>
    </div>
  )
}
