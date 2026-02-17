import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────
const CARDS = [
  { id:"OP01-120", name:"Shanks", set:"OP-01", rarity:"SEC", color:"Red", type:"Character", cost:9, power:10000, price:89.90, change24h:8.7, change7d:22.4, change30d:45.2, hist:[62,58,65,70,68,74,82,89.9], vol:[120,95,140,180,210,250,320,380], metaUse:0, source:"📦 Booster", listings:42, collectScore:95, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP01/OP01_120_EN.webp" },
  { id:"OP05-119", name:"Monkey D. Luffy", set:"OP-05", rarity:"SEC", color:"Red", type:"Character", cost:10, power:12000, price:125.00, change24h:14.5, change7d:18.3, change30d:38.9, hist:[90,88,95,102,98,108,118,125], vol:[200,180,220,260,300,340,400,450], metaUse:72, source:"📦 Booster", listings:28, collectScore:98, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP05/OP05_119_EN.webp" },
  { id:"OP04-112", name:"Yamato", set:"OP-04", rarity:"SEC", color:"Green", type:"Character", cost:8, power:9000, price:54.20, change24h:11.2, change7d:28.9, change30d:52.7, hist:[35,33,38,42,40,45,50,54.2], vol:[80,75,90,110,130,160,200,240], metaUse:45, source:"📦 Booster", listings:35, collectScore:90, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP04/OP04_112_EN.webp" },
  { id:"OP03-078", name:"Trafalgar Law", set:"OP-03", rarity:"SEC", color:"Blue", type:"Character", cost:8, power:9000, price:67.50, change24h:-0.4, change7d:1.2, change30d:-5.8, hist:[72,70,68,65,64,66,67,67.5], vol:[150,140,130,120,110,105,100,95], metaUse:15, source:"📦 Booster", listings:52, collectScore:85, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP03/OP03_078_EN.webp" },
  { id:"OP02-062", name:"Boa Hancock", set:"OP-02", rarity:"SR", color:"Green", type:"Character", cost:5, power:6000, price:22.40, change24h:3.1, change7d:15.6, change30d:32.1, hist:[17,16,18,19,18,20,21,22.4], vol:[60,55,70,80,90,110,130,150], metaUse:38, source:"📦 Booster", listings:68, collectScore:80, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP02/OP02_062_EN.webp" },
  { id:"OP01-001", name:"Roronoa Zoro", set:"OP-01", rarity:"SR", color:"Green", type:"Character", cost:3, power:5000, price:12.50, change24h:5.2, change7d:12.8, change30d:-3.1, hist:[13,12,11.5,11,10.5,11,11.8,12.5], vol:[90,85,80,75,70,75,80,95], metaUse:85, source:"📦 Booster", listings:120, collectScore:75, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP01/OP01_001_EN.webp" },
  { id:"P-001", name:"Roronoa Zoro", set:"PROMO", rarity:"SEC", color:"Green", type:"Character", cost:3, power:5000, price:2800.00, change24h:2.1, change7d:5.4, change30d:12.0, hist:[2500,2450,2520,2600,2580,2650,2720,2800], vol:[3,2,4,3,5,4,6,5], metaUse:0, source:"🏆 Tournament Prize", listings:3, collectScore:100, img:"" },
  { id:"OP04-044", name:"Kaido", set:"OP-04", rarity:"SR", color:"Purple", type:"Character", cost:10, power:12000, price:18.70, change24h:-6.3, change7d:-14.2, change30d:-22.8, hist:[24,23,22,21,20,19,18,18.7], vol:[40,38,35,30,28,25,22,20], metaUse:5, source:"📦 Booster", listings:95, collectScore:60, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP04/OP04_044_EN.webp" },
  { id:"OP02-013", name:"Portgas D. Ace", set:"OP-02", rarity:"SR", color:"Red", type:"Character", cost:7, power:7000, price:15.30, change24h:-2.8, change7d:-8.5, change30d:-18.3, hist:[19,18,17.5,17,16,15.5,15,15.3], vol:[70,65,60,55,50,48,45,42], metaUse:60, source:"📦 Booster", listings:85, collectScore:72, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP02/OP02_013_EN.webp" },
  { id:"OP05-074", name:"Eustass Kid", set:"OP-05", rarity:"SR", color:"Red", type:"Character", cost:8, power:8000, price:7.80, change24h:-3.9, change7d:-11.7, change30d:-28.4, hist:[11,10.5,10,9.5,9,8.5,8,7.8], vol:[30,28,25,22,20,18,15,12], metaUse:0, source:"📦 Booster", listings:150, collectScore:40, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP05/OP05_074_EN.webp" },
  { id:"OP03-064", name:"Sanji", set:"OP-03", rarity:"R", color:"Blue", type:"Character", cost:4, power:5000, price:3.10, change24h:1.7, change7d:6.3, change30d:11.2, hist:[2.8,2.7,2.8,2.9,2.85,2.95,3,3.1], vol:[45,40,42,48,50,55,58,62], metaUse:20, source:"📦 Booster", listings:200, collectScore:35, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP03/OP03_064_EN.webp" },
  { id:"OP01-016", name:"Nami", set:"OP-01", rarity:"R", color:"Blue", type:"Character", cost:1, power:2000, price:1.80, change24h:0.5, change7d:-4.2, change30d:-12.0, hist:[2.05,2,1.95,1.9,1.85,1.82,1.78,1.8], vol:[20,18,15,14,12,11,10,10], metaUse:0, source:"📦 Booster", listings:300, collectScore:25, img:"https://limitlesstcg.nyc3.digitaloceanspaces.com/one-piece/OP01/OP01_016_EN.webp" },
];

const RAR_BG = { C:"#6b7280", UC:"#3b82f6", R:"#a855f7", SR:"#f59e0b", SEC:"#ef4444", L:"#10b981" };
const COL_ACC = { Red:"#ff6b6b", Blue:"#4ecdc4", Green:"#51cf66", Purple:"#cc5de8", Black:"#868e96", Yellow:"#ffd43b" };

const MIN_PRICE_MOVERS = 5;
const MIN_COLLECT_SCORE = 40;

// ─── UTILITY COMPONENTS ──────────────────────────────────────
function Pct({ v, big, hidden }) {
  if (hidden) return <span style={{ fontSize: big?14:11, color:"#334155", fontFamily:"'JetBrains Mono',monospace", fontWeight:700 }}>•••</span>;
  const p=v>0, z=Math.abs(v)<0.05;
  return <span style={{ fontSize:big?14:11, fontWeight:700, fontFamily:"'JetBrains Mono',monospace",
    color:z?"#64748b":p?"#22c55e":"#ef4444", background:z?"rgba(100,116,139,0.1)":p?"rgba(34,197,94,0.12)":"rgba(239,68,68,0.12)",
    padding:big?"4px 10px":"2px 6px", borderRadius:6, whiteSpace:"nowrap" }}>
    {p?"▲":v<0?"▼":"–"}{Math.abs(v).toFixed(1)}%</span>;
}

function Price({ v, hidden, sz=16 }) {
  if (hidden) return <span style={{ fontSize:sz, fontWeight:800, color:"#334155", fontFamily:"'JetBrains Mono',monospace" }}>€•••</span>;
  return <span style={{ fontSize:sz, fontWeight:800, color:"#ffd700", fontFamily:"'JetBrains Mono',monospace" }}>€{v>=1000?v.toLocaleString():v<10?v.toFixed(2):v.toFixed(0)}</span>;
}

function Spark({ hist, w=80, h=36, labels=false }) {
  const mn=Math.min(...hist), mx=Math.max(...hist), rng=mx-mn||1;
  const pts=hist.map((v,i)=>[(i/(hist.length-1))*w, h-4-((v-mn)/rng)*(h-8)]);
  const up=hist[hist.length-1]>=hist[0]; const col=up?"#22c55e":"#ef4444";
  const gid="g"+Math.random().toString(36).slice(2,8);
  return <svg width={w} height={h+(labels?14:0)} style={{display:"block"}}>
    <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity="0.3"/><stop offset="100%" stopColor={col} stopOpacity="0"/></linearGradient></defs>
    <path d={`M${pts[0][0]},${h} ${pts.map(p=>`L${p[0]},${p[1]}`).join(" ")} L${pts[pts.length-1][0]},${h} Z`} fill={`url(#${gid})`}/>
    <polyline points={pts.map(p=>p.join(",")).join(" ")} fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.5" fill={col}/>
    {labels&&<><text x="0" y={h+12} fill="#475569" fontSize="7" fontFamily="'JetBrains Mono',monospace">30d</text><text x={w/2-6} y={h+12} fill="#475569" fontSize="7" fontFamily="'JetBrains Mono',monospace">7d</text><text x={w-16} y={h+12} fill="#64748b" fontSize="7" fontWeight="700" fontFamily="'JetBrains Mono',monospace">now</text></>}
  </svg>;
}

function VolBars({ vol, w=80, h=28 }) {
  const mx=Math.max(...vol);
  const lastTrend = vol[vol.length-1] > vol[vol.length-3] ? "up" : vol[vol.length-1] < vol[vol.length-3] ? "down" : "flat";
  const trendCol = lastTrend==="up"?"#22c55e":lastTrend==="down"?"#ef4444":"#64748b";
  const bw = (w/vol.length)-2;
  return <div style={{display:"flex",alignItems:"flex-end",gap:1,height:h}}>
    {vol.map((v,i)=><div key={i} style={{width:bw,height:Math.max(2,(v/mx)*h),borderRadius:2,
      background:i===vol.length-1?trendCol:`${trendCol}44`,transition:"height 0.3s"}}/>)}
  </div>;
}

function ScarcityBadge({ listings }) {
  if (!listings||listings>50) return null;
  const cfg = listings<=5?{l:"ULTRA RARE",bg:"#ef4444",pulse:true}:listings<=20?{l:"SCARCE",bg:"#f97316"}:{l:"LOW SUPPLY",bg:"#eab308"};
  return <span style={{background:cfg.bg,padding:"2px 6px",borderRadius:5,fontSize:7,fontWeight:800,color:"#fff",letterSpacing:1,
    fontFamily:"'JetBrains Mono',monospace",animation:cfg.pulse?"pulse 2s infinite":"none",whiteSpace:"nowrap"}}>{cfg.l} · {listings} listed</span>;
}

function MetaBadge({ pct }) {
  if(!pct) return null;
  const t=pct>=60?{l:"META",bg:"linear-gradient(135deg,#ef4444,#f97316)"}:pct>=30?{l:"PLAYED",bg:"linear-gradient(135deg,#f59e0b,#eab308)"}:{l:"NICHE",bg:"linear-gradient(135deg,#6366f1,#8b5cf6)"};
  return <span style={{background:t.bg,padding:"2px 7px",borderRadius:6,fontSize:8,fontWeight:800,color:"#fff",letterSpacing:1.2,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"}}>⚔ {t.l}</span>;
}

function SourceBadge({ source }) {
  const isPrize = source.includes("Prize")||source.includes("🏆");
  return <span style={{background:isPrize?"rgba(255,215,0,0.15)":"rgba(255,255,255,0.05)",padding:"2px 7px",borderRadius:6,
    fontSize:9,fontWeight:600,color:isPrize?"#ffd700":"#64748b",border:`1px solid ${isPrize?"rgba(255,215,0,0.2)":"rgba(255,255,255,0.06)"}`,whiteSpace:"nowrap"}}>{source}</span>;
}

// ─── CARD TILE ───────────────────────────────────────────────
function CardTile({ card, onClick, privacy, onQuickAdd }) {
  const [hov, setHov] = useState(false);
  const accent = COL_ACC[card.color]||"#ffd700";
  return <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{borderRadius:16,overflow:"hidden",background:hov?`linear-gradient(145deg,rgba(255,255,255,0.06),${accent}08)`:"rgba(255,255,255,0.025)",
      border:`1px solid ${hov?accent+"44":"rgba(255,255,255,0.06)"}`,transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
      transform:hov?"translateY(-6px) scale(1.02)":"none",boxShadow:hov?`0 20px 40px rgba(0,0,0,0.4),0 0 20px ${accent}12`:"0 2px 8px rgba(0,0,0,0.12)"}}>
    <div onClick={()=>onClick(card)} style={{cursor:"pointer",position:"relative",aspectRatio:"0.716",background:`linear-gradient(135deg,#0f0f18,${accent}08)`,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 0%,${accent}18,transparent 70%)`}}/>
      {card.img&&<img src={card.img} alt={card.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s",transform:hov?"scale(1.06)":"scale(1)"}} onError={e=>{e.target.style.display="none"}}/>}
      {!card.img&&<div style={{display:"flex",position:"absolute",inset:0,alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6}}>
        <span style={{fontSize:40}}>🏴‍☠️</span><span style={{color:accent,fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:700}}>{card.id}</span></div>}
      <div style={{position:"absolute",top:6,left:6,display:"flex",flexDirection:"column",gap:3}}>
        <span style={{background:RAR_BG[card.rarity],padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:800,color:"#fff",alignSelf:"flex-start",boxShadow:"0 2px 6px rgba(0,0,0,0.3)"}}>{card.rarity}</span>
        {card.metaUse>0&&<MetaBadge pct={card.metaUse}/>}
        <ScarcityBadge listings={card.listings}/>
      </div>
    </div>
    <div style={{padding:"10px 12px 12px"}}>
      <div onClick={()=>onClick(card)} style={{cursor:"pointer",fontSize:12,fontWeight:700,color:"#f1f5f9",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:"'Cinzel',serif"}}>{card.name}</div>
      <div style={{fontSize:9,color:"#475569",marginTop:2,fontFamily:"'JetBrains Mono',monospace",display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
        <span>{card.id}</span><SourceBadge source={card.source}/>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginTop:8,gap:4}}>
        <div>
          <Price v={card.price} hidden={privacy} sz={18}/>
          <div style={{marginTop:4}}><Pct v={card.change24h} hidden={privacy}/></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
          <Spark hist={card.hist} w={60} h={24} labels={true}/>
        </div>
      </div>
      <button onClick={(e)=>{e.stopPropagation();onQuickAdd(card);}} style={{marginTop:8,width:"100%",background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.15)",
        color:"#ffd700",padding:"6px",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}>
        + Add to Collection</button>
    </div>
  </div>;
}

// ─── QUICK ADD MODAL ─────────────────────────────────────────
function QuickAddModal({ card, onClose, onSave }) {
  const [qty, setQty] = useState(1);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [condition, setCondition] = useState("NM");
  const [lang, setLang] = useState("EN");

  if (!card) return null;
  const accent = COL_ACC[card.color]||"#ffd700";

  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:1100,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#14141e",borderRadius:20,border:`1px solid ${accent}22`,maxWidth:380,width:"100%",padding:24,boxShadow:`0 30px 60px rgba(0,0,0,0.6)`}}>
      <div style={{height:3,background:`linear-gradient(90deg,${accent},${accent}00)`,borderRadius:20,marginBottom:16,marginTop:-24,marginLeft:-24,marginRight:-24}}/>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{width:48,height:67,borderRadius:8,overflow:"hidden",background:`linear-gradient(135deg,#0f0f18,${accent}15)`,flexShrink:0}}>
          {card.img?<img src={card.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}><span style={{fontSize:24}}>🏴‍☠️</span></div>}
        </div>
        <div>
          <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",fontFamily:"'Cinzel',serif"}}>{card.name}</div>
          <div style={{fontSize:11,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>{card.id} · <Price v={card.price} sz={11}/></div>
        </div>
      </div>

      <div style={{marginBottom:14}}>
        <label style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Quantity</label>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>setQty(Math.max(1,qty-1))} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#e2e8f0",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
          <span style={{fontSize:20,fontWeight:800,color:"#f1f5f9",fontFamily:"'JetBrains Mono',monospace",minWidth:32,textAlign:"center"}}>{qty}</span>
          <button onClick={()=>setQty(qty+1)} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#e2e8f0",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        </div>
      </div>

      <div style={{marginBottom:14}}>
        <label style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Purchase price (optional)</label>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#ffd700",fontSize:14,fontWeight:700}}>€</span>
          <input type="number" step="0.01" placeholder={card.price.toFixed(2)} value={purchasePrice} onChange={e=>setPurchasePrice(e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#e2e8f0",
              padding:"10px 12px 10px 28px",borderRadius:10,fontSize:14,fontFamily:"'JetBrains Mono',monospace",outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <div style={{flex:1}}>
          <label style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Condition</label>
          <select value={condition} onChange={e=>setCondition(e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#cbd5e1",padding:"10px",borderRadius:10,fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif"}}>
            <option value="M">Mint</option><option value="NM">Near Mint</option><option value="LP">Lightly Played</option><option value="MP">Moderately Played</option><option value="HP">Heavily Played</option>
          </select>
        </div>
        <div style={{flex:1}}>
          <label style={{fontSize:10,color:"#64748b",fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>Language</label>
          <select value={lang} onChange={e=>setLang(e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",color:"#cbd5e1",padding:"10px",borderRadius:10,fontSize:12,outline:"none",fontFamily:"'DM Sans',sans-serif"}}>
            <option value="EN">English</option><option value="JP">Japanese</option><option value="FR">French</option>
          </select>
        </div>
      </div>

      <button onClick={()=>{onSave({cardId:card.id,qty,purchasePrice:purchasePrice||null,condition,lang});onClose();}}
        style={{width:"100%",background:"linear-gradient(135deg,#ffd700,#ff8c00)",border:"none",color:"#000",padding:"12px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 20px rgba(255,215,0,0.2)"}}>
        Add {qty}× {card.name}</button>
      <button onClick={onClose} style={{width:"100%",background:"transparent",border:"none",color:"#64748b",padding:"10px",fontSize:12,cursor:"pointer",marginTop:4}}>Cancel</button>
    </div>
  </div>;
}

// ─── VOLUME CHART ────────────────────────────────────────────
function VolumeChart({ cards }) {
  const totalVol = cards[0].vol.map((_,i) => cards.reduce((s,c)=>s+c.vol[i],0));
  const labels = ["4w","3w","2w","10d","7d","3d","1d","now"];
  const mx = Math.max(...totalVol);
  const trend = totalVol[totalVol.length-1] > totalVol[totalVol.length-3];
  const trendPct = (((totalVol[totalVol.length-1]-totalVol[totalVol.length-4])/totalVol[totalVol.length-4])*100);

  return <div style={{borderRadius:16,padding:"16px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",marginBottom:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:14}}>📊</span>
        <span style={{fontSize:11,fontWeight:700,color:"#94a3b8",fontFamily:"'Cinzel',serif",letterSpacing:1}}>MARKET VOLUME</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:13,fontWeight:800,color:"#f1f5f9",fontFamily:"'JetBrains Mono',monospace"}}>{totalVol[totalVol.length-1].toLocaleString()}</span>
        <Pct v={trendPct}/>
        <span style={{fontSize:10,color:trend?"#22c55e":"#ef4444",fontWeight:700}}>{trend?"📈 Hype rising":"📉 Cooling off"}</span>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:48}}>
      {totalVol.map((v,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
        <div style={{width:"100%",height:Math.max(3,(v/mx)*44),borderRadius:4,
          background:i===totalVol.length-1?(trend?"#22c55e":"#ef4444"):`rgba(${trend?"34,197,94":"239,68,68"},${0.15+i*0.1})`,
          transition:"height 0.3s"}}/>
        <span style={{fontSize:7,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>{labels[i]}</span>
      </div>)}
    </div>
  </div>;
}

// ─── SCANNER COMPONENT ───────────────────────────────────────
function ScannerView({ onCardDetected, onClose }) {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [detected, setDetected] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } });
      if (videoRef.current) { videoRef.current.srcObject = stream; setScanning(true); }
      setTimeout(() => {
        const mockCard = CARDS[Math.floor(Math.random()*CARDS.filter(c=>c.img).length)];
        setDetected(mockCard);
      }, 3000);
    } catch (err) {
      setError("Camera access denied or not available. Make sure you're on HTTPS and using a modern browser.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  }, []);

  useEffect(() => { return () => stopCamera(); }, [stopCamera]);

  return <div style={{position:"fixed",inset:0,zIndex:1200,background:"#000",display:"flex",flexDirection:"column"}}>
    <div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,0.8)",zIndex:1}}>
      <span style={{color:"#ffd700",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:16}}>📷 Card Scanner</span>
      <button onClick={()=>{stopCamera();onClose();}} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:36,height:36,borderRadius:10,cursor:"pointer",fontSize:18}}>×</button>
    </div>

    <div style={{flex:1,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      {!scanning && !error && <div style={{textAlign:"center",padding:20}}>
        <div style={{fontSize:64,marginBottom:16}}>📷</div>
        <p style={{color:"#94a3b8",fontSize:14,marginBottom:20}}>Point your camera at a One Piece TCG card</p>
        <button onClick={startCamera} style={{background:"linear-gradient(135deg,#ffd700,#ff8c00)",border:"none",color:"#000",padding:"14px 32px",borderRadius:14,fontSize:16,fontWeight:700,cursor:"pointer"}}>Start Camera</button>
        <p style={{color:"#475569",fontSize:11,marginTop:12}}>Works on Chrome (Android) & Safari (iOS)<br/>Requires HTTPS</p>
      </div>}
      {error && <div style={{textAlign:"center",padding:20}}>
        <div style={{fontSize:48,marginBottom:12}}>⚠️</div>
        <p style={{color:"#ef4444",fontSize:13}}>{error}</p>
        <p style={{color:"#475569",fontSize:11,marginTop:8}}>Try opening this site in your phone's browser instead.</p>
      </div>}
      <video ref={videoRef} autoPlay playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:scanning?"block":"none"}}/>
      {scanning && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
        <div style={{width:220,height:310,border:"3px solid #ffd700",borderRadius:16,boxShadow:"0 0 0 9999px rgba(0,0,0,0.5),0 0 30px rgba(255,215,0,0.2) inset"}}>
          {!detected && <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#ffd700",animation:"scanLine 2s ease-in-out infinite",borderRadius:2}}/>}
        </div>
      </div>}
    </div>

    {detected && <div style={{padding:16,background:"rgba(0,0,0,0.9)",borderTop:"1px solid rgba(255,215,0,0.2)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:62,borderRadius:8,overflow:"hidden",flexShrink:0}}>
          <img src={detected.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,color:"#22c55e",fontWeight:700,letterSpacing:1}}>✓ CARD DETECTED</div>
          <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",fontFamily:"'Cinzel',serif"}}>{detected.name}</div>
          <div style={{fontSize:11,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>{detected.id} · <Price v={detected.price} sz={11}/></div>
        </div>
        <button onClick={()=>{onCardDetected(detected);stopCamera();onClose();}}
          style={{background:"linear-gradient(135deg,#ffd700,#ff8c00)",border:"none",color:"#000",padding:"10px 20px",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>
          + Add</button>
      </div>
    </div>}

    <style>{`@keyframes scanLine{0%{transform:translateY(0)}50%{transform:translateY(300px)}100%{transform:translateY(0)}}`}</style>
  </div>;
}

// ─── MAIN APP ────────────────────────────────────────────────
function BerryFolio() {
  const [tab, setTab] = useState("market");
  const [selected, setSelected] = useState(null);
  const [privacy, setPrivacy] = useState(false);
  const [quickAdd, setQuickAdd] = useState(null);
  const [collection, setCollection] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [toast, setToast] = useState(null);

  const relevantCards = CARDS.filter(c => c.price >= MIN_PRICE_MOVERS && (c.collectScore >= MIN_COLLECT_SCORE || c.metaUse >= 30));
  const gainers = [...relevantCards].sort((a,b) => b.change7d-a.change7d).slice(0,4);
  const losers = [...relevantCards].sort((a,b) => a.change7d-b.change7d).slice(0,4);
  const topGain24h = [...relevantCards].sort((a,b) => b.change24h-a.change24h)[0];
  const portfolioVal = collection.reduce((s,item) => { const card = CARDS.find(c=>c.id===item.cardId); return s + (card ? card.price * item.qty : 0); }, 0);

  const handleSave = (item) => {
    setCollection([...collection, item]);
    setToast(`${item.qty}× added to collection!`);
    setTimeout(() => setToast(null), 2500);
  };

  const selS = {background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#cbd5e1",
    padding:"9px 28px 9px 10px",borderRadius:10,fontSize:12,fontWeight:500,outline:"none",cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif",appearance:"none",WebkitAppearance:"none",
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center"};

  const [search,setSearch]=useState(""); const [setF,setSetF]=useState("All"); const [rarF,setRarF]=useState("All"); const [sortBy,setSortBy]=useState("price_desc");
  const filtered = CARDS.filter(c=>{
    if(search&&!c.name.toLowerCase().includes(search.toLowerCase())&&!c.id.toLowerCase().includes(search.toLowerCase())) return false;
    if(setF!=="All"&&c.set!==setF) return false; if(rarF!=="All"&&c.rarity!==rarF) return false; return true;
  }).sort((a,b)=>{ switch(sortBy){ case"price_desc":return b.price-a.price; case"price_asc":return a.price-b.price; case"hot":return b.change24h-a.change24h;
    case"meta":return b.metaUse-a.metaUse; case"scarce":return a.listings-b.listings; default:return a.name.localeCompare(b.name); }});

  const tabs = [{id:"market",icon:"📊",label:"Market"},{id:"collection",icon:"🗺️",label:"Collection"},{id:"auth",icon:"🔍",label:"Real vs Fake"}];

  return <div style={{minHeight:"100vh",background:"#0a0a12",color:"#e2e8f0",fontFamily:"'DM Sans',sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:3px}
      select option{background:#1e1e2e;color:#e2e8f0}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

    <header style={{borderBottom:"1px solid rgba(255,255,255,0.06)",backdropFilter:"blur(20px)",background:"rgba(10,10,18,0.85)",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1320,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:56}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#ffd700,#ff8c00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 4px 12px rgba(255,215,0,0.2)"}}>🏴‍☠️</div>
          <span style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:18,background:"linear-gradient(135deg,#ffd700,#ffaa00)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BerryFolio</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>setShowScanner(true)} title="Scan a card" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#94a3b8",width:36,height:36,borderRadius:10,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>📷</button>
          <button onClick={()=>setPrivacy(!privacy)} title={privacy?"Show values":"Hide values"}
            style={{background:privacy?"rgba(255,215,0,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${privacy?"rgba(255,215,0,0.25)":"rgba(255,255,255,0.08)"}`,
              color:privacy?"#ffd700":"#64748b",width:36,height:36,borderRadius:10,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {privacy?"🙈":"👁️"}</button>
          <button style={{background:"linear-gradient(135deg,#ffd700,#ff8c00)",border:"none",color:"#000",padding:"8px 16px",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>Sign Up</button>
        </div>
      </div>
    </header>

    <main style={{maxWidth:1320,margin:"0 auto",padding:"16px 16px 80px"}}>

      <div style={{borderRadius:18,padding:"24px 20px",marginBottom:16,background:"linear-gradient(135deg,rgba(255,215,0,0.07),rgba(255,140,0,0.04),rgba(99,102,241,0.04))",
        border:"1px solid rgba(255,215,0,0.1)",position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",top:-30,right:-10,fontSize:100,opacity:0.03,transform:"rotate(-12deg)"}}>🏴‍☠️</div>
        <div style={{position:"relative"}}>
          <div style={{fontSize:10,color:"#64748b",fontWeight:600,textTransform:"uppercase",letterSpacing:2,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>🏴‍☠️ Treasure Tracker</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
            {privacy?<span style={{fontSize:32,fontWeight:800,color:"#334155",fontFamily:"'JetBrains Mono',monospace"}}>€ •••••</span>
              :<span style={{fontSize:32,fontWeight:800,color:"#ffd700",fontFamily:"'JetBrains Mono',monospace"}}>€{(portfolioVal||CARDS.reduce((s,c)=>s+c.price,0)).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0})}</span>}
            <Pct v={12.4} big hidden={privacy}/>
          </div>
          <div style={{fontSize:11,color:"#475569",marginTop:4}}>{collection.length>0?`${collection.length} cards in your collection`:"Total market value · "+CARDS.length+" cards tracked"}</div>

          {topGain24h && <div onClick={()=>setSelected(topGain24h)} style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:10,background:"rgba(34,197,94,0.06)",borderRadius:12,padding:"10px 16px",border:"1px solid rgba(34,197,94,0.12)",marginTop:14}}>
            <div style={{width:32,height:44,borderRadius:6,overflow:"hidden",background:`linear-gradient(135deg,#0f0f18,${COL_ACC[topGain24h.color]}15)`,flexShrink:0}}>
              {topGain24h.img&&<img src={topGain24h.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>}
            </div>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:9,color:"#22c55e",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>🔥 Top 24h</div>
              <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",fontFamily:"'Cinzel',serif"}}>{topGain24h.name}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
              <Price v={topGain24h.price} hidden={privacy} sz={13}/>
              <Pct v={topGain24h.change24h} hidden={privacy}/>
            </div>
          </div>}
        </div>
      </div>

      <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,0.02)",borderRadius:14,padding:4,border:"1px solid rgba(255,255,255,0.04)"}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)}
          style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,
            background:tab===t.id?"rgba(255,215,0,0.1)":"transparent",border:tab===t.id?"1px solid rgba(255,215,0,0.15)":"1px solid transparent",
            color:tab===t.id?"#ffd700":"#64748b",padding:"10px 10px",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
          <span style={{fontSize:14}}>{t.icon}</span><span>{t.label}</span></button>)}
      </div>

      {tab==="market"&&<div style={{animation:"fadeUp 0.3s ease"}}>
        <VolumeChart cards={CARDS}/>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:20}}>
          {[{title:"TOP GAINERS · 7D",cards:gainers,color:"#22c55e"},{title:"TOP LOSERS · 7D",cards:losers,color:"#ef4444"}].map(sec=>
            <div key={sec.title} style={{borderRadius:16,padding:"14px 16px",background:`linear-gradient(145deg,${sec.color}06,${sec.color}02)`,border:`1px solid ${sec.color}18`}}>
              <div style={{fontSize:11,fontWeight:700,color:sec.color,marginBottom:8,display:"flex",alignItems:"center",gap:6,fontFamily:"'Cinzel',serif",letterSpacing:1}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:sec.color,boxShadow:`0 0 8px ${sec.color}`}}/>{sec.title}
                <span style={{fontSize:9,color:"#475569",fontWeight:500,fontFamily:"'JetBrains Mono',monospace",marginLeft:"auto"}}>min €{MIN_PRICE_MOVERS}</span>
              </div>
              {sec.cards.map((c,i)=><div key={c.id} onClick={()=>setSelected(c)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",cursor:"pointer"}}>
                <span style={{fontSize:10,fontWeight:800,color:"#334155",width:14,fontFamily:"'JetBrains Mono',monospace"}}>{i+1}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</div>
                  <div style={{fontSize:9,color:"#475569",fontFamily:"'JetBrains Mono',monospace",display:"flex",gap:3,alignItems:"center",flexWrap:"wrap"}}>
                    {c.id} {c.metaUse>0&&<MetaBadge pct={c.metaUse}/>} <ScarcityBadge listings={c.listings}/>
                  </div>
                </div>
                <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
                  <Price v={c.price} hidden={privacy} sz={12}/><Pct v={c.change7d} hidden={privacy}/>
                </div>
              </div>)}
            </div>)}
        </div>

        <div style={{position:"relative",marginBottom:10}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#475569",fontSize:14,pointerEvents:"none"}}>🔍</span>
          <input type="text" placeholder="Search by name or card ID..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#e2e8f0",
              padding:"11px 14px 11px 38px",borderRadius:12,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box"}}/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          <select value={setF} onChange={e=>setSetF(e.target.value)} style={selS}><option value="All">All Sets</option>{[...new Set(CARDS.map(c=>c.set))].map(s=><option key={s}>{s}</option>)}</select>
          <select value={rarF} onChange={e=>setRarF(e.target.value)} style={selS}><option value="All">All Rarities</option>{["C","UC","R","SR","SEC","L"].map(r=><option key={r}>{r}</option>)}</select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{...selS,marginLeft:"auto"}}>
            <option value="price_desc">💰 Price ↓</option><option value="price_asc">💰 Price ↑</option>
            <option value="hot">🔥 Hot today</option><option value="meta">⚔ Most played</option>
            <option value="scarce">💎 Most scarce</option><option value="name">A → Z</option>
          </select>
        </div>

        <div style={{fontSize:11,color:"#475569",marginBottom:12,fontFamily:"'JetBrains Mono',monospace"}}>{filtered.length} cards</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12}}>
          {filtered.map(c=><CardTile key={c.id} card={c} onClick={setSelected} privacy={privacy} onQuickAdd={setQuickAdd}/>)}
        </div>
      </div>}

      {tab==="collection"&&<div style={{animation:"fadeUp 0.3s ease"}}>
        {collection.length===0?<div style={{textAlign:"center",padding:"50px 20px"}}>
          <div style={{fontSize:56,marginBottom:12}}>🗺️</div>
          <div style={{fontSize:18,fontWeight:800,color:"#f1f5f9",fontFamily:"'Cinzel',serif"}}>Start Your Collection</div>
          <p style={{color:"#64748b",fontSize:13,marginTop:8,maxWidth:380,margin:"8px auto 0"}}>Browse the Market tab and tap "+ Add to Collection" on any card. You can also scan cards with the camera.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:20}}>
            <button onClick={()=>setTab("market")} style={{background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.2)",color:"#ffd700",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>📊 Browse Market</button>
            <button onClick={()=>setShowScanner(true)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"#94a3b8",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>📷 Scan Card</button>
          </div>
        </div>:
        <div>
          <div style={{fontSize:14,fontWeight:700,color:"#94a3b8",marginBottom:12}}>{collection.length} card{collection.length>1?"s":""} in collection</div>
          {collection.map((item,i)=>{const card=CARDS.find(c=>c.id===item.cardId); if(!card) return null;
            const pnl=item.purchasePrice?(card.price-parseFloat(item.purchasePrice))*item.qty:null;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",marginBottom:8,background:"rgba(255,255,255,0.025)",borderRadius:12,border:"1px solid rgba(255,255,255,0.05)"}}>
              <div style={{width:36,height:50,borderRadius:6,overflow:"hidden",background:"#0f0f18",flexShrink:0}}>
                {card.img&&<img src={card.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9"}}>{item.qty}× {card.name}</div>
                <div style={{fontSize:10,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>{card.id} · {item.condition} · {item.lang}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <Price v={card.price*item.qty} hidden={privacy} sz={14}/>
                {pnl!==null&&!privacy&&<div style={{fontSize:10,fontWeight:700,color:pnl>=0?"#22c55e":"#ef4444",marginTop:2}}>
                  {pnl>=0?"+":""}€{pnl.toFixed(2)}</div>}
              </div>
            </div>;})}
        </div>}
      </div>}

      {tab==="auth"&&<div style={{animation:"fadeUp 0.3s ease",textAlign:"center",padding:"50px 20px"}}>
        <div style={{fontSize:56,marginBottom:12}}>🔍</div>
        <div style={{fontSize:18,fontWeight:800,color:"#f1f5f9",fontFamily:"'Cinzel',serif"}}>Real vs Fake</div>
        <p style={{color:"#64748b",fontSize:13,marginTop:8,maxWidth:400,margin:"8px auto 0"}}>Upload photos of your cards, vote on authenticity, and earn Berry Points 🪙 for contributing. Community-verified images help everyone spot counterfeits.</p>
        <div style={{display:"inline-flex",gap:8,marginTop:20,flexWrap:"wrap",justifyContent:"center"}}>
          <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.15)",borderRadius:10,padding:"10px 16px"}}>
            <div style={{fontSize:22}}>✅</div><div style={{fontSize:10,color:"#22c55e",fontWeight:700,marginTop:4}}>247 Verified Real</div>
          </div>
          <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:10,padding:"10px 16px"}}>
            <div style={{fontSize:22}}>❌</div><div style={{fontSize:10,color:"#ef4444",fontWeight:700,marginTop:4}}>38 Verified Fake</div>
          </div>
          <div style={{background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.15)",borderRadius:10,padding:"10px 16px"}}>
            <div style={{fontSize:22}}>🪙</div><div style={{fontSize:10,color:"#ffd700",fontWeight:700,marginTop:4}}>1,240 Berry Points earned</div>
          </div>
        </div>
        <div style={{marginTop:24,color:"#334155",fontSize:11}}>Coming soon — Sign up for early access</div>
      </div>}

      <footer style={{marginTop:48,textAlign:"center",padding:"20px 16px",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
        <p style={{fontSize:9,color:"#1e293b",lineHeight:1.5,maxWidth:460,margin:"0 auto"}}>
          Not affiliated with Bandai. Not financial advice. Card images belong to their owners. Meta data from Limitless TCG.</p>
      </footer>
    </main>

    {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#000",padding:"10px 24px",
      borderRadius:12,fontSize:13,fontWeight:700,boxShadow:"0 8px 30px rgba(34,197,94,0.3)",animation:"slideIn 0.3s ease",zIndex:1050}}>
      ✓ {toast}</div>}

    {quickAdd&&<QuickAddModal card={quickAdd} onClose={()=>setQuickAdd(null)} onSave={handleSave}/>}
    {showScanner&&<ScannerView onCardDetected={(c)=>setQuickAdd(c)} onClose={()=>setShowScanner(false)}/>}
  </div>;
}

export default BerryFolio;