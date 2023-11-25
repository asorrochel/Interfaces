class Nave {
  constructor(nombre,elementos) {
    this.nombre = nombre;
    this.elementos = elementos;
  }
}
class NaveEnemiga {
  constructor(nombre, escudo, daño, vida, imagen) {
    this.nombre = nombre;
    this.escudo = escudo;
    this.daño = daño;
    this.vida = vida;
    this.imagen = imagen;
  }

  recibirDanio(cantidad) {
    this.vida -= cantidad;
  }

  disparar() {
    if (this.vida > 0) {
      return this.daño;
    }
  }
}
class System {
  constructor(name, desc,imageUrl, info, visited = false) {
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.info = info;
    this.planets = [];
    this.dangerPercentage = this.calculateDangerPercentage();
    this.totalRewards = this.calculateTotalRewards();
    this.visited = visited;
  }

  addPlanet(planet) {
    this.planets.push(planet);
    this.updateSystemProperties();
  }

  updateSystemProperties() {
    this.dangerPercentage = this.calculateDangerPercentage();
    this.totalRewards = this.calculateTotalRewards();
  }

  calculateDangerPercentage() {
    const totalDangerPercentage = this.planets.reduce((sum, planet) => sum + planet.dangerPercentage, 0);
    return Math.min(100, totalDangerPercentage / this.planets.length);
  }

  calculateTotalRewards() {
    const totalRewards = this.planets.reduce((sum, planet) => sum + planet.materials.split(',').length, 0);
    return totalRewards;
  }
}
class Planet {
  constructor(name, distance, materials, imageUrl, accion, info,visited = false) {
    this.name = name;
    this.distance = distance;
    this.materials = materials;
    this.imageUrl = imageUrl;
    this.accion = accion;
    this.info = info;
    this.dangerPercentage = Math.floor(Math.random() * 30);
    this.visited = visited;
  }
}

const elementos = {
  survivorMeter: {
    element: document.getElementById("survivor-meter"),
    numElement: document.getElementById("survivor-meter-num"),
    defaultValue: 90,
  },
  energyMeter: {
    element: document.getElementById("energy-meter"),
    numElement: document.getElementById("energy-meter-num"),
    defaultValue: 90,
  },
  integridadCasco: {
    element: document.getElementById("integridad-casco"),
    numElement: document.getElementById("integridad-meter-num"),
    defaultValue: 90,
  },
  misiles: {
    element: document.getElementById("misiles"),
    element_meter: document.getElementById("ammunition-meter"),
    numElement: document.getElementById("num_misiles"),
    defaultValue: 10,
  },
  laser: {
    element: document.getElementById("weapon1"),
    numElement: document.getElementById("num_laser"),
    laserShots: 0,
  },
  disparar: {
    element: document.getElementById("disparar-btn"),
  },
  recargar: {
    element: document.getElementById("recargar-btn"),
  },
  refrigerar: {
    element: document.getElementById("refrigerar"),
    numElement: document.getElementById("refrigerar_num"),
    intervalo : null,
  }, 
  recalentamiento: {
    element: document.getElementById("jump-progress"),
    numElement: document.getElementById("jump-num"),
    intervalo : setInterval(actualizarRecalentamiento, 1000),
  },
  escudo: {
    element: document.getElementById("escudo"),
    numElement: document.getElementById("escudo_num"),
    intervalo : null,
  }, 
  energyMeters: {
    escudo: {
      element: document.getElementById("energy-meter-escudo"),
      numElement: document.getElementById("energy-meter-escudo-num"),
    },
    propulsor: {
      element: document.getElementById("energy-meter-propulsor"),
      numElement: document.getElementById("energy-meter-propulsor-num"),
    },
    arma: {
      element: document.getElementById("energy-meter-arma"),
      numElement: document.getElementById("energy-meter-arma-num"),
    },
    salto: {
      element: document.getElementById("energy-meter-salto"),
      numElement: document.getElementById("energy-meter-salto-num"),
    },
  },

  integridadCascoCombate: {
    element: document.getElementById("integridad-casco-combate"),
    numElement: document.getElementById("integridad-meter-combate-num"),
  },
  chatarra: {
    numElement: document.getElementById("chatarraNum"),
  },
};

class Mejora {
  constructor(nombre, imagenSrc, dano, coste) {
      this.nombre = nombre;
      this.imagenSrc = imagenSrc;
      this.dano = dano;
      this.coste = coste;
  }

  renderizarEn(contenedor) {
    const mejoraDiv = document.createElement('div');
    mejoraDiv.innerHTML = `
        <div class="bg-transparent p-6 rounded-md shadow-md text-center flex flex-col items-center" id="Mejora${this.nombre}">
            <h1 class="text-sm font-bold text-white mb-4">${this.nombre}</h1>
            <img src="${this.imagenSrc}" alt="${this.nombre}" class="mx-auto mb-4 rounded-lg w-12 h-12">
            <h2 class="text-sm text-white mb-2 ">Daño <span id="Mejora${this.nombre}" class="text-green-400">${this.dano}</span></h2>
            <div class="flex flex-row items-center justify-center">
              <h2 class="text-sm text-white mb-2">Coste <span id="costeMejora${this.nombre}" class="text-yellow-400">${this.coste}</span> basura electrónica</h2>
              <button onclick="mejorar('${this.nombre}')" class="border border-azul text-white px-2 py-1 rounded-md hover:bg-azul hover:text-gris">
                  Mejorar
              </button>
            </div>
            
        </div>
    `;
    contenedor.appendChild(mejoraDiv);
}

}

function mejorar(nombreMejora) {
      const chatarraNum = document.getElementById("chatarraNum");
      const chatarra = parseInt(getCookie("chatarra"));
      const coste = parseInt(document.getElementById(`costeMejora${nombreMejora}`).textContent);
      if(chatarra < coste) {
          return;
      } else {
          setCookie("chatarra", chatarra - coste, 365);
          elementos.chatarra.numElement.textContent = chatarra - coste;
          chatarraNum.textContent = chatarra - coste;
          const mejora = document.getElementById(`Mejora${nombreMejora}`);
          
          mejora.remove();
          if(nombreMejora === "Laser Doble") {
              dañoLaser = 2;
              const laser = document.getElementById("laserIMG");
              laser.src = "img/laserMejora.webp";
          } else if(nombreMejora === "Misil Guiado") {
              dañoMisil = 10;
              const misil = document.getElementById("misilIMG");
              misil.src = "img/misilMejora.webp";
          }
      }
  }

const nave = new Nave("StarFighter",elementos);
let navesEnemigas= [];
let dañoTotalEnemigos = 0;
let intervalDañoEnemigos = null;
let visitados = {};
let saltos = 0;

