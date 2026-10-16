// ===== 設定：ここのURLを書き換えてください =====
const INSTAGRAM_URL="https://www.instagram.com/";
const CONTACT_URL="https://forms.gle/";
// メニュー項目（全ページ共通）[日本語, 英語, URL, 外部リンクならtrue]
const MENU=[
  ["チームについて","About","index.html#about"],
  ["パートナー","Partners","partner.html"],
  ["インスタグラム","Instagram",INSTAGRAM_URL,true],
  ["新入生募集","Recruit","recruit.html"],
  ["施設","Facility","facility.html"],
  ["お問い合わせ","Contact",CONTACT_URL,true]
];
// 下層ページの順番（ページ下の「NEXT」に使用）
const PAGES=[["policy.html","Policy","指導方針"],["facility.html","Facility","活動施設"],["recruit.html","Recruit","6期生募集要項"],["partner.html","Partners","協賛・パートナーズ"],["news.html","News","活動報告・お知らせ"]];
// ================================================
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const br=s=>esc(s).split('\n').join('<br>'),ext=u=>u?' target="_blank" rel="noopener"':'';
const isTop=document.body.classList.contains('top');

// header / menu / footer
document.body.insertAdjacentHTML('afterbegin',
`<header class="bar"><a class="brand" href="index.html">${isTop?'':'Tatebayashi BC'}</a>
<button class="burger" aria-label="メニューを開く" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button></header>
<nav id="menu" class="menu" aria-label="メニュー"><ul>${MENU.map((m,i)=>`<li style="--i:${i}"><a href="${m[2]}"${ext(m[3])}><span class="n">0${i+1}</span><span class="en">${m[1]}</span><span class="jp">${m[0]}</span></a></li>`).join('')}</ul></nav>`);
document.body.insertAdjacentHTML('beforeend',
`<footer><div class="f-in"><ul>${MENU.map(m=>`<li><a href="${m[2]}"${ext(m[3])}>${m[0]}</a></li>`).join('')}</ul>
<a class="insta" href="${INSTAGRAM_URL}" target="_blank" rel="noopener"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>INSTAGRAM</a></div>
<small>© Tatebayashi Baseball Club</small></footer>`);
document.querySelectorAll('[data-contact]').forEach(a=>a.href=CONTACT_URL);

const burger=$('.burger'),menu=$('#menu');
const toggle=o=>{burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'メニューを閉じる':'メニューを開く');menu.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''};
burger.addEventListener('click',()=>toggle(!menu.classList.contains('open')));
menu.addEventListener('click',e=>{if(e.target.closest('a'))toggle(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
const bar=$('.bar'),onScroll=()=>bar.classList.toggle('scrolled',scrollY>40);
addEventListener('scroll',onScroll,{passive:true});onScroll();

// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
const watch=()=>document.querySelectorAll('.rv:not(.in)').forEach((el,i)=>{el.style.setProperty('--d',(i%4)*.08+'s');io.observe(el)});
watch();
const hv=$('.hero video');if(hv)hv.play().catch(()=>{});

// news（横スライド / 一覧）
const list=$('#news-list');
if(list){
  const limit=+(list.dataset.limit||0);
  fetch('news.json').then(r=>r.json()).then(items=>{
    items.sort((a,b)=>b.date.localeCompare(a.date));if(limit)items=items.slice(0,limit);
    list.innerHTML=items.map(n=>{
      const href=n.url||(n.body?'news-detail.html?id='+encodeURIComponent(n.id):'');
      const t=href?'a':'div',at=href?` href="${esc(href)}"${ext(n.url)}`:'';
      return `<li class="rv"><${t} class="card"${at}><span class="thumb"${n.image?` style="background-image:url('${esc(n.image)}')"`:''}></span><span class="shade"></span><time>${esc(n.date).replace(/-/g,'.')}</time><span class="ttl">${br(n.title)}</span>${href?'<span class="go"></span>':''}</${t}></li>`}).join('');
    watch();initRail();
  }).catch(()=>{list.innerHTML='<li class="loading">お知らせを読み込めませんでした。</li>'});
}
function initRail(){
  if(!list.classList.contains('rail'))return;
  const bar=$('.progress i'),upd=()=>{const m=list.scrollWidth-list.clientWidth;bar.style.width=(m>0?20+80*list.scrollLeft/m:100)+'%'};
  list.addEventListener('scroll',upd,{passive:true});upd();
  const step=()=>(list.firstElementChild?.offsetWidth||300)+16;
  $('.prev').onclick=()=>list.scrollBy({left:-step(),behavior:'smooth'});
  $('.next').onclick=()=>list.scrollBy({left:step(),behavior:'smooth'});
}

// partners
const pl=$('#partner-list');
if(pl)fetch('partners.json').then(r=>r.json()).then(ps=>{
  pl.innerHTML=ps.map(p=>{const t=p.url?'a':'div',at=p.url?` href="${esc(p.url)}"${ext(1)}`:'';
    return `<li class="rv"><${t}${at}><img src="${esc(p.logo)}" alt="${esc(p.name)}" onerror="this.replaceWith(document.createTextNode(this.alt))"></${t}></li>`}).join('');watch();
});

// 記事ページ
const art=$('#article');
if(art){
  const id=new URLSearchParams(location.search).get('id');
  fetch('news.json').then(r=>r.json()).then(items=>{
    const n=items.find(x=>String(x.id)===id);
    if(!n){$('#a-title').textContent='記事が見つかりませんでした';return}
    document.title=n.title.replace(/\n/g,' ')+' | 館林ベースボールクラブ';
    $('#a-title').innerHTML=br(n.title);$('#a-date').textContent=n.date.replace(/-/g,'.');
    art.innerHTML=(n.images||(n.image?[n.image]:[])).map(s=>`<img class="photo" src="${esc(s)}" alt="" onerror="this.remove()">`).join('')+
      String(n.body||'').split('\n').filter(Boolean).map(s=>`<p>${esc(s)}</p>`).join('')+'<a class="btn" href="news.html">活動報告一覧へ</a>';
  });
}

// 下層ページ：NEXT
const cur=document.body.dataset.page,ci=PAGES.findIndex(p=>p[0]===cur);
if(ci>-1){const nx=PAGES[(ci+1)%PAGES.length];
  $('footer').insertAdjacentHTML('beforebegin',`<nav class="pnav"><a href="${nx[0]}"><small>NEXT — ${nx[1]}</small><b>${nx[2]} →</b></a></nav>`)}
