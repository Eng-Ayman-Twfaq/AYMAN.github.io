import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

(async () => {
try { await Promise.all([document.fonts.load('700 100px Cairo'), document.fonts.load('400 20px Cairo')]); } catch (e) {}
const q = new URLSearchParams(location.search);
const ls = (k, v) => { try { if (v !== undefined) localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } };
const THEME = q.get('theme') || ls('theme') || 'light'; const DK = THEME === 'dark';
let LANG = q.get('lang') || ls('lang') || 'ar';
document.documentElement.dataset.theme = DK ? 'dark' : 'light';
const STATIC_T = q.has('t') ? parseFloat(q.get('t')) : null;
let W = innerWidth, H = innerHeight, asp = W / H;
const r = new THREE.WebGLRenderer({ canvas: document.getElementById('gl'), antialias: true, preserveDrawingBuffer: true });
r.setSize(W, H); r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = DK ? .92 : 1.35;
const scene = new THREE.Scene(); scene.background = new THREE.Color(DK ? '#060b10' : '#f3eee6');
const cam = new THREE.OrthographicCamera(-4.6 * asp, 4.6 * asp, 4.6, -4.6, .1, 80);
cam.position.set(10, 8.4, 10);

scene.add(new THREE.HemisphereLight(DK ? '#5b7a99' : '#ffffff', DK ? '#10202b' : '#e8efee', DK ? .6 : 1.7));
const sun = new THREE.DirectionalLight(DK ? '#8fb4ff' : '#fff1dc', DK ? .45 : 1.8); sun.position.set(6, 11, 5); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 45 }); sun.shadow.bias = -.0004; scene.add(sun);
const rgbLight = new THREE.PointLight('#12c2cc', DK ? 4.5 : 2.2, 9, 1.5); rgbLight.position.set(.4, 2.6, -2.4); scene.add(rgbLight);
const rgbLight2 = new THREE.PointLight('#ff3d9a', DK ? 3 : 1.2, 7, 1.5); rgbLight2.position.set(3.4, 1.6, -2.2); scene.add(rgbLight2);

const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .7, metalness: 0, ...o });
const BM = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false, ...o });
function box(w, h, d, c, x, y, z, o = {}, parent = scene) {
  const m = new THREE.Mesh(o.round ? new RoundedBoxGeometry(w, h, d, 4, o.round) : new THREE.BoxGeometry(w, h, d), o.mat || M(c, o.m));
  m.position.set(x, y, z); m.castShadow = o.cs !== false; m.receiveShadow = true; parent.add(m); return m;
}
function cyl(rt, rb, h, c, x, y, z, o = {}, parent = scene) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || 32), o.mat || M(c, o.m)); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
}
const tex = (cv) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const mono = '"DejaVu Sans Mono", monospace';
const anim = []; const hue = (m, h, s = .9, l = .55) => m.color.setHSL(((h % 1) + 1) % 1, s, l);
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.4, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return tex(c); })();
function glowPlane(w, h, x, y, z, rot, hOff, op) {
  const m = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, toneMapped: false, blending: DK ? THREE.AdditiveBlending : THREE.NormalBlending, opacity: (DK ? .6 : .55) * op });
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.set(x, y, z); p.rotation.x = rot; scene.add(p); anim.push(t => hue(m, t * .06 + hOff)); return p;
}

/* room */
const wallC = DK ? ['#122029', '#0d1820', '#0b141b'] : ['#f7f2e9', '#ede6d9', '#efe6d8'];
box(22, 7.6, .25, wallC[0], 6.6, 3.65, -4.4, { round: .04 }); box(.25, 7.6, 18, wallC[1], -4.4, 3.65, 4.6, { round: .04 }); box(22, .3, 18, wallC[2], 6.6, -.15, 4.6, { round: .05 });
const rug = cyl(2.6, 2.6, .04, DK ? '#14262e' : '#a6dadd', .6, .03, -.4, { seg: 64 }); rug.material.roughness = 1;
glowPlane(7, 4.4, .4, .06, -2.4, -Math.PI / 2, 0, .4);
/* wall light strips */
const strips = [[12, .05, .05, 2.2, .12, -4.25, 0], [.05, 7.2, .05, -4.25, 3.6, -4.25, .3], [.05, .05, 16, -4.25, .12, 3.5, .15]];
strips.forEach(([w, h, d, x, y, z, ho]) => { const m = BM('#12c2cc'); const s = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); s.position.set(x, y, z); scene.add(s); anim.push(t => hue(m, t * .06 + ho)); });

/* desk */
const deskTop = box(5.6, .13, 2.1, DK ? '#1b2429' : '#2d363b', .4, 1.4, -3.0, { round: .03, m: { roughness: .45, metalness: .2 } });
const edge = new THREE.Mesh(new THREE.BoxGeometry(5.6, .035, .035), BM('#12c2cc')); edge.position.set(.4, 1.39, -1.945); scene.add(edge); anim.push(t => hue(edge.material, t * .06 + .1));
const edge2 = new THREE.Mesh(new THREE.BoxGeometry(.035, .035, 2.1), BM('#12c2cc')); edge2.position.set(3.2, 1.39, -3.0); scene.add(edge2); anim.push(t => hue(edge2.material, t * .06 + .1));
[-2.2, 3.0].forEach(x => { box(.12, 1.4, 1.9, '#20282d', x, .7, -3.0, { round: .02 }); box(.12, .1, 2.2, '#20282d', x, .05, -3.0); });
box(5.2, .5, .06, '#1b2328', .4, 1.12, -3.95);

