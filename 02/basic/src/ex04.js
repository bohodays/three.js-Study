import * as THREE from "three";

// 주제 : 기본 장면

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

  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;

  scene.add(camera);

  // DirectionalLight : 태양빛처럼 생각
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    // color: 0xff0000,
    // color: '#ff0000',
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

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
}
