const canvas = document.querySelector(".container");

// dá inicio a engine
const engine = new BABYLON.Engine(canvas, true);

// Criando a cena
const createScene = () => {

    // cria uma cena
    const cena = new BABYLON.Scene(engine);

    // cria uma camera para tal cena
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 10, new BABYLON.Vector3(0, 6, -10), cena)

    // permite eu controlar a camera
    camera.attachControl(canvas, true);

    // cria a luz
    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);

    // cria um objeto
    const ObjectCaixaUm = BABYLON.MeshBuilder.CreateBox("Caixa1", {size: 0.2, width: 10, height: 2}, cena);
    ObjectCaixaUm.position.z = 4.9;
    ObjectCaixaUm.position.y = -1.5;

    const ObjectCaixaDois = BABYLON.MeshBuilder.CreateBox("Caixa2", {size: 0.2, width: 10, height: 2}, cena)
    ObjectCaixaDois.position.z = -4.9;
    ObjectCaixaDois.position.y = -1.5;

    const ObjectCaixaTres = BABYLON.MeshBuilder.CreateBox("Caixa3", {size: 10, width:0.2, height: 2}, cena)
    ObjectCaixaTres.position.x = 4.9;
    ObjectCaixaTres.position.y = -1.5;
    
    const ObjectCaixaQuatro = BABYLON.MeshBuilder.CreateBox("Caixa4", {size: 100, width:0.2, height: 2}, cena)
    ObjectCaixaQuatro.position.x = -4.9;
    ObjectCaixaQuatro.position.y = -1.5;

    // cria o chão e muda sua posição no Y
    const ObjectChao = BABYLON.MeshBuilder.CreateGround("terra", {width: 10, height: 10})
    ObjectChao.position.y = -2.5;

    // importar um modelo já feito
    BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "teste.babylon")

    return cena;
}

// chama a função de cena criada
const cena = createScene();

// renderiza e roda a cena
engine.runRenderLoop(() => {
    cena.render();
});

// pra sempre que der resize no navegador, tbm dar resize na cena
window.addEventListener('resize', function(){
    engine.resize();
});
