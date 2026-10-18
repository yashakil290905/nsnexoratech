
(() => {
'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=$('.site-nav');
const onScroll=()=>{if(nav)nav.classList.toggle('scrolled',scrollY>24);$('.back-top')?.classList.toggle('show',scrollY>500)};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
const observer=('IntersectionObserver'in window)?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'}):null;
$$('.reveal').forEach(el=>{if(reduce||!observer)el.classList.add('visible');else observer.observe(el)});
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
$$('.cursor-glow,.service-card,.project-card,.price-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',`${e.clientX-r.left}px`);el.style.setProperty('--my',`${e.clientY-r.top}px`)}));
$$('[data-tilt]').forEach(el=>{if(reduce||matchMedia('(pointer:coarse)').matches)return;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const group=btn.closest('[data-filter-group]')||document;$$('[data-filter]',group).forEach(b=>b.classList.toggle('active',b===btn));const val=btn.dataset.filter;$$('[data-category]').forEach(card=>{const show=val==='all'||card.dataset.category.split(' ').includes(val);card.hidden=!show})}));
const search=$('[data-project-search]');if(search)search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();$$('[data-project-name]').forEach(card=>card.hidden=!card.dataset.projectName.toLowerCase().includes(q)||card.hiddenByFilter===true)});
const form=$('[data-quote-form]');if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=Object.fromEntries(new FormData(form));const msg=`Hello NexoraTech! I'd like a quote.\nName: ${d.name}\nEmail: ${d.email}\nService: ${d.service}\nBudget: ${d.budget||'Not specified'}\nDetails: ${d.details}`;const number=window.NEXORA_WHATSAPP_NUMBER||'REPLACE_WITH_YOUR_WHATSAPP_NUMBER';if(number.includes('REPLACE')){const out=$('[data-form-feedback]');if(out)out.textContent='Form validated. Add your WhatsApp number in assets/js/main.js to send this brief.';return}window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`,'_blank','noopener');const out=$('[data-form-feedback]');if(out)out.textContent='Your quote brief is ready in WhatsApp.'});
const chat=$('.chat-panel'),fab=$('.chat-fab');if(chat&&fab){fab.addEventListener('click',()=>{chat.classList.toggle('open');fab.setAttribute('aria-expanded',String(chat.classList.contains('open')))});$('[data-chat-close]')?.addEventListener('click',()=>chat.classList.remove('open'));$$('[data-chat-choice]').forEach(b=>b.addEventListener('click',()=>{const answer=$('[data-chat-answer]');if(answer)answer.textContent=b.dataset.chatChoice;const number=window.NEXORA_WHATSAPP_NUMBER||'REPLACE_WITH_YOUR_WHATSAPP_NUMBER';if(b.dataset.chatAction==='whatsapp'&&!number.includes('REPLACE'))window.open(`https://wa.me/${number}?text=${encodeURIComponent('Hello NexoraTech, I need help with: '+b.dataset.chatChoice)}`,'_blank','noopener')}))}
$('.back-top')?.addEventListener('click',()=>{
  if(!reduce && window.jQuery && window.jQuery.easing && window.jQuery.fn.animate){window.jQuery('html, body').stop(true).animate({scrollTop:0},850,'easeInOutCubic');}
  else window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
});
// jQuery Counter-Up plugin (Waypoints-powered) with a native fallback if a CDN is unavailable.
$$('[data-count]').forEach(el=>{el.classList.add('nx-counter');if(reduce)el.textContent=el.dataset.count});
if(!reduce){
  if(window.jQuery && window.jQuery.fn && window.jQuery.fn.counterUp && window.jQuery.fn.waypoint){
    window.jQuery('.nx-counter').each(function(){this.textContent=this.dataset.count;});
    window.jQuery('.nx-counter').counterUp({delay:18,time:1250});
  } else {
    $$('[data-count]').forEach(el=>{const end=Number(el.dataset.count);const obs=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){const t0=performance.now(),dur=1000;function tick(now){const p=Math.min((now-t0)/dur,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);obs.disconnect()}}));obs.observe(el)});
  }
}
$$('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());

/* jQuery Easing integration: smooth in-page navigation with a graceful fallback. */
if(window.jQuery && window.jQuery.easing){
  window.jQuery(document).on('click','.site-nav a[href*="#"], a[data-smooth-scroll]',function(e){
    const href=this.getAttribute('href'); if(!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    let target; try{target=new URL(href,location.href)}catch(_){return}
    if(target.pathname!==location.pathname || !target.hash) return;
    const el=document.querySelector(target.hash); if(!el) return;
    e.preventDefault(); window.jQuery('html, body').stop(true).animate({scrollTop:window.jQuery(el).offset().top-84},900,'easeInOutCubic',()=>{history.replaceState(null,'',target.hash)});
  });
}


/* Premium motion layer: scroll progress, ambient pointer, magnetic controls and particle field */
const motionOK = !reduce && !window.matchMedia('(pointer: coarse)').matches;
const progress = document.createElement('div');
progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.appendChild(progress);
let scrollTick = false;
const updateProgress = () => { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`; scrollTick = false; };
window.addEventListener('scroll', () => { if (!scrollTick) { requestAnimationFrame(updateProgress); scrollTick = true; } }, { passive: true }); updateProgress();
if (motionOK) {
  const halo = document.createElement('div'); halo.className = 'pointer-halo'; halo.setAttribute('aria-hidden', 'true'); document.body.appendChild(halo);
  let px = innerWidth * .5, py = innerHeight * .5, hx = px, hy = py;
  window.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; halo.classList.add('is-visible'); }, { passive: true });
  window.addEventListener('pointerdown', () => halo.classList.add('is-pressed')); window.addEventListener('pointerup', () => halo.classList.remove('is-pressed'));
  const moveHalo = () => { hx += (px - hx) * .18; hy += (py - hy) * .18; halo.style.transform = `translate3d(${hx}px,${hy}px,0) translate(-50%,-50%)`; requestAnimationFrame(moveHalo); };
  requestAnimationFrame(moveHalo);
  $$('.btn-primary-custom, .btn-quiet').forEach(el => {
    el.classList.add('magnetic-ready');
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const dx = (e.clientX - (r.left + r.width / 2)) / r.width; const dy = (e.clientY - (r.top + r.height / 2)) / r.height; el.style.transform = `translate3d(${dx * 7}px,${dy * 6}px,0)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
if (!reduce) {
  $$('.hero, .page-hero').forEach(section => {
    if (section.querySelector('.motion-canvas')) return;
    const canvas = document.createElement('canvas'); canvas.className = 'motion-canvas'; canvas.setAttribute('aria-hidden', 'true'); section.prepend(canvas);
    const ctx = canvas.getContext('2d', { alpha: true }); if (!ctx) return;
    let w = 0, h = 0, frame = 0; const dpr = Math.min(window.devicePixelRatio || 1, 1.5); const points = [];
    const resize = () => { const r = section.getBoundingClientRect(); w = Math.max(1, r.width); h = Math.max(1, r.height); canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr); canvas.style.width = `${w}px`; canvas.style.height = `${h}px`; ctx.setTransform(dpr,0,0,dpr,0,0); points.length=0; const count=Math.min(42,Math.max(16,Math.floor(w/28))); for(let i=0;i<count;i++)points.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.5,phase:Math.random()*Math.PI*2}); };
    const draw = () => { ctx.clearRect(0,0,w,h); const maxDist=Math.min(145,w*.19); for(let i=0;i<points.length;i++){const a=points[i];a.x+=a.vx;a.y+=a.vy;a.phase+=.012;if(a.x < -8 || a.x>w+8)a.vx*=-1;if(a.y < -8 || a.y>h+8)a.vy*=-1;const alpha=.28+(Math.sin(a.phase)+1)*.12;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fillStyle=`rgba(72,205,255,${alpha})`;ctx.fill();for(let j=i+1;j<points.length;j++){const b=points[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<maxDist){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(38,143,255,${(1-dist/maxDist)*.14})`;ctx.lineWidth=.7;ctx.stroke();}}}frame=requestAnimationFrame(draw);};
    resize(); draw(); const ro='ResizeObserver'in window?new ResizeObserver(resize):null; if(ro)ro.observe(section);else window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frame);else{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}});
  });
}
$$('.service-card, .project-card, .price-card, .feature-card, .about-point').forEach((el,i)=>{if(!el.closest('.reveal'))el.classList.add('motion-item');el.style.setProperty('--motion-delay',`${(i%4)*75}ms`)});
const motionItems=$$('.motion-item'); if(motionItems.length){if(reduce||!('IntersectionObserver'in window))motionItems.forEach(el=>el.classList.add('motion-in'));else{const itemObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-in');itemObserver.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -24px 0px'});motionItems.forEach(el=>itemObserver.observe(el));}}


/* V8 motion choreography: loader, staggered title, cursor ring, interactive 3D and page wipe */
const nxMotionEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (nxMotionEnabled) {
  document.body.classList.add('nx-loading');
  const pre=document.createElement('div');pre.className='nx-preloader';
  pre.innerHTML='<div class="nx-loader-inner"><div class="nx-loader-mark"><img src="assets/images/nexoratech-mark.png" alt=""></div><div class="nx-loader-name">NS NEXORATECH</div><div class="nx-loader-sub">BUILDING YOUR DIGITAL FUTURE</div><div class="nx-loader-track"></div></div>';
  document.body.appendChild(pre);
  const finish=()=>setTimeout(()=>{pre.classList.add('is-done');document.body.classList.remove('nx-loading');setTimeout(()=>pre.remove(),850)},420);
  if(document.readyState==='complete')finish();else window.addEventListener('load',finish,{once:true});
  const ambient=document.createElement('div');ambient.className='nx-ambient';ambient.setAttribute('aria-hidden','true');document.body.prepend(ambient);
  $$('.hero-title').forEach(title=>{if(title.dataset.nxWordsDone)return;title.dataset.nxWordsDone='1';const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);let wi=0;nodes.forEach(node=>{const val=node.nodeValue;if(!val||!val.trim())return;const frag=document.createDocumentFragment();val.split(/(\s+)/).forEach(part=>{if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return}const outer=document.createElement('span');outer.className='word';outer.style.setProperty('--word-index',wi++);const inner=document.createElement('span');inner.textContent=part;outer.appendChild(inner);frag.appendChild(outer)});node.parentNode.replaceChild(frag,node)})});
  if(window.matchMedia('(pointer:fine)').matches){
    const ring=document.createElement('div');ring.className='nx-cursor-ring';ring.setAttribute('aria-hidden','true');document.body.appendChild(ring);let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
    window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;ring.classList.add('is-active')},{passive:true});
    const follow=()=>{rx+=(x-rx)*.24;ry+=(y-ry)*.24;ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;requestAnimationFrame(follow)};requestAnimationFrame(follow);
    $$('a,button,[role="button"],input,textarea,select').forEach(el=>{el.addEventListener('pointerenter',()=>ring.classList.add('is-hover'));el.addEventListener('pointerleave',()=>ring.classList.remove('is-hover'))});
    const core=$('.core-card');if(core){const visual=core.closest('.hero-visual')||core.parentElement;visual.addEventListener('pointermove',e=>{const r=core.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;core.style.transform=`perspective(1000px) rotateY(${-10+x*18}deg) rotateX(${5-y*14}deg) translateZ(12px)`});visual.addEventListener('pointerleave',()=>core.style.transform='')}
  }
  const wipe=document.createElement('div');wipe.className='nx-page-transition';wipe.setAttribute('aria-hidden','true');document.body.appendChild(wipe);
  $$('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank'||a.hasAttribute('download'))return;let url;try{url=new URL(href,location.href)}catch{return}if(url.origin!==location.origin||!/\.html?$/i.test(url.pathname)||(url.pathname===location.pathname&&url.hash))return;a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();wipe.classList.add('is-leaving');setTimeout(()=>location.href=url.href,360)})});
}


/* V9 motion + UX layer: scroll choreography, magnetic actions, scene spotlight, section navigator */
if (!reduce) {
  // Add an ambient perspective grid and a subtle cursor-following light field.
  const scene=document.createElement('div');scene.className='nx-scene';scene.setAttribute('aria-hidden','true');
  scene.innerHTML='<div class="nx-scene-grid"></div><div class="nx-scene-light"></div>';document.body.prepend(scene);
  const sceneLight=scene.querySelector('.nx-scene-light');
  if(sceneLight && matchMedia('(pointer:fine)').matches){let tx=50,ty=30,cx=50,cy=30;window.addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*100;ty=e.clientY/innerHeight*100},{passive:true});const lightLoop=()=>{cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;sceneLight.style.setProperty('--scene-x',cx+'%');sceneLight.style.setProperty('--scene-y',cy+'%');requestAnimationFrame(lightLoop)};requestAnimationFrame(lightLoop)}

  // Scroll choreography: reveal content and stagger sibling cards as each section enters.
  const revealTargets=$$('.section-pad .section-top, .section-pad .section-title, .section-pad .section-copy, .quote-band, .metrics .metric, .page-hero .breadcrumb-line, .page-hero .section-title, .page-hero .section-copy, .contact-panel, .about-panel');
  revealTargets.forEach((el,i)=>{if(el.classList.contains('reveal')||el.classList.contains('nx-reveal'))return;el.classList.add('nx-reveal');if(i%3===1)el.dataset.nxOrigin='left';else if(i%3===2)el.dataset.nxOrigin='right';el.style.setProperty('--nx-delay',(i%4)*75+'ms')});
  const staggerGroups=$$('.section-pad .row, .about-points, .pricing-grid, .service-grid');
  staggerGroups.forEach(group=>{const kids=[...group.children];kids.forEach((kid,i)=>{if(kid.classList.contains('reveal')||kid.classList.contains('nx-reveal'))return;kid.classList.add('nx-reveal');kid.style.setProperty('--nx-delay',Math.min(i,5)*85+'ms')})});
  const nxTargets=$$('.nx-reveal');
  if('IntersectionObserver'in window){const nxObs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('nx-in');nxObs.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});nxTargets.forEach(el=>nxObs.observe(el))}else nxTargets.forEach(el=>el.classList.add('nx-in'));

  // Card spotlight and 3D tilt use transforms only while the pointer is over the card.
  if(matchMedia('(pointer:fine)').matches){
    $$('.service-card,.project-card,.price-card,.feature-card').forEach(card=>{
      card.classList.add('nx-tilt-surface');
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--nx-x',(x*100)+'%');card.style.setProperty('--nx-y',(y*100)+'%');card.classList.add('nx-hover');if(!card.matches(':hover'))return;const rx=(.5-y)*4,ry=(x-.5)*5;card.style.transform=`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-7px)`},{passive:true});
      card.addEventListener('pointerleave',()=>{card.classList.remove('nx-hover');card.style.transform=''});
    });
    $$('.btn-primary-custom,.btn-quiet').forEach(btn=>{btn.classList.add('nx-magnetic');btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/r.width,dy=(e.clientY-r.top-r.height/2)/r.height;btn.style.transform=`translate3d(${dx*5}px,${dy*4}px,0)`},{passive:true});btn.addEventListener('pointerleave',()=>btn.style.transform='')});
  }

  // Small, accessible section navigator on wide screens. Clicking a dot scrolls to that section.
  const mainSections=$$('main section').filter(s=>s.id||s.querySelector('.section-title,.hero-title,.eyebrow'));
  if(mainSections.length>=4 && innerWidth>991){
    const navDots=document.createElement('nav');navDots.className='nx-section-progress';navDots.setAttribute('aria-label','Page sections');
    const entries=mainSections.slice(0,7).map((section,i)=>{if(!section.id)section.id='nx-section-'+(i+1);const heading=section.querySelector('.section-title,.hero-title,.eyebrow');let label=(heading?.textContent||('Section '+(i+1))).replace(/\s+/g,' ').trim().slice(0,28);const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Go to '+label);b.innerHTML='<span>'+label+'</span>';b.addEventListener('click',()=>section.scrollIntoView({behavior:'smooth',block:'start'}));navDots.appendChild(b);return {section,b}});
    document.body.appendChild(navDots);
    const updateDots=()=>{const mid=innerHeight*.42;let active=0;entries.forEach((entry,i)=>{if(entry.section.getBoundingClientRect().top<=mid)active=i;entry.b.setAttribute('aria-current',String(i===active))});navDots.classList.toggle('is-visible',scrollY>innerHeight*.45)};
    window.addEventListener('scroll',updateDots,{passive:true});updateDots();
  }
}



/* V10: editorial motion system — scroll depth, active section state, and tactile interactions */
if (!reduce) {
  const homeHero=$('.hero');
  const heroTitle=$('.hero-title');
  let rafPending=false;
  const depthScroll=()=>{
    const y=window.scrollY||0;
    if(homeHero && y < innerHeight*1.2){
      const ratio=Math.min(1,y/Math.max(1,innerHeight));
      homeHero.style.setProperty('--hero-depth',ratio.toFixed(3));
      const visual=$('.hero-visual',homeHero);
      if(visual) visual.style.transform=`translate3d(0,${ratio*34}px,0) rotate(${ratio*.7}deg)`;
      const copy=$('.hero .col-lg-7');
      if(copy) copy.style.transform=`translate3d(0,${ratio*-15}px,0)`;
    }
    rafPending=false;
  };
  window.addEventListener('scroll',()=>{if(!rafPending){rafPending=true;requestAnimationFrame(depthScroll)}},{passive:true});
  depthScroll();

  // Make the editorial index feel alive: section numbers count in as blocks enter view.
  const indexed=$$('.section-pad .eyebrow');
  if('IntersectionObserver' in window){
    const indexObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('eyebrow-seen');indexObserver.unobserve(entry.target)}
    }),{threshold:.65});
    indexed.forEach(el=>indexObserver.observe(el));
  }

  // Pointer spotlight uses each card's own local coordinates; no layout reflow.
  $$('.service-card,.feature-card,.project-card,.price-card,.contact-panel').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--spot-x',`${e.clientX-r.left}px`);
      card.style.setProperty('--spot-y',`${e.clientY-r.top}px`);
    },{passive:true});
  });

  // Active nav marker based on the current page, without changing the site's URLs.
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  $$('.site-nav .nav-link').forEach(link=>{
    const target=(link.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(target===current){link.classList.add('active');link.setAttribute('aria-current','page')}
  });
}

})();
