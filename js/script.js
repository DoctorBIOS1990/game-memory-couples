// Locks Events 
const disabledKeys = ["u", "I"];

const showAlert = (e) => {
  e.preventDefault();
  return alert("No puede ver o copiar código fuente de esta manera!");
};

document.addEventListener("contextmenu", (e) => {
  showAlert(e);
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && disabledKeys.includes(e.key)) || e.key === "F12") {
    showAlert(e);
  }
});

// Vars
const cards = document.querySelectorAll(".card");
const num_parejas = document.querySelector(".container h2 span");
let tar_1, tar_2;
let deshabilitarCartas = false;
let parejas = 0;
let intentos = 0;
let sonidos = document.querySelector("#sonidos");
let fondo = document.querySelector("#fondo");
let escuchar = document.querySelector("#escuchar");
let $btn_restart = document.querySelector("#restart");
let span_intentos = document.querySelector("#intentos");
const $btn_again = document.querySelector("#btnAgain");
const $btn_not = document.querySelector("#btnNot");
const $section = document.querySelector('section');
const $a = document.querySelector('a');
const $go = document.querySelector("#go");
const $title = document.querySelector("#title");


//Buttons Mute/Unmute Music
const sonidoDeFondo = (e) => {  
  if (fondo.volume == 0.0) {
    fondo.volume = 0.5;
    return (escuchar.innerHTML = "Quit Music");
  }
  fondo.volume = 0.0;
  return (escuchar.innerHTML = "Active Music");
};

// Check Cards
const sonIguales = (imagen1, imagen2) => {  
    intentos++;
    span_intentos.innerHTML = intentos;
  if (imagen1 === imagen2) {
    sonidos.src = "sounds/Success.mp3";
    sonidos.play();
      parejas++;
      
      num_parejas.innerHTML = parejas;
      
    if (parejas === 8) {
      fondo.volume = 0.0;
      sonidos.src = "sounds/win.mp3";
      sonidos.play();
            
      setTimeout(() => {
        $section.classList.remove('hide');
        $go.innerHTML = "You Win.";
          setTimeout(() => {
                $go.innerHTML = "Let's again?";
                $btn_again.innerHTML = "Yes ";
                $btn_not.innerHTML = " No";
          },3000);
      }, 1500);
    }

    tar_1.removeEventListener("click", darVuelta);
    tar_2.removeEventListener("click", darVuelta);
    tar_1 = tar_2 = "";
    return (deshabilitarCartas = false);
  }

  setTimeout(() => {
    tar_1.classList.add("moverse");
    tar_2.classList.add("moverse");

    sonidos.src = "sounds/Fail.mp3";
    sonidos.play();
  }, 500);

  setTimeout(() => {
    tar_1.classList.remove("moverse", "vuelta");
    tar_2.classList.remove("moverse", "vuelta");
    tar_1 = tar_2 = "";
    deshabilitarCartas = false;
  }, 1500);
};

// Movement Cards
const darVuelta = (e) => {  
  let tarjeta = e.target;
  if (tarjeta !== tar_1 && !deshabilitarCartas) {
    tarjeta.classList.add("vuelta");
    if (!tar_1) {
      return (tar_1 = tarjeta);
    }
    tar_2 = tarjeta;
    deshabilitarCartas = true;
    let img1 = tar_1.querySelector("img").src;
    let img2 = tar_2.querySelector("img").src;
    sonIguales(img1, img2);
  }
};

// Restarting Game
const reiniciarJuego = () => { 
  fondo.src = "sounds/background.mp3";
  fondo.volume = 0.5;

    parejas = 0;
    intentos = 0;

  tar_1 = tar_2 = "";
  deshabilitarCartas = false;
  num_parejas.innerHTML = parejas;
  span_intentos.innerHTML = intentos;

  let fichas = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  fichas.sort(() => {
    return Math.random() - 0.5;
  });

  escuchar.innerHTML = "Quit Music"

  cards.forEach((tarjeta, index) => {
    tarjeta.classList.remove("vuelta");
    let img = tarjeta.querySelector("img");
    img.src = `img/img-${fichas[index]}.png`;
    tarjeta.addEventListener("click", darVuelta);
  });
};

reiniciarJuego();
cards.forEach((tarjeta) => {
tarjeta.addEventListener("click", darVuelta);

});

// Temp Begin audio
const playSound = function() { 
  let element = document.createElement('div');
  element.setAttribute('style', 'display: none');
  element.innerHTML = `
    <audio autoplay>
          <source src="sounds/Begin.mp3" type="audio/mpeg">
    </audio>
  `;

  document.body.appendChild(element);
  reiniciarJuego();
  document.removeEventListener('click', playSound);
}

$a.addEventListener('click', () =>{
  beginGame();
})

// Lets Again ?
$btn_again.addEventListener('click', () =>{ // BUTTON (YES)
  $go.innerHTML = "";
  $btn_again.innerHTML = "";
  $btn_not.innerHTML = "";
  beginGame();
})

$btn_not.addEventListener('click', () =>{ // BUTTON (NO)
  window.location.reload();
})

// Button Restart
$btn_restart.addEventListener('click', () =>{ 
  reiniciarJuego();
  fondo.play();
})

// Begining Game
const beginGame = () => {   
  $title.classList.add('hide');
  playSound()
  $a.remove()
  fondo.play()

  setTimeout(() => {
      $title.remove();
      return $go.innerHTML = "Itˋs time to duel.";
 },1000);  

  setTimeout(() => {
     return $section.classList.add('hide');
  }, 3900);  
}

escuchar.addEventListener("click", sonidoDeFondo);