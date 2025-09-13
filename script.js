// -------------------- 内置示例数据 --------------------
const builtInData = [
  {infinitive: 'be', past: 'was/were', pastParticiple: 'been', zh: '是；在'},
  {infinitive: 'go', past: 'went', pastParticiple: 'gone', zh: '去'},
  {infinitive: 'do', past: 'did', pastParticiple: 'done', zh: '做'},
  {infinitive: 'see', past: 'saw', pastParticiple: 'seen', zh: '看见'},
  {infinitive: 'come', past: 'came', pastParticiple: 'come', zh: '来'}
];

let dataset = []; // 页面加载时将覆盖为 dictionary.csv

// -------------------- DOM 元素 --------------------
const qEl = document.getElementById('q');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const resultArea = document.getElementById('resultArea');
let lastRendered = null;

// -------------------- 工具函数 --------------------
function normalize(s){ return (s||'').toString().trim().toLowerCase(); }
function escapeHtml(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// -------------------- CSV/TSV 解析 --------------------
function parseGrid(text){
  const raw = text.replace(/\r/g,'');
  const lines = raw.split('\n').filter(l => l.trim().length>0 && !/^\s*#/.test(l));
  if(lines.length === 0) return [];
  const delim = lines[0].includes('\t') ? '\t' : ',';
  const rows = lines.map(line => {
    if(delim === '\t'){
      return line.split('\t').map(c => c.trim());
    } else {
      const out = [];
      let cur = '';
      let inQuotes = false;
      for(let i=0;i<line.length;i++){
        const ch = line[i];
        if(ch === '"'){
          if(inQuotes && i+1<line.length && line[i+1]==='"'){ cur+='"'; i++; }
          else inQuotes=!inQuotes;
        } else if(ch===',' && !inQuotes){ out.push(cur.trim()); cur=''; }
        else cur+=ch;
      }
      out.push(cur.trim());
      return out;
    }
  });

  return rows.map(cols=>({
    infinitive: cols[0]||'',
    past: cols[1]||'',
    pastParticiple: cols[2]||'',
    zh: cols[3]||''
  })).filter(r=>r.infinitive||r.past||r.pastParticiple||r.zh);
}

// -------------------- 搜索 --------------------
function search(q){
  const key = normalize(q);
  if(!key) return dataset.slice();

  const origMatch = [];
  const pastMatch = [];
  const ppMatch = [];

  dataset.forEach(r => {
    const inf = normalize(r.infinitive);
    const past = normalize(r.past);
    const pp = normalize(r.pastParticiple);

    if(inf.includes(key)) origMatch.push(r);
    else if(past.includes(key)) pastMatch.push(r);
    else if(pp.includes(key)) ppMatch.push(r);
  });

  // 原形匹配按字母数降序
  origMatch.sort((a,b)=>b.infinitive.length - a.infinitive.length);

  return [...origMatch, ...pastMatch, ...ppMatch];
}

// -------------------- 渲染 --------------------
function renderTable(list, highlightKey){
  lastRendered = list.slice();
  if(!list || list.length===0){ 
    resultArea.innerHTML='<div class="muted">没有查到结果。</div>'; 
    return; 
  }

  const key = highlightKey ? normalize(highlightKey) : null;

  let html = '<table><thead><tr><th>原形</th><th>过去式</th><th>过去分词</th><th>翻译</th></tr></thead><tbody>';
  for(let r of list){
    let inf = escapeHtml(r.infinitive);
    if(key && normalize(r.infinitive).includes(key)){
      const re = new RegExp(`(${key})`, 'gi');
      inf = inf.replace(re, `<span class="highlight">$1</span>`);
    }
    html += `<tr>
      <td>${inf}</td>
      <td>${escapeHtml(r.past)}</td>
      <td>${escapeHtml(r.pastParticiple)}</td>
      <td>${escapeHtml(r.zh)}</td>
    </tr>`;
  }
  html += '</tbody></table>';
  resultArea.innerHTML = html;
}

// -------------------- 页面事件 --------------------
searchBtn.addEventListener('click', ()=>{
  const q = qEl.value;
  const res = search(q);
  renderTable(res, q);
});

qEl.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    const q = qEl.value;
    const res = search(q);
    renderTable(res, q);
  }
});

showAllBtn.addEventListener('click', ()=> renderTable(dataset));

// -------------------- 默认加载 dictionary.csv --------------------
window.addEventListener('DOMContentLoaded', ()=>{
  fetch('dictionary.csv')
    .then(resp=>resp.text())
    .then(txt=>{
      const parsed = parseGrid(txt);
      dataset = parsed.length>0 ? parsed : builtInData;
      renderTable(dataset);
    })
    .catch(err=>{
      console.warn('无法加载 dictionary.csv，使用内置示例数据', err);
      dataset = builtInData;
      renderTable(dataset);
    });
});
