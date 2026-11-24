/* Quackers brand art. Shared by the brand guide and the game.
   mascot(opts) -> SVG markup for viewBox "0 0 120 100" (the explorer duck, outlined).
   logo(opts)   -> full <svg> for the Quackers wordmark (viewBox 0 0 640 210).
   Colours come from BRAND so the guide, game and SVG files always match. */
var BRAND = {
  ink:"#173A5E", duck:"#FFCB2F", duckDeep:"#F0A500", beak:"#FF8A3D", pond:"#2387D9",
  puddle:"#8FD0FF", lily:"#3FB86A", bubble:"#FF6FA6", sky:"#EAF6FF", cloud:"#FFFFFF", cheek:"#FF8FB1"
};

function mascot(o){
  o = o || {};
  var B = BRAND, ink = o.ink || B.ink, body = o.body || B.duck, wing = o.wing || B.duckDeep,
      beak = o.beak || B.beak, sw = o.stroke || 3, eye = o.eye || "open", hat = o.hat === undefined ? "boat" : o.hat;
  var S = 'stroke="'+ink+'" stroke-width="'+sw+'" stroke-linejoin="round" stroke-linecap="round"';
  var eyes = {
    open: '<circle cx="89" cy="34" r="4.8" fill="'+ink+'"/><circle cx="90.7" cy="32.3" r="1.7" fill="#fff"/>',
    happy:'<path d="M84.5 36 Q89 29.5 93.5 36" fill="none" '+S+'/>',
    wow:  '<circle cx="89" cy="34" r="6.4" fill="#fff" '+S+'/><circle cx="89.6" cy="34.4" r="3.6" fill="'+ink+'"/><circle cx="90.8" cy="33" r="1.2" fill="#fff"/>',
    sneaky:'<circle cx="89" cy="35" r="4.6" fill="'+ink+'"/><circle cx="90.5" cy="34.6" r="1.4" fill="#fff"/><path d="M83 34.5 Q89 26.5 95 34.5 Z" fill="'+body+'" '+S+'/>',
    sleepy:'<path d="M84.5 34 Q89 38.5 93.5 34" fill="none" '+S+'/>',
    none:''
  };
  var flat = !!o.flat;
  var hats = {
    boat:'<path d="M63 23 L81.5 2.5 L100 23 Z" fill="#fff" '+S+'/><rect x="61" y="19" width="41.5" height="7" rx="3.5" fill="'+B.pond+'" '+S+'/>',
    crown:'<path d="M68 21 L69 6 L76 13 L82 3 L88 13 L95 6 L96 21 Z" fill="#FFE070" '+S+'/><circle cx="82" cy="15" r="2.4" fill="'+B.bubble+'"/>',
    mask:'',
    none:''
  };
  var extra = "";
  if(o.mask) extra += '<path d="M66 33 Q85 25 103 31 L103.5 40 Q85 35 64 42 Z" fill="'+ink+'"/>';
  var spots = o.spots ? '<g fill="'+o.spots+'"><circle cx="40" cy="70" r="5"/><circle cx="58" cy="78" r="4"/><circle cx="70" cy="56" r="3.5"/><circle cx="76" cy="44" r="3.2"/><circle cx="30" cy="58" r="3"/></g>' : "";
  return ''+
    '<path d="M27 58 Q10 52 7 34 Q21 39 34 46 Z" fill="'+body+'" '+S+'/>'+
    '<ellipse cx="55" cy="64" rx="37" ry="25" fill="'+body+'" '+S+'/>'+
    spots+
    '<path d="M36 63 Q51 47 70 60 Q60 77 40 71 Z" fill="'+wing+'" '+S+'/>'+
    '<circle cx="82" cy="39" r="21" fill="'+body+'" '+S+'/>'+
    (flat ? '' : '<ellipse cx="73" cy="28" rx="5.5" ry="2.6" fill="#fff" opacity=".6" transform="rotate(-28 73 28)"/>'+
    '<ellipse cx="33" cy="54" rx="9" ry="3" fill="#fff" opacity=".45" transform="rotate(-18 33 54)"/>')+
    '<path d="M100 40 Q115 37 117 44 Q111 52 100 50 Z" fill="'+beak+'" '+S+'/>'+
    '<path d="M102 45.6 L113.5 45" fill="none" stroke="'+ink+'" stroke-width="2" stroke-linecap="round"/>'+
    (o.mask ? extra : flat ? '' : '<circle cx="91" cy="47.5" r="4.5" fill="'+B.cheek+'" opacity=".7"/>')+
    (eye in eyes ? eyes[eye] : eyes.open)+
    (hats[hat] || "")+
    (eye==="sleepy" ? '<text x="104" y="22" font-family="Patrick Hand, cursive" font-size="14" fill="'+ink+'">z</text><text x="111" y="12" font-family="Patrick Hand, cursive" font-size="10" fill="'+ink+'">z</text>' : "");
}

function logo(o){
  o = o || {};
  var B = BRAND, id = o.id || "q";
  var dy = "0 -6 10 -9 10 -9 8", rot = "-6 4 -3 5 -4 3 -5";
  var t = 'x="204" y="150" dy="'+dy+'" rotate="'+rot+'" textLength="414" lengthAdjust="spacing"';
  var font = 'font-family="Grandstander, \'Baloo 2\', \'Arial Rounded MT Bold\', sans-serif" font-weight="900" font-size="112"';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 210" role="img" aria-label="Quackers"'+(o.cls?' class="'+o.cls+'"':'')+'>'+
    '<defs><linearGradient id="'+id+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE066"/><stop offset=".55" stop-color="'+B.duck+'"/><stop offset="1" stop-color="#FFA91F"/></linearGradient></defs>'+
    '<g fill="none" stroke="'+B.puddle+'" stroke-width="6" stroke-linecap="round" class="ripple">'+
      '<path d="M34 190 q16 -9 32 0 t32 0 t32 0"/><path d="M210 194 q18 -9 36 0 t36 0 t36 0 t36 0"/><path d="M470 190 q16 -9 32 0 t32 0 t32 0"/></g>'+
    '<g class="logo-duck"><g transform="translate(57.6 66) scale(.62)">'+mascot({eye:o.eye||"open"})+'</g></g>'+
    '<circle cx="96" cy="100" r="58" fill="none" stroke="'+B.ink+'" stroke-width="34"/>'+
    '<circle cx="96" cy="100" r="58" fill="none" stroke="#fff" stroke-width="26"/>'+
    '<circle cx="96" cy="100" r="58" fill="none" stroke="'+B.beak+'" stroke-width="26" stroke-dasharray="36 55.1" stroke-dashoffset="18" transform="rotate(-45 96 100)"/>'+
    '<path d="M136 140 Q152 166 190 172" fill="none" stroke="'+B.ink+'" stroke-width="24" stroke-linecap="round"/>'+
    '<path d="M136 140 Q152 166 190 172" fill="none" stroke="'+B.pond+'" stroke-width="15" stroke-linecap="round"/>'+
    '<g '+font+'>'+
      '<text '+t+' fill="'+B.ink+'" stroke="'+B.ink+'" stroke-width="24" stroke-linejoin="round">uackers</text>'+
      '<text '+t+' fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round">uackers</text>'+
      '<text '+t+' fill="url(#'+id+'g)">uackers</text>'+
    '</g></svg>';
}
if (typeof module !== "undefined") module.exports = { BRAND: BRAND, mascot: mascot, logo: logo };
