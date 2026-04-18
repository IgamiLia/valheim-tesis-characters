import * as THREE from "three";
const $bkg = document.getElementById("smoke");

let w = window.innerWidth;
let h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
camera.position.z = 10;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(w, h);

renderer.setClearColor(0x000000, 0);
$bkg.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xff5100, 0.6);
light.position.set(0, -4, 3);
scene.add(light);

// const helper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(helper);

const smokeParticles = [];
const loader = new THREE.TextureLoader();
loader.crossOrigin = "";

loader.load("./Images/smoke.webp", (texture) => {
  const smokeGeometry = new THREE.PlaneGeometry(300, 300);
  const smokeMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
    opacity: 0.05,
  });
  const NUM_PARTICLES = 100;
  for (let p = 0; p < NUM_PARTICLES; p++) {
    const particle = new THREE.Mesh(smokeGeometry, smokeMaterial);
    particle.position.set(
      Math.random() * 400 - 200,
      Math.random() * 300 - 150,
      Math.random() * 200 - 100,
    );
    particle.rotation.z = Math.random() * 360;
    scene.add(particle);
    smokeParticles.push(particle);
  }
});

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  smokeParticles.forEach((p) => {
    p.rotation.z += 0.002;
  });
  renderer.render(scene, camera);
}
window.addEventListener("resize", resize);
animate();
