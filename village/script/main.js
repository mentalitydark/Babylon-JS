const canvas = document.querySelector(".container");
const engine = new BABYLON.Engine(canvas, true);
const createScene = () => {
    // start scene
    const cena = new BABYLON.Scene(engine);
    // set camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    // set light
    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);
    // set sound
    const sound = new BABYLON.Sound("Medieval_City", "../sound/medieval.mp3", cena, null, {loop: true, autoplay: true, volume: 0.02});
    /* -------------- */
    const terreno = TerrenoBuild(cena);
    const telhado = TelhadoBuild(cena);
    const caixa = CaixaBuild(cena);
    /* -------------- */
    const house = BABYLON.Mesh.MergeMeshes([caixa, telhado], true, false, null, false, true);
    /* -------------- */
    return cena
}

/* Construções */
const TerrenoBuild = (cena) => { 
    // construção
    const terreno = new BABYLON.MeshBuilder.CreateGround("terreno", {width: 10, height: 10}, cena);
    //texture
    const terrenoTextura = new BABYLON.StandardMaterial("telhadoTextura");
    terrenoTextura.diffuseTexture = new BABYLON.Texture("../texture/ground_texture.jpg", cena);
    terreno.material = terrenoTextura;
    
    return terreno;
}
const TelhadoBuild = (cena) => {
    // construção
    const telhado = BABYLON.MeshBuilder.CreateCylinder("telhado", {diameter: 1.3, height: 1.2, tessellation: 3});
    // texture
    const telhadoTextura = new BABYLON.StandardMaterial("telhadoTextura");
    telhadoTextura.diffuseTexture = new BABYLON.Texture("../texture/roof.jpg", cena);
    telhado.material = telhadoTextura;
    // position
    telhado.position.y = 1.7;
    telhado.rotation.z = BABYLON.Tools.ToRadians(90);
    telhado.rotation.y = BABYLON.Tools.ToRadians(135);
    telhado.scaling = new BABYLON.Vector3(1, 2.8, 1.5);
    
    return telhado;
}
const CaixaBuild = (cena) => {
    // texture options
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.38, 0.0, 0.60, 1); // face de trás
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1); // face frontal
    faceUV[2] = new BABYLON.Vector4(0.61, 0, 1, 1); // face lado direito
    faceUV[3] = new BABYLON.Vector4(0.75, 0.0, 1, 1); // face lado esquerdo
    // texture
    const caixaTextura = new BABYLON.StandardMaterial("caixaTextura");
    caixaTextura.diffuseTexture = new BABYLON.Texture("../texture/house_texture.png", cena);
    // construção
    const caixa = BABYLON.MeshBuilder.CreateBox("caixa", {size: 1, height: 1, width: 1, faceUV: faceUV, wrap: true}, cena);
    caixa.material = caixaTextura;
    // position
    caixa.position.y = 0.7;
    caixa.scaling = new BABYLON.Vector3(1.5, 1.5, 3);
    caixa.rotation.y = BABYLON.Tools.ToRadians(45);

    return caixa;
}
const cena = createScene();
engine.runRenderLoop(() => {
    cena.render();
})