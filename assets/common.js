/* Shared by account, leaderboard and help pages. Sits at /assets/common.js; pages are one folder deep, so they load it as ../assets/common.js */
(function(){try{document.documentElement.dataset.theme=localStorage.getItem("hl_theme")||"dark";if(localStorage.getItem("hl_rm")==="1")document.documentElement.dataset.motion="reduce"}catch(e){}})();
window.HL={
  DOMAIN:"users.headline.app",
  cfg:{apiKey:"AIzaSyCSbP_YLj96o8paciuqwH7dVthvyZXGmq8",authDomain:"news-af425.firebaseapp.com",projectId:"news-af425",appId:"1:28387227118:web:2db21ce8f8745a3c22caff"},
  el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e},
  init(){firebase.initializeApp(this.cfg);return{auth:firebase.auth(),db:firebase.firestore()}},
  toast(m){let t=document.getElementById("toast");if(!t){t=this.el("div","toast");t.id="toast";document.body.append(t)}t.textContent=m;t.classList.remove("hidden");clearTimeout(this.tt);this.tt=setTimeout(()=>t.classList.add("hidden"),2600)},
  header(active){
    const links=[["account","Account"],["achievements","Achievements"],["report","Report card"],["leaderboard","Leaderboard"],["help","Help"]];
    const h=document.getElementById("hdr");h.className="top";h.innerHTML='<a class="logo" href="../">head<i>line</i></a>';
    const n=this.el("nav");links.forEach(([k,t])=>{const a=this.el("a",k===active?"on":"",t);a.href="../"+k+"/";n.append(a)});h.append(n);
    const TH=["dark","light","contrast"],th=this.el("button","btn o sm"),nx=()=>TH[(TH.indexOf(document.documentElement.dataset.theme)+1)%3];
    const paint=()=>th.textContent={dark:"Dark",light:"Light",contrast:"Contrast"}[nx()];paint();
    th.onclick=()=>{const t=nx();document.documentElement.dataset.theme=t;try{localStorage.setItem("hl_theme",t)}catch(e){}paint()};
    const b=this.el("a","btn sm","Back to app");b.href="../";h.append(th,b)},
  LV:x=>Math.floor(Math.sqrt(x/40))+1,LVX:l=>(l-1)*(l-1)*40,
  pad:n=>String(n).padStart(2,"0"),
  ACH:[
    {id:"first",name:"First briefing",desc:"Read your first briefing",max:1,cur:p=>p.briefings||0},
    {id:"perfect",name:"Perfect score",desc:"Score 3/3 on a quiz",max:1,cur:p=>p.perfects||0},
    {id:"p3",name:"Triple perfect",desc:"Score 3/3 on three quizzes",max:3,cur:p=>p.perfects||0},
    {id:"s3",name:"3-day streak",desc:"Reach your daily goal 3 days running",max:3,cur:p=>Math.max(p.bestStreak||0,p.streak||0)},
    {id:"s7",name:"7-day streak",desc:"Reach your daily goal 7 days running",max:7,cur:p=>Math.max(p.bestStreak||0,p.streak||0)},
    {id:"s30",name:"30-day streak",desc:"Reach your daily goal 30 days running",max:30,cur:p=>Math.max(p.bestStreak||0,p.streak||0)},
    {id:"poly",name:"Polyglot",desc:"Read in English, Malayalam and Hindi",max:3,cur:p=>(p.langs||[]).length},
    {id:"l5",name:"Level 5",desc:"Reach level 5",max:5,cur:p=>Math.floor(Math.sqrt((p.xp||0)/40))+1},
    {id:"fact",name:"Fact-checker",desc:"Report an error in a briefing",max:1,cur:p=>p.reports||0},
    {id:"focus",name:"Focused reader",desc:"Read for 60 minutes in total",max:3600,cur:p=>p.activeSec||0,unit:"sec"},
    {id:"days5",name:"Weekly regular",desc:"Reach your daily goal on 5 different days",max:5,cur:p=>p.daysRead||0},
    {id:"chal",name:"Challenger",desc:"Send a quiz challenge to a friend",max:1,cur:p=>p.challenges||0}],
  day(d){return d.getFullYear()+"-"+this.pad(d.getMonth()+1)+"-"+this.pad(d.getDate())},
  streak(p){const l=p.streakLast;return l&&(l===this.day(new Date())||l===this.day(new Date(Date.now()-864e5)))?(p.streak||0):0}
};