/* curved monitors */
function curved(w, h, R, canvasTex, x, y, z, ry) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; scene.add(g);
  const a = w / R; canvasTex.wrapS = THREE.RepeatWrapping; canvasTex.repeat.x = -1; canvasTex.offset.x = 1;
  const scr = new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 64, 1, true, Math.PI - a / 2, a), new THREE.MeshBasicMaterial({ map: canvasTex, side: THREE.BackSide, toneMapped: false })); scr.position.z = R; g.add(scr);
  const bz = new THREE.Mesh(new THREE.CylinderGeometry(R + .06, R + .06, h + .09, 64, 1, true, Math.PI - a / 2 - .02, a + .04), new THREE.MeshStandardMaterial({ color: '#10171b', roughness: .35, metalness: .5, side: THREE.BackSide })); bz.position.z = R; bz.castShadow = true; g.add(bz);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(.16, .55, .07), M('#1b2328', { metalness: .6, roughness: .35 })); neck.position.set(0, -h / 2 - .25, -.12); neck.castShadow = true; g.add(neck);
  const base = new THREE.Mesh(new RoundedBoxGeometry(.95, .035, .5, 3, .015), M('#1b2328', { metalness: .6, roughness: .35 })); base.position.set(0, -h / 2 - .52, .05); base.castShadow = true; g.add(base);
  return g;
}
/* projects showcase */
const PJ = [
  { id: 'bayn', name: 'Bayn', col: '#12c2cc', stack: ['Laravel 11', 'Flutter', 'MySQL'] },
  { id: 'alsultan', name: 'Alsultan ERP', col: '#f5a524', stack: ['Flutter', 'Offline sync', 'Laravel'] },
  { id: 'albaladi', name: 'Albaladi', col: '#e5533d', stack: ['POS', 'Stock', 'Payroll'] },
  { id: 'wasel', name: 'Wasel', col: '#8b6cff', stack: ['Flutter', 'Delivery', 'Orders'] }
];
let projI = -1, projA = 0; const pvHooks = [];
const pjSrc = PJ.map((p, i) => {
  const c = document.createElement('canvas'); c.width = 1600; c.height = 700; const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 1600, 700); bg.addColorStop(0, '#071820'); bg.addColorStop(1, '#0c2a33'); g.fillStyle = bg; g.fillRect(0, 0, 1600, 700);
  const rg = g.createRadialGradient(1250, 150, 20, 1250, 150, 700); rg.addColorStop(0, p.col + '66'); rg.addColorStop(1, p.col + '00'); g.fillStyle = rg; g.fillRect(0, 0, 1600, 700);
  g.strokeStyle = 'rgba(255,255,255,.05)'; g.lineWidth = 1; for (let x = 0; x < 1600; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 700); g.stroke(); } for (let y = 0; y < 700; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(1600, y); g.stroke(); }
  g.fillStyle = p.col; g.fillRect(110, 200, 90, 8); g.fillStyle = '#fff'; g.font = '700 150px Cairo, sans-serif'; g.textBaseline = 'alphabetic'; g.fillText(p.name, 106, 380);
  g.font = '600 34px Cairo, sans-serif'; let x = 110; p.stack.forEach(t => { const w = g.measureText(t).width + 44; g.fillStyle = 'rgba(255,255,255,.08)'; g.strokeStyle = p.col; g.lineWidth = 2; g.beginPath(); g.roundRect(x, 440, w, 62, 31); g.fill(); g.stroke(); g.fillStyle = '#e8f6f7'; g.fillText(t, x + 22, 482); x += w + 14; });
  const o = { cv: c, img: null }; const im = new Image(); im.onload = () => { o.img = im; pvHooks.forEach(f => f()); }; im.src = `assets/projects/${p.id}.webp`; return o;
});
const pjGet = i => (pjSrc[i].img || pjSrc[i].cv);
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
const [mc, mg] = mkCanvas(1920, 672), mTex = tex(mc);
function drawMap(t) {
  mg.fillStyle = '#061219'; mg.fillRect(0, 0, 1920, 672); mg.fillStyle = '#0b2530'; mg.fillRect(0, 0, 1920, 50);
  ['#ff6b6b', '#ffd166', '#3ddc97'].forEach((c, i) => { mg.fillStyle = c; mg.beginPath(); mg.arc(30 + i * 26, 25, 8, 0, 7); mg.fill(); });
  mg.fillStyle = '#8fb3b8'; mg.font = `600 22px ${mono}`; mg.fillText('system-map · live', 120, 32);
  mg.strokeStyle = '#0f2a33'; mg.lineWidth = 1; for (let x = 0; x < 1920; x += 80) { mg.beginPath(); mg.moveTo(x, 50); mg.lineTo(x, 672); mg.stroke(); } for (let y = 50; y < 672; y += 80) { mg.beginPath(); mg.moveTo(0, y); mg.lineTo(1920, y); mg.stroke(); }
  const N = { app: [240, 220, 'Flutter App'], api: [640, 160, 'Laravel API'], sync: [640, 450, 'SyncOrchestrator'], q: [1060, 130, 'Queue'], wa: [1400, 220, 'WhatsApp'], db: [1060, 400, 'MySQL'], r2: [1500, 520, 'Cloud storage'], loc: [240, 520, 'Local DB'], ck: [1700, 330, 'Cloudflare'] };
  const E = [['app', 'api'], ['api', 'q'], ['q', 'wa'], ['api', 'db'], ['sync', 'db'], ['loc', 'sync'], ['app', 'loc'], ['db', 'r2'], ['api', 'sync'], ['wa', 'ck']];
  E.forEach(([a, b], i) => { const [ax, ay] = N[a], [bx, by] = N[b]; mg.strokeStyle = '#1b6b75'; mg.lineWidth = 3; mg.beginPath(); mg.moveTo(ax, ay); mg.lineTo(bx, by); mg.stroke();
    for (let k = 0; k < 2; k++) { const u = ((t * .35 + i * .17 + k * .5) % 1); const px = ax + (bx - ax) * u, py = ay + (by - ay) * u; mg.fillStyle = 'rgba(18,194,204,.28)'; mg.beginPath(); mg.arc(px, py, 20, 0, 7); mg.fill(); mg.fillStyle = '#9ffcff'; mg.beginPath(); mg.arc(px, py, 8, 0, 7); mg.fill(); } });
  Object.values(N).forEach(([x, y, tx]) => { mg.font = `600 25px ${mono}`; const tw = mg.measureText(tx).width + 46; mg.fillStyle = '#0f3b44'; mg.strokeStyle = '#12c2cc'; mg.lineWidth = 3; mg.beginPath(); mg.roundRect(x - tw / 2, y - 31, tw, 62, 15); mg.fill(); mg.stroke(); mg.fillStyle = '#e8f6f7'; mg.textAlign = 'center'; mg.fillText(tx, x, y + 9); mg.textAlign = 'left'; });
  if (projA > .01 && projI >= 0) drawProj();
  mTex.needsUpdate = true;
}
function drawProj() {
  const p = PJ[projI], im = pjGet(projI), iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height; mg.save(); mg.globalAlpha = projA;
  mg.fillStyle = '#061219'; mg.fillRect(0, 0, 1920, 672); mg.fillStyle = '#0b2530'; mg.fillRect(0, 0, 1920, 50);
  ['#ff6b6b', '#ffd166', '#3ddc97'].forEach((c, i) => { mg.fillStyle = c; mg.beginPath(); mg.arc(30 + i * 26, 25, 8, 0, 7); mg.fill(); });
  mg.fillStyle = '#8fb3b8'; mg.font = `600 22px ${mono}`; mg.fillText(p.id + ' · live', 120, 32);
  const bw = 1860, bh = 592, sc = Math.min(bw / iw, bh / ih), dw = iw * sc, dh = ih * sc, dx = (1920 - dw) / 2, dy = 60 + (bh - dh) / 2;
  if (iw / ih < 1.2) { mg.globalAlpha = projA * .25; mg.drawImage(im, 0, 0, iw, ih, 0, 50, 1920, 622); mg.globalAlpha = projA; }
  mg.shadowColor = p.col; mg.shadowBlur = 40; mg.drawImage(im, dx, dy, dw, dh); mg.shadowBlur = 0; mg.strokeStyle = p.col; mg.lineWidth = 3; mg.strokeRect(dx, dy, dw, dh); mg.restore();
}
const [lc, lg] = mkCanvas(1000, 640), lTex = tex(lc);
const codeLines = [['final class ', '#c792ea', 'SyncOrchestrator', '#7ff3f8'], ['{', '#8fb3b8'], ['  public function ', '#c792ea', 'push', '#82aaff', '(Batch $b)', '#e8f6f7'], ['  {', '#8fb3b8'], ['    $this->idempotency', '#e8f6f7', '->guard', '#82aaff', '($b);', '#e8f6f7'], ['    DB::transaction(fn () =>', '#e8f6f7'], ['      $this->pipeline->run($b)', '#e8f6f7'], ['    );', '#e8f6f7'], ['    // conflict: LastWriteWins', '#5c7f86'], ['    return SyncResult::ok();', '#c3e88d'], ['  }', '#8fb3b8'], ['}', '#8fb3b8']];
function drawCode(t) {
  lg.fillStyle = '#0a1c23'; lg.fillRect(0, 0, 1000, 640); lg.fillStyle = '#0f3039'; lg.fillRect(0, 0, 1000, 48); lg.fillStyle = '#8fb3b8'; lg.font = `600 22px ${mono}`; lg.fillText('SyncOrchestrator.php', 24, 32);
  lg.font = `500 27px ${mono}`; const shown = Math.floor((t * 7) % 70) + 14; let used = 0;
  codeLines.forEach((row, i) => { let x = 70; lg.fillStyle = '#3d6169'; lg.fillText(String(i + 1), 20, 105 + i * 40); for (let k = 0; k < row.length; k += 2) { let tx = row[k]; if (used + tx.length > shown) tx = tx.slice(0, Math.max(0, shown - used)); used += row[k].length; lg.fillStyle = row[k + 1]; lg.fillText(tx, x, 105 + i * 40); x += lg.measureText(tx).width; } });
  if (Math.floor(t * 2) % 2 === 0) { lg.fillStyle = '#12c2cc'; lg.fillRect(70 + (shown % 22) * 16, 520, 14, 30); }
  lTex.needsUpdate = true;
}
const [rc, rg] = mkCanvas(1000, 640), rTex = tex(rc);
function drawTerm(t) {
  rg.fillStyle = '#07161c'; rg.fillRect(0, 0, 1000, 640); rg.fillStyle = '#0f3039'; rg.fillRect(0, 0, 1000, 48); rg.fillStyle = '#8fb3b8'; rg.font = `600 22px ${mono}`; rg.fillText('metrics · requests/s', 24, 32);
  rg.strokeStyle = '#12c2cc'; rg.lineWidth = 4; rg.beginPath(); for (let i = 0; i < 60; i++) { const x = 30 + i * 15.8, y = 190 - (Math.sin(i * .35 + t * 2) * 40 + Math.sin(i * .9 - t * 3) * 18 + 30); i ? rg.lineTo(x, y + 40) : rg.moveTo(x, y + 40); } rg.stroke();
  rg.font = `500 24px ${mono}`; const logs = ['POST /api/sync 200 38ms', 'GET /api/stores 200 21ms', 'queue:work whatsapp ok', 'POST /api/orders 201 54ms', 'sync batch #4821 merged', 'GET /api/offers 200 17ms', 'cache hit stores:list', 'POST /api/auth 200 44ms'];
  for (let i = 0; i < 9; i++) { const idx = (Math.floor(t * 1.5) + i) % logs.length; rg.fillStyle = i % 3 === 0 ? '#3ddc97' : '#8fb3b8'; rg.fillText('> ' + logs[idx], 30, 300 + i * 38); }
  rTex.needsUpdate = true;
}
drawMap(0); drawCode(0); drawTerm(0);
curved(3.3, 1.15, 3.2, mTex, .4, 2.55, -3.45, 0).userData.go = 'projects';
curved(1.6, .95, 2.0, lTex, -1.75, 2.35, -3.0, .62).userData.go = 'projects';
curved(1.6, .95, 2.0, rTex, 2.55, 2.35, -3.0, -.62).userData.go = 'projects';
anim.push(t => { if (STATIC_T !== null || Math.floor(t * 12) !== anim._f) { anim._f = Math.floor(t * 12); drawMap(t); drawCode(t); drawTerm(t); } });
const bias = glowPlane(4.4, 1.9, .4, 2.55, -4.2, 0, 0, 1); bias.rotation.set(0, 0, 0);
glowPlane(2.2, 1.4, -2.5, 2.4, -3.9, 0, .33, .7).rotation.set(0, 0, 0); glowPlane(2.2, 1.4, 3.3, 2.4, -3.9, 0, .66, .7).rotation.set(0, 0, 0);

