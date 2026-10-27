'use strict';
const menuToggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!expanded));menu.classList.toggle('open',!expanded)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
const revealEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}})},{threshold:.08});revealEls.forEach(el=>obs.observe(el))}else{revealEls.forEach(el=>el.classList.add('is-visible'))}
const filters=document.querySelectorAll('.filter');const items=document.querySelectorAll('.gallery-item');
filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});items.forEach(item=>{item.hidden=category!=='all'&&item.dataset.category!==category})}));
const lightbox=document.querySelector('#lightbox');
items.forEach(item=>item.addEventListener('click',()=>{document.querySelector('#lightbox-image').src=item.dataset.image;document.querySelector('#lightbox-image').alt=item.dataset.title;document.querySelector('#lightbox-title').textContent=item.dataset.title;lightbox.showModal()}));
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
const preview=document.querySelector('#preview-dialog');const previewFrame=document.querySelector('#preview-iframe');
document.querySelector('[data-preview="tour"]').addEventListener('click',()=>{previewFrame.src='https://dental-clinic-c89.pages.dev/';preview.showModal()});
document.querySelector('#close-preview').addEventListener('click',()=>preview.close());preview.addEventListener('close',()=>{previewFrame.removeAttribute('src')});preview.addEventListener('click',e=>{if(e.target===preview)preview.close()});

// Two independent, automatically rotating project image carousels.
document.querySelectorAll('.image-slider').forEach(slider=>{
  const slides=[...slider.querySelectorAll('.slide-image')];
  const counter=slider.querySelector('.slider-count');
  let current=0, timer=null;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(next){
    current=(next+slides.length)%slides.length;
    slides.forEach((slide,index)=>{const active=index===current;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));});
    counter.textContent=String(current+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  }
  function stop(){if(timer!==null){clearInterval(timer);timer=null;}}
  function start(){stop();if(!motion&&slides.length>1)timer=setInterval(()=>show(current+1),4500);}
  slider.querySelectorAll('.slider-arrow').forEach(button=>button.addEventListener('click',()=>{show(current+(button.dataset.direction==='next'?1:-1));start();}));
  slider.addEventListener('mouseenter',stop);slider.addEventListener('mouseleave',start);
  slider.addEventListener('focusin',stop);slider.addEventListener('focusout',e=>{if(!slider.contains(e.relatedTarget))start();});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  show(0);start();
});
