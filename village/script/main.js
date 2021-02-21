const canvas = document.querySelector(".container");
const engine = new BABYLON.Engine(canvas, true);
const createScene = () => {
    // Inicia a Cena
    const cena = new BABYLON.Scene(engine);
    // Crie a camera
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 4, Math.PI / 2.5, 5, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    // Crie a luz
    const light = new BABYLON.HemisphericLight("luz", new BABYLON.Vector3(0, 10, 0), cena);
    // Crie o som
    const sound = new BABYLON.Sound("Medieval_City", "../sound/medieval.mp3", cena, null, {loop: true, autoplay: true, volume: 0.02});
    /* -------------- */
    CreateVillage();
    /* -------------- */
    return cena
}

/* Construções */
const CreateVillage = () => {
    // Terreno
    const terreno = TerrenoBuild(16, 16);
    // Casa Simples
    const casa_simples = CasaBuild(1);
    casa_simples.rotation.y = -Math.PI / 16;
    casa_simples.position.x = -6.8;
    casa_simples.position.z = 2.5
    // Casa Dupla
    const casa_dupla = CasaBuild(2);
    casa_dupla.rotation.y = -Math.PI / 16;
    casa_dupla.position.x = -4.5;
    casa_dupla.position.z = 3;
    /* -------------- */
    const lugares = []; //each entry is an array [house type, rotation, x, z]
          lugares.push([1, -Math.PI / 16, -6.8, 2.5 ]);
          lugares.push([2, -Math.PI / 16, -4.5, 3 ]);
          lugares.push([2, -Math.PI / 16, -1.5, 4 ]);
          lugares.push([2, -Math.PI / 3, 1.5, 6 ]);
          lugares.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
          lugares.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
          lugares.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
          lugares.push([1, 5 * Math.PI / 4, 0, -1 ]);
          lugares.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
          lugares.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
          lugares.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
          lugares.push([2, Math.PI / 1.9, 4.75, -1 ]);
          lugares.push([1, Math.PI / 1.95, 4.5, -3 ]);
          lugares.push([2, Math.PI / 1.9, 4.75, -5 ]);
          lugares.push([1, Math.PI / 1.9, 4.75, -7 ]);
          lugares.push([2, -Math.PI / 3, 5.25, 2 ]);
          lugares.push([1, -Math.PI / 3, 6, 4 ]);
    const casas = [];
    for(let i = 0; i < lugares.length; i++) {
        if (lugares[i][0] === 1) {
            casas[i] = casa_simples.createInstance(`Casa${i}`);
        } else {
            casas[i] = casa_dupla.createInstance(`Casa${i}`)
        }
        casas[i].rotation.y = lugares[i][1];
        casas[i].position.x = lugares[i][2];
        casas[i].position.z = lugares[i][3];
    }
    const carro = CarroBuild(BaseCarroBuild(), RodaBuild());
    carro.position.y = 0.5;
}
const TerrenoBuild = (height, width) => {
    // construção
    const terreno = new BABYLON.MeshBuilder.CreateGround("terreno", {width: width, height: height});
    //textura
    const terrenoTextura = new BABYLON.StandardMaterial("telhadoTextura");
    terrenoTextura.diffuseTexture = new BABYLON.Texture("../texture/ground_texture.jpg");
    terreno.material = terrenoTextura;  
    return terreno;
}
const CaixaBuild = (width) => {
    // textura
    const caixaTextura = new BABYLON.StandardMaterial("caixaTextura");
    const faceUV = [];
    // textura options
    if (width === 2) {
        caixaTextura.diffuseTexture = new BABYLON.Texture("../texture/casa_dupla.png");
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); // atrás
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); // frente
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); // lado direito
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); // lado esquerdo
    } else {
        caixaTextura.diffuseTexture = new BABYLON.Texture("../texture/casa_simples.png");
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); // atrás
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); // frente
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); // lado direito
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); // lado esquerdo
    }
    // 4 em cima | 5 embaixo  
    // construção
    const caixa = BABYLON.MeshBuilder.CreateBox("caixa", {width: width, faceUV: faceUV, wrap: true});
    caixa.material = caixaTextura;
    // posição
    caixa.position.y = 0.5;
    return caixa;
}
const TelhadoBuild = (width) => {
    // construção
    const telhado = BABYLON.MeshBuilder.CreateCylinder("telhado", {diameter: 1.3, height: 1.2, tessellation: 3});
    // textura
    const telhadoTextura = new BABYLON.StandardMaterial("telhadoTextura");
    telhadoTextura.diffuseTexture = new BABYLON.Texture("../texture/roof.jpg");
    telhado.material = telhadoTextura;
    // posição
    telhado.scaling.x = 0.75;
    telhado.scaling.y = width;
    telhado.rotation.z = Math.PI / 2;
    telhado.position.y = 1.22;
    return telhado;
}
const CasaBuild = (width) => {
    const caixa = CaixaBuild(width);
    const telhado = TelhadoBuild(width);
    return BABYLON.Mesh.MergeMeshes([caixa, telhado], true, false, null, false, true);
}
const BaseCarroBuild = () => {
    // base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1)
    ];
    // frente curvada
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2*Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }
    // em cima
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));
    // Textura
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
    const CarroTextura = new BABYLON.StandardMaterial("CarroTextura");
    CarroTextura.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");

    // Base do Carro
    const baseCarro = BABYLON.MeshBuilder.ExtrudePolygon("Carro", {shape: outline, depth: 0.2, faceUV: faceUV});
    baseCarro.material = CarroTextura;

    return baseCarro;
}
const RodaBuild = (carro) => {
    const roda = BABYLON.MeshBuilder.CreateCylinder("RodaRB", {diameter: 0.125, height: 0.05});
    return roda
}
const CarroBuild = (Base, Roda) => {
    // Direita Fundo
    Roda.parent = Base;
    Roda.position.z = -0.1;
    Roda.position.x = -0.2;
    Roda.position.y = 0.035;
    // Direita Frente
    const rodaRF = Roda.clone("RodaRF");
    rodaRF.position.x = 0.1;
    // Esquerda Fundo
    const rodaLB = Roda.clone("RodaLB");
    rodaLB.position.y = -0.2 -0.035;
    // Esquerda Frente
    const rodaLF = rodaRF.clone("RodaLR");
    rodaLF.position.y = -0.2 -0.035;

    return Base;
}
const cena = createScene();
engine.runRenderLoop(() => {
    cena.render();
})