/* keyboard */
box(1.3, .045, .46, '#11181c', .4, 1.5, -2.45, { round: .02 });
const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(.065, .025, .065), BM('#ffffff'), 14 * 5); const dmy = new THREE.Object3D();
for (let i = 0; i < 70; i++) { dmy.position.set(.4 - .56 + (i % 14) * .086, 1.532, -2.45 - .17 + Math.floor(i / 14) * .085); dmy.updateMatrix(); keys.setMatrixAt(i, dmy.matrix); keys.setColorAt(i, new THREE.Color('#fff')); } scene.add(keys);
anim.push(t => { const c = new THREE.Color(); for (let i = 0; i < 70; i++) { c.setHSL(((i % 14) * .05 + Math.floor(i / 14) * .03 - t * .25) % 1 + 1, .9, DK ? .55 : .5); keys.setColorAt(i, c); } keys.instanceColor.needsUpdate = true; });
box(2.4, .012, .95, '#0e2a32', .4, 1.472, -2.55, { cs: false }); const pe = new THREE.Mesh(new THREE.BoxGeometry(2.4, .016, .02), BM('#12c2cc')); pe.position.set(.4, 1.476, -2.075); scene.add(pe); anim.push(t => hue(pe.material, t * .06 + .2));
box(.13, .05, .22, '#11181c', 1.3, 1.51, -2.4, { round: .03 }); const ms = new THREE.Mesh(new THREE.BoxGeometry(.03, .01, .16), BM('#12c2cc')); ms.position.set(1.3, 1.54, -2.4); scene.add(ms); anim.push(t => hue(ms.material, t * .06 + .4));
/* mic arm, speakers, can, controller, duck, headphones, phone, plant */
cyl(.025, .025, .9, '#11181c', -2.0, 1.95, -3.4); const arm = box(.9, .03, .03, '#11181c', -1.55, 2.4, -3.4); const mic = new THREE.Mesh(new THREE.CapsuleGeometry(.05, .16, 6, 12), M('#222b30', { metalness: .6, roughness: .3 })); mic.position.set(-1.1, 2.3, -3.3); mic.rotation.z = Math.PI / 2 + .3; scene.add(mic);
const pop = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .01, 32), new THREE.MeshBasicMaterial({ color: '#1a2226', transparent: true, opacity: .75 })); pop.position.set(-1.1, 2.3, -3.1); pop.rotation.x = Math.PI / 2; scene.add(pop);
[-1.4, 2.25].forEach((x, i) => { box(.42, .7, .4, '#161d21', x, 1.85, -3.55, { round: .04 }, scene); const wf = new THREE.Mesh(new THREE.TorusGeometry(.13, .02, 8, 32), BM('#12c2cc')); wf.position.set(x, 1.7, -3.34); scene.add(wf); anim.push(t => hue(wf.material, t * .06 + i * .5)); cyl(.1, .1, .03, '#0b1013', x, 1.7, -3.34).rotation.x = Math.PI / 2; });
cyl(.07, .07, .22, '#12c2cc', 1.85, 1.62, -2.3, { m: { metalness: .7, roughness: .3 } }); cyl(.14, .12, .24, '#f7f7f4', -.9, 1.6, -2.3); cyl(.115, .115, .02, '#5b3a22', -.9, 1.71, -2.3);
box(.32, .06, .2, '#202a30', 1.6, 1.52, -2.2, { round: .05 }); [-1, 1].forEach(s => cyl(.035, .035, .02, '#0b1013', 1.6 + s * .08, 1.565, -2.2));
const dm = M('#ffd23f'); const dk = new THREE.Mesh(new THREE.SphereGeometry(.15, 24, 18), dm); dk.scale.set(1.15, .9, 1); dk.position.set(-.45, 1.62, -2.35); dk.castShadow = true; scene.add(dk);
const dh = new THREE.Mesh(new THREE.SphereGeometry(.1, 24, 18), dm); dh.position.set(-.45, 1.8, -2.3); scene.add(dh); const bk = new THREE.Mesh(new THREE.BoxGeometry(.09, .03, .07), M('#ff8a3d')); bk.position.set(-.45, 1.78, -2.2); scene.add(bk);
anim.push(t => { dk.position.y = 1.62 + Math.abs(Math.sin(t * 2)) * .03; dh.position.y = 1.8 + Math.abs(Math.sin(t * 2)) * .03; bk.position.y = 1.78 + Math.abs(Math.sin(t * 2)) * .03; });
cyl(.12, .14, .04, '#20282d', 2.55, 1.49, -2.35); cyl(.03, .03, .38, '#20282d', 2.55, 1.7, -2.35);
const hb = new THREE.Mesh(new THREE.TorusGeometry(.2, .035, 12, 32, Math.PI), M('#12171a')); hb.position.set(2.55, 1.78, -2.35); scene.add(hb); [-.2, .2].forEach(dx => { cyl(.09, .09, .08, '#12c2cc', 2.55 + dx, 1.76, -2.35).rotation.z = Math.PI / 2; });
const ph = box(.4, .8, .05, '#1c2a30', -1.45, 1.9, -2.5, { round: .05 }); ph.rotation.x = -.22; ph.userData.go = 'bayn';
const [pc, pg] = mkCanvas(300, 600); pg.fillStyle = '#06141a'; pg.fillRect(0, 0, 300, 600); pg.fillStyle = '#12c2cc'; pg.beginPath(); pg.roundRect(18, 30, 264, 70, 16); pg.fill();
for (let i = 0; i < 4; i++) { pg.fillStyle = '#0f3039'; pg.beginPath(); pg.roundRect(18, 125 + i * 112, 264, 98, 16); pg.fill(); pg.fillStyle = '#12c2cc'; pg.beginPath(); pg.roundRect(34, 141 + i * 112, 66, 66, 14); pg.fill(); pg.fillStyle = '#2f6d76'; pg.fillRect(116, 150 + i * 112, 130, 14); pg.fillRect(116, 178 + i * 112, 90, 12); }
const ps = new THREE.Mesh(new THREE.PlaneGeometry(.35, .74), BM('#fff', { map: tex(pc) })); ps.position.z = .03; ph.add(ps);
cyl(.2, .16, .3, '#e08e5b', 3.0, 1.63, -3.5); const lm = new THREE.MeshStandardMaterial({ color: '#4fa36f', roughness: .8, flatShading: true });
[[0, .55, 0, .34], [.18, .38, .1, .24], [-.18, .4, -.05, .22]].forEach(([x, y, z, s]) => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), lm); m.position.set(3.0 + x, 1.78 + y, -3.5 + z); m.castShadow = true; scene.add(m); });
const steam = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: .3 }); const sts = [0, 1, 2].map(i => { const s = new THREE.Mesh(new THREE.SphereGeometry(.05 + i * .015, 12, 12), steam); scene.add(s); return s; });
anim.push(t => sts.forEach((s, i) => { const u = (t * .3 + i / 3) % 1; s.position.set(-.9 + Math.sin(u * 6 + i) * .04, 1.82 + u * .45, -2.3); s.material.opacity = .3 * (1 - u); }));

