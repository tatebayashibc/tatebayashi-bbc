// メニュー開閉
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
if(burger){
  const toggle=o=>{burger.setAttribute('aria-expanded',o);menu.hidden=!o;document.body.style.overflow=o?'hidden':''};
  burger.addEventListener('click',()=>toggle(menu.hidden));
  menu.addEventListener('click',e=>{if(e.target.closest('a'))toggle(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
}
// 活動報告：news.json から表示（新しいものが上）
const list=document.getElementById('news-list');
if(list){
  const limit=parseInt(list.dataset.limit||'0',10);
  fetch('news.json').then(r=>r.json()).then(items=>{
    items.sort((a,b)=>b.date.localeCompare(a.date));
    if(limit)items=items.slice(0,limit);
    list.innerHTML='';
    items.forEach(n=>{
      const li=document.createElement('li'),a=document.createElement('a');
      a.href=n.url||'#';if(n.url&&/^https?:/.test(n.url))a.target='_blank',a.rel='noopener';
      const th=document.createElement('span');th.className='thumb';
      if(n.image)th.style.backgroundImage=`url("${n.image}")`;
      const tx=document.createElement('span');tx.className='txt';
      const t=document.createElement('time');t.textContent=n.date.replace(/-/g,'.');
      const ti=document.createElement('span');ti.className='ttl';ti.innerHTML=String(n.title).split('\n').map(s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))).join('<br>');
      tx.append(t,ti);
      const ar=document.createElement('span');ar.className='arrow';
      a.append(th,tx,ar);li.append(a);list.append(li);
    });
  }).catch(()=>{list.innerHTML='<li class="loading">お知らせを読み込めませんでした。</li>'});
}
