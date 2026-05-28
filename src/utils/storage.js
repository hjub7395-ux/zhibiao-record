const KEYS = {
  SAVED_METRICS: 'wr_savedMetrics',
  RECORDS: 'wr_records',
  SETTINGS: 'wr_settings'
}

function readJSON(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultValue
  } catch (e) {
    console.error('readJSON', e)
    return defaultValue
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('writeJSON', e)
  }
}

export function getSavedMetrics() {
  return readJSON(KEYS.SAVED_METRICS, [])
}

export function setSavedMetrics(list) {
  writeJSON(KEYS.SAVED_METRICS, list)
}

export function getRecords() {
  return readJSON(KEYS.RECORDS, [])
}

export function setRecords(list) {
  writeJSON(KEYS.RECORDS, list)
}

export function getSettings() {
  return readJSON(KEYS.SETTINGS, {})
}

export function setSettings(obj) {
  writeJSON(KEYS.SETTINGS, obj)
}

export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

export default {
  getSavedMetrics,
  setSavedMetrics,
  getRecords,
  setRecords,
  getSettings,
  setSettings,
  generateId
}
