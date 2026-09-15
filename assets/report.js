if(window.self!==window.top)document.body.classList.add('embedded');
const sections=[...document.querySelectorAll('main>section')];
const signal=sections.find(s=>s.querySelector('h2')?.textContent.match(/下一交易日|暂定信号|信号预览/));
const chart=sections.find(s=>s.querySelector('svg'));
if(signal&&chart){const grid=document.createElement('div');grid.className='overview-grid';signal.before(grid);grid.append(chart,signal);signal.classList.add('signal-panel');
 const svg=chart.querySelector('svg');svg.setAttribute('role','img');svg.setAttribute('aria-label','账户历史净值走势');
 const ns='http://www.w3.org/2000/svg';const lines=document.createElementNS(ns,'g');for(const y of [40,90,140,190]){const l=document.createElementNS(ns,'line');for(const [k,v]of Object.entries({x1:20,x2:980,y1:y,y2:y,stroke:'#edf1f7','stroke-dasharray':'4 5'}))l.setAttribute(k,v);lines.append(l)}svg.prepend(lines);
 const caption=document.createElement('div');caption.className='chart-caption';const start=document.querySelector('main>p')?.textContent.match(/(\d{4}-\d{2}-\d{2})空仓/);caption.innerHTML=`<span>${start?start[1]:'账户起始'}</span><span>连续账户 · 2026-09-15 盘中</span>`;chart.append(caption);
}
const jumps=document.createElement('nav');jumps.className='report-jumps';jumps.setAttribute('aria-label','报告章节');sections.forEach((s,i)=>{const h=s.querySelector('h2');if(!h)return;s.id=s.id||'section-'+i;const a=document.createElement('a');a.href='#'+s.id;a.textContent=h.textContent;jumps.append(a)});if(sections.length)document.querySelector('.metrics')?.after(jumps);
document.querySelectorAll('td,.metrics b').forEach(el=>{const t=el.textContent.trim();if(/^-?\d+(\.\d+)?%$/.test(t)){const n=parseFloat(t);if(n)el.classList.add(n>0?'positive':'negative')}});
const labels={signal_date:'信号日期',trade_date:'交易日期',action:'交易动作',sector:'板块',from_sector:'原板块',to_sector:'目标板块',rs20:'20日相对强度',score:'评分',reason:'触发原因',target_weight:'目标仓位',nav_at_open:'开盘净值',cycle_return:'周期收益',losing_cycle_streak:'连续亏损周期'};document.querySelectorAll('th').forEach(el=>{const key=el.textContent.trim();if(labels[key]){el.textContent=labels[key];el.title=key}});
const filter=document.getElementById('filter');if(filter)filter.setAttribute('aria-label','筛选每日持仓记录');
if(signal){const p=signal.querySelector('p');if(p){const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);while(walker.nextNode()){walker.currentNode.textContent=walker.currentNode.textContent.replace('ENTRY_GATE_CLOSED_OR_NO_CANDIDATE','未满足开仓条件，或暂无符合条件的候选').replace(/\bCASH\b/g,'保持现金').replace('当前Top1：','当前排名第一：')}}}