/* PC tower with glass + RGB fans */
const tw = new THREE.Group(); tw.position.set(3.8, 0, -2.6); scene.add(tw);
box(.62, 1.3, 1.0, '#141b1f', 0, .65, 0, { round: .04, m: { roughness: .4, metalness: .4 } }, tw);
const glass = new THREE.Mesh(new THREE.PlaneGeometry(.92, 1.1), new THREE.MeshBasicMaterial({ color: '#04090c', transparent: true, opacity: .92, toneMapped: false })); glass.position.set(.315, .65, 0); glass.rotation.y = Math.PI / 2; tw.add(glass);
const fans = []; [.25, .65, 1.05].forEach((y, i) => { const f = new THREE.Group(); f.position.set(.32, y, -.28); tw.add(f); const ring = new THREE.Mesh(new THREE.TorusGeometry(.17, .016, 8, 40), BM('#12c2cc')); ring.rotation.y = Math.PI / 2; f.add(ring); const bl = new THREE.Group(); f.add(bl); for (let k = 0; k < 7; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(.012, .14, .05), BM('#12c2cc', { opacity: .8, transparent: true })); b.position.set(0, .08, 0); const p = new THREE.Group(); p.rotation.x = k * Math.PI * 2 / 7; p.add(b); bl.add(p); } fans.push([ring, bl, i]); });
anim.push(t => fans.forEach(([ring, bl, i]) => { hue(ring.material, t * .08 + i * .15); bl.rotation.x = t * 5; bl.children.forEach(p => hue(p.children[0].material, t * .08 + i * .15 + .1)); }));
const gpu = box(.12, .1, .75, '#1c262b', .26, .55, .12, {}, tw); const gp = new THREE.Mesh(new THREE.BoxGeometry(.02, .02, .7), BM('#12c2cc')); gp.position.set(.33, .5, .12); tw.add(gp); anim.push(t => hue(gp.material, t * .08 + .5));

