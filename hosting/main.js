/* =====================================================================
   MAIN.JS — Nebula Creative | Aldi Wijaya
   Gabungan seluruh script: loading screen, navbar, about, video highlight,
   services, featured projects, gallery, workflow/value, testimoni,
   contact/faq, clients.
   ===================================================================== */

/* ===================== LOADING SCREEN + NAVBAR ===================== */
(function(){
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);

  var html=document.documentElement;
  var body=document.body;
  var screen=document.querySelector('.aldi-loading-screen');
  html.style.overflow='hidden';
  body.style.overflow='hidden';
  function setVh(){if(screen)screen.style.height=window.innerHeight+'px';}
  setVh();
  window.addEventListener('resize',setVh);
  window.addEventListener('orientationchange',function(){setTimeout(setVh,100);});

  function finishLoading(){
    html.classList.add('aldi-loading-complete');
    html.style.overflow='';
    body.style.overflow='';
    if(!screen)return;
    screen.classList.add('fade-out');
    setTimeout(function(){
      if(screen.parentNode)screen.parentNode.removeChild(screen);
      window.removeEventListener('resize',setVh);
    },500);
  }

  var minTimeReached=false;
  var pageLoaded=(document.readyState==='complete');
  var loadingFinished=false;

  function finishLoading(){
    if(loadingFinished) return;
    loadingFinished=true;
    html.classList.add('aldi-loading-complete');
    html.style.overflow='';
    body.style.overflow='';
    body.style.position='';
    body.style.top='';
    body.style.left='';
    body.style.right='';
    document.documentElement.style.overflow='';
    document.documentElement.style.position='';
    if(!screen) return;
    screen.classList.add('fade-out');
    screen.style.pointerEvents='none';
    screen.style.visibility='hidden';
    screen.style.zIndex='-1';
    screen.style.display='none';
    screen.classList.add('hidden');
    setTimeout(function(){
      if(screen.parentNode) screen.parentNode.removeChild(screen);
      window.removeEventListener('resize',setVh);
    },500);
  }

  setTimeout(function(){minTimeReached=true;if(pageLoaded)finishLoading();},4200);

  if(!pageLoaded){
    window.addEventListener('load',function(){pageLoaded=true;if(minTimeReached)finishLoading();});
  }

  setTimeout(function(){if(!pageLoaded){pageLoaded=true;finishLoading();}},6000);
}());

(function(){
  'use strict';
  if(window.aldiThemeInitialized)return;
  window.aldiThemeInitialized=true;
  const applyTheme=(theme)=>{
    document.documentElement.setAttribute('data-theme',theme);
    document.body.setAttribute('data-theme',theme);
  };
  const toggleTheme=()=>{
    const current=localStorage.getItem('aldi-theme')||'dark';
    const next=current==='dark'?'light':'dark';
    localStorage.setItem('aldi-theme',next);
    applyTheme(next);
  };
  const init=()=>{
    const saved=localStorage.getItem('aldi-theme')||'dark';
    applyTheme(saved);
    const btn=document.getElementById('aldiThemeBtn');
    if(btn)btn.addEventListener('click',toggleTheme);
    const btnMobile=document.getElementById('aldiThemeBtnMobile');
    if(btnMobile)btnMobile.addEventListener('click',toggleTheme);
  };
  window.addEventListener('storage',(e)=>{
    if(e.key==='aldi-theme')applyTheme(e.newValue||'dark');
  });
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
}());

(function(){
  'use strict';
  if(window.aldiNavbarInit2025)return;
  window.aldiNavbarInit2025=true;
  const aldiNavbarBar=document.getElementById('aldiNavbarBar');
  const aldiNavbarBurger=document.getElementById('aldiNavbarBurger');
  const aldiNavbarDrawer=document.getElementById('aldiNavbarDrawer');
  const aldiNavbarBackdrop=document.getElementById('aldiNavbarBackdrop');
  let aldiNavbarIsOpen=false;
  let aldiNavbarLastY=0;
  let scrollTimeout;
  let sectionsCache=null;
  let aldiScrollLockY=0;

  const aldiNavbarLockScroll=function(){
    aldiScrollLockY=window.scrollY;
    document.body.style.overflow='hidden';
    document.body.style.position='fixed';
    document.body.style.top='-'+aldiScrollLockY+'px';
    document.body.style.left='0';
    document.body.style.right='0';
    document.documentElement.style.overflow='hidden';
  };
  const aldiNavbarUnlockScroll=function(){
    document.body.style.overflow='';
    document.body.style.position='';
    document.body.style.top='';
    document.body.style.left='';
    document.body.style.right='';
    document.documentElement.style.overflow='';
  };
  const aldiNavbarSetupShimmer=function(){
    if(aldiNavbarBar){
      aldiNavbarBar.style.setProperty('--aldi-shimmer-left','-100%');
      aldiNavbarBar.addEventListener('mouseenter',function(e){e.stopPropagation();aldiNavbarBar.style.setProperty('--aldi-shimmer-left','100%');});
      aldiNavbarBar.addEventListener('mouseleave',function(e){e.stopPropagation();aldiNavbarBar.style.setProperty('--aldi-shimmer-left','-100%');});
    }
    if(aldiNavbarBurger){
      aldiNavbarBurger.style.setProperty('--aldi-shimmer-left','-100%');
      aldiNavbarBurger.addEventListener('mouseenter',function(e){e.stopPropagation();aldiNavbarBurger.style.setProperty('--aldi-shimmer-left','100%');});
      aldiNavbarBurger.addEventListener('mouseleave',function(e){e.stopPropagation();setTimeout(function(){aldiNavbarBurger.style.setProperty('--aldi-shimmer-left','-100%');},100);});
    }
    document.querySelectorAll('.aldi-navbar-drawer .aldi-navbar-item').forEach(function(item){
      item.style.setProperty('--aldi-shimmer-left','-100%');
      item.addEventListener('mouseenter',function(e){e.stopPropagation();item.style.setProperty('--aldi-shimmer-left','100%');});
      item.addEventListener('mouseleave',function(e){e.stopPropagation();item.style.setProperty('--aldi-shimmer-left','-100%');});
    });
  };
  const aldiNavbarToggleMenu=function(){
    aldiNavbarIsOpen=!aldiNavbarIsOpen;
    if(aldiNavbarBurger)aldiNavbarBurger.classList.toggle('aldi-navbar-open',aldiNavbarIsOpen);
    if(aldiNavbarDrawer)aldiNavbarDrawer.classList.toggle('aldi-navbar-visible',aldiNavbarIsOpen);
    if(aldiNavbarBackdrop)aldiNavbarBackdrop.classList.toggle('aldi-navbar-visible',aldiNavbarIsOpen);
    if(aldiNavbarIsOpen){aldiNavbarLockScroll();}else{aldiNavbarUnlockScroll();window.scrollTo({top:aldiScrollLockY,behavior:'instant'});}
  };
  const aldiNavbarCloseMenuOnly=function(){
    aldiNavbarIsOpen=false;
    if(aldiNavbarBurger)aldiNavbarBurger.classList.remove('aldi-navbar-open');
    if(aldiNavbarDrawer)aldiNavbarDrawer.classList.remove('aldi-navbar-visible');
    if(aldiNavbarBackdrop)aldiNavbarBackdrop.classList.remove('aldi-navbar-visible');
  };
  const aldiNavbarCloseMenu=function(){
    aldiNavbarCloseMenuOnly();
    aldiNavbarUnlockScroll();
    window.scrollTo({top:aldiScrollLockY,behavior:'instant'});
  };
  const aldiNavbarGetSections=function(){
    if(sectionsCache)return sectionsCache;
    const navbarItems=['about','behindthelens','services','highlightproject','galleryproject','value','testimoni','contact','clients'];
    const sections=navbarItems.map(function(id,index){
      let element=null;
      for(const sel of['#'+id,'[data-scroll-point="'+id+'"]','[data-name="'+id+'"]','[id="'+id+'"]','.'+id+'-section','section[data-section="'+id+'"]']){
        element=document.querySelector(sel);
        if(element)break;
      }
      const sectionTop=element
        ?window.pageYOffset+element.getBoundingClientRect().top
        :Math.floor(((document.documentElement.scrollHeight-window.innerHeight)/(navbarItems.length-1))*index);
      return{id,top:sectionTop,element};
    });
    sections.sort((a,b)=>a.top-b.top);
    sectionsCache=sections;
    return sections;
  };
  const aldiNavbarUpdateCurrent=function(){
    if(window.innerWidth<=1024)return;
    const sections=aldiNavbarGetSections();
    const currentScroll=window.scrollY;
    const maxScroll=document.documentElement.scrollHeight-window.innerHeight;
    let currentSection='about';
    if(currentScroll>=maxScroll-100){
      currentSection='clients';
    }else{
      const adjusted=currentScroll+window.innerHeight*0.3;
      for(let i=sections.length-1;i>=0;i--){
        if(adjusted>=sections[i].top){currentSection=sections[i].id;break;}
      }
    }
    document.querySelectorAll('.aldi-navbar-links .aldi-navbar-item').forEach(item=>item.classList.remove('aldi-navbar-current'));
    const active=document.querySelector('.aldi-navbar-links .aldi-navbar-item[href="#'+currentSection+'"]');
    if(active)active.classList.add('aldi-navbar-current');
  };
  const aldiNavbarSmoothScroll=function(targetId){
    sectionsCache=null;
    const sections=aldiNavbarGetSections();
    const target=sections.find(s=>s.id===targetId);
    if(target&&target.element){
      window.scrollTo({top:Math.max(0,window.pageYOffset+target.element.getBoundingClientRect().top-80),behavior:'smooth'});
      return;
    }
    for(const sel of['#'+targetId,'[data-scroll-point="'+targetId+'"]','[data-name="'+targetId+'"]']){
      const el=document.querySelector(sel);
      if(el){window.scrollTo({top:Math.max(0,window.pageYOffset+el.getBoundingClientRect().top-80),behavior:'smooth'});return;}
    }
    if(target)window.scrollTo({top:Math.max(0,target.top-80),behavior:'smooth'});
  };
  const aldiNavbarHandleScroll=function(){
    if(scrollTimeout)clearTimeout(scrollTimeout);
    scrollTimeout=setTimeout(function(){
      const y=window.scrollY;
      if(aldiNavbarBar){
        aldiNavbarBar.classList.toggle('aldi-navbar-scrolled',y>30);
        if(window.innerWidth<=1024)aldiNavbarBar.classList.toggle('aldi-navbar-hidden',y>aldiNavbarLastY&&y>120);
      }
      aldiNavbarUpdateCurrent();
      aldiNavbarLastY=y;
    },16);
  };
  if(aldiNavbarBurger)aldiNavbarBurger.addEventListener('click',function(e){e.preventDefault();aldiNavbarToggleMenu();});
  if(aldiNavbarBackdrop)aldiNavbarBackdrop.addEventListener('click',aldiNavbarCloseMenu);
  document.querySelectorAll('.aldi-navbar-wrapper .aldi-navbar-item').forEach(function(item){
    item.addEventListener('click',function(e){
      e.preventDefault();
      const href=item.getAttribute('href');
      if(href&&href.startsWith('#')){
        const targetId=href.substring(1);
        document.querySelectorAll('.aldi-navbar-wrapper .aldi-navbar-item').forEach(l=>l.classList.remove('aldi-navbar-current'));
        document.querySelectorAll('.aldi-navbar-wrapper .aldi-navbar-item[href="'+href+'"]').forEach(l=>l.classList.add('aldi-navbar-current'));
        if(aldiNavbarIsOpen){
          const saved=aldiScrollLockY;
          aldiNavbarCloseMenuOnly();
          aldiNavbarUnlockScroll();
          window.scrollTo({top:saved,behavior:'instant'});
          requestAnimationFrame(function(){requestAnimationFrame(function(){aldiNavbarSmoothScroll(targetId);});});
        }else{
          aldiNavbarSmoothScroll(targetId);
        }
      }
    });
  });
  window.addEventListener('scroll',aldiNavbarHandleScroll,{passive:true});
  window.addEventListener('resize',function(){
    if(aldiNavbarIsOpen)aldiNavbarCloseMenu();
    sectionsCache=null;
    aldiNavbarGetSections();
  });
window.addEventListener('load',function(){setTimeout(function(){sectionsCache=null;aldiNavbarGetSections();},800);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&aldiNavbarIsOpen)aldiNavbarCloseMenu();});
aldiNavbarSetupShimmer();
}());