let combatesRealizados = 0;
let  contadorNavesEliminadas = 0;
let disparosLaserRealizados = 0;
let disparosMisilesRealizados = 0;

let energiaRecolectada = 0;
let supervivientesRescatados = 0;
let integridadCascoReparada = 0;
let misilesRecolectados = 0;
let chatarraRecolectada = 0;

let planetasVisitados = 0;
let sistemasVisitados = 0;

let dañoLaser = 1;
let dañoMisil = 5;

updateMeters();

const systems = [];

const mejora1 = new Mejora("Laser Doble", "img/laserMejora.webp", 2, 50);
const mejora2 = new Mejora("Misil Guiado", "img/misilMejora.webp", 10, 100);

const mejorasContainer = document.getElementById('mejorasContainer');

mejora1.renderizarEn(mejorasContainer);
mejora2.renderizarEn(mejorasContainer);

const system1 = new System("ACHAIA", "SISTEMA ACHAIA","img/bh1.webp", "infoSistema1",false);
const system2 = new System("KRADDAK", "SISTEMA KRADDAK","img/bh2.png", "infoSistema2",false);
const system3 = new System("KORRIBAN","SISTEMA KORRIBAN", "img/bh3.png", "infoSistema3",false);

system1.addPlanet(new Planet("1_1", "100,000 km", "Iron, Water", "img/planet1.png", getRandomAccion(), "infoPlaneta1_1",false));
system1.addPlanet(new Planet("1_2", "150,000 km", "Gold, Silica", "img/planet2.png", getRandomAccion(), "infoPlaneta1_2",false));
system1.addPlanet(new Planet("1_3", "200,000 km", "Copper, Oxygen", "img/planet3.png", getRandomAccion(), "infoPlaneta1_3",false));
system1.addPlanet(new Planet("1_4", "120,000 km", "Silver, Helium", "img/planet4.png", getRandomAccion(), "infoPlaneta1_4",false));

system2.addPlanet(new Planet("2_1", "100,000 km", "Iron, Water", "img/p1.png", getRandomAccion(), "infoPlaneta2_1",false));
system2.addPlanet(new Planet("2_2", "150,000 km", "Gold, Silica", "img/p2.png", getRandomAccion(), "infoPlaneta2_2",false));
system2.addPlanet(new Planet("2_3", "200,000 km", "Copper, Oxygen", "img/p3.png", getRandomAccion(), "infoPlaneta2_3",false));
system2.addPlanet(new Planet("2_4", "120,000 km", "Silver, Helium", "img/p4.png", getRandomAccion(), "infoPlaneta2_4",false));

system3.addPlanet(new Planet("3_1", "100,000 km", "Iron, Water", "img/p1.png", getRandomAccion(), "infoPlaneta3_1",false));
system3.addPlanet(new Planet("3_2", "150,000 km", "Gold, Silica", "img/p2.png", getRandomAccion(), "infoPlaneta3_2",false));
system3.addPlanet(new Planet("3_3", "200,000 km", "Copper, Oxygen", "img/p3.png", getRandomAccion(), "infoPlaneta3_3",false));
system3.addPlanet(new Planet("3_4", "120,000 km", "Silver, Helium", "img/p4.png", getRandomAccion(), "infoPlaneta3_4",false));

systems.push(system1);
systems.push(system2);
systems.push(system3);

function getRandomAccion() {
  return Math.random() < 0.8 ? "mensajePlaneta" : "mensajeCombate";
}

function showInfo(infoId) {
  let infoElement = document.getElementById(infoId);
  infoElement.style.display = 'block';
}

function hideInfo(infoId) {
  let infoElement = document.getElementById(infoId);
  infoElement.style.display = 'none';
}

const planetaContenedor = document.getElementById("planet-container");
const systemContenedor = document.getElementById("system-container");
let resourceInfo;

function renderPlanetButton(planet, container) {
  const button = document.createElement("button");
  button.className = "w-36 h-36 planet absolute z-[2] opacity-0";
  button.id = planet.name;

  const img = document.createElement("img");
  img.src = planet.imageUrl;
  img.alt = planet.name;

  button.appendChild(img);
  button.classList.add("planetEfectos");
  container.appendChild(button);

  const infoDiv = document.createElement("div");
  infoDiv.id = planet.info;
  infoDiv.className = "absolute z-30 hidden text-white rounded-md shadow-lg";
  infoDiv.style.left = "350px";
  infoDiv.style.top = "195px";
  document.body.appendChild(infoDiv);

  const nombre = document.createElement("h2");
  nombre.textContent = planet.name;
  nombre.className = "text-sm font-bold mb-2";
  const distancia = document.createElement("p");
  distancia.textContent = `Distancia: ${planet.distance}`;
  distancia.className = "text-[9px] font-bold mb-2";
  const materiales = document.createElement("p");
  materiales.textContent = `Materiales: ${planet.materials}`;
  materiales.className = "text-[9px] font-bold mb-2";
  const danger = document.createElement("p");
  danger.textContent = `Peligro: ${planet.dangerPercentage}%`;
  danger.className = "text-[9px] font-bold mb-2";

  const visitado = document.createElement("p");
  visitado.className = "text-[9px] font-bold mb-2";
  visitado.id = "visitado"+planet.name;
  visitado.textContent = `Visitado: ${planet.visited ? 'Si' : 'No'}`;

  infoDiv.appendChild(nombre);
  infoDiv.appendChild(distancia);
  infoDiv.appendChild(materiales);
  infoDiv.appendChild(visitado);
  infoDiv.appendChild(danger);
}

function renderSystemButton(system) {
  const button = document.createElement("button");
  button.className = "w-36 h-36 system absolute";
  button.id = system.name;
  const img = document.createElement("img");
  img.src = system.imageUrl;
  img.alt = system.name;

  button.appendChild(img);
  systemContenedor.appendChild(button);

  const infoDiv = document.createElement("div");
  infoDiv.id = system.info;
  infoDiv.className = "absolute z-30 hidden text-white rounded-md shadow-lg";
  infoDiv.style.left = "350px";
  infoDiv.style.top = "195px";
  document.body.appendChild(infoDiv);

  const systemTitle = document.createElement("h2");
  systemTitle.textContent ="SISTEMA " + system.name;
  systemTitle.className = "text-sm font-bold mb-2";

  const numeroPlanetas = document.createElement("p");
  numeroPlanetas.textContent = `Planetas: ${system.planets.length}`;
  numeroPlanetas.className = "text-[9px] font-bold mb-2";

  const danger = document.createElement("p");
  danger.textContent = `Peligro: ${system.dangerPercentage}%`;
  danger.className = "text-[9px] font-bold mb-2";

  const visitado = document.createElement("p");
  visitado.id = "visitado"+system.name;
  visitado.textContent = `Visitado: ${system.visited ? 'Si' : 'No'}`;
  visitado.className = "text-[9px] font-bold mb-2";

  infoDiv.appendChild(systemTitle);
  infoDiv.appendChild(numeroPlanetas);
  infoDiv.appendChild(danger);
  infoDiv.appendChild(visitado);
}

