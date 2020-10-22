$("#modalTable2").animatedModal({
    color: "rgba(0,0,0,0.5)",
    beforeOpen: function () {
        randomTable();
    }
});

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { sphere: [] };

init();
animate();
function randomTable() {
    for (var i = 0, l = objects.length; i < l; i++) {
        objects[i].position.x = Math.random() * 4000 - 2000;
        objects[i].position.y = Math.random() * 4000 - 2000;
        objects[i].position.z = Math.random() * 4000 - 2000;
    }
    transform(targets.sphere, 3000);
}
function init() {

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2450;

    scene = new THREE.Scene();


    //random
    let x1 = 1, y1 = 1;
    let row1 = Math.ceil(table2.length / 18);
    for (var i = 0; i < table2.length; i++) {

        var element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,100,127,' + (Math.random() * 0.5 + 0.25) + ')';

        var number = document.createElement('div');
        number.className = 'number';
        number.textContent = i + 1;
        element.appendChild(number);

        var symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = table2[i]["name"];
        element.appendChild(symbol);

        var details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = table2[i]["count"];
        element.appendChild(details);

        var object = new THREE.CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);

        objects.push(object);

        //

    }

    // sphere

    var vector = new THREE.Vector3();

    for (var i = 0, l = objects.length; i < l; i++) {

        var phi = Math.acos(-1 + (2 * i) / l);
        var theta = Math.sqrt(l * Math.PI) * phi;

        var object = new THREE.Object3D();

        object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
        object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
        object.position.z = 800 * Math.cos(phi);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);

    }

    //

    renderer = new THREE.CSS3DRenderer();
    console.log(window.innerWidth, window.innerHeight)
    renderer.setSize(window.innerWidth - 25, window.innerHeight);
    document.getElementById('container2').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 3000;
    controls.addEventListener('change', render);


    // transform(targets.sphere, 4000);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function transform(targets, duration) {

    TWEEN.removeAll();

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        var target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth - 25, window.innerHeight);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render(scene, camera);

}