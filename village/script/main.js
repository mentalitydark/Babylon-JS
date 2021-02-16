
const canvas = document.querySelector(".container");

const engine = new BABYLON.Engine(canvas, true);

console.log("Engine Criada");

const createScene = () => {

    const cena = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, new BABYLON.Vector3(0, 6, -10), cena);
    camera.attachControl(canvas, true)

    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);

    const sound = new BABYLON.Sound("Medieval_City", "../sound/medieval.mp3", cena, null, {lopp: true, autoplay: true, volume: 0.05});
    const caixa = BABYLON.MeshBuilder.CreateBox("caixa", {size: 1, height: 1, width: 1}, cena);
    const telhado = BABYLON.MeshBuilder.CreateCylinder("telhado", {diameter: 1.3, height: 1.2, tessellation: 3});

    const terreno = BABYLON.MeshBuilder.CreateGround("terreno", {width: 10, height: 10}, cena);
    
    // textura
    const terrenoTextura = new BABYLON.StandardMaterial("terrenoTextura", cena)
    terrenoTextura.diffuseColor = new BABYLON.Color3(0,0.5,0);
    terreno.material = terrenoTextura;

    const telhadoTextura = new BABYLON.StandardMaterial("telhadoTextura");
    telhadoTextura.diffuseTexture = new BABYLON.Texture("../texture/roof.jpg", cena);
    telhado.material = telhadoTextura;

    const caixaTextura = new BABYLON.StandardMaterial("caixaTextura");
    caixaTextura.diffuseTexture = new BABYLON.Texture("../texture/floor.png", cena);
    caixa.material = caixaTextura;

    // caixa
    caixa.position.y = 0.7;
    caixa.scaling = new BABYLON.Vector3(1.5, 1.5, 3);
    caixa.rotation.y = BABYLON.Tools.ToRadians(45);

    // telhado
    telhado.position.y = caixa.scaling.y + 0.2;
    telhado.rotation.z = BABYLON.Tools.ToRadians(90);
    telhado.rotation.y = BABYLON.Tools.ToRadians(135);
    telhado.scaling = new BABYLON.Vector3(1, 2.8, 1.5);
    

    return cena
}

const cena = createScene();

engine.runRenderLoop(() => {
    cena.render();
})