renderSystemButton(system1);
renderSystemButton(system2);
renderSystemButton(system3);

function renderPlanets(system) {
  const systemInfoDiv = document.getElementById(system.info);
  systemInfoDiv.style.display = 'none';

  planetaContenedor.innerHTML = '';
  systemContenedor.style.display = 'none';
  //systemContenedor.innerHTML = '';
  system.planets.forEach(planet => {
    movePlanetsRandomly();
    renderPlanetButton(planet, planetaContenedor);
});
}

let speed = 0;
let energy = parseFloat(getCookie("energy-meter"));
let intervalSpeed;
let intervalSpeedActive = false;

updateMeters();
nave.elementos.refrigerar.element.addEventListener("input", refrigerar);
nave.elementos.escudo.element.addEventListener("input", escudo);

//MEDIDORES
function updateMeters() {
  updateMeter(nave.elementos.survivorMeter.element,nave.elementos.survivorMeter.numElement, nave.elementos.survivorMeter.defaultValue);
  updateMeterEnergy(nave.elementos.energyMeter.element,nave.elementos.energyMeter.numElement, nave.elementos.energyMeter.defaultValue);
  updateMeter(nave.elementos.integridadCasco.element,nave.elementos.integridadCasco.numElement, nave.elementos.integridadCasco.defaultValue);
  updateMeter(nave.elementos.misiles.element,nave.elementos.misiles.numElement, nave.elementos.misiles.defaultValue);
  setCookie("chatarra", 500, 365);
  elementos.chatarra.numElement.textContent = parseInt(getCookie("chatarra")) || 0;

}

function updateMeter(element, numElement, defaultValue) {
  const cookieValue = parseInt(getCookie(element.id));
  let value = cookieValue ? cookieValue : defaultValue;
  if(value < 0) value = 0;
  if(value === 0) {
    terminarPartida();
  }
  element.value = value;
  numElement.textContent = value;

  if(element.id === "misiles") {
    nave.elementos.misiles.element_meter.value = value;
  }

  if(element.id === "integridad-casco") {
    nave.elementos.integridadCascoCombate.element.value = value;
  }

  element.classList.add(getColorMeter(value));
  
  setCookie(element.id, value, 365);
}

function updateMeterEnergy(element, numElement, defaultValue) {
  const cookieValue = parseInt(getCookie(element.id));
  let value = cookieValue || defaultValue;
  if(value < 0) value = 0;
  if(value === 0) {
    terminarPartida();
  }
  const meters = [element, nave.elementos.energyMeters.escudo.element, nave.elementos.energyMeters.arma.element, nave.elementos.energyMeters.propulsor.element, nave.elementos.energyMeters.salto.element];
  const metersNum = [numElement, nave.elementos.energyMeters.escudo.numElement, nave.elementos.energyMeters.arma.numElement, nave.elementos.energyMeters.propulsor.numElement, nave.elementos.energyMeters.salto.numElement];
  
  meters.forEach((meter, index) => {
    meter.value = value;
    metersNum[index].textContent = value;
    meter.classList.add(getColorMeter(value));
  });

  setCookie(element.id, value, 365);
}

function getColorMeter(value) {
  if (value >= 50) {
    return "mt-verde";
  } else if (value >= 25) {
    return "mt-amarillo";
  } else {
    return "mt-rojo";
  }
}

//ESCUDO
function escudo() {
  clearInterval(nave.elementos.escudo.intervalo);

  const currentEscudo = parseInt(nave.elementos.escudo.element.value);
  nave.elementos.escudo.numElement.textContent = currentEscudo;

  nave.elementos.escudo.intervalo = setInterval(() => {
    if (energy > 0) {
      const energyConsumption = currentEscudo;
      if (energy >= energyConsumption) {
        energy -= energyConsumption;
        nave.elementos.energyMeter.numElement.textContent = energy;
        setCookie("energy-meter", energy, 365);
        updateMeterEnergy(nave.elementos.energyMeter.element, parseInt(nave.elementos.energyMeter.numElement), energy);
      } else {
        clearInterval(nave.elementos.escudo.intervalo);
      }
    } else {
      clearInterval(nave.elementos.escudo.intervalo);
    }
  }, 1000);

    
}

//COMBATE
function actualizarDatosNaveEnemigaCombate(naveEnemiga, vida, escudo) {
  const combate = document.getElementById("combatePanel");
  const naveEnemigaC = document.getElementById(naveEnemiga.nombre);
  const naveEnemigaVida = document.getElementById("vida"+naveEnemiga.nombre);
  const naveEnemigaEscudo = document.getElementById("escudo"+naveEnemiga.nombre);
  const selectEnemigos = document.getElementById("enemigos-select");
  naveEnemigaVida.textContent = vida;
  naveEnemigaEscudo.textContent = escudo;
  if(vida <= 0) {
    contadorNavesEliminadas += 1;
    dañoTotalEnemigos -= naveEnemiga.daño;
    naveEnemigaC.remove();
    navesEnemigas = navesEnemigas.filter(nave => nave.nombre !== naveEnemiga.nombre);
    selectEnemigos.removeChild(selectEnemigos.querySelector(`option[value="${naveEnemiga.nombre}"]`));
  } 

  if( vida <= 0 && dañoTotalEnemigos <= 0 && navesEnemigas.length === 0) {
    clearInterval(intervalDañoEnemigos);
    combate.style.display = 'none';
    intervalDañoEnemigos = null;
    dañoTotalEnemigos = 0;
    navesEnemigas = [];
    let acceso = false;
    const selectNavesEnemigas = document.getElementById("enemigos-select");
    selectNavesEnemigas.innerHTML = "";
    const mensajeCombate = document.getElementById("mensajeCombate");
    mensajeCombate.style.display = 'none';
    const mensajeVictoria = document.getElementById("mensajeCombateVictoria");
    mensajeVictoria.style.display = 'block';
    const terminal3 = document.getElementsByClassName("root")[1];
    let newLine3 = document.createElement("p");                
    newLine3.classList.add("newLine3");
    const skipBtn3 = document.querySelector(".control span");
    terminal3.appendChild(newLine3);
    const recursosEncontrados = generarRecursosAleatorios();
    resourceInfo  = recursosEncontrados.mensaje;
    sayItSlowly('Explorador1', "PlanetaX", resourceInfo,terminal3,newLine3,skipBtn3);
    const recogerRecursos = document.getElementById("recogerRecursosCombate");
    recogerRecursos.addEventListener("click", () => {
      if(!acceso) {
        const supervivientes = parseInt(getCookie("survivor-meter")) || 0;
        const energia = parseInt(getCookie("energy-meter")) || 0;
        const integridadCasco = parseInt(getCookie("integridad-casco")) || 0;
        const misiles = parseInt(getCookie("misiles")) || 0;

        let misilesEncontrados = recursosEncontrados.misiles;
        let energiaEncontrada = recursosEncontrados.energia;
        let supervivientesEncontrados = recursosEncontrados.supervivientes;
        let integridadCascoEncontrada = recursosEncontrados.integridadCasco;

        const newSupervivientes = supervivientes + supervivientesEncontrados;
        const newEnergia = energia + energiaEncontrada;
        const newIntegridadCasco = integridadCasco + integridadCascoEncontrada;
        const newMisiles = misiles + misilesEncontrados;

        energiaRecolectada += energiaEncontrada;
        supervivientesRescatados += supervivientesEncontrados;
        integridadCascoReparada += integridadCascoEncontrada;
        misilesRecolectados += misilesEncontrados;

        setCookie("survivor-meter", newSupervivientes, 365);
        setCookie("energy-meter", newEnergia, 365);
        setCookie("integridad-casco", newIntegridadCasco, 365);
        setCookie("misiles", newMisiles, 365);

        updateMeter(nave.elementos.survivorMeter.element, nave.elementos.survivorMeter.numElement, newSupervivientes);
        updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, newEnergia);
        updateMeter(nave.elementos.integridadCasco.element, nave.elementos.integridadCasco.numElement, newIntegridadCasco);
        updateMeter(nave.elementos.misiles.element, nave.elementos.misiles.numElement, newMisiles);
        movePlanetsRandomly();
        mensajeVictoria.style.display = 'none';
        misilesEncontrados = 0;
        energiaEncontrada = 0;
        supervivientesEncontrados = 0;
        integridadCascoEncontrada = 0;
        const newLine = document.getElementsByClassName("newLine")[0];
        newLine.textContent = "";
        acceso = true;
      }
    });
  }
}

