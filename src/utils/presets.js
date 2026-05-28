export const PRESET_METRICS = [
  // 铜代谢相关
  { id: 'm_24h_urine_cu', name: '24小时尿铜', unit: 'μmol/24h' },
  { id: 'm_ceruloplasmin', name: '铜蓝蛋白', unit: 'g/L' },
  { id: 'm_serum_cu', name: '血清铜', unit: 'μmol/L' },
  { id: 'm_free_cu', name: '游离铜', unit: 'μmol/L' },
  { id: 'm_urine_zn', name: '尿锌', unit: 'μmol/24h' },

  // 肝功能
  { id: 'm_alt', name: 'ALT', unit: 'U/L' },
  { id: 'm_ast', name: 'AST', unit: 'U/L' },
  { id: 'm_ggt', name: 'GGT', unit: 'U/L' },
  { id: 'm_alp', name: 'ALP', unit: 'U/L' },
  { id: 'm_tbil', name: '总胆红素', unit: 'μmol/L' },
  { id: 'm_dbil', name: '直接胆红素', unit: 'μmol/L' },
  { id: 'm_albumin', name: '白蛋白', unit: 'g/L' },
  { id: 'm_total_protein', name: '总蛋白', unit: 'g/L' },

  // 凝血与血常规
  { id: 'm_pt', name: 'PT', unit: 's' },
  { id: 'm_inr', name: 'INR', unit: '' },
  { id: 'm_wbc', name: '白细胞', unit: '10^9/L' },
  { id: 'm_rbc', name: '红细胞', unit: '10^12/L' },
  { id: 'm_hb', name: '血红蛋白', unit: 'g/L' },
  { id: 'm_platelet', name: '血小板', unit: '10^9/L' },

  // 肾功能与尿检
  { id: 'm_creatinine', name: '肌酐', unit: 'μmol/L' },
  { id: 'm_urea', name: '尿素', unit: 'mmol/L' },
  { id: 'm_urine_protein', name: '尿蛋白', unit: 'g/L' },

  // 其他
  { id: 'm_weight', name: '体重', unit: 'kg' },
  { id: 'm_bp_sys', name: '血压高压', unit: 'mmHg' },
  { id: 'm_bp_dia', name: '血压低压', unit: 'mmHg' }
]

export default PRESET_METRICS
