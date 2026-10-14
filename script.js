// ===== 設定：ここのURLを書き換えてください =====
const INSTAGRAM_URL="https://www.instagram.com/";
const CONTACT_URL="https://forms.gle/";
// メニュー項目（全ページ共通）。追加・並び替えはここ
const MENU=[
  ["チームについて","index.html#about"],
  ["パートナー","partner.html"],
  ["インスタグラム",INSTAGRAM_URL,true],
  ["新入生募集","recruit.html"],
  ["施設","facility.html"],
  ["お問い合わせ",CONTACT_URL,true]
];
// ================================================
const isTop=document.body.classList.contains('top');
document.body.insertAdjacentHTML('afterbegin',
`<header class="bar">${isTop?'':'<a class="home" href="index.html">館林ベースボールクラブ</a>'}
<button class="burger" aria-label="メニューを開く" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button></header>
<nav id="menu" class="menu" hidden><ul>${MENU.map(m=>`<li><a href="${m[1]}"${m[2]?' target="_blank" rel="noopener"':''}>${m[0]}</a></li>`).join('')}</ul></nav>`);
document.body.insertAdjacentHTML('beforeend',
`<footer><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" class="insta"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>INSTAGRAM</a><p>© 館林ベースボールクラブ</p></footer>`);
document.querySelectorAll('[data-contact]').forEach(a=>a.href=CONTACT_URL);
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
