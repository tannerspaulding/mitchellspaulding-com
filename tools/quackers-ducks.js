/* Builds quackers/ducks.js (every duck and its art) from the Quackers game code.
   Run from this repo: node tools/quackers-ducks.js ../quackersgame/src quackers/ducks.js
   It only reads the game's art and duck lists; no game code is copied into this site. */
const fs=require("fs"),vm=require("vm"),p=require("path");
const b=process.argv[2];
const R=f=>fs.readFileSync(p.join(b,f),"utf8");
/* Read the world files and art files in the same order as the game's own build.py, so new worlds show up by themselves. */
const bp=R("build.py");
const files=line=>[...((bp.split("\n").find(l=>l.startsWith(line+"="))||"").matchAll(/b\/"([\w-]+\.js)"/g))].map(m=>m[1]);
const worldFiles=files("worlds"); if(!worldFiles.length) throw new Error("no world files found in build.py");
const artFiles=files("js").filter(f=>!/^(name-check|quackers-stats)\.js$/.test(f));
const worlds=worldFiles.map(x=>R(x).trimEnd().replace(/,$/,"")).join(",\n");
const soon=R("soon.js").trimEnd().replace(/,$/,"");
let game=R("game.js").replace("/*WORLDS*/",worlds).replace("/*SOON*/",soon);
game=game.slice(0,game.indexOf("/* ---------- UI helpers"));
let mini="const \$=id=>document.getElementById(id);\n"+R("mini.js");
const code=artFiles.map(R).join("\n")+"\n"+game+"\n"+mini+
 "\n;globalThis.__OUT={WORLDS,SOON,HOL,SHOP,MINI,GR,toyDuck,COLORS,YEL,buddyArt:(typeof errorDuck===\"function\"?errorDuck:null)};";
const el=()=>({innerHTML:"",style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},appendChild(){},querySelector(){return el()},querySelectorAll(){return []},setAttribute(){}});
const ctx={console,location:{search:""},localStorage:{getItem(){return null},setItem(){}},
 document:{getElementById:()=>el(),createElement:()=>el(),querySelector:()=>el(),querySelectorAll:()=>[],addEventListener(){},body:el()},
 matchMedia:()=>({matches:false}),setTimeout,clearTimeout,addEventListener(){},navigator:{},URLSearchParams,performance:{now:()=>0},requestAnimationFrame(){}};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(code,ctx,{filename:"q.js"});
const O=ctx.__OUT;
const out={worlds:[],holiday:[],shop:[],stars:[]};
const art=d=>d.art?d.art():O.toyDuck(d.c,d.acc);
for(const w of O.WORLDS){ out.worlds.push({id:w.id,name:w.name,n:w.n,ducks:(w.ducks||[]).map(d=>({id:d.id,name:d.name,tier:d.tier,hint:d.hint,helper:!!d.helper,op:d.opacity||1,svg:art(d)}))}); }
for(const h of O.HOL) out.holiday.push({id:h.id,name:h.name,tier:h.tier,holiday:h.holiday,month:h.month,hint:h.hint,svg:art(h)});
for(const s of O.SHOP.filter(i=>i.kind==="duck")) out.shop.push({id:s.id,name:s.name,tier:s.tier,cost:s.cost,svg:art(s)});
for(const m of O.MINI) out.stars.push({id:m.id,game:m.n,name:m.star,svg:m.a?m.a():""});
out.friend=O.buddyArt?{id:"friend",name:"Error Code Duck",svg:O.buddyArt()}:null;
out.soon=O.SOON.map(w=>({id:w.id,name:w.name}));
out.defs=[...O.GR.values()].join("");
fs.writeFileSync(process.argv[3],"/* Made by tools/quackers-ducks.js from the Quackers game. Do not edit by hand. */\nwindow.QUACKERS_DUCKS="+JSON.stringify(out)+";\n");
console.log(out.worlds.map(w=>w.name+": "+w.ducks.length).join("\n"),"\nholiday",out.holiday.length,"shop",out.shop.length,"stars",out.stars.map(s=>s.game+"/"+s.name),"soon",JSON.stringify(out.soon),"defs",out.defs.length);
