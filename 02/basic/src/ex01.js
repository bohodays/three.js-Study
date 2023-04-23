import * as THREE from "three";

// 주제 : 기본 장면

export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  // const renderer = new THREE.WebGLRenderer({canvas: canvas});
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  // Perspective Camera (원근 카메라)
  // const camera = new THREE.PerspectiveCamera(
  //   // 시야각 (field of view)
  //   75,
  //   // 종횡비 (aspect)
  //   window.innerWidth / window.innerHeight,
  //   // near
  //   0.1,
  //   // far
  //   1000
  // );

  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;

  // Orthographic Camera (직교 카메라)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right,
    1, // top
    -1, // bottom
    0.1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();
  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    // color: '#ff0000',
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, meterial);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);
}
