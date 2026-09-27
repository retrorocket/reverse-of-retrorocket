(function(root){
 'use strict';
 const standard={great:50,just:300,big:1000,noBad:20,indicator:20,chain:2,sa:40};
 const characters={
  CART:{...standard,chain:1.5,sa:50},KNITTY:{...standard},RAIN:{...standard},SWAN:{...standard},BULL:{...standard},
  HASSY:{great:10,just:10,big:1500,noBad:30,indicator:25,chain:4,sa:35},
  WILLIE:{great:70,just:350,big:1200,noBad:30,indicator:30,chain:3,sa:45},
  BOT:{great:80,just:350,big:1200,noBad:30,indicator:20,chain:5,sa:45}
 };
 const basePoints=[0,50,100,170,260,370,460,570,710];
 function calculate({character,level,chain,judge=240,grade='big',indicator=true,sa=0}){
  const c=characters[character];
  if(!c||!Number.isInteger(level)||level<0||level>8||!Number.isInteger(chain)||chain<0||chain>32767||!Number.isFinite(judge)||!Number.isInteger(sa)||sa< -124||sa>131||!['big','just','great','noBad','bad'].includes(grade))throw new Error('Invalid input');
  let result=grade==='bad'?0:c.noBad;
  if(['big','just','great'].includes(grade))result+=c.great;
  if(['big','just'].includes(grade))result+=c.just;
  if(grade==='big')result+=c.big;
  const r={judge:Math.trunc(judge),base:basePoints[level]/(indicator?1:2),result,indicator:indicator?c.indicator:0,chain:chain*c.chain,chainCoefficient:c.chain,sa:-sa*c.sa};
  // Approximation: truncate after each addition, in the game's component order.
  const p=Math.trunc(r.judge+r.base);
  r.score=Math.trunc(p+r.result+r.indicator+r.chain+r.sa);
  return r;
 }
 const api={characters,basePoints,calculate};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 root.DanCalculator=api;
})(globalThis);