//ARMA
function disparar() {
  const misiles_num_cookie = parseInt(getCookie("misiles"));
  

  const enemigoSelect = document.getElementById("enemigos-select");

  if (nave.elementos.laser.element.checked) {
    if (energy >= 1) {
      disparosLaserRealizados += 1;
      energy -= 1;
      setCookie("energy-meter", energy, 365);
      updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, energy);
      navesEnemigas.forEach(naveEnemiga => {
        if(naveEnemiga.nombre === enemigoSelect.value) {
          naveEnemiga.recibirDanio(dañoLaser);
          actualizarDatosNaveEnemigaCombate(naveEnemiga, naveEnemiga.vida, naveEnemiga.escudo);
        }
      });
      elementos.laser.laserShots += 1;
      if (elementos.laser.laserShots >= 5) {
        deshabilitarDisparar();
      }
    }
  } else if (nave.elementos.misiles.element.checked && misiles_num_cookie > 0) {
    disparosMisilesRealizados += 1;
    elementos.misiles.numElement.textContent = misiles_num_cookie - 1;
    elementos.misiles.element_meter.value = misiles_num_cookie - 1;
    setCookie("misiles", misiles_num_cookie - 1, 365);
    navesEnemigas.forEach(naveEnemiga => {
      if(naveEnemiga.nombre === enemigoSelect.value) {
        naveEnemiga.recibirDanio(dañoMisil);
        actualizarDatosNaveEnemigaCombate(naveEnemiga, naveEnemiga.vida, naveEnemiga.escudo);
      }
    });
  }
}

function recargar() {
  nave.elementos.laser.laserShots = 0;
  habilitarDisparar();
  updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, energy);
  nave.elementos.disparar.element.style.border = "1px solid #00f0f0";
  nave.elementos.disparar.element.style.backgroundColor = "transparent";

  elementos.disparar.element.style.backgroundColor = "transparent";

  elementos.disparar.element.addEventListener("mouseenter", () => {
    elementos.disparar.element.style.backgroundColor = "#00f0f0";
    elementos.disparar.element.style.color = "white";
});

nave.elementos.disparar.element.addEventListener("mouseleave", () => {
  nave.elementos.disparar.element.style.backgroundColor = "transparent";
  nave.elementos.disparar.element.style.color = "";
});
}

function cambiarArma() {
  if (nave.elementos.laser.element.checked) {
    nave.elementos.laser.element.checked = false;
    nave.elementos.misiles.element.checked = true;
  } else {
    nave.elementos.laser.element.checked = true;
    nave.elementos.misiles.element.checked = false;
  }
}

function habilitarDisparar() {
  nave.elementos.disparar.element.disabled = false;
  nave.elementos.recargar.element.disabled = true;
}

function deshabilitarDisparar() {
  nave.elementos.recargar.element.disabled = false;
  nave.elementos.disparar.element.disabled = true;
  nave.elementos.disparar.element.style.backgroundColor = "#ff5050";
  nave.elementos.disparar.element.style.borderColor = "#ff5050";
}

//PROPULSOR
function updateSpeedAndEnergy() {
  document.getElementById("speed-value").textContent = speed + " km/h";
  document.getElementById("speed-slider").value = speed;
  updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, energy);
}

function aumentarVelocidad() {
  if (speed < 1000) {
    speed += 100;
    energy -= Math.floor(speed / 100);
    setCookie("energy-meter", energy, 365);
    updateSpeedAndEnergy();

    if (!intervalSpeedActive) {
      intervalSpeedActive = true;
      startInterval();
    }
  }
}

function disminuirVelocidad() {
  if (speed >= 100) {
    speed -= 100;
    energy -= Math.floor(speed / 100);
    setCookie("energy-meter", energy, 365);
    updateSpeedAndEnergy();

    if (speed < 100 && intervalSpeedActive) {
      clearInterval(intervalSpeed);
      intervalSpeedActive = false;
    }
  }
}

function reducirEnergiaPorSegundo() {
  if (speed >= 100) {
    const energiaARestar = Math.floor(speed / 100);
    energy -= energiaARestar;
    setCookie("energy-meter", energy, 365);
    updateSpeedAndEnergy();
  }
}

function startInterval() {
  intervalSpeed = setInterval(reducirEnergiaPorSegundo, 1000);
}