/* gaming chair */
const chair = new THREE.Group(); chair.position.set(.4, 0, -1.1); scene.add(chair);
const CB = DK ? '#1c262c' : '#34454d', CA = '#12c2cc', accent = BM(CA);
const cm = (c = CB) => M(c, { roughness: .6 });
cyl(.06, .06, .55, '#222b30', 0, .5, 0, {}, chair); cyl(.09, .09, .12, '#222b30', 0, .82, 0, {}, chair);
for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; const arm = box(.62, .06, .1, '#222b30', Math.cos(a) * .31, .2, Math.sin(a) * .31, {}, chair); arm.rotation.y = -a; const w = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 12), M('#0c1013')); w.position.set(Math.cos(a) * .62, .08, Math.sin(a) * .62); chair.add(w); }
box(1.05, .17, 1.05, CB, 0, .98, 0, { round: .07, mat: cm() }, chair); [-1, 1].forEach(s => { box(.16, .13, .95, CB, s * .5, 1.07, 0, { round: .05, mat: cm() }, chair); box(.02, .025, .9, CA, s * .5, 1.14, 0, { mat: accent, cs: false }, chair); });
box(.1, .02, .9, CA, 0, 1.075, 0, { mat: accent, cs: false }, chair);
const back = new THREE.Group(); back.position.set(0, 1.1, .45); back.rotation.x = .14; chair.add(back);
box(1.0, 1.55, .2, CB, 0, .8, 0, { round: .08, mat: cm() }, back); [-1, 1].forEach(s => { box(.16, 1.25, .34, CB, s * .52, .75, -.1, { round: .06, mat: cm() }, back); box(.02, 1.1, .02, CA, s * .52, .8, -.28, { mat: accent, cs: false }, back); });
box(.13, 1.35, .02, CA, 0, .78, -.11, { mat: accent, cs: false }, back); box(.5, .32, .15, CB, 0, 1.78, -.03, { round: .06, mat: cm() }, back); box(.38, .025, .02, CA, 0, 1.78, -.115, { mat: accent, cs: false }, back); box(.58, .26, .13, CB, 0, .45, -.14, { round: .06, mat: cm() }, back);
const arms = [-1, 1].map(s => { box(.07, .42, .07, '#222b30', s * .6, 1.22, -.05, {}, chair); return box(.13, .06, .42, CB, s * .6, 1.45, -.1, { round: .025, mat: cm() }, chair); });
chair.rotation.y = .5; anim.push(t => { chair.rotation.y = .5 + Math.sin(t * .5) * .22; });