/* ===================== ABOUT ===================== */
(() => {
  'use strict';
  if (window.aldiAboutInitialized) return;
  window.aldiAboutInitialized = true;

  const aldiApplyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  };
  aldiApplyTheme(localStorage.getItem('aldi-theme') || 'dark');
  window.addEventListener('storage', (e) => {
    if (e.key === 'aldi-theme') aldiApplyTheme(e.newValue || 'dark');
  });

  let aldiAboutOverflow = '';
  let aldiAboutHtmlOverflow = '';
  let aldiAboutScrollPos = 0;
  let aldiAboutTyping = null;
  const aldiAboutCountersAnimated = new Set();

  const aldiAboutMoveModalToBody = () => {
    const m = document.querySelector('.aldi-about-wrapper .aldi-about-modal');
    if (m && m.parentNode) document.body.appendChild(m);
  };

  const aldiAboutOpen = () => {
    const m = document.querySelector('.aldi-about-modal');
    if (!m) return;
    aldiAboutScrollPos = window.scrollY;
    m.style.display = 'block';
    aldiAboutOverflow = document.body.style.overflow || '';
    aldiAboutHtmlOverflow = document.documentElement.style.overflow || '';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${aldiAboutScrollPos}px`;
    requestAnimationFrame(() => m.classList.add('aldi-about-show'));
  };

  const aldiAboutClose = (e) => {
    if (e) e.stopPropagation();
    const m = document.querySelector('.aldi-about-modal');
    if (!m) return;
    m.classList.remove('aldi-about-show');
    document.body.style.overflow = aldiAboutOverflow;
    document.documentElement.style.overflow = aldiAboutHtmlOverflow;
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, aldiAboutScrollPos);
    setTimeout(() => (m.style.display = 'none'), 400);
  };

  const aldiAboutEscape = (e) => {
    if (e.key === 'Escape') {
      const m = document.querySelector('.aldi-about-modal.aldi-about-show');
      if (m) aldiAboutClose();
    }
  };

  Object.assign(window, { aldiAboutOpen, aldiAboutClose });

  class AldiAboutTyping {
    constructor(id, roles, opt = {}) {
      this.id = id;
      this.roles = roles;
      this.textIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.rafId = null;
      this.isRunning = false;
      this.lastTime = 0;
      this.currentDelay = opt.initialDelay || 800;
      this.opt = {
        typeSpeed: opt.typeSpeed || 120,
        deleteSpeed: opt.deleteSpeed || 55,
        pauseTime: opt.pauseTime || 2500,
        initialDelay: opt.initialDelay || 800,
        ...opt
      };
    }
    start() {
      if (this.isRunning) return;
      const el = document.getElementById(this.id);
      if (!el) return;
      this.isRunning = true;
      this.el = el;
      this.el.textContent = '';
      this.lastTime = performance.now() + this.opt.initialDelay;
      this.rafId = requestAnimationFrame((t) => this.loop(t));
    }
    stop() {
      if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
      this.isRunning = false;
    }
    loop(now) {
      if (!this.isRunning) return;
      if (now < this.lastTime) {
        this.rafId = requestAnimationFrame((t) => this.loop(t));
        return;
      }
      const currentRole = this.roles[this.textIndex];
      if (this.isDeleting) {
        this.charIndex--;
        this.el.textContent = currentRole.substring(0, this.charIndex);
      } else {
        this.charIndex++;
        this.el.textContent = currentRole.substring(0, this.charIndex);
      }
      let nextDelay = this.isDeleting ? this.opt.deleteSpeed : this.opt.typeSpeed;
      if (!this.isDeleting && this.charIndex === currentRole.length) {
        nextDelay = this.opt.pauseTime;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.textIndex = (this.textIndex + 1) % this.roles.length;
        nextDelay = 500;
      }
      this.lastTime = now + nextDelay;
      this.rafId = requestAnimationFrame((t) => this.loop(t));
    }
  }

  const aldiAboutInitTyping = () => {
    if (aldiAboutTyping) aldiAboutTyping.stop();
    const typeEl = document.getElementById('aldiAboutType');
    if (!typeEl) return;
    const roles = ['Videographer', 'Video Editor', 'Social Media Management'];
    aldiAboutTyping = new AldiAboutTyping('aldiAboutType', roles, {
      typeSpeed: 120, deleteSpeed: 55, pauseTime: 2500, initialDelay: 800
    });
    aldiAboutTyping.start();
  };

  const aldiAboutAnimateCount = (el, target) => {
    const metricId = el.closest('.aldi-about-metric')?.dataset?.metricId || Math.random().toString(36);
    if (aldiAboutCountersAnimated.has(metricId)) return;
    aldiAboutCountersAnimated.add(metricId);
    const isPercentage = el.dataset.suffix === '%';
    const suffix = isPercentage ? '%' : '+';
    const duration = 2000;
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easing);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(update);
  };

  const aldiAboutInitCounters = () => {
    const metrics = document.querySelectorAll('.aldi-about-wrapper .aldi-about-metric');
    metrics.forEach((metric, index) => { metric.dataset.metricId = `metric-${index}`; });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector('.aldi-about-num');
          if (numEl?.dataset.count) {
            const target = parseInt(numEl.dataset.count);
            setTimeout(() => aldiAboutAnimateCount(numEl, target), 200);
          }
        }
      });
    }, { threshold: 0.3, rootMargin: '0px' });
    metrics.forEach((metric) => observer.observe(metric));
  };

  const aldiAboutInitRipples = () => {
    document.querySelectorAll(
      '.aldi-about-wrapper .aldi-about-social, .aldi-about-wrapper .aldi-about-photo, .aldi-about-wrapper .aldi-about-close'
    ).forEach((el) => {
      el.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.className = 'aldi-ripple-span';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  const aldiAboutInitSmoothScroll = () => {
    document.querySelectorAll('.aldi-about-wrapper a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const headerOffset = 80;
          const elPos = targetEl.getBoundingClientRect().top;
          const offsetPos = elPos + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPos, behavior: 'smooth' });
        }
      });
    });
  };

  const aldiAboutInit = () => {
    requestAnimationFrame(() => {
      aldiAboutMoveModalToBody();
      aldiAboutInitTyping();
      aldiAboutInitCounters();
      aldiAboutInitRipples();
      aldiAboutInitSmoothScroll();
      document.addEventListener('keydown', aldiAboutEscape, { passive: true });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aldiAboutInit);
  } else {
    aldiAboutInit();
  }
})();

/* ===================== VIDEO HIGHLIGHT (BTL) ===================== */
(function(){
  'use strict';
  if(window.aldiVideoInitialized)return;
  window.aldiVideoInitialized=true;
  var player=null;
  var currentIndex=0;
  var items=[];
  var currentTitleEl=null;
  var userInteracted=false;

  function getItems(){return document.querySelectorAll('.aldi-video-item');}
  function buildSrc(id,muted){return'https://www.youtube.com/embed/'+id+'?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&autoplay=1&mute='+(muted?1:0)+'&vq=hd720';}
  function setActive(index){
    items=getItems();
    items.forEach(function(i){i.classList.remove('active');});
    if(items[index]){
      items[index].classList.add('active');
      currentIndex=index;
      if(currentTitleEl)currentTitleEl.textContent=items[index].dataset.title||'';
    }
  }
  function playIndex(index,fromUser){
    items=getItems();
    if(!items[index])return;
    var id=items[index].dataset.id;
    setActive(index);
    if(fromUser)userInteracted=true;
    if(player&&typeof player.loadVideoById==='function'){
      if(userInteracted){
        player.unMute();
        player.setVolume(100);
      }
      player.loadVideoById(id);
    }else{
      var iframe=document.getElementById('aldiVideoIframe');
      if(iframe)iframe.src=buildSrc(id,!userInteracted);
    }
  }
  function playNext(){
    items=getItems();
    var next=(currentIndex+1)%items.length;
    playIndex(next,false);
  }
function onYTReady(){
    var iframe=document.getElementById('aldiVideoIframe');
    if(!iframe)return;
    player=new YT.Player('aldiVideoIframe',{
      width:'100%',
      height:'100%',
      events:{
        onReady:function(e){
          items=getItems();
          var active=document.querySelector('.aldi-video-item.active');
          if(active){
            var idx=Array.prototype.indexOf.call(items,active);
            currentIndex=idx>=0?idx:0;
          }
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange:function(e){
          if(e.data===YT.PlayerState.ENDED){
            playNext();
          }
        }
      }
    });
  }
  function loadYTAPI(){
    if(window.YT&&window.YT.Player){onYTReady();return;}
    var tag=document.createElement('script');
    tag.src='https://www.youtube.com/iframe_api';
    var first=document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(tag,first);
    window.onYouTubeIframeAPIReady=function(){onYTReady();};
  }
  function syncPlaylistHeight(){
    var w=window.innerWidth;
    var playlistTop=document.querySelector('.aldi-video-playlist-top');
    var playlist=document.querySelector('.aldi-video-playlist');
    var frameWrap=document.querySelector('.aldi-video-frame-wrap');
    if(!playlist||!playlistTop||!frameWrap)return;
    if(w>768){
      var totalH=frameWrap.getBoundingClientRect().height;
      if(totalH<10){
        var wrapW=frameWrap.getBoundingClientRect().width;
        totalH=(wrapW-20)*(9/16)+20;
      }
      playlistTop.style.maxHeight=totalH+'px';
      playlist.style.maxHeight=Math.max(60,totalH)+'px';
    }else{
      playlistTop.style.maxHeight='';
      playlist.style.maxHeight='';
    }
  }
  function initWheelScroll(playlist){
    playlist.addEventListener('wheel',function(e){
      if(window.innerWidth>768)return;
      if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
      e.preventDefault();
      playlist.scrollLeft+=e.deltaY;
    },{passive:false});
  }
  function init(){
    items=getItems();
    var iframe=document.getElementById('aldiVideoIframe');
    currentTitleEl=document.getElementById('aldiVideoCurrentTitle');
    var playlist=document.querySelector('.aldi-video-playlist');
    if(!items.length||!iframe||!currentTitleEl)return;
    var activeItem=document.querySelector('.aldi-video-item.active');
    if(activeItem){
      currentIndex=Array.prototype.indexOf.call(items,activeItem);
      if(currentIndex<0)currentIndex=0;
    }
    iframe.src=buildSrc(activeItem?activeItem.dataset.id:items[0].dataset.id,true);
    loadYTAPI();
    items.forEach(function(item,idx){
      item.addEventListener('click',function(e){
        var ripple=document.createElement('span');
        var rect=this.getBoundingClientRect();
        var size=Math.max(rect.width,rect.height);
        ripple.className='aldi-ripple-span';
        ripple.style.cssText='width:'+size+'px;height:'+size+'px;left:'+(e.clientX-rect.left-size/2)+'px;top:'+(e.clientY-rect.top-size/2)+'px;';
        this.appendChild(ripple);
        setTimeout(function(){ripple.remove();},600);
        if(this.classList.contains('active'))return;
        playIndex(idx,true);
      }.bind(item));
    });
    if(playlist){initWheelScroll(playlist);}
    var frameWrap=document.querySelector('.aldi-video-frame-wrap');
    if(frameWrap&&window.ResizeObserver){
      var ro=new ResizeObserver(function(){syncPlaylistHeight();});
      ro.observe(frameWrap);
    }
    window.addEventListener('load',function(){
      requestAnimationFrame(function(){requestAnimationFrame(syncPlaylistHeight);});
    });
    window.addEventListener('resize',syncPlaylistHeight);
    requestAnimationFrame(function(){requestAnimationFrame(syncPlaylistHeight);});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
}());

/* ===================== SERVICES ===================== */
(function(){
  'use strict';
  if(window.aldiServicesInitialized)return;
  window.aldiServicesInitialized=true;
  let _scrollPos=0;
  let _popupOriginalParents={};

  function lockScroll(){
    _scrollPos=window.pageYOffset||document.documentElement.scrollTop;
    document.documentElement.style.overflow='hidden';
    document.documentElement.style.scrollBehavior='auto';
  }
  function unlockScroll(){
    document.documentElement.style.overflow='';
    document.documentElement.style.scrollBehavior='';
    window.scrollTo(0,_scrollPos);
  }
  function openPopup(service){
    const popup=document.getElementById('aldi-services-popup-'+service);
    if(!popup)return;
    if(!_popupOriginalParents[service]){
      _popupOriginalParents[service]={parent:popup.parentNode,nextSibling:popup.nextSibling};
    }
    document.body.appendChild(popup);
    popup.style.display='flex';
    popup.style.position='fixed';
    popup.style.top='0';
    popup.style.left='0';
    popup.style.right='0';
    popup.style.bottom='0';
    popup.style.zIndex='2147483647';
    lockScroll();
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        popup.classList.add('aldi-services-active');
      });
    });
  }
  function closePopup(service){
    const popup=document.getElementById('aldi-services-popup-'+service);
    if(!popup)return;
    popup.classList.remove('aldi-services-active');
    unlockScroll();
    setTimeout(function(){
      popup.style.display='none';
      popup.style.position='';
      popup.style.top='';
      popup.style.left='';
      popup.style.right='';
      popup.style.bottom='';
      popup.style.zIndex='';
      const origin=_popupOriginalParents[service];
      if(origin&&origin.parent){
        if(origin.nextSibling){
          origin.parent.insertBefore(popup,origin.nextSibling);
        }else{
          origin.parent.appendChild(popup);
        }
      }
    },400);
  }
  function closeAllPopups(){
    const active=document.querySelectorAll('.aldi-services-popup-overlay.aldi-services-active');
    active.forEach(function(popup){
      const service=popup.id.replace('aldi-services-popup-','');
      closePopup(service);
    });
  }
  function onKeyDown(e){if(e.key==='Escape')closeAllPopups();}
  function bindOverlayClose(){
    document.querySelectorAll('.aldi-services-popup-overlay').forEach(function(overlay){
      overlay.addEventListener('click',function(e){
        if(e.target===overlay){
          const service=overlay.id.replace('aldi-services-popup-','');
          closePopup(service);
        }
      });
    });
  }
  function init(){
    bindOverlayClose();
    document.addEventListener('keydown',onKeyDown);
  }
  window.aldiServicesOpenPopup=openPopup;
  window.aldiServicesClosePopup=closePopup;
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    setTimeout(init,100);
  }
})();

/* ===================== FEATURED PROJECTS (HIGHLIGHT) ===================== */
(function(){
  'use strict';
  function init(){
    var lb=document.getElementById('prtcln-lb');
    var lbBg=document.getElementById('prtcln-lb-bg');
    var lbImg=document.getElementById('prtcln-lb-img');
    var lbIgLink=document.getElementById('prtcln-lb-iglink');
    var lbClose=document.getElementById('prtcln-lb-close');
    var lbCard=document.getElementById('prtcln-lb-card');
    if(!lb||!lbBg||!lbImg||!lbIgLink||!lbClose||!lbCard)return;
    var _scrollPos=0;

    function lockScroll(){
      _scrollPos=window.pageYOffset||document.documentElement.scrollTop;
      document.documentElement.style.overflow='hidden';
    }
    function unlockScroll(){
      document.documentElement.style.overflow='';
      window.scrollTo(0,_scrollPos);
    }
    function applyScale(){
      lbCard.style.transform='';
      var cardH=lbCard.offsetHeight;
      var cardW=lbCard.offsetWidth;
      var vw=window.innerWidth;
      var vh=window.innerHeight;
      var gap=48;
      var scaleH=(vh-gap)/cardH;
      var scaleW=(vw-gap)/cardW;
      var scale=Math.min(scaleH,scaleW,1);
      if(scale<1){
        lbCard.style.transform='scale('+scale+')';
      }
    }
    function openLb(src,label,igUrl){
      lbImg.src=src;
      lbImg.alt=label;
      lbIgLink.href=igUrl||'#';
      document.body.appendChild(lb);
      lb.classList.add('prtcln-active');
      lockScroll();
      lbImg.onload=function(){applyScale();};
      if(lbImg.complete){applyScale();}
      lbClose.focus();
    }
    function closeLb(){
      lb.classList.remove('prtcln-active');
      lbCard.style.transform='';
      unlockScroll();
    }
    document.querySelectorAll('.prtcln-phone-frame').forEach(function(frame){
      frame.addEventListener('click',function(e){
        e.stopPropagation();
        if(this.dataset.src)openLb(this.dataset.src,this.dataset.label||'',this.dataset.ig||'#');
      });
      frame.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          e.stopPropagation();
          if(this.dataset.src)openLb(this.dataset.src,this.dataset.label||'',this.dataset.ig||'#');
        }
      });
    });
    lbBg.addEventListener('click',closeLb);
    lbClose.addEventListener('click',closeLb);
    lbCard.addEventListener('click',function(e){e.stopPropagation();});
    lbIgLink.addEventListener('click',function(e){e.stopPropagation();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();});
    window.addEventListener('resize',function(){
      if(lb.classList.contains('prtcln-active'))applyScale();
    });
    if('IntersectionObserver' in window){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.animationPlayState='running';
            obs.unobserve(entry.target);
          }
        });
      },{threshold:0.12});
      document.querySelectorAll('.prtcln-card').forEach(function(c){
        c.style.animationPlayState='paused';
        obs.observe(c);
      });
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
}());

/* ===================== GALLERY (CREATIVE PORTFOLIO) — PART 1 ===================== */
(function(){
if(window.aldiGalleryPart1Initialized)var _skipGalleryPart1=true;
window.aldiGalleryPart1Initialized=true;
var CDN='https://cdn.jsdelivr.net/gh/aldiiiwijaya/nebula-creative-cdn@main/';
var cache={};
var ua=navigator.userAgent||'';
var isIOS=/iPad|iPhone|iPod/.test(ua)&&!window.MSStream;
var isEdge=/Edg\//.test(ua);
var isAndroid=/Android/.test(ua);
var isEdgeAndroid=isEdge&&isAndroid;
var VIDEOS=[
  {title:"8'Amities",desc:'Video fashion kasual yang kuat dan menonjolkan branding.',yt:'AmxPIua3gFg',json:'project-videos.json/videos-8amities'},
  {title:'Cemilan Keto',desc:'Konten edukatif cemilan keto dengan visual yang menggugah.',yt:'AKRjRzgrkYY',json:'project-videos.json/videos-cemilan-keto'},
  {title:'Ribsgold',desc:'Fashion modern unisex dengan visual konten kontemporer.',yt:'gi5C55wAW3s',json:'project-videos.json/videos-ribsgold'},
  {title:'Sambarajo',desc:'Konten restoran Padang autentik, kelezatan masakan khas.',yt:'2HYKLLIIwyo',json:'project-videos.json/videos-sambarajo'},
  {title:'Tahu Talaga',desc:'Konten dinamis yang menonjolkan keunggulan produk tahu lokal.',yt:'d50PmePzW98',json:'project-videos.json/videos-tahu-talaga'},
  {title:'Seven The Salon',desc:'Dokumentasi salon mewah, selaras dengan branding premium.',yt:'cdaeSV1kP2k',json:'project-videos.json/videos-seven-the-salon'},
  {title:'Bymanda',desc:'Strategi media sosial yang kreatif untuk tingkatkan engagement.',yt:'C1AuZOVSNHE',json:'project-videos.json/videos-bymanda'},
  {title:'Nikuya',desc:'Video brand daging premium, fokus pada wagyu dan salmon.',yt:'AVnTfw4XLwI',json:'project-videos.json/videos-nikuya'},
  {title:'Peek A Boo',desc:'Visual hairstation dinamis, menampilkan gaya styling fun.',yt:'Bc0aF7EmMkY',json:'project-videos.json/videos-peek-a-boo'},
  {title:'Vision Hair Edu',desc:'Konten edukasi tata rambut profesional (Vision Hair Education).',yt:'oyxOMieyEy4',json:'project-videos.json/videos-vision-hair-edu'},
  {title:'Frenky Jo',desc:'Frenky Jo seorang master Hairdresser sekaligus BA Loreal.',yt:'w7uP85RNl2k',json:'project-videos.json/videos-frenky-jo'},
  {title:'Pulse Fitness',desc:'Konten dinamis yang berhasil menangkap energi hidup sehat.',yt:'JsNnx8LTC88',json:'project-videos.json/videos-pulse-fitness'},
  {title:'Lumity Studio',desc:'Video estetik yang menampilkan olahraga yoga dan zumba.',yt:'yuX0l3Zy9EA',json:'project-videos.json/videos-lumity-studio'}
];
var FOTOS=[
  {title:"8'Amities",desc:'Fashion kasual yang memiliki branding kuat dan konsisten.',json:'project-photos.json/photos-8amities'},
  {title:'Ribsgold',desc:'Fashion unisex kontemporer dengan gaya streetwear elegan.',json:'project-photos.json/photos-ribsgold'},
  {title:'Accent Ambios',desc:'Produk fashion premium dengan estetika yang modern minimalis.',json:'project-photos.json/photos-accent-ambios'},
  {title:'Kopi Bituka',desc:'Brand kopi lokal yang autentik dan memiliki karakter premium.',json:'project-photos.json/photos-kopi-bituka'},
  {title:'White Bride',desc:'Konsep wedding elegan dengan nuansa serba putih klasik.',json:'project-photos.json/photos-white-bride'}
];
var CERTIFICATES=[
  {title:'Social Media Marketing',desc:'Sertifikasi HubSpot Academy dalam strategi social media, content strategy, dan social engagement.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-social-media-marketing.png',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-social-media-marketing.png'},
  {title:'Medali Superior Nasional',desc:'Medali superior festival film FLS2N nasional 2019.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-mendali-superior.png',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-mendali-superior.png'},
  {title:'The Best Actor',desc:'Aktor Terbaik Nasional festival film CFF 2019.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-cff-the-best-actor.jpg',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-cff-the-best-actor.jpg'},
  {title:'Juara Nasional',desc:'Juara 1 nasional festival film FLS2N tingkat 2019.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-nasional.png',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-nasional.png'},
  {title:'Juara 1 FLS2N Provinsi',desc:'Juara 1 festival film pendek FLS2N tingkat 2019.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-provinsi.jpg',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-fls2n-provinsi.jpg'},
  {title:'Juara 1 Atikan Jabar',desc:'Juara 1 festival film pendek Atikan Jabar 2018.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-atikan-cingcowong.jpg',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-atikan-cingcowong.jpg'},
  {title:'Juara 1 Aresta Jabar',desc:'Juara 1 festival film pendek Aresta Jabar 2018.',cover:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-aresta-bianglala.png',image:'https://raw.githubusercontent.com/aldiiiwijaya/nebula-creative-cdn/main/certificates/certificates-aresta-bianglala.png'}
];
var GIF='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var fotoCovers={};

function getCollapseLimit(){var w=window.innerWidth;if(w<=599)return 1;if(w<=1024)return 2;return 3;}
function lazyObserve(el,cb){
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e,o){e.forEach(function(n){if(n.isIntersecting){o.unobserve(el);cb();}});},{rootMargin:'200px'});io.observe(el);}
  else{cb();}
}
function applyCollapse(pn,instant){
  var panel=document.querySelector('.galproj-panel[data-panel="'+pn+'"]');if(!panel)return;
  var collapsed=panel.classList.contains('galproj-panel--collapsed');var limit=getCollapseLimit();
  panel.querySelectorAll('.galproj-card').forEach(function(card,i){
    var hide=collapsed&&(i>=limit);
    if(instant){card.style.display=hide?'none':'';card.style.opacity=hide?'0':'1';}
    else if(hide){
      card.classList.add('galproj-card--hide');
      card.addEventListener('animationend',function h(){card.removeEventListener('animationend',h);card.classList.remove('galproj-card--hide');card.style.display='none';},{once:true});
    }else if(card.style.display==='none'){
      card.style.display='';card.style.opacity='0';card.classList.add('galproj-card--reveal');
      card.style.animationDelay=Math.max(0,(i-limit)*60)+'ms';
      card.addEventListener('animationend',function h(){card.removeEventListener('animationend',h);card.classList.remove('galproj-card--reveal');card.style.opacity='1';card.style.animationDelay='';},{once:true});
    }
  });
}
function fetchJSON(name){
  if(cache[name])return Promise.resolve(cache[name]);
  return new Promise(function(res,rej){
    var ctrl=new AbortController();var tid=setTimeout(function(){ctrl.abort();},12000);
    fetch(CDN+name+'.json',{signal:ctrl.signal}).then(function(r){clearTimeout(tid);if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}).then(function(d){cache[name]=d;res(d);}).catch(function(e){clearTimeout(tid);rej(e);});
  });
}
function loadFotoCovers(){
  FOTOS.forEach(function(d,i){
    fetchJSON(d.json).then(function(data){
      var imgs=data.images||data.photos||[];
      if(imgs.length){
        fotoCovers[i]=imgs[0];
        var fg=document.getElementById('galproj-grid-foto');
        if(fg){
          var cards=fg.querySelectorAll('.galproj-card');
          if(cards[i]){
            var img=cards[i].querySelector('.galproj-card-thumb img');
            if(img){img.src=imgs[0];}
          }
        }
      }
    }).catch(function(){});
  });
}
function renderCards(){
  var vg=document.getElementById('galproj-grid-video');
  var fg=document.getElementById('galproj-grid-foto');
  var cg=document.getElementById('galproj-grid-certificate');
  if(vg){
    var vh='';
    VIDEOS.forEach(function(d,i){vh+='<div class="galproj-card"><div class="galproj-card-thumb" id="vt'+i+'" data-yt="'+d.yt+'"><img id="vti'+i+'" data-src="https://img.youtube.com/vi/'+d.yt+'/mqdefault.jpg" src="'+GIF+'" alt="'+d.title+'"><div class="galproj-thumb-overlay" id="vto'+i+'"><div class="galproj-play-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg></div></div></div><div class="galproj-card-body"><h3 class="galproj-card-title">'+d.title+'</h3><p class="galproj-card-desc">'+d.desc+'</p></div><div class="galproj-card-footer"><button class="galproj-btn-details" data-type="video" data-json="'+d.json+'">Details</button></div></div>';});
    vg.innerHTML=vh;
    VIDEOS.forEach(function(d,i){
      var img=document.getElementById('vti'+i);var th=document.getElementById('vt'+i);
      if(img)lazyObserve(img,function(){if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}});
      if(!th)return;
      th.addEventListener('click',function(){
        if(th.querySelector('iframe'))return;
        var ie=document.getElementById('vti'+i);var oe=document.getElementById('vto'+i);
        if(ie)ie.style.display='none';if(oe)oe.classList.add('hidden');
        var ifr=document.createElement('iframe');
        ifr.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;';
        ifr.setAttribute('allowfullscreen','');ifr.setAttribute('allow','autoplay;encrypted-media;picture-in-picture');
        ifr.src='https://www.youtube.com/embed/'+d.yt+'?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        th.appendChild(ifr);th.style.cursor='default';
      });
    });
  }
  if(fg){
    var fh='';
    FOTOS.forEach(function(d,i){fh+='<div class="galproj-card" data-foto-idx="'+i+'"><div class="galproj-card-thumb"><img src="'+GIF+'" alt="'+d.title+'" style="background:var(--gp-bg)"></div><div class="galproj-card-body"><h3 class="galproj-card-title">'+d.title+'</h3><p class="galproj-card-desc">'+d.desc+'</p></div><div class="galproj-card-footer"><button class="galproj-btn-details" data-type="foto" data-json="'+d.json+'">Details</button></div></div>';});
    fg.innerHTML=fh;
    loadFotoCovers();
  }
  if(cg){
    var ch='';
    CERTIFICATES.forEach(function(d){ch+='<div class="galproj-card"><div class="galproj-card-thumb"><img data-src="'+d.cover+'" src="'+GIF+'" alt="'+d.title+'"></div><div class="galproj-card-body"><h3 class="galproj-card-title">'+d.title+'</h3><p class="galproj-card-desc">'+d.desc+'</p></div><div class="galproj-card-footer"><button class="galproj-btn-details" data-type="certificate" data-image="'+d.image+'">Details</button></div></div>';});
    cg.innerHTML=ch;
    cg.querySelectorAll('img[data-src]').forEach(function(img){lazyObserve(img,function(){if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}});});
  }
  applyCollapse('video',true);applyCollapse('foto',true);applyCollapse('certificate',true);
}
function domReady(fn){
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn);}
  else{fn();}
}
if(!_skipGalleryPart1){
  domReady(function(){
    renderCards();
    if(typeof galprojModalInit==='function')galprojModalInit();
  });
}

/* ===================== GALLERY (CREATIVE PORTFOLIO) — PART 2 (modal/lightbox) ===================== */
(function(){
  'use strict';
  if(window.galprojInit)return;
  window.galprojInit=true;

function init(){
    if(window.galprojInitRan)return;
    window.galprojInitRan=true;
    var OV=document.getElementById('galproj-modal');
    var MB=document.getElementById('galproj-modal-body');
    var MVW=document.getElementById('galproj-modal-video-wrap');
    var MIF=document.getElementById('galproj-modal-iframe');
    var LB=document.getElementById('galproj-lightbox');
    var LBI=document.getElementById('galproj-lb-img');
    var LBC=document.getElementById('galproj-lb-close');
    var LBP=document.getElementById('galproj-lb-prev');
    var LBN=document.getElementById('galproj-lb-next');
    var LBK=document.getElementById('galproj-lb-counter');
    var CM=document.getElementById('galproj-cert-modal');
    var CMI=document.getElementById('galproj-cert-modal-image');
    var CMC=document.getElementById('galproj-cert-modal-close');
    var MC=document.getElementById('galproj-modal-close');
    var lbArr=[],lbIdx=0,lbTr=false;
    var ovPar=null,ovNxt=null,sliderBackFn=null;
    var cmPar=null,cmNxt=null;

    if(LB&&LB.parentNode!==document.body)document.body.appendChild(LB);

    function lockScroll(){document.body.style.overflow='hidden';}
    function unlockScroll(){document.body.style.overflow='';}
    function resetIframe(f){
      if(!f)return;
      try{f.setAttribute('src','about:blank');}catch(e){}
      setTimeout(function(){try{f.removeAttribute('src');}catch(e){}},50);
    }
    function applyModalScale(){
      if(!OV||!OV.classList.contains('galproj-modal-overlay--active'))return;
      var mb=OV.querySelector('.galproj-modal-box');
      if(!mb)return;
      mb.style.transform='scale(1) translateY(0)';
      mb.style.opacity='1';
      var ovPad=parseInt(getComputedStyle(OV).paddingTop)||20;
      var gap=ovPad*2;
      var s=Math.min((window.innerHeight-gap)/mb.offsetHeight,(window.innerWidth-gap)/mb.offsetWidth,1);
      if(s<1)mb.style.transform='scale('+s+')';
    }
    function openModal(){
      if(!OV)return;
      ovPar=OV.parentNode;ovNxt=OV.nextSibling;
      document.body.appendChild(OV);
      OV.style.transition='';
      OV.style.pointerEvents='';
      var mb=OV.querySelector('.galproj-modal-box');
      var sa=OV.querySelector('.galproj-modal-scroll-area');
      if(mb&&sa){
        if(!mb.querySelector('.galproj-modal-scroll-top')){
          var st=document.createElement('div');st.className='galproj-modal-scroll-top';
          mb.insertBefore(st,sa);
        }
        if(!mb.querySelector('.galproj-modal-scroll-bottom')){
          var sb=document.createElement('div');sb.className='galproj-modal-scroll-bottom';
          mb.appendChild(sb);
        }
      }
      OV.classList.add('galproj-modal-overlay--active');
      document.body.classList.add('galproj-modal-open');
      lockScroll();
      setTimeout(applyModalScale,50);
    }
    function closeModal(){
      if(!OV)return;
      sliderBackFn=null;
      var mb=OV.querySelector('.galproj-modal-box');
      if(mb){
        mb.style.transition='transform 0.22s cubic-bezier(0.4,0,1,1),opacity 0.2s ease';
        mb.style.transform='scale(0.94) translateY(12px)';
        mb.style.opacity='0';
      }
      OV.classList.remove('galproj-modal-overlay--active');
      document.body.classList.remove('galproj-modal-open');
      unlockScroll();
      setTimeout(function(){
        if(mb){mb.style.transition='';mb.style.transform='';mb.style.opacity='';}
        if(MB)MB.innerHTML='';
        if(MVW)MVW.style.display='none';
        resetIframe(MIF);
        if(ovPar){
          if(ovNxt&&ovNxt.parentNode===ovPar)ovPar.insertBefore(OV,ovNxt);
          else ovPar.appendChild(OV);
          ovPar=null;ovNxt=null;
        }
      },420);
    }
    function openCert(src){
      if(!CM||!CMI)return;
      cmPar=CM.parentNode;cmNxt=CM.nextSibling;
      document.body.appendChild(CM);
      CM.style.transition='';
      CMI.src=src;
      CM.classList.add('galproj-cert-modal-active');
      document.body.classList.add('galproj-cert-open');
      lockScroll();
    }
    function closeCert(){
      if(!CM)return;
      var cc=CM.querySelector('.galproj-cert-modal-content');
      if(cc){
        cc.style.transition='transform 0.22s cubic-bezier(0.4,0,1,1),opacity 0.2s ease';
        cc.style.transform='scale(0.94)';
        cc.style.opacity='0';
      }
      CM.classList.remove('galproj-cert-modal-active');
      document.body.classList.remove('galproj-cert-open');
      unlockScroll();
      setTimeout(function(){
        if(cc){cc.style.transition='';cc.style.transform='';cc.style.opacity='';}
        if(CMI)CMI.src='';
        if(cmPar){
          if(cmNxt&&cmNxt.parentNode===cmPar)cmPar.insertBefore(CM,cmNxt);
          else cmPar.appendChild(CM);
          cmPar=null;cmNxt=null;
        }
      },420);
    }

    window.addEventListener('resize',applyModalScale);
    if(CMC)CMC.addEventListener('click',closeCert);
    if(CM)CM.addEventListener('click',function(e){if(e.target===this)closeCert();});
    if(MC)MC.addEventListener('click',function(){
      if(sliderBackFn){var f=sliderBackFn;sliderBackFn=null;f();return;}
      closeModal();
    });
    if(OV)OV.addEventListener('click',function(e){
      if(e.target!==this)return;
      if(sliderBackFn){var f=sliderBackFn;sliderBackFn=null;f();return;}
      closeModal();
    });
    document.addEventListener('visibilitychange',function(){
      if(document.visibilityState==='visible'&&(!LB||!LB.classList.contains('galproj-lightbox--active'))){
        unlockScroll();
        document.body.classList.remove('galproj-modal-open');
        document.body.classList.remove('galproj-cert-open');
      }
    });

    document.addEventListener('click',function(e){
      var btn=e.target.closest('.galproj-btn-details');
      if(!btn)return;
      var type=btn.dataset.type;
      if(type==='certificate'){if(btn.dataset.image)openCert(btn.dataset.image);return;}
      var jname=btn.dataset.json;
      if(!type||!jname)return;
      if(MB)MB.innerHTML='<div class="galproj-modal-loading"><div class="galproj-spinner"></div><span>Memuat...</span></div>';
      if(MVW)MVW.style.display='none';
      resetIframe(MIF);
      openModal();
      fetchJSON(jname).then(function(data){
        if(type==='video')renderVideo(data);
        else renderFoto(data);
        setTimeout(applyModalScale,80);
      }).catch(function(){
        if(MB)MB.innerHTML='<div class="galproj-modal-loading"><span>Gagal memuat. Coba lagi.</span></div>';
      });
    });

    function setModalVideo(id){
      if(!MVW)return;
      setTimeout(function(){
        var wEl=MVW.querySelector('.galproj-modal-video');
        if(!wEl)return;
        var old=document.getElementById('galproj-modal-iframe');
        if(old)old.parentNode.removeChild(old);
        var oldMask=wEl.querySelector('.galproj-modal-video-mask');
        if(oldMask)oldMask.parentNode.removeChild(oldMask);
        var nifr=document.createElement('iframe');
        nifr.id='galproj-modal-iframe';
        nifr.setAttribute('allowfullscreen','');
        nifr.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture');
        nifr.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;';
        nifr.src='https://drive.google.com/file/d/'+id+'/preview?rm=minimal';
        wEl.appendChild(nifr);
        var mask=document.createElement('div');
        mask.className='galproj-modal-video-mask';
        wEl.appendChild(mask);
        MIF=nifr;
        var ef=MVW.querySelector('.galproj-drive-fallback');
        if(ef)ef.parentNode.removeChild(ef);
        if(isEdgeAndroid||isAndroid){
          var fb=document.createElement('div');
          fb.className='galproj-drive-fallback';
          var lnk=document.createElement('a');
          lnk.href='https://drive.google.com/file/d/'+id+'/view';
          lnk.target='_blank';
          lnk.rel='noopener noreferrer';
          lnk.textContent='Buka di Google Drive \u2197';
          fb.appendChild(lnk);
          MVW.appendChild(fb);
        }
        MVW.style.display='block';
        setTimeout(applyModalScale,50);
      },(isIOS||isEdgeAndroid)?350:0);
    }
    function renderVideo(data){
      var videos=data.videos||[];
      if(!videos.length){
        if(MB)MB.innerHTML='<div class="galproj-modal-loading"><span>Tidak ada video.</span></div>';
        return;
      }
      setModalVideo(videos[0].id);
      if(videos.length<=1){if(MB)MB.innerHTML='';return;}
      var h='<div class="galproj-modal-playlist">';
      videos.forEach(function(v,i){
        h+='<button class="galproj-modal-playlist-item'+(i===0?' galproj-modal-playlist-item--active':'')+'" data-vid="'+v.id+'">';
        h+='<div class="galproj-modal-playlist-num">'+(i+1)+'</div>';
        h+='<span class="galproj-modal-playlist-title">'+v.title+'</span>';
        h+='<svg class="galproj-modal-playlist-icon" width="14" height="14" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>';
        h+='</button>';
      });
      h+='</div>';
      if(MB)MB.innerHTML=h;
      var items=MB.querySelectorAll('.galproj-modal-playlist-item');
      items.forEach(function(item){
        item.addEventListener('click',function(){
          var vid=this.dataset.vid;
          if(!vid)return;
          items.forEach(function(el){el.classList.remove('galproj-modal-playlist-item--active');});
          item.classList.add('galproj-modal-playlist-item--active');
          var old=document.getElementById('galproj-modal-iframe');
          if(old)old.parentNode.removeChild(old);
          var wEl=MVW&&MVW.querySelector('.galproj-modal-video');
          if(wEl){var ph=document.createElement('div');ph.id='galproj-modal-iframe';wEl.appendChild(ph);}
          setTimeout(function(){setModalVideo(vid);},(isIOS||isEdgeAndroid)?400:100);
        });
      });
    }
    function makeSlider(imgs,startIdx,onBack){
      if(!MB)return;
      sliderBackFn=onBack||null;
      var ci=startIdx||0,tot=imgs.length;
      MB.innerHTML='';
      var wr=document.createElement('div');wr.className='galproj-ios-slider';
      var iw=document.createElement('div');iw.className='galproj-ios-slider-img-wrap';
      var ie=document.createElement('img');ie.className='galproj-ios-slider-img';ie.alt='';
      var sp=document.createElement('div');sp.className='galproj-ios-slider-spinner';
      sp.innerHTML='<div class="galproj-spinner"></div>';
      iw.appendChild(sp);iw.appendChild(ie);
      var ft=document.createElement('div');ft.className='galproj-ios-slider-footer';
      var pb=document.createElement('button');pb.className='galproj-ios-slider-btn galproj-ios-slider-btn--prev';
      var ct=document.createElement('div');ct.className='galproj-ios-slider-counter';
      var nb=document.createElement('button');nb.className='galproj-ios-slider-btn galproj-ios-slider-btn--next';
      ft.appendChild(pb);ft.appendChild(ct);ft.appendChild(nb);
      wr.appendChild(iw);wr.appendChild(ft);
      MB.appendChild(wr);
      var wrap=!onBack;
      function show(idx){
        ci=idx;
        ct.textContent=(idx+1)+' / '+tot;
        sp.style.display='flex';
        ie.style.opacity='0';
        var ni=new Image();
        ni.onload=function(){
          ie.src=ni.src;
          ie.style.opacity='1';
          sp.style.display='none';
          ni=null;
          setTimeout(applyModalScale,30);
        };
        ni.onerror=function(){sp.style.display='none';ni=null;};
        ni.src=imgs[idx];
        if(wrap){
          pb.style.opacity='1';pb.style.pointerEvents='auto';
          nb.style.opacity='1';nb.style.pointerEvents='auto';
        }else{
          pb.style.opacity=idx===0?'0.3':'1';
          pb.style.pointerEvents=idx===0?'none':'auto';
          nb.style.opacity=idx===tot-1?'0.3':'1';
          nb.style.pointerEvents=idx===tot-1?'none':'auto';
        }
      }
      pb.addEventListener('click',function(){show(wrap?(ci-1+tot)%tot:Math.max(ci-1,0));});
      nb.addEventListener('click',function(){show(wrap?(ci+1)%tot:Math.min(ci+1,tot-1));});
      iw.addEventListener('touchstart',function(e){iw._tx=e.touches[0].clientX;iw._ty=e.touches[0].clientY;},{passive:true});
      iw.addEventListener('touchend',function(e){
        var dx=e.changedTouches[0].clientX-iw._tx;
        var dy=e.changedTouches[0].clientY-iw._ty;
        if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){
          if(dx<0){wrap?show((ci+1)%tot):(ci<tot-1&&show(ci+1));}
          else{wrap?show((ci-1+tot)%tot):(ci>0&&show(ci-1));}
        }
      },{passive:true});
      show(ci);
    }
    function renderFoto(data){
      var imgs=data.images||data.photos||[];
      if(!imgs.length){
        if(MB)MB.innerHTML='<div class="galproj-modal-loading"><span>Tidak ada foto.</span></div>';
        return;
      }
      if(isIOS){makeSlider(imgs,0,null);return;}
      function showGrid(){
        sliderBackFn=null;
        if(!MB)return;
        MB.innerHTML='';
        var grid=document.createElement('div');grid.className='galproj-modal-photogrid';
        imgs.forEach(function(src,i){
          var item=document.createElement('div');item.className='galproj-modal-photogrid-item';item.dataset.index=String(i);
          var img=document.createElement('img');img.alt='';img.loading='lazy';img.src=src;
          img.onerror=function(){this.style.opacity='0.3';};
          item.appendChild(img);grid.appendChild(item);
        });
        MB.appendChild(grid);
        setTimeout(applyModalScale,30);
        grid.addEventListener('click',function(e){
          var item=e.target.closest('.galproj-modal-photogrid-item');
          if(!item)return;
          var idx=parseInt(item.dataset.index,10);
          if(!isNaN(idx))makeSlider(imgs,idx,showGrid);
        });
      }
      showGrid();
    }
    function lbUpdateCounter(){
      if(LBK&&lbArr.length)LBK.textContent=(lbIdx+1)+' / '+lbArr.length;
    }
    function lbGoto(idx){
      if(lbTr)return;lbTr=true;
      var nx=new Image();
      nx.onload=function(){
        LBI.classList.add('lb-fade-out');
        setTimeout(function(){
          LBI.src=nx.src;
          LBI.classList.remove('lb-fade-out');
          lbIdx=idx;lbTr=false;
          lbUpdateCounter();
          nx=null;
        },300);
      };
      nx.onerror=function(){lbTr=false;nx=null;};
      nx.src=lbArr[idx];
    }
    function closeLightbox(){
      if(!LB)return;
      LB.classList.remove('galproj-lightbox--active');
      lbTr=false;
      setTimeout(function(){
        LB.style.display='none';
        if(OV&&OV.classList.contains('galproj-modal-overlay--active'))lockScroll();
        else unlockScroll();
      },280);
    }
    if(LBC)LBC.addEventListener('click',closeLightbox);
    if(LB)LB.addEventListener('click',function(e){if(e.target===this)closeLightbox();});
    if(LBP)LBP.addEventListener('click',function(){if(lbArr.length)lbGoto((lbIdx-1+lbArr.length)%lbArr.length);});
    if(LBN)LBN.addEventListener('click',function(){if(lbArr.length)lbGoto((lbIdx+1)%lbArr.length);});
    document.addEventListener('keydown',function(e){
      if(LB&&LB.classList.contains('galproj-lightbox--active')){
        if(e.key==='ArrowLeft'&&LBP)LBP.click();
        if(e.key==='ArrowRight'&&LBN)LBN.click();
        if(e.key==='Escape')closeLightbox();
        return;
      }
      if(CM&&CM.classList.contains('galproj-cert-modal-active')&&e.key==='Escape'){closeCert();return;}
      if(OV&&OV.classList.contains('galproj-modal-overlay--active')&&e.key==='Escape'){
        if(sliderBackFn){var f=sliderBackFn;sliderBackFn=null;f();return;}
        closeModal();
      }
    });

    function collapseAll(){
      document.querySelectorAll('.galproj-panel').forEach(function(p){
        if(!p.classList.contains('galproj-panel--collapsed')){
          p.classList.add('galproj-panel--collapsed');
          var pn=p.dataset.panel;
          var btn=document.querySelector('.galproj-toggle[data-panel="'+pn+'"]');
          if(btn)btn.textContent='Lihat Selengkapnya';
          applyCollapse(pn,true);
        }
      });
    }
    function initTabs(){
      var tabs=document.querySelectorAll('.galproj-tab');
      function activate(tab){
        collapseAll();
        tabs.forEach(function(el){el.classList.remove('galproj-tab--active');});
        tab.classList.add('galproj-tab--active');
        document.querySelectorAll('.galproj-panel').forEach(function(el){el.classList.remove('galproj-panel--active');});
        var p=document.querySelector('.galproj-panel[data-panel="'+tab.dataset.tab+'"]');
        if(p)p.classList.add('galproj-panel--active');
      }
      tabs.forEach(function(tab){
        tab.addEventListener('click',function(e){e.preventDefault();activate(this);});
        tab.addEventListener('touchend',function(e){e.preventDefault();activate(this);},{passive:false});
      });
    }
    function scrollUp(){
      var s=document.querySelector('#galleryproject')||document.querySelector('.galproj-hdr-wrapper')||document.querySelector('.galproj-wrapper');
      if(s)window.scrollTo({top:Math.max(0,s.getBoundingClientRect().top+window.pageYOffset-20),behavior:'smooth'});
    }
    function initToggle(){
      document.querySelectorAll('.galproj-toggle').forEach(function(btn){
        btn.addEventListener('click',function(){
          var pn=this.dataset.panel;
          var p=document.querySelector('.galproj-panel[data-panel="'+pn+'"]');
          if(!p)return;
          if(p.classList.contains('galproj-panel--collapsed')){
            p.classList.remove('galproj-panel--collapsed');
            this.textContent='Sembunyikan';
            applyCollapse(pn,false);
            p.querySelectorAll('img[data-src]').forEach(function(img){
              if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src;}
            });
          }else{
            p.classList.add('galproj-panel--collapsed');
            this.textContent='Lihat Selengkapnya';
            applyCollapse(pn,false);
            setTimeout(scrollUp,320);
          }
        });
      });
    }
    initTabs();
    initToggle();
  }
window.galprojModalInit=init;
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
}());
})();

/* ===================== VALUE / WORKFLOW ===================== */
(function(){
  'use strict';
  if(window.aldiCbInitialized)return;
  window.aldiCbInitialized=true;
  function initCb(){
    var tabs=document.querySelectorAll('.aldi-cb-tab');
    var panels=document.querySelectorAll('.aldi-cb-panel');
    if(!tabs.length)return;
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        var target=this.getAttribute('data-cb-tab');
        tabs.forEach(function(t){t.classList.remove('aldi-cb-tab--active');});
        panels.forEach(function(p){p.classList.remove('aldi-cb-panel--active');});
        this.classList.add('aldi-cb-tab--active');
        var panel=document.querySelector('[data-cb-panel="'+target+'"]');
        if(panel)panel.classList.add('aldi-cb-panel--active');
      }.bind(tab));
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initCb);}else{initCb();}
}());

/* ===================== TESTIMONI ===================== */
(function(){
  if(globalThis.aldiTestimonialInitialized)return;
  globalThis.aldiTestimonialInitialized=true;

  var FIREBASE_CONFIG={apiKey:"AIzaSyApD78YEHwTLjw6PTn9e-CdfejG6YkQSzQ",authDomain:"aldi-contact-comments.firebaseapp.com",databaseURL:"https://aldi-contact-comments-default-rtdb.firebaseio.com",projectId:"aldi-contact-comments",storageBucket:"aldi-contact-comments.firebasestorage.app",messagingSenderId:"251230619322",appId:"1:251230619322:web:47e192168d6cc99b306483"};
  var adminTimestamp=Date.now()-(1*60*60*1000);
  var aldiData=[{id:'admin-welcome',name:"Aldi Wijaya",email:"aldiiiwijaya.web.id",message:"Selamat datang! Saya sangat menghargai setiap feedback dan testimoni dari klien. Silakan bagikan pengalaman Anda bekerja sama dengan saya",time:"Baru saja",avatar:"AW",admin:true,timestamp:adminTimestamp}];

  function resetViewport(){var vp=document.querySelector('meta[name="viewport"]');if(!vp)return;var orig=vp.getAttribute('content');vp.setAttribute('content',orig+',maximum-scale=1');setTimeout(function(){vp.setAttribute('content',orig);},300);}
  function initZoomFix(){var inputs=document.querySelectorAll('.aldi-testimonial-form-input,.aldi-testimonial-form-textarea');inputs.forEach(function(el){el.addEventListener('blur',function(){resetViewport();});});}
  function getAvatar(name){if(!name||!name.length)return"??";var w=name.trim().split(' ');return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():name.substring(0,2).toUpperCase();}
  function formatTime(ts){var date=new Date(ts),now=new Date(),diff=now-date,min=Math.floor(diff/60000),hr=Math.floor(diff/3600000),d=Math.floor(diff/86400000);if(min<1)return'Baru saja';if(min<60)return min+'m';if(hr<24)return hr+'j';if(d<7)return d+'h';if(d<30)return Math.floor(d/7)+'w';return date.toLocaleDateString('id-ID',{month:'short',day:'numeric',year:'numeric'});}

function render(){
    var list=document.getElementById('aldi-testimonial-list'),count=document.getElementById('aldi-testimonial-count');
    if(!list||!count)return;
    list.innerHTML='';count.textContent='('+aldiData.length+')';
    var sorted=aldiData.slice().sort(function(a,b){if(a.admin&&!b.admin)return-1;if(!a.admin&&b.admin)return 1;return b.timestamp-a.timestamp;});
    sorted.forEach(function(item,i){
      var div=document.createElement('div');
      div.className='aldi-testimonial-item'+(item.admin?' aldi-testimonial-pinned':'');
      div.style.animationDelay=(i*0.1)+'s';
      var badge=item.admin?'<span class="aldi-testimonial-item-badge">Admin</span>':'';
      var email=item.email?'<div class="aldi-testimonial-item-email">'+item.email+'</div>':'';
      var timeOrBadge=item.admin?badge:formatTime(item.timestamp);
      div.innerHTML='<div class="aldi-testimonial-item-header"><div class="aldi-testimonial-item-author"><div class="aldi-testimonial-item-meta"><div class="aldi-testimonial-item-name">'+item.name+'</div>'+email+'</div></div><div class="aldi-testimonial-item-time">'+timeOrBadge+'</div></div><div class="aldi-testimonial-item-text">'+item.message+'</div>';
      list.appendChild(div);
    });
    initRipples();
}
  function initRipples(){
    document.querySelectorAll('.aldi-testimonial-form-button,.aldi-testimonial-item-avatar').forEach(function(el){
      if(el.dataset.rippleReady)return;el.dataset.rippleReady='1';
      el.style.position='relative';el.style.overflow='hidden';
      el.addEventListener('click',function(e){
        var ripple=document.createElement('span');
        var rect=this.getBoundingClientRect();
        var size=Math.max(rect.width,rect.height);
        var x=e.clientX-rect.left-size/2;var y=e.clientY-rect.top-size/2;
        ripple.style.cssText='position:absolute;border-radius:50%;pointer-events:none;z-index:100;width:'+size+'px;height:'+size+'px;left:'+x+'px;top:'+y+'px;background:radial-gradient(circle,rgba(163,177,198,0.35) 0%,rgba(163,177,198,0.12) 50%,transparent 100%);transform:scale(0);animation:aldi-ripple-click 0.55s ease-out forwards;';
        this.appendChild(ripple);
        setTimeout(function(){if(ripple.parentNode)ripple.parentNode.removeChild(ripple);},600);
      });
    });
  }
  function showNotif(msg,type){
    var n=document.createElement('div');type=type||'success';
    var color=type==='success'?'#10b981':type==='error'?'#ef4444':'#f59e0b';
    var icons={success:'\u2705',error:'\u274c',warning:'\u26a0\ufe0f'};
    n.style.cssText='position:fixed;top:20px;right:20px;background:var(--bg,#1e2028);color:'+color+';padding:16px 24px;border-radius:16px;font-size:14px;font-weight:600;box-shadow:6px 6px 12px rgba(0,0,0,0.3),-4px -4px 8px rgba(255,255,255,0.05);z-index:99999;transform:translateX(400px);transition:transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);font-family:Inter,sans-serif;max-width:350px;display:flex;align-items:center;gap:8px;';
    n.innerHTML=icons[type]+' '+msg;
    document.body.appendChild(n);
    setTimeout(function(){n.style.transform='translateX(0)';},100);
    setTimeout(function(){n.style.transform='translateX(400px)';setTimeout(function(){if(document.body.contains(n))document.body.removeChild(n);},400);},4000);
  }
  function loadFirebaseData(db){
    db.ref('comments').once('value').then(function(snap){
      if(snap.exists()){
        var fbData=[];
        snap.forEach(function(child){var t=child.val();t.id=child.key;fbData.push(t);});
        var admins=aldiData.filter(function(c){return c.admin;});
        var users=fbData.filter(function(c){return!c.admin;});
        aldiData=admins.concat(users);
      }
      render();
      listenNew(db);
    }).catch(function(){render();});
  }
  function listenNew(db){
    var loaded=false;
    db.ref('comments').on('value',function(snap){
      if(!loaded){loaded=true;return;}
      snap.forEach(function(child){
        var t=child.val();t.id=child.key;
        var exists=aldiData.some(function(c){return c.id===t.id;});
        if(!exists&&!t.admin){aldiData.push(t);render();}
      });
    });
  }
  function addTestimonial(db,name,email,message){
    if(!name||!email||!message){showNotif('Mohon isi nama, email, dan testimoni','error');return Promise.resolve();}
    if(message.length>500){showNotif('Testimoni terlalu panjang (maksimal 500 karakter)','error');return Promise.resolve();}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showNotif('Format email tidak valid','error');return Promise.resolve();}
    var ts=Date.now();
    var item={name:name,email:email,message:message,timestamp:ts,time:formatTime(ts),avatar:getAvatar(name),admin:false};
    var newRef=db.ref('comments').push();
    return newRef.set(item).then(function(){
      showNotif('Testimoni berhasil dikirim!','success');
      item.id=newRef.key;
      var exists=aldiData.some(function(t){return t.id===item.id;});
      if(!exists){aldiData.push(item);render();}
      var list=document.getElementById('aldi-testimonial-list');
      if(list)setTimeout(function(){list.scrollTo({top:0,behavior:'smooth'});},300);
    }).catch(function(e){
      aldiData.push(Object.assign({},item,{id:'local_'+ts}));
      render();
      showNotif('Tersimpan offline. Error: '+e.message,'warning');
    });
  }
  function initForm(db){
    var form=document.getElementById('aldi-testimonial-form');
    if(!form)return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var n=document.getElementById('aldi-testimonial-name'),em=document.getElementById('aldi-testimonial-email'),msg=document.getElementById('aldi-testimonial-message');
      if(!n||!em||!msg)return;
      var btn=form.querySelector('.aldi-testimonial-form-button');
      if(!btn)return;
      var orig=btn.innerHTML;
      btn.innerHTML='<svg class="aldi-testimonial-send-icon" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Mengirim...';
      btn.disabled=true;
      addTestimonial(db,n.value.trim(),em.value.trim(),msg.value.trim()).then(function(){
        form.reset();btn.innerHTML=orig;btn.disabled=false;initRipples();
      });
    });
  }
function loadFirebaseSDK(cb,onError){
  if(window.firebase&&window.firebase.database){cb(window.firebase);return;}
  var scripts=[{src:'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',id:'fb-app'},{src:'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js',id:'fb-db'}];
  var loaded=0,failed=false;
  scripts.forEach(function(s){
    if(document.getElementById(s.id)){loaded++;if(loaded===scripts.length&&!failed)cb(window.firebase);return;}
    var el=document.createElement('script');el.id=s.id;el.src=s.src;
    el.onload=function(){loaded++;if(loaded===scripts.length&&!failed)setTimeout(function(){cb(window.firebase);},100);};
    el.onerror=function(){if(failed)return;failed=true;if(onError)onError();};
    document.head.appendChild(el);
  });
}
function init(){
    render();initZoomFix();
    loadFirebaseSDK(function(firebase){
      try{
        var app=firebase.apps.length?firebase.app():firebase.initializeApp(FIREBASE_CONFIG);
        var db=firebase.database(app);
        loadFirebaseData(db);
        initForm(db);
      }catch(e){render();showNotif('Firebase error: '+e.message,'warning');}
    },function(){
      var form=document.getElementById('aldi-testimonial-form');
      if(form)form.addEventListener('submit',function(e){
        e.preventDefault();
        showNotif('Gagal terhubung ke server, coba muat ulang halaman','error');
      });
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){setTimeout(init,200);});}else{setTimeout(init,200);}
})();

/* ===================== CONTACT & FAQ ===================== */
(function(){
  'use strict';
  function closeAll(){
    document.querySelectorAll('.cf-faq-item.open').forEach(function(el){
      el.classList.remove('open');
      el.querySelector('.cf-faq-answer').style.maxHeight='0';
      el.querySelector('.cf-faq-btn').setAttribute('aria-expanded','false');
    });
  }
  if('IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.style.animationPlayState='running';
          obs.unobserve(e.target);
        }
      });
    },{threshold:0.12});
    var card=document.querySelector('.cf-card');
    if(card){
      card.style.animationPlayState='paused';
      obs.observe(card);
    }
  }
  window.cfFaqToggle=function(btn){
    var item=btn.closest('.cf-faq-item');
    var answer=item.querySelector('.cf-faq-answer');
    var isOpen=item.classList.contains('open');
    closeAll();
    if(!isOpen){
      item.classList.add('open');
      answer.style.maxHeight=answer.scrollHeight+'px';
      btn.setAttribute('aria-expanded','true');
    }
  };
  document.addEventListener('click',function(e){
    if(!e.target.closest('.cf-faq-item')){
      closeAll();
    }
  });
}());

/* ===================== CLIENTS ===================== */
(function(){
  "use strict";
  if(window.aldiClientsInitialized)return;
  window.aldiClientsInitialized=true;
  var shadowHover='6px 6px 12px var(--bg-shadow-dark,#a3b1c6),-4px -4px 8px var(--bg-shadow-light,#ffffff)';
  var aldiClientsTooltip=null;
  var rafId=null;
  var animatedCounters=new Set();
  var aldiClientPeriods={
    "8amities":"Mei 2022 - Agu 2022",
    "Accent Ambios":"Agu 2023 - Okt 2023",
    "Anita Salon":"Nov 2023 - Feb 2025",
    "Bolan Thai Kitchen":"Apr 2020 - Okt 2020",
    "ByManda":"Okt 2023 - Nov 2023",
    "Cemilan Keto":"Jan 2024 - Sekarang",
    "Kopi Bituka":"Mei 2023 - Agu 2023",
    "Lumity Studio":"Nov 2024 - Sep 2025",
    "Nikuya Meat Shop":"Okt 2024 - Sekarang",
    "Peek A Boo":"Mar 2025 - Sekarang",
    "Pulse Fitness":"Des 2024 - Sekarang",
    "RibsGold":"Jul 2021 - Jul 2023",
    "Sambarajo":"Okt 2024 - Sep 2025",
    "Seven The Salon":"Nov 2023 - Sekarang",
    "Skin Ethica":"Okt 2024 - Feb 2026",
    "Tahu Talaga":"Nov 2023 - Sekarang",
    "White Bride":"Nov 2023 - Sekarang",
    "Oryza Sativa":"Okt 2024 - Apr 2026"
  };
  function throttle(fn,limit){
    var inThrottle;
    return function(){
      var args=arguments,ctx=this;
      if(!inThrottle){fn.apply(ctx,args);inThrottle=true;setTimeout(function(){inThrottle=false;},limit);}
    };
  }
  var updatePos=throttle(function(rect,tipRect){
    if(!aldiClientsTooltip)return;
    aldiClientsTooltip.style.left=(rect.left+rect.width/2-tipRect.width/2)+'px';
    aldiClientsTooltip.style.top=(rect.top-tipRect.height-8)+'px';
  },16);
  function initLogo(logo,i){
    if(logo._aldiInited)return;
    logo._aldiInited=true;
    logo.style.opacity='0';
    logo.style.transform='translateY(20px) scale(0.9)';
    logo.style.transition='opacity 0.6s ease,transform 0.6s ease,box-shadow 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
    setTimeout(function(){
      logo.style.opacity='1';
      logo.style.transform='translateY(0) scale(1)';
      setTimeout(function(){
        var isOdd=(i%2===0);
        logo.style.transition='box-shadow 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
        var floatDelay=-(i*0.4)+'s';
        logo.style.animationDelay=floatDelay;
        logo.style.animation=(isOdd?'aldi-clients-float-odd':'aldi-clients-float-even')+' 4s cubic-bezier(0.445,0.05,0.55,0.95) infinite';
      },650);
    },i*50);
    logo.addEventListener('mouseenter',function(){
      this.style.animationPlayState='paused';
      this.style.transform='translateY(-10px) scale(1.15)';
      this.style.boxShadow=shadowHover;
      this.style.transition='transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
      var img=this.querySelector('img');
      if(img){img.style.transform='scale(1.1)';img.style.filter='brightness(1.05) saturate(1.1)';}
      if(!aldiClientsTooltip)aldiClientsTooltip=document.getElementById('aldiClientsTooltip');
      var name=this.getAttribute('data-name');
      if(aldiClientsTooltip&&name){
        var period=aldiClientPeriods[name]||null;
        aldiClientsTooltip.innerHTML=name+(period?'<span class="aldi-clients-tooltip-period">'+period+'</span>':'');
        aldiClientsTooltip.classList.add('aldi-clients-show');
        var rect=this.getBoundingClientRect();
        var tipRect=aldiClientsTooltip.getBoundingClientRect();
        updatePos(rect,tipRect);
      }
    });
    logo.addEventListener('mouseleave',function(){
      this.style.animationPlayState='running';
      this.style.transform='';
      this.style.boxShadow='';
      this.style.transition='box-shadow 0.35s cubic-bezier(0.25,0.46,0.45,0.94)';
      var img=this.querySelector('img');
      if(img){img.style.transform='';img.style.filter='';}
      if(!aldiClientsTooltip)aldiClientsTooltip=document.getElementById('aldiClientsTooltip');
      if(aldiClientsTooltip)aldiClientsTooltip.classList.remove('aldi-clients-show');
      if(rafId){cancelAnimationFrame(rafId);rafId=null;}
    });
    logo.addEventListener('mousemove',function(){
      if(!aldiClientsTooltip)aldiClientsTooltip=document.getElementById('aldiClientsTooltip');
      if(aldiClientsTooltip&&aldiClientsTooltip.classList.contains('aldi-clients-show')){
        if(rafId)cancelAnimationFrame(rafId);
        var self=this;
        rafId=requestAnimationFrame(function(){
          var rect=self.getBoundingClientRect();
          var tipRect=aldiClientsTooltip.getBoundingClientRect();
          updatePos(rect,tipRect);
        });
      }
    });
    logo.addEventListener('click',function(e){
      e.preventDefault();
      var ripple=document.createElement('span');
      var rect=this.getBoundingClientRect();
      var size=Math.max(rect.width,rect.height);
      ripple.style.cssText='position:absolute;width:'+size+'px;height:'+size+'px;left:'+(e.clientX-rect.left-size/2)+'px;top:'+(e.clientY-rect.top-size/2)+'px;background:rgba(99,102,241,0.2);border-radius:50%;transform:scale(0);animation:aldi-clients-ripple 0.6s ease-out;pointer-events:none;z-index:10;';
      this.appendChild(ripple);
      setTimeout(function(){if(ripple.parentNode)ripple.remove();},600);
    });
  }
  function initStat(stat,i){
    if(stat._aldiStatInited)return;
    stat._aldiStatInited=true;
    stat.dataset.statId='aldi-clients-stat-'+i;
    new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        var numEl=entry.target.querySelector('.aldi-clients-stat-number');
        if(numEl&&numEl.dataset.count){
          setTimeout(function(){animateCount(numEl,numEl.dataset.count);},200);
        }
      });
    },{threshold:0.3}).observe(stat);
  }
  function animateCount(el,target){
    var statEl=el.closest('.aldi-clients-stat');
    var statId=statEl?statEl.dataset.statId:Math.random().toString(36);
    if(animatedCounters.has(statId))return;
    animatedCounters.add(statId);
    var duration=2000;
    var startTime=performance.now();
    var isPercentage=target.indexOf('%')!==-1;
    var is247=target==='24/7';
    var numericTarget=parseInt(target);
    function update(now){
      if(is247){el.textContent='24/7';return;}
      var progress=Math.min((now-startTime)/duration,1);
      var easing=1-Math.pow(1-progress,3);
      el.textContent=Math.floor(numericTarget*easing)+(isPercentage?'%':'+');
      if(progress<1)requestAnimationFrame(update);
      else el.textContent=target+(isPercentage?'%':'+');
    }
    requestAnimationFrame(update);
  }
  function initAll(){
    var logos=document.querySelectorAll('.aldi-clients-logo');
    logos.forEach(function(logo,i){initLogo(logo,i);});
    var stats=document.querySelectorAll('.aldi-clients-section .aldi-clients-stat');
    stats.forEach(function(stat,i){initStat(stat,i);});
    aldiClientsTooltip=document.getElementById('aldiClientsTooltip');
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initAll);
  }else{
    initAll();
  }
}()); 