//RECALENTAMIENTO - REFRIGERAR - SALTO EMERGENCIA
function actualizarRecalentamiento(decrement = 1) {
  let valor = parseInt(nave.elementos.recalentamiento.element.value, 10);
  valor = Math.max(0, valor - decrement);

  nave.elementos.recalentamiento.element.value = valor;

  nave.elementos.recalentamiento.numElement.textContent = valor;

  if (valor >= 50 && valor <= 100) {
    nave.elementos.recalentamiento.element.classList.add("progress-red");
  } else if (valor >= 25 && valor < 50) {
    nave.elementos.recalentamiento.element.classList.add("progress-yellow");
    nave.elementos.recalentamiento.element.classList.remove("progress-red");
  } else {
    nave.elementos.recalentamiento.element.classList.add("progress-green");
    nave.elementos.recalentamiento.element.classList.remove("progress-yellow");
    nave.elementos.recalentamiento.element.classList.remove("progress-red");
  }

  if (valor === 0) {
    clearInterval(nave.elementos.recalentamiento.intervalo);
  }
}

function refrigerar() {
  clearInterval(nave.elementos.refrigerar.intervalo);
  let energyA = parseFloat(getCookie("energy-meter"));
  const currentRefrigeration = parseInt(nave.elementos.refrigerar.element.value);
  nave.elementos.refrigerar.numElement.textContent = currentRefrigeration;
  nave.elementos.refrigerar.intervalo = setInterval(() => {
    if (energyA > 0 && currentRefrigeration > 0) {
      const energyConsumption = currentRefrigeration;
      if (energyA >= energyConsumption) {
        energyA -= energyConsumption;
        nave.elementos.energyMeter.numElement.textContent = energyA;
        setCookie("energy-meter", energyA, 365);
        updateMeterEnergy(nave.elementos.energyMeter.element, parseInt(nave.elementos.energyMeter.numElement), energyA);
      } else {
        clearInterval(nave.elementos.refrigerar.intervalo);
      }
    } else {
      clearInterval(nave.elementos.refrigerar.intervalo);
    }

    actualizarRecalentamiento(currentRefrigeration * 10);
  }, 1000);
}

//AUXILIARES
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  if(value < 0) value = 0;
  document.cookie = name + "=" + parseInt(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function movePlanetsRandomly() {
  const planets = document.querySelectorAll('.planet');

  planets.forEach(planet => {
    const maxX = document.getElementById('planet-container').offsetWidth - planet.clientWidth;
    const maxY = document.getElementById('planet-container').offsetHeight - planet.clientHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const randomRotation = Math.floor(Math.random() * 360);
    const randomScale = 0.1 + Math.random();
  
    planet.style.transition = 'left 1s, top 1s, transform 1s, filter 1s';
    planet.style.left = randomX + 'px';
    planet.style.zIndex = '2';
    planet.style.top = randomY + 'px';
    planet.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
  
    planet.addEventListener('mouseenter', () => {
      planet.style.filter = 'brightness(2)';
    });
  
    planet.addEventListener('mouseleave', () => {
      planet.style.filter = 'brightness(1)';
    });
  });
  
}
function moveSystemsRandomly() {
  const planets = document.querySelectorAll('.system');

  planets.forEach(planet => {
    const maxX = document.getElementById('planet-container').offsetWidth - planet.clientWidth;
    const maxY = document.getElementById('planet-container').offsetHeight - planet.clientHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const randomRotation = Math.floor(Math.random() * 360);
    const randomScale = 0.1 + Math.random();
  
    planet.style.transition = 'left 1s, top 1s, transform 1s, filter 1s';
    planet.style.left = randomX + 'px';
    planet.style.zIndex = '2';
    planet.style.opacity = '0';
    planet.style.top = randomY + 'px';
    planet.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
  
    planet.addEventListener('mouseenter', () => {
      planet.style.filter = 'brightness(2)';
    });
  
    planet.addEventListener('mouseleave', () => {
      planet.style.filter = 'brightness(1)';
    });
  });
  
}
moveSystemsRandomly();


//TEMPORIZADOR
let alertMostrado = false;
let tiempoRestante;

function inicializarTemporizador() {
  const time = document.getElementById("time-left");
  tiempoRestante = generarTiempoAleatorio();
  actualizarVisualizacionTiempo(time, tiempoRestante);
}

function generarTiempoAleatorio() {
  const numeroAleatorio = Math.floor(Math.random() * (180 - 120) + 120);
  //const numeroAleatorio = Math.floor(Math.random() * (10 - 1) + 1);

  const minutos = Math.floor(numeroAleatorio / 60);
  const segundos = numeroAleatorio % 60;
  return { minutos, segundos };
}

function actualizarVisualizacionTiempo(elemento, tiempo) {
  const tiempoFormateado = `${tiempo.minutos.toString().padStart(2, "0")}:${tiempo.segundos.toString().padStart(2, "0")}`;
  elemento.innerText = tiempoFormateado;
}

function actualizarTemporizador() {
  const time = document.getElementById("time-left");
  let minutos = tiempoRestante.minutos;
  let segundos = tiempoRestante.segundos;

  if (segundos > 0) {
    segundos--;
  } else if (minutos > 0) {
    minutos--;
    segundos = 59;
  } else if (!alertMostrado) {
    terminarPartida();
    alertMostrado = true;
  }

  tiempoRestante = { minutos, segundos };
  actualizarVisualizacionTiempo(time, tiempoRestante);

  if (segundos % 30 === 0) {
    time.classList.add("vibrate");
  } else {
    time.classList.remove("vibrate");
  }

  if (segundos <= 10 && minutos === 0) {
    time.classList.add("vibrate10");
  } else {
    time.classList.remove("vibrate10");
  }
}

function resetearTemporizador() {
  const time = document.getElementById("time-left");
  tiempoRestante = generarTiempoAleatorio();
  actualizarVisualizacionTiempo(time, tiempoRestante);
  alertMostrado = false;
}

inicializarTemporizador();
setInterval(actualizarTemporizador, 1000);

//SPACE BACKGROUND
let scene, camera, renderer, stars, starGeo, starMaterial, lines;
let segundoClic = false;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();
  let star; 
  for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
      Math.random() * 1300 - 300,
      Math.random() * 800 - 300,
      Math.random() * 800 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.01;
    starGeo.vertices.push(star);
  }

  let sprite = new THREE.TextureLoader().load("img/star.png");
  starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 1,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  window.addEventListener("resize", onWindowResize, false);
  animate();

  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.y -= p.velocity;

    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.y += 0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function transformStarsToLines(star) {
  if(segundoClic) return; 
  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
      Math.random() * 500 - 300,
      Math.random() * 500 - 300,
      Math.random() * 500 - 300
    );
    star.velocity = 0.50;
    star.acceleration = 1;
    starGeo.vertices.push(star);
  }

  let sprite = new THREE.TextureLoader().load("img/star.png");
  starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  });

  lines = new THREE.Points(starGeo, starMaterial);
  scene.add(lines);
  scene.remove(stars);

  setTimeout(() => {
    scene.remove(lines);
    scene.add(stars);
  }, 3000);
}

