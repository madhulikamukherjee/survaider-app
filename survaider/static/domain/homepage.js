(function() {
  var AMOUNTX, AMOUNTY, SEPARATION, animate, camera, init, mouseX, mouseY, onDocumentMouseMove, onWindowResize, render, renderer, scene, windowHalfX, windowHalfY;

  mouseX = 0;

  mouseY = 0;

  windowHalfX = window.innerWidth / 2;

  windowHalfY = window.innerHeight / 2;

  SEPARATION = 200;

  AMOUNTX = 10;

  AMOUNTY = 10;

  camera = void 0;

  scene = void 0;

  renderer = void 0;

  init = function() {
    var PI2, amountX, amountY, container, geometry, i, line, material, particle, particles, separation;
    container = void 0;
    separation = 100;
    amountX = 50;
    amountY = 50;
    particles = void 0;
    particle = void 0;
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    scene = new THREE.Scene;
    renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('bg').appendChild(renderer.domElement);
    PI2 = Math.PI * 2;
    geometry = new THREE.Geometry;
    i = 0;
    while (i < 100) {
      material = new THREE.SpriteMaterial({
        color: (function() {
          var a;
          a = Math.ceil(Math.random() * 10);
          switch (a) {
            case 0:
              return 0x99b433;
            case 1:
              return 0x00a300;
            case 2:
              return 0x1e7145;
            case 3:
              return 0x9f00a7;
            case 4:
              return 0x7e3878;
            case 5:
              return 0x603cba;
            case 6:
              return 0x00aba9;
            case 7:
              return 0xeff4ff;
            case 8:
              return 0xb91d47;
            case 9:
              return 0xe3a21a;
            default:
              return 0x00aba9;
          }
        })(),
        opacity: 0.8,
        program: function(context) {
          context.beginPath();
          context.arc(0, 0, 0.5, 0, PI2, true);
          context.fill();
        }
      });
      particle = new THREE.Sprite(material);
      particle.position.x = Math.random() * 2 - 1;
      particle.position.y = Math.random() * 2 - 1;
      particle.position.z = Math.random() * 2 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar(Math.random() * 10 + 800);
      particle.scale.x = particle.scale.y = 10;
      scene.add(particle);
      console.log(i);
      geometry.vertices.push(particle.position);
      i++;
    }
    line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: 0x444444,
      opacity: 0.4
    }));
    scene.add(line);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
  };

  onWindowResize = function() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onDocumentMouseMove = function(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  };

  animate = function() {
    requestAnimationFrame(animate);
    render();
  };

  render = function() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY + 200 - camera.position.y) * .05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  init();

  animate();

}).call(this);
