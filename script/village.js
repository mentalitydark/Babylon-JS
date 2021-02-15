
const canvas = document.querySelector(".container");

const engine = new BABYLON.Engine(canvas, true);

console.log("Engine Criada");

const createScene = () => {

    const cena = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, new BABYLON.Vector3(0, 6, -10), cena);
    camera.attachControl(canvas, true)

    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);

    const sound = new BABYLON.Sound("Medieval_City", "../sound/medieval.mp3", cena, null, {lopp: true, autoplay: true, volume: 0.1});
    console.log(sound)
    sound._volume = 0.1
    const caixa = BABYLON.MeshBuilder.CreateBox("caixa", {size: 1, height: 1, width: 1}, cena);

    const terreno = BABYLON.MeshBuilder.CreateGround("terreno", {width: 10, height: 10}, cena);

    caixa.position.y = 0.5;
    caixa.scaling = new BABYLON.Vector3(2, 2.5, 4);
    

    return cena
}

const cena = createScene();

engine.runRenderLoop(() => {
    cena.render();
})