init();

const systemsA = document.querySelectorAll(".system");

function enlargeSelectedPlanet(clickedPlanet) {
  planetasVisitados += 1;
  const planetas = document.querySelectorAll('.planet');
  planetas.forEach(planet => {
    if (planet !== clickedPlanet) {
      planet.classList.add('enlarged');
      planet.style.opacity = '1';
      planet.style.zIndex = '2';
      planet.style.transform = 'rotate(0deg) scale(0.05)';
    } else {
      planet.classList.remove('planetEfectos');
      planet.classList.add('enlarged');
      planet.style.zIndex = '2';
      planet.style.opacity = '1';
      planet.style.top = '685px';
      planet.style.left = '-685px';
      planet.style.transform = 'rotate(0deg) scale(15)';
      planet.style.filter = 'brightness(2)';
    }
  });
}

//GENERAR RECURSOS
const terminal = document.getElementsByClassName("root")[0];
const body = document.getElementsByTagName("body")[0];
let newLine = document.createElement("p");
newLine.classList.add("newLine");
const skipBtn = document.querySelector(".control span");
terminal.appendChild(newLine);

function generarRecursosAleatorios() {
  let energiaEncontrada = Math.floor(Math.random() * 20);
  let supervivientesEncontrados = Math.floor(Math.random() * 30);
  let integridadCascoEncontrada = Math.floor(Math.random() * 50);
  let misilesEncontrados = Math.floor(Math.random() * 3);
  let chatarraEncontrada = Math.floor(Math.random() * (45 - 15 + 1)) + 15;

  let mensajeRecursos = `
  Recursos encontrados ...
  - Energía: ${energiaEncontrada}
  - Supervivientes: ${supervivientesEncontrados}
  Integridad del casco: ${integridadCascoEncontrada}
  - Misiles: ${misilesEncontrados}
  - Chatarra: ${chatarraEncontrada}`;

  return {
    energia: energiaEncontrada,
    supervivientes: supervivientesEncontrados,
    integridadCasco: integridadCascoEncontrada,
    misiles: misilesEncontrados,
    chatarra: chatarraEncontrada,
    mensaje: mensajeRecursos
  };
}
function sayItSlowly(user, place, str,terminal,newLine,skipBtn) {
  let username = `${user}@${place}:~$`;
  let arr = `${username}${str}`.split("");
  let counter = 0;
  let isPaused = false;

  let interval = setInterval(function () {
    if (!isPaused) {
      printChar(arr[counter],newLine);
      counter++;
    }

    if (counter === arr.length) {
      clearInterval(interval);
      skipBtn.classList.remove("hidden");
      skipBtn.addEventListener("click", () => {
        newLine.textContent = "";
        sayItSlowly(user, place, str);
      });
    }

    if (terminal.clientHeight > body.clientHeight / 2) {
      if (arr[counter] === " ") {
        isPaused = true;
        skipBtn.classList.remove("hidden");

        skipBtn.addEventListener("click", function () {
          newLine.textContent = `${username}`;
          skipBtn.classList.add("hidden");
          isPaused = false;
        });
      }
    }
  }, 50);
}

function pause() {
  clearInterval(interval);
}

function printChar(char,newLine) {
  newLine.textContent += char;
}

//GENERAR MAPA DINAMICAMENTE CON LOS SISTEMAS
function cargarMapaSistemas() {
  const provSistem = document.getElementsByClassName("proxz-nav__system");
  const systemContainer = document.getElementById("system-container");
  const systemsA = systemContainer.querySelectorAll('.system');
  systemContenedor.style.display = 'block';
  planetaContenedor.innerHTML = '';

  Array.from(provSistem).forEach(element => {
    element.innerHTML = "";
    systems.forEach(system => {
      const li = document.createElement("li");
      li.className = "proxz-nav__orbit";
      const a = document.createElement("button");
      a.className = "proxz-nav__satellite";
      a.id = system.name;
      if (system.visited === true) {
        if (system.name === a.id) {
          const infoPlanetaVisited = document.getElementById("visitado"+system.name);
          infoPlanetaVisited.textContent = `Visitado: Si`;
          a.style.opacity = 0.2;
          a.disabled = true;
        }
      }
      const span = document.createElement("span");
      span.className = "proxz-nav__label";
      span.textContent = system.name;
      const span2 = document.createElement("span");
      span2.className = "proxz-nav__description";
      span2.textContent = system.desc;
      span.appendChild(span2);
      a.appendChild(span);
      li.appendChild(a);

      element.appendChild(li);
      let planetaBoton = null;
      systemsA.forEach(systemAA => {
        if (systemAA.id === system.name) {
          planetaBoton = systemAA;
        }
      });
      a.addEventListener("mouseenter", () => {
        showInfo(system.info)
        planetaBoton.style.filter = 'brightness(2)';
        planetaBoton.style.opacity = '1';
      });
      a.addEventListener("mouseleave", () => {
        hideInfo(system.info)
        planetaBoton.style.filter = 'brightness(1)'
        planetaBoton.style.opacity = '0'
      });
      
      a.addEventListener("click", () => {
        if(system.visited === true) {
          a.disabled = true;
          planetaBoton.style.opacity = 0.5;
          planetaBoton.disabled = true;
        } else {
          if(realizarSaltoSistema()) {
            system.visited = true;
            renderPlanets(system);
            renderSystemButton(system);
            transformStarsToLines();
            cargarMapaPlanetasDelSistema(system);
          } 
        }
      });
    });
  });
}

