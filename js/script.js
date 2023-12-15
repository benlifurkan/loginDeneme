let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");


let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);


function togglePassword() {
    var passwordField = document.getElementsByClassName(".password_input");
    var eyeIcon = document.querySelector(".eye_icon_login");

    if (passwordField.type === "text") {
        passwordField.type = "password";
        eyeIcon.src = "/MdiEyeOutline.svg";
      }
  
    else {
      passwordField.type = "text";
      eyeIcon.src = "/MdiEyeClosed.svg";
    } 
  }

  function togglePassword() {
    var passwordField = document.getElementsByClassName(".password_input");
    var eyeIcon = document.querySelector(".eye_icon_register");

    if (passwordField.type === "text") {
        passwordField.type = "password";
        eyeIcon.src = "/MdiEyeOutline.svg";
      }
  
    else {
      passwordField.type = "text";
      eyeIcon.src = "/MdiEyeClosed.svg";
    } 
  }

  // SVG ikonunun tıklanmasını dinleyen işlev
  var isOpen = false;

  document.getElementById('clickableIconRegister').addEventListener('click', function() {
    var imageElement = document.querySelector('#image_style_register');
    if (imageElement) {
      if (isOpen) {
        imageElement.src = "hemsire_acik_goz.png";
        isOpen = false;
      } else {
        imageElement.src = "hemsire_kapali_goz.png";
        isOpen = true;
      }
    }
  });

  document.getElementById('clickableIconLogin').addEventListener('click', function() {
    var imageElement = document.querySelector('#image_style_login');
    if (imageElement) {
      if (isOpen) {
        imageElement.src = "/hemsire_acik_goz.png";
        isOpen = false;
      } else {
        imageElement.src = "/hemsire_kapali_goz.png";
        isOpen = true;
      }
    }
  });
  
  
  

  