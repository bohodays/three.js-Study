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
  // 사용자마다 기기의 성능 차이가 존재하기 때문에 문제가 발생할 수 있다.
  // 그래서 보정을 해주어야 한다.
  const clock = new THREE.Clock();
  function draw() {
    // clock.getElapsedTime() 성능에 상관없는 절대시간
    const time = clock.getElapsedTime();

    // 각도는 Radian을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y = time;
    // mesh.position.y += 0.01;
    mesh.position.y = time;
    if (mesh.position.y > 3) {
      // position.y를 time으로 하면 0에서 멈춰버린다.
      // 그래서 ex06.js와 같이 해야한다.
      mesh.position.y = 0;
    }
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