//GENERAR MAPA DINAMICAMENTE CON LOS PLANETAS DEL SISTEMA
function cargarMapaPlanetasDelSistema(system) {
  const provSistem = document.getElementsByClassName("proxz-nav__system");
  const planetContainer = document.getElementById("planet-container");
  const planetas = planetContainer.querySelectorAll('.planet');
  Array.from(provSistem).forEach(element => {
      element.innerHTML = "";
      system.planets.forEach(planet => {
        const li = document.createElement("li");
        li.className = "proxz-nav__orbit";
        const a = document.createElement("button");
        a.setAttribute("popovertarget", planet.accion);
        a.className = "proxz-nav__satellite"; 
        a.id = planet.name;
        if (planet.visited === true) {
          if (planet.name === a.id) {
            const infoPlanetaVisited = document.getElementById("visitado"+planet.name);
            infoPlanetaVisited.textContent = `Visitado: Si`;
            a.style.opacity = 0.2;
            a.disabled = true;
          }
        }
        const span = document.createElement("span");
        span.className = "proxz-nav__label";
        span.textContent = planet.name;
        const span2 = document.createElement("span");
        span2.className = "proxz-nav__description";
        span2.textContent = planet.distance; 
        span.appendChild(span2);
        a.appendChild(span);
        li.appendChild(a);
        element.appendChild(li);
        
        let planetaBoton = null;
        planetas.forEach(planetAA => {
          if (planetAA.id === planet.name) {
            planetaBoton = planetAA;
          }
        });
        if (!visitados[planet.name]) {
          a.addEventListener("mouseover", () => showInfo(planet.info));
          a.addEventListener("mouseout", () => hideInfo(planet.info));
          a.addEventListener("click", () => {
              visitados[planet.name] = true; 
              a.disabled = true;

              enlargeSelectedPlanet(planetaBoton);
              let acceso = false;
              const nombrePlaneta = document.getElementById("nombrePlaneta");
              if (planet.accion === "mensajePlaneta") {
                mensajePlaneta.style.display = 'block';
                const recursosEncontrados = generarRecursosAleatorios();
                nombrePlaneta.textContent = planet.name;
                resourceInfo  = recursosEncontrados.mensaje
                sayItSlowly('Explorador1', "PlanetaX", resourceInfo,terminal,newLine,skipBtn);
                const recogerRecursos = document.getElementById("recogerRecursos");
                recogerRecursos.addEventListener("click", () => {
                  planet.visited = true;
                  if(!acceso) {
                    const supervivientes = parseInt(getCookie("survivor-meter")) || 0;
                    const energia = parseInt(getCookie("energy-meter")) || 0;
                    const integridadCasco = parseInt(getCookie("integridad-casco")) || 0;
                    const misiles = parseInt(getCookie("misiles")) || 0;
                    let misilesEncontrados = recursosEncontrados.misiles;
                    let energiaEncontrada = recursosEncontrados.energia;
                    let supervivientesEncontrados = recursosEncontrados.supervivientes;
                    let integridadCascoEncontrada = recursosEncontrados.integridadCasco;
                    let chatarraEncontrada = recursosEncontrados.chatarra;
      
                    const newSupervivientes = supervivientes + supervivientesEncontrados;
                    const newEnergia = energia + energiaEncontrada;
                    const newIntegridadCasco = integridadCasco + integridadCascoEncontrada;
                    const newMisiles = misiles + misilesEncontrados;
                    const newChatarra = chatarraEncontrada;
                    
                    setCookie("survivor-meter", newSupervivientes, 365);
                    setCookie("energy-meter", newEnergia, 365);
                    setCookie("integridad-casco", newIntegridadCasco, 365);
                    setCookie("misiles", newMisiles, 365);
                    setCookie("chatarra", newChatarra, 365);

                    energiaRecolectada += energiaEncontrada;
                    supervivientesRescatados += supervivientesEncontrados;
                    integridadCascoReparada += integridadCascoEncontrada;
                    misilesRecolectados += misilesEncontrados;
                    chatarraRecolectada += chatarraEncontrada;
      
                    updateMeter(nave.elementos.survivorMeter.element, nave.elementos.survivorMeter.numElement, newSupervivientes);
                    updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, newEnergia);
                    updateMeter(nave.elementos.integridadCasco.element, nave.elementos.integridadCasco.numElement, newIntegridadCasco);
                    updateMeter(nave.elementos.misiles.element, nave.elementos.misiles.numElement, newMisiles);
                    nave.elementos.chatarra.numElement.textContent = newChatarra;
                    movePlanetsRandomly();
                    const mensajePlaneta = document.getElementById("mensajePlaneta");
                    mensajePlaneta.style.display = 'none';
                    resourceInfo = "";
                    nombrePlaneta.textContent = "";
                    misilesEncontrados = 0;
                    energiaEncontrada = 0;
                    supervivientesEncontrados = 0;
                    integridadCascoEncontrada = 0;
                    const newLine = document.getElementsByClassName("newLine")[0];
                    newLine.textContent = "";
                    acceso = true;
                  }
                  systems.forEach(system => {
                    system.planets.forEach(planetA => {
                      //si el planeta esta incluide en el sistema
                      if (planet.name === planetA.name) {
                        cargarMapaPlanetasDelSistema(system);
                      }
                    })
                  });
                });
              } else if (planet.accion === "victoria") { 
                const mensajeVictoria = document.getElementById("mensajeVictoria");
                mensajeVictoria.style.display = 'block';
                const terminal2 = document.getElementsByClassName("root")[2];
                let newLine2 = document.createElement("p");                
                newLine2.classList.add("newLine2");
                const skipBtn2 = document.querySelector(".control span");
                terminal2.appendChild(newLine2);
                resourceInfo  = "¡Has ganado la partida! ¡Enhorabuena!" 
                + "\n" + "Recursos recogidos: " + "\n" + "Energía: " + energiaRecolectada + "\n" + "Supervivientes: " + supervivientesRescatados + "\n" + "Integridad del casco: " + integridadCascoReparada + "\n" + "Misiles: " + misilesRecolectados + + "\n" + "Chatarra: " + chatarraRecolectada+ 
                "\n" + "Combates realizados: " + combatesRealizados + "\n" + "Disparos de láser realizados: " + disparosLaserRealizados + "\n" + "Disparos de misiles realizados: " + disparosMisilesRealizados + "\n" + "Planetas visitados: " + planetasVisitados + "\n" + "Sistemas visitados: " + sistemasVisitados;
                sayItSlowly('Explorador1', "PlanetaX", resourceInfo,terminal2,newLine2,skipBtn2);
                const reinicarPartida = document.getElementById("reiniciarPartidaVictoria");
                reinicarPartida.addEventListener("click", () => {
                  terminarPartida();
                  mensajeVictoria.style.display = 'none';
                });
              } else {
                //COMBATE
                combatesRealizados += 1;
                const mensajeCombate = document.getElementById("mensajeCombate");
                mensajeCombate.style.display = 'flex';
                
                navesEnemigas = generarNavesEnemigasAleatorias(3);
                const combate = document.getElementById("combatePanel");
                combate.style.display = 'block';

                const selectEnemigos = document.getElementById("enemigos-select");
                navesEnemigas.forEach(naveEnemiga => {
                  const naveEnemigaDiv = document.createElement("div");
                  naveEnemigaDiv.id = naveEnemiga.nombre;
                  const imagen = document.createElement("img");
                  imagen.src = naveEnemiga.imagen;
                  imagen.alt = naveEnemiga.nombre;
                  imagen.className = "w-10 h-auto mx-auto mb-4"; 
                
                  const vida = document.createElement("p");
                  let vidaValor = document.createElement("span"); 
    
                  vidaValor.textContent = naveEnemiga.vida;
                  vidaValor.id = "vida"+naveEnemiga.nombre;
                  vida.textContent = "Vida: ";
                  vida.appendChild(vidaValor);
                
                  const escudo = document.createElement("p");
                  let escudoValor = document.createElement("span");
                  escudoValor.textContent = naveEnemiga.escudo;
                  escudoValor.id = "escudo"+naveEnemiga.nombre;
                  escudo.textContent = "Escudo: ";
                  escudo.appendChild(escudoValor);
                
                  dañoTotalEnemigos += naveEnemiga.disparar();
                  naveEnemigaDiv.appendChild(imagen);
                  naveEnemigaDiv.appendChild(vida);
                  naveEnemigaDiv.appendChild(escudo);
                  combate.appendChild(naveEnemigaDiv);
    
                  const option = document.createElement("option");
                  option.value = naveEnemiga.nombre;
                  option.textContent = naveEnemiga.nombre;
                  selectEnemigos.appendChild(option);
                });
    
                ///GESTIONAR DAÑO A MI NAVE
                intervalDañoEnemigos = setInterval(() => {
                  let integridadCasco = parseInt(getCookie("integridad-casco")) || 0;
                  const currentEscudo = parseInt(nave.elementos.escudo.element.value);
    
                  if (currentEscudo === 0) {
                    integridadCasco -= dañoTotalEnemigos;
                  } else if (currentEscudo === 1) {
                    integridadCasco -= dañoTotalEnemigos / 2;
                  } else if (currentEscudo === 2) {
                    integridadCasco -= dañoTotalEnemigos / 4;
                  }
    
                  if(integridadCasco <= 0) {
                    clearInterval(intervalDañoEnemigos);
                    intervalDañoEnemigos = null;
                    dañoTotalEnemigos = 0;
                    selectEnemigos.innerHTML = "";
                    mensajeCombate.style.display = 'none';
                    combate.innerHTML = "";
                    combate.style.display = 'none';
                    terminarPartida();
                  }
    
                  let nuevoValorIntegridadCasco = integridadCasco - dañoTotalEnemigos;
                  setCookie("integridad-casco", nuevoValorIntegridadCasco, 365);
                  updateMeter(nave.elementos.integridadCasco.element, nave.elementos.integridadCasco.numElement, nuevoValorIntegridadCasco);
                }, 5000);
              }
          });
        }
      });
    });
}

