const accomondationType = document.querySelector(".accomodation-type");
const acomodationRadios = document.getElementsByName("overNight");
const map = document.querySelector("iframe");

let isMobile = window.matchMedia("only screen and (max-width: 700px)").matches;

if (isMobile) {
  map.src =
    "https://maps.google.com/maps?q=Hora%20Matky%20Bo%C5%BE%C3%AD%20Hede%C4%8D&t=&z=12&ie=UTF8&iwloc=&output=embed";
}

acomodationRadios.forEach((radio) => {
  radio.onclick = (e) => {
    const value = e.target.value;
    if (value === "ano") {
      accomondationType.style.display = "block";
    } else {
      accomondationType.style.display = "none";
    }
  };
});
