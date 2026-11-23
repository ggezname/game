const catalog=[
 {name:"Sniper Survival 3D",type:"action",label:"3D SURVIVAL",symbol:"🎯",desc:"เอาตัวรอดในป่า 3D แท็กคู่แข่งให้เหลือผู้ชนะคนเดียว",game:true},
 {name:"Neon Drift",type:"arcade",label:"ARCADE",symbol:"✦",desc:"ทดสอบจังหวะและความแม่นยำในโลกนีออน"},
 {name:"Pixel Quest",type:"action",label:"ACTION",symbol:"⚔",desc:"ออกผจญภัยผ่านด่านพิกเซลสุดท้าทาย"},
 {name:"Mind Maze",type:"puzzle",label:"PUZZLE",symbol:"⬡",desc:"ไขปริศนาและค้นหาเส้นทางที่ซ่อนอยู่"},
 {name:"Orbit Runner",type:"arcade",label:"ARCADE",symbol:"◉",desc:"วิ่งฝ่าด่านและหลบสิ่งกีดขวาง"},
 {name:"Crystal Keep",type:"action",label:"ACTION",symbol:"◆",desc:"ปกป้องอาณาจักรคริสตัลของคุณ"},
 {name:"Circuit 9",type:"puzzle",label:"PUZZLE",symbol:"⌘",desc:"เชื่อมวงจรเพื่อปลดล็อกปริศนา"}
];
const games=document.querySelector("#games"),search=document.querySelector("#search"),empty=document.querySelector("#empty");
let active="all";
function render(){const term=search.value.trim().toLowerCase();const filtered=catalog.filter(g=>(active==="all"||g.type===active)&&g.name.toLowerCase().includes(term));games.innerHTML=filtered.map(g=>{const card='<article class="game-card"><div class="game-cover" aria-hidden="true">'+g.symbol+'</div><div class="game-info"><h3>'+g.name+'</h3><p>'+g.desc+'</p><div class="game-meta"><span>'+g.label+'</span><span class="'+(g.game?'play-now':'')+'">'+(g.game?'PLAY DEMO ↗':'COMING SOON')+'</span></div></div></article>';return g.game?'<a class="game-card-link" href="./sniper-survival.html">'+card+'</a>':card}).join("");empty.hidden=filtered.length!==0}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;render()}));search.addEventListener("input",render);render();
const dialog=document.querySelector("#loginDialog");document.querySelector("#loginBtn").addEventListener("click",()=>dialog.showModal());document.querySelector("#registerBtn").addEventListener("click",()=>dialog.showModal());
const displayName=document.querySelector("#displayName"),loginBtn=document.querySelector("#loginBtn");try{const saved=localStorage.getItem("gamehub-demo-name");if(saved){loginBtn.textContent="◉ "+saved;displayName.value=saved}}catch{}
document.querySelector("#saveName").addEventListener("click",e=>{e.preventDefault();const value=displayName.value.trim().slice(0,24);if(!value){displayName.focus();return}try{localStorage.setItem("gamehub-demo-name",value)}catch{}loginBtn.textContent="◉ "+value;dialog.close()});
document.querySelector("#createBtn").addEventListener("click",()=>{const field=document.querySelector("#projectName"),status=document.querySelector("#projectStatus"),name=field.value.trim();if(!name){status.textContent="กรุณาใส่ชื่อโปรเจกต์ก่อน";field.focus();return}let list=[];try{list=JSON.parse(localStorage.getItem("gamehub-demo-projects")||"[]")}catch{}list.push({name,createdAt:new Date().toISOString(),status:"draft"});try{localStorage.setItem("gamehub-demo-projects",JSON.stringify(list));status.textContent="สร้างฉบับร่าง “"+name+"” แล้ว (บันทึกในเบราว์เซอร์นี้)";field.value=""}catch{status.textContent="เบราว์เซอร์ไม่อนุญาตให้บันทึกข้อมูล"}});