cargarMapaSistemas();

function generarNavesEnemigasAleatorias(maxNaves = 3) {
  const navesEnemigas = [];
  const cantidadNaves = Math.floor(Math.random() * maxNaves) + 1;
  
  for (let i = 0; i < cantidadNaves; i++) {
    const nombre = "$1a$" + i+"?=fa!"+i;
    const vida = Math.floor(Math.random() * 10) + 1; 
    const escudo = Math.floor(Math.random() * 5) + 1; 
    const imagen = obtenerImagenAleatoria(); 
    const daño = Math.floor(Math.random() * 3); 
    navesEnemigas.push(new NaveEnemiga(nombre, escudo, daño, vida, imagen));
  }
  return navesEnemigas;
}

function obtenerImagenAleatoria() {
  // Array of possible image paths
  const imagenes = ["img/nave_naranja.png", "img/nave.png"];
  const randomIndex = Math.floor(Math.random() * imagenes.length);
  return imagenes[randomIndex];
}

function realizarSaltoSistema() {  
  sistemasVisitados += 1;
  const supervivientes = parseInt(getCookie("survivor-meter")) || 0;
  const energia = parseInt(getCookie("energy-meter")) || 0;
  const integridadCasco = parseInt(getCookie("integridad-casco")) || 0;
  const recalentamiento = parseInt(nave.elementos.recalentamiento.element.value);

  if (recalentamiento === 0 && supervivientes >= 30 && energia >= 30 && integridadCasco >= 30) {

    const newSupervivientes = supervivientes - 30;
    const newEnergia = energia - 30;
    const newIntegridadCasco = integridadCasco - 30;
    
    setCookie("survivor-meter", newSupervivientes, 365);
    setCookie("energy-meter", newEnergia, 365);
    setCookie("integridad-casco", newIntegridadCasco, 365);

    updateMeter(nave.elementos.survivorMeter.element, nave.elementos.survivorMeter.numElement, newSupervivientes);
    updateMeterEnergy(nave.elementos.energyMeter.element, nave.elementos.energyMeter.numElement, newEnergia);
    updateMeter(nave.elementos.integridadCasco.element, nave.elementos.integridadCasco.numElement, newIntegridadCasco);
    movePlanetsRandomly();
    nave.elementos.recalentamiento.element.value = 100;
    nave.elementos.recalentamiento.numElement.textContent = 100;
    clearInterval(nave.elementos.recalentamiento.intervalo);
    nave.elementos.recalentamiento.intervalo = setInterval(actualizarRecalentamiento, 1000);
    resetearTemporizador();
    saltos++;
    if(saltos === 3) {
      victoria();
    }
    return true
  } else {
    return false
  }
}

function terminarPartida() {

  const mensajeCombate = document.getElementById("mensajeCombate");
  const systemContainer = document.getElementById("system-container");
  const planetaContenedor = document.getElementById("planeta-container");

  mensajeCombate.style.display = 'none';
  systemContainer.style.display = 'none';
  const combate = document.getElementById("combatePanel");

  mensajeCombate.style.display = 'none';
  combate.innerHTML = "";
  combate.style.display = 'none';
  
  const mensajeDerrota = document.getElementById("mensajeDerrota");
  const reinicarPartida = document.getElementById("derrotaReiniciarPartida");
  const cockpit = document.getElementById("cockpit");
  mensajeDerrota.style.display = 'block';
  cockpit.classList.remove("cockpit");
  cockpit.classList.add("cockpitDerrota");
  
  reinicarPartida.addEventListener("click", () => {
    deleteCookie("survivor-meter");
    deleteCookie("energy-meter");
    deleteCookie("integridad-casco");
    deleteCookie("misiles");
    deleteCookie("chatarra");
    resetearTemporizador();
    window.location.reload();

  });
}

function victoria() {
  const mensajeSistema = document.getElementById("mensajeSistema");
  const explorarSistema = document.getElementById("explorarSistema");
  const system4 = new System("SOLAR", "SISTEMA SOLAR","img/planet1.png", "infoSolar");
  system4.addPlanet(new Planet("Planeta Tierra", "100,000 km", "Iron, Water", "img/tierra.png", "victoria", "infoTierra"));
  systems.push(system4);
  mensajeSistema.style.display = 'block';
  explorarSistema.addEventListener("click", () => {
    mensajeSistema.style.display = 'none';
    renderSystemButton(system4);
    renderPlanets(system4);
  });
}