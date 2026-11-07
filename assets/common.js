/* Shared by account, leaderboard and help pages. Sits at /assets/common.js; pages are one folder deep, so they load it as ../assets/common.js */
(function(){try{document.documentElement.dataset.theme=localStorage.getItem("hl_theme")||"dark";if(localStorage.getItem("hl_rm")==="1")document.documentElement.dataset.motion="reduce"}catch(e){}})();
window.HL={
  DOMAIN:"users.headline.app",
  cfg:{apiKey:"AIzaSyCSbP_YLj96o8paciuqwH7dVthvyZXGmq8",authDomain:"news-af425.firebaseapp.com",projectId:"news-af425",appId:"1:28387227118:web:2db21ce8f8745a3c22caff"},
  el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e},
  init(){firebase.initializeApp(this.cfg);return{auth:firebase.auth(),db:firebase.firestore()}},
  toast(m){let t=document.getElementById("toast");if(!t){t=this.el("div","toast");t.id="toast";document.body.append(t)}t.textContent=m;t.classList.remove("hidden");clearTimeout(this.tt);this.tt=setTimeout(()=>t.classList.add("hidden"),2600)},
  header(active){
    const links=[["account","Account"],["leaderboard","Leaderboard"],["help","Help"]];
    const h=document.getElementById("hdr");h.className="top";h.innerHTML='<a class="logo" href="../">head<i>line</i></a>';
    const n=this.el("nav");links.forEach(([k,t])=>{const a=this.el("a",k===active?"on":"",t);a.href="../"+k+"/";n.append(a)});h.append(n);
    const th=this.el("button","btn o sm");const paint=()=>th.textContent=document.documentElement.dataset.theme==="light"?"Dark":"Light";paint();
    th.onclick=()=>{const t=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=t;try{localStorage.setItem("hl_theme",t)}catch(e){}paint()};
    const b=this.el("a","btn sm","Back to app");b.href="../";h.append(th,b)},
  LV:x=>Math.floor(Math.sqrt(x/40))+1,LVX:l=>(l-1)*(l-1)*40,
  pad:n=>String(n).padStart(2,"0"),
  day(d){return d.getFullYear()+"-"+this.pad(d.getMonth()+1)+"-"+this.pad(d.getDate())},
  streak(p){const l=p.streakLast;return l&&(l===this.day(new Date())||l===this.day(new Date(Date.now()-864e5)))?(p.streak||0):0}
};
