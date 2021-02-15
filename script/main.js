
const canvas = document.querySelector(".container");

// dá inicio a engine
const engine = new BABYLON.Engine(canvas, true);

// Criando a cena
const createScene = () => {

    const cena = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, new BABYLON.Vector3(0, 6, -10), cena);
    camera.attachControl(canvas, true)

    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);

    const caixa = BABYLON.MeshBuilder.CreateBox("caixa", {size: 1, height: 1, width: 1}, cena)

    const terreno = BABYLON.MeshBuilder.CreateGround("terreno", {width: 10, height: 10}, cena);

    caixa.position.y = 0.5;

    return cena
}

const cena = createScene();

engine.runRenderLoop(() => {
    cena.render();
})

// pra sempre que der resize no navegador, tbm dar resize na cena
window.addEventListener('resize', function(){
    engine.resize();
});
