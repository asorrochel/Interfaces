const interfaces = {
  holoEscudo: "shield-interface",
  holaPropulsor: "propulsor-interface",
  holaArma: "arma-interface",
  holaTripulacion: "tripulacion-interface",
  holaMotorSalto: "motor-salto-interface",
  holaMejoras: "mejoras-interface"
};

function mostrarInterface(interfaceKey) {

  const interfaceId = interfaces[interfaceKey];
  const element = document.getElementById(interfaceId);

  if (element) {
    element.style.display = "block";
  }
}

function ocultarTodasLasInterfaces() {
  for (const interfaceKey in interfaces) {
    const element = document.getElementById(interfaces[interfaceKey]);
    if (element) {
      element.style.animation = 'fadeOut 1.5s ease-in-out';
    }
  }

  setTimeout(() => {
    for (const interfaceKey in interfaces) {
      const element = document.getElementById(interfaces[interfaceKey]);
      if (element) {
        element.style.animation = '';
        element.style.display = "none";
      }
    }
  }, 1500);
}

function ocultarRestoLasInterfaces(interfaceToKeepOpen) {
  for (const key in interfaces) {
    if (key !== interfaceToKeepOpen) {
      const element = document.getElementById(interfaces[key]);
      if (element) {
        element.style.display = "none";
      }
    }
  }
}

const mostrarEscudoInterface = () => {
  ocultarRestoLasInterfaces('holoEscudo');
  mostrarInterface('holoEscudo');
};

const mostrarPropulsorInterface = () => {
  ocultarRestoLasInterfaces('holaPropulsor');
  mostrarInterface('holaPropulsor');
};

const mostrarArmaInterface = () => {
  ocultarRestoLasInterfaces('holaArma');
  mostrarInterface('holaArma');
};

const mostrarTripulacionInterface = () => {
  ocultarRestoLasInterfaces('holaTripulacion');
  mostrarInterface('holaTripulacion');
};

const mostrarMotorSaltoInterface = () => {
  ocultarRestoLasInterfaces('holaMotorSalto');
  mostrarInterface('holaMotorSalto');
};

const mostrarMejorasInterface = () => {
  ocultarRestoLasInterfaces('holaMejoras');
  mostrarInterface('holaMejoras');
};