import * as THREE from "three";

// 주제 : Fog (안개)

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  // const renderer = new THREE.WebGLRenderer({canvas: canvas});
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // threeJS에서 고해상도를 표현하기 위해 사용
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("blue", 1, 7);

  // Camera
  // Perspective Camera (원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    // 시야각 (field of view)
    75,
    // 종횡비 (aspect)
    window.innerWidth / window.innerHeight,
    // near
    0.1,
    // far
    1000
  );

  camera.position.y = 1;
  camera.position.z = 5;

  scene.add(camera);

  // DirectionalLight : 태양빛처럼 생각
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    // color: 0xff0000,
    // color: '#ff0000',
    color: "red",
  });

  const meshes = [];
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  let oldTime = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    // 둘다 같은 기능이므로 아무거나 사용하면 됨
    // 만약 AR이나 VR을 사용한다면 setAnimationLoop를 사용해야 한다.
    // requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우에 실행해야 함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
