const contactButton = document.querySelector("#btn-contact");
contactButton.addEventListener("click", setCookie);
function setCookie () {
  let newCookie = encodeURIComponent("experiment") + "=" + encodeURIComponent("novalue");
  document.cookie = newCookie + "; max-age=300000";
  if (!document.cookie.split(";").some( elem => elem.includes("newUser"))) {
    document.cookie = "newUser=true";
  } else {
    document.cookie = "newUser=false";
  }
  console.log(document.cookie);
}