/* hex panels on back wall (animated) */
const hexes = []; const HP = [[0, 0], [1, 0], [-1, 0], [0, 1], [-1, 1], [0, -1], [1, -1], [2, -1], [1, 1], [-2, 1], [2, 0]];
HP.forEach(([qq, rr]) => { const d = .72; const m = BM('#12c2cc'); const h6 = new THREE.Mesh(new THREE.CylinderGeometry(d / 1.8, d / 1.8, .04, 6), m); h6.rotation.x = Math.PI / 2; h6.position.set(5.0 + d * (qq + rr / 2), 4.15 + d * .866 * rr, -4.2); scene.add(h6); h6.userData.go = 'contact'; hexes.push([m, qq, rr]); });
anim.push(t => hexes.forEach(([m, qq, rr], i) => hue(m, t * .07 + qq * .07 + rr * .11, .85, DK ? .5 : .55)));

/* sign */
const [sc, sg] = mkCanvas(1600, 520); sg.font = `700 290px Cairo, "DejaVu Sans", sans-serif`; sg.textAlign = 'center'; sg.textBaseline = 'middle'; if (sg.letterSpacing !== undefined) sg.letterSpacing = '26px';
[[70, '#12c2cc'], [42, '#12c2cc'], [22, '#5ee6ee']].forEach(([b, c]) => { sg.shadowColor = c; sg.shadowBlur = b; sg.fillStyle = c; sg.fillText('AYMAN', 800, 220); });
sg.shadowBlur = 8; sg.shadowColor = '#7ff3f8'; sg.fillStyle = '#f2ffff'; sg.fillText('AYMAN', 800, 220); sg.shadowColor = '#12c2cc'; sg.shadowBlur = 30; sg.fillStyle = '#12c2cc'; sg.fillRect(260, 410, 1080, 12); sg.shadowBlur = 0; sg.fillStyle = '#f2ffff'; sg.fillRect(262, 413, 1076, 5);
const sp = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.365), new THREE.MeshBasicMaterial({ map: tex(sc), toneMapped: false, transparent: true })); sp.position.set(1.4, 4.75, -4.26); scene.add(sp);

/* neon tech signs (wordmarks + original emblems) */
function neonSign(word, col, emblem, wd, ht, pos, rotY, hOff) {
  const [c, g] = mkCanvas(1300, 420); g.textBaseline = 'middle'; g.lineCap = 'round'; g.lineJoin = 'round';
  const draw = (blur, lw, fill) => { g.shadowColor = col; g.shadowBlur = blur; g.strokeStyle = fill; g.fillStyle = fill; g.lineWidth = lw; emblem(g); g.font = `700 190px Cairo, "DejaVu Sans", sans-serif`; g.textAlign = 'left'; if (g.letterSpacing !== undefined) g.letterSpacing = '8px'; g.fillText(word, 410, 215); };
  draw(60, 16, col); draw(34, 14, col); draw(16, 12, col); g.shadowBlur = 6; g.shadowColor = '#ffffff'; draw(6, 8, '#ffffff'); 
  const m = new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, toneMapped: false }); const p = new THREE.Mesh(new THREE.PlaneGeometry(wd, ht), m); p.position.set(...pos); p.rotation.y = rotY; scene.add(p);
  const gl = glowPlane(wd * 1.1, ht * 1.6, pos[0], pos[1], pos[2], 0, hOff, .5); gl.rotation.set(0, rotY, 0); gl.material.color.set(col); anim.push(() => gl.material.color.set(col)); return p; }
const flutterEmblem = g => { [[210, 210, 0], [210, 190, 1], [210, 170, 2]].forEach(([x, y, i]) => { g.save(); g.translate(x, y + 20 + i * 10); g.rotate(Math.PI / 4); g.strokeRect(-70 + i * 10, -70 + i * 10, 140 - i * 20, 140 - i * 20); g.restore(); }); };
const laravelEmblem = g => { const cx = 210, cy = 215, r = 105; g.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; i ? g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : g.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(cx - 40, cy - 28); g.lineTo(cx, cy); g.lineTo(cx - 40, cy + 28); g.moveTo(cx + 6, cy + 32); g.lineTo(cx + 50, cy + 32); g.stroke(); };
neonSign('Flutter', '#2ec8ff', flutterEmblem, 3.0, .97, [-2.0, 4.1, -4.26], 0, .55);
neonSign('Laravel', '#ff5547', laravelEmblem, 3.0, .97, [-4.25, 3.4, 2.7], Math.PI / 2, .0);

const bc = ['#12c2cc', '#e08e5b', '#334e68', '#f2c14e', '#7a5c99', '#4fa36f', '#c44d58', '#12808a'];
[2.6, 3.55].forEach((y, si) => { box(.5, .08, 3.2, '#2d363b', -4.1, y, -.4, { round: .02 }); const ls = new THREE.Mesh(new THREE.BoxGeometry(.03, .03, 3.2), BM('#12c2cc')); ls.position.set(-3.88, y - .06, -.4); scene.add(ls); anim.push(t => hue(ls.material, t * .06 + si * .3));
  let z = -1.85; for (let i = 0; i < 12; i++) { const h = .5 + ((i * 37 + si * 11) % 5) * .06, w = .11 + (i % 3) * .035; z += w / 2; box(.38, h, w, bc[(i + si * 3) % 8], -4.1, y + .04 + h / 2, z).userData.go = 'skills'; z += w / 2 + .02; if (z > 1.2) break; } });

/* dust particles */
const pg2 = new THREE.BufferGeometry(); const pp = new Float32Array(150 * 3); for (let i = 0; i < 150; i++) { pp[i * 3] = Math.random() * 9 - 3.5; pp[i * 3 + 1] = Math.random() * 5; pp[i * 3 + 2] = Math.random() * 8 - 4; } pg2.setAttribute('position', new THREE.BufferAttribute(pp, 3));
const dust = new THREE.Points(pg2, new THREE.PointsMaterial({ color: DK ? '#9ffcff' : '#ffffff', size: .045, transparent: true, opacity: DK ? .6 : .5, depthWrite: false })); scene.add(dust);
anim.push(t => { const a = dust.geometry.attributes.position; for (let i = 0; i < 150; i++) { a.array[i * 3 + 1] = (pp[i * 3 + 1] + t * .12 * (1 + (i % 3) * .3)) % 5; } a.needsUpdate = true; });

