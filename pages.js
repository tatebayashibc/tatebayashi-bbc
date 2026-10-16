// 戦績（年ごと）・選手（学年ごと）のタブ表示。データは results.json / players.json
(()=>{
  function tabs(keys,label,draw,prefix){
    const nav=$('#tabs');if(!nav||!keys.length)return;
    const pick=k=>{nav.querySelectorAll('button').forEach(b=>{const on=b.dataset.k===k;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});draw(k);history.replaceState(null,'','#'+prefix+k);watch()};
    nav.innerHTML=keys.map(k=>`<button type="button" role="tab" data-k="${k}">${label(k)}</button>`).join('');
    nav.onclick=e=>{const b=e.target.closest('button');if(b)pick(b.dataset.k)};
    const h=location.hash.slice(1+prefix.length);pick(keys.includes(h)?h:keys[0]);
  }
  const rl=$('#res-list');
  if(rl)fetch('results.json').then(r=>r.json()).then(items=>{
    items.sort((a,b)=>b.date.localeCompare(a.date));
    const years=[...new Set(items.map(i=>i.date.slice(0,4)))],mark={win:'○',lose:'●',draw:'△'};
    tabs(years,y=>y+'年',y=>{
      const rows=items.filter(i=>i.date.startsWith(y)),c=r=>rows.filter(i=>i.result===r).length;
      $('#res-sum').textContent=`${y} SEASON  ${c('win')}勝 ${c('lose')}敗 ${c('draw')}分`;
      rl.innerHTML=rows.map(i=>`<li class="rv"><time>${esc(i.date).replace(/-/g,'.')}</time><b>${esc(i.title)}<small>${esc(i.vs||'')}</small></b><em class="${esc(i.result)}">${mark[i.result]||''} ${esc(i.score||'')}</em></li>`).join('');
    },'y');
  });
  const pc=$('#player-list');
  if(pc)fetch('players.json').then(r=>r.json()).then(ps=>{
    const grades=[...new Set(ps.map(p=>String(p.grade)))].sort();
    tabs(grades,g=>g+'年生',g=>{
      pc.innerHTML=ps.filter(p=>String(p.grade)===g).map(p=>`<li class="pcard rv">${p.photo?`<img src="${esc(p.photo)}" alt="" onerror="this.remove()">`:''}<span class="no">${esc(p.no??'')}</span><span class="nm"><b>${esc(p.name)}</b><small>${esc(p.pos||'')}</small></span></li>`).join('');
    },'g');
  });
  // 記事ページ：その記事のサムネイルをタイトル背景にする
  if($('#article'))fetch('news.json').then(r=>r.json()).then(items=>{
    const n=items.find(x=>String(x.id)===new URLSearchParams(location.search).get('id'));
    if(n&&n.image)$('.phero').style.setProperty('--bg',`url("${n.image}")`);
  });
})();
