/* MADE WITH — track player. Shared by index.html cards and plugin pages. */
(function(){
  var cur=null;
  function fmt(s){s=Math.max(0,s|0);return (s/60|0)+":"+("0"+(s%60)).slice(-2);}
  document.querySelectorAll('.mw').forEach(function(el){
    var a=new Audio(el.dataset.src); a.preload='metadata';
    var btn=el.querySelector('.mw-play'), bar=el.querySelector('.mw-bar i'), t=el.querySelector('.mw-time'), seek=el.querySelector('.mw-bar');
    a.addEventListener('loadedmetadata',function(){t.textContent=fmt(a.duration);});
    a.addEventListener('timeupdate',function(){bar.style.width=(a.currentTime/a.duration*100)+'%';t.textContent=fmt(a.duration-a.currentTime);});
    a.addEventListener('ended',function(){el.classList.remove('on');bar.style.width='0%';t.textContent=fmt(a.duration);});
    function stop(){a.pause();el.classList.remove('on');}
    btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
      if(a.paused){ if(cur&&cur!==stop)cur(); cur=stop; a.play(); el.classList.add('on'); }
      else stop();
    });
    seek.addEventListener('click',function(e){e.stopPropagation();var r=seek.getBoundingClientRect();a.currentTime=(e.clientX-r.left)/r.width*a.duration;});
  });
})();