/* camera stages + scroll */
const ST = [{ L: [.3, 2.5, -2.2], S: 4.3 }, { L: [.4, 2.45, -3.4], S: 2.8 }, { L: [-3.6, 3.0, -.6], S: 3.2 }, { L: [-1.45, 1.9, -2.5], S: 2.2 }, { L: [.2, 2.4, -2.2], S: 5.2 }];
const IDS = ['hero', 'projects', 'skills', 'bayn', 'contact'];
const DBG = q.has('p') ? parseFloat(q.get('p')) : null;
let pmx = 0, pmy = 0, tmx = 0, tmy = 0;
addEventListener('pointermove', e => { tmx = e.clientX / innerWidth * 2 - 1; tmy = e.clientY / innerHeight * 2 - 1; });
function applyCam(p) {
  const mobile = innerWidth < 820, rtl = document.documentElement.dir === 'rtl';
  const i = Math.min(3, Math.floor(p)), f = p - i, e = f * f * (3 - 2 * f), A = ST[i], B = ST[i + 1], lp = (x, y) => x + (y - x) * e;
  const L = A.L.map((v, k) => lp(v, B.L[k])); let S = lp(A.S, B.S); if (mobile) S *= 1.9;
  cam.left = -S * asp; cam.right = S * asp; cam.top = S; cam.bottom = -S; cam.position.set(10 + L[0] - .2, 8.4 + L[1] - 1.9, 10 + L[2] + 2.2); cam.lookAt(L[0], L[1], L[2]);
  if (mobile) cam.setViewOffset(W, H, 0, H * .2, W, H); else cam.setViewOffset(W, H, (rtl ? 1 : -1) * W * .24 + pmx * W * .012, pmy * H * .012, W, H);
  cam.updateProjectionMatrix();
}
let curP = DBG !== null ? DBG : 0, tgtP = curP;
const mainEl = document.getElementById('main');
function readScroll() { return Math.min(4, Math.max(0, scrollY / innerHeight)); }
if (DBG !== null) { mainEl.style.position = 'fixed'; mainEl.style.inset = '0'; mainEl.style.transform = `translateY(${-DBG * innerHeight}px)`; document.body.style.height = '500vh'; }
/* i18n */
const SITE = window.SITE || {};
const T = {
  ar: { n1: 'الرئيسية', n2: 'المشاريع', n3: 'المهارات', n4: 'باين', n5: 'تواصل', n6: 'من أنا', badge: 'متاح لمشاريع جديدة',
    h1: 'أبني <em>أنظمة كاملة</em> من الفكرة إلى الإطلاق', sub: 'مطوّر <bdi>Laravel</bdi> و <bdi>Flutter</bdi> من اليمن. أصمّم وأبني تطبيقات الجوال والواجهات الخلفية ولوحات الإدارة بمفردي.',
    b1: 'شاهد المشاريع', b2: 'حمّل السيرة الذاتية', s1: 'سطر PHP', s2: 'سطر Dart', s3: 'أنظمة منشورة',
    e2: '02 · المشاريع', h2: 'أعمال حقيقية <em>تعمل الآن</em>', live: 'منشور', p1: 'سوق ودليل الأعمال اليمنية، منشور على Google Play.', p2: 'نظام ERP يعمل بدون إنترنت ويتزامن مع السيرفر بسياسات حل التعارض.', p3: 'نظام مطاعم متعدد الفروع: كاشير ومخزون ورواتب.', p4: 'منصة طلبات وتوصيل بتطبيق Flutter من 55 ألف سطر.',
    e3: '03 · المهارات', h3: 'ما <em>أتقنه</em> وأبني به', k1: 'الواجهة الخلفية', k2: 'تطبيقات الجوال', k3: 'البنية والنشر',
    e4: '04 · مشروع مميّز', h4: 'باين، <em>على Google Play</em>', bp: 'تطبيق واحد للعملاء والتجار: أكثر من 119 كنترولر و87 خدمة في Laravel، وواجهة Flutter بأكثر من 100 ألف سطر، وقاعدة MySQL بـ127 ملف هجرة.', b3: 'حمّل التطبيق',
    e5: '05 · تواصل', h5: 'لديك فكرة؟ <em>لنبنِها معًا</em>', cp: 'من التصميم إلى الإطلاق، أبني النظام كاملًا بنفسي.', b4: 'تواصل عبر واتساب',
    hint: 'انقر على الشاشة أو الرف أو الهاتف لاستكشاف الموقع', lang: 'EN' },
  en: { n1: 'Home', n2: 'Projects', n3: 'Skills', n4: 'Bayn', n5: 'Contact', n6: 'About', badge: 'Available for new projects',
    h1: 'I build <em>complete systems</em> from idea to launch', sub: 'Laravel and Flutter developer from Yemen. I design and ship mobile apps, backends and admin dashboards on my own.',
    b1: 'View projects', b2: 'Download CV', s1: 'PHP lines', s2: 'Dart lines', s3: 'live systems',
    e2: '02 · PROJECTS', h2: 'Real work, <em>running today</em>', live: 'Live', p1: 'Yemeni business directory and marketplace, live on Google Play.', p2: 'An ERP that works offline and syncs with conflict-resolution policies.', p3: 'Multi-branch restaurant system: POS, stock and payroll.', p4: 'Orders and delivery platform with a 55K-line Flutter app.',
    e3: '03 · SKILLS', h3: 'What I <em>master</em> and build with', k1: 'Backend', k2: 'Mobile', k3: 'Infrastructure',
    e4: '04 · FEATURED', h4: 'Bayn, <em>on Google Play</em>', bp: 'One app for customers and vendors: 119+ controllers and 87 services in Laravel, a 100K+ line Flutter app and a MySQL schema with 127 migrations.', b3: 'Get the app',
    e5: '05 · CONTACT', h5: 'Got an idea? <em>Let’s build it</em>', cp: 'From design to launch, I build the whole system myself.', b4: 'Chat on WhatsApp',
    hint: 'Click the screen, shelf or phone to explore', lang: 'ع' }
};
function applyLang(l) {
  LANG = l; ls('lang', l); const d = document.documentElement; d.lang = l; d.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i]').forEach(e => { e.innerHTML = T[l][e.dataset.i]; });
  document.getElementById('hint').textContent = T[l].hint; document.getElementById('langBtn').textContent = T[l].lang;
  const cv = l === 'ar' ? 'assets/Ayman_Tawfaq_CV_ar.pdf' : 'assets/Ayman_Tawfaq_CV_en.pdf'; ['cvBtn', 'cvBtn2'].forEach(id => document.getElementById(id).setAttribute('href', cv));
  document.title = l === 'ar' ? 'أيمن توفيق | مطوّر Laravel وFlutter' : 'Ayman Tawfaq | Laravel & Flutter Developer';
  if (typeof selPj === 'function' && projI >= 0) selPj(projI);
  applyCam(curP);
}
const setLink = (id, url) => { const a = document.getElementById(id); if (url) a.href = url; else a.style.display = 'none'; };
setLink('waBtn', SITE.whatsapp ? 'https://wa.me/' + SITE.whatsapp.replace(/\D/g, '') : ''); setLink('playBtn', SITE.playstore);
document.getElementById('themeBtn').onclick = () => { ls('theme', DK ? 'light' : 'dark'); location.reload(); };
document.getElementById('langBtn').onclick = () => applyLang(LANG === 'ar' ? 'en' : 'ar');
const goTo = id => { const k = IDS.indexOf(id); if (k >= 0) scrollTo({ top: k * innerHeight, behavior: 'smooth' }); };
document.querySelectorAll('[data-go]').forEach(e => e.addEventListener('click', ev => { ev.preventDefault(); goTo(e.dataset.go); }));
applyLang(LANG);
/* project showcase UI */
const pvc = document.getElementById('pvc'), pvg = pvc.getContext('2d'), pvName = document.getElementById('pvname'), pvDesc = document.getElementById('pvdesc'), pvChips = document.getElementById('pvchips'), pvBtns = [...document.querySelectorAll('[data-pj]')];
let lastUser = -1e9;
function drawPv() { if (projI < 0) return; const im = pjGet(projI), iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, sc = Math.max(1600 / iw, 700 / ih); pvg.fillStyle = '#061219'; pvg.fillRect(0, 0, 1600, 700); pvg.drawImage(im, (1600 - iw * sc) / 2, 0, iw * sc, ih * sc); }
pvHooks.push(drawPv);
function selPj(i, user) { if (user) lastUser = performance.now(); projI = i; const p = PJ[i]; pvBtns.forEach((b, k) => b.classList.toggle('on', k === i)); pvName.textContent = p.id + '.app'; pvDesc.innerHTML = T[LANG]['p' + (i + 1)]; pvChips.innerHTML = p.stack.map(t => '<s>' + t + '</s>').join(''); document.getElementById('pv').style.setProperty('--pc', p.col); drawPv(); }
pvBtns.forEach((b, k) => { b.addEventListener('click', () => selPj(k, true)); b.addEventListener('mouseenter', () => selPj(k, true)); });
if (STATIC_T === null) setInterval(() => { if (curP > .6 && curP < 1.5 && performance.now() - lastUser > 7000) selPj((projI + 1) % PJ.length); }, 4500);
const PQ = q.get('proj'); selPj(PQ !== null ? +PQ : 0);
/* picking */
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
function pick(ev) { ptr.set(ev.clientX / innerWidth * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ptr, cam); const hit = ray.intersectObjects(scene.children, true).find(h => { let o = h.object; while (o) { if (o.userData && o.userData.go) return true; o = o.parent; } return false; }); if (!hit) return null; let o = hit.object; while (o && !(o.userData && o.userData.go)) o = o.parent; return o.userData.go; }
const glEl = document.getElementById('gl'); let pk = 0;
addEventListener('click', ev => { if (ev.target.closest('.card,header,.dots')) return; const g = pick(ev); if (g) goTo(g); });
addEventListener('pointermove', ev => { if (ev.target.closest('.card,header') || performance.now() - pk < 80) return; pk = performance.now(); glEl.style.cursor = pick(ev) ? 'pointer' : ''; });
/* loop */
let comp = null; function buildComp() { if (!DK) return; comp = new EffectComposer(r); comp.setSize(W, H); comp.addPass(new RenderPass(scene, cam)); comp.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), .2, .4, .8)); comp.addPass(new OutputPass()); } buildComp();
addEventListener('resize', () => { W = innerWidth; H = innerHeight; asp = W / H; r.setSize(W, H); if (comp) comp.setSize(W, H); applyCam(curP); });
const dotsEl = [...document.querySelectorAll('.dots i')], navEl = [...document.querySelectorAll('nav a')];
function frame(t) {
  const tg = (curP > .45 && curP < 1.55) ? 1 : 0; projA = STATIC_T !== null ? tg : projA + (tg - projA) * .1; pmx += (tmx - pmx) * .05; pmy += (tmy - pmy) * .05; anim.forEach(f => f(t)); rgbLight.color.setHSL((t * .06) % 1, .9, .55); rgbLight2.color.setHSL((t * .06 + .5) % 1, .9, .55); comp ? comp.render() : r.render(scene, cam); }
if (STATIC_T !== null) { const go = () => { applyCam(curP); frame(STATIC_T); }; go(); let n = 0; const again = () => { go(); if (++n < 20) requestAnimationFrame(again); else window.__ready = true; }; requestAnimationFrame(again); }
else { const t0 = performance.now(); const loop = () => { if (DBG === null) tgtP = readScroll(); curP += (tgtP - curP) * .09; applyCam(curP); const near = Math.round(curP); dotsEl.forEach((d, k) => d.classList.toggle('on', k === near)); navEl.forEach((a, k) => a.classList.toggle('on', k === near)); frame((performance.now() - t0) / 1000); requestAnimationFrame(loop); }; loop(); }

})();
