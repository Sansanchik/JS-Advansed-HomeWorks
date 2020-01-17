const checkIPButton = document.querySelector("#check-ip");
// по нажатию кнопки отправляем запрос в ответ получаем json, из него берем ip
checkIPButton.addEventListener("click", async () => {
  let response = await fetch ('https://api.ipify.org/?format=json');
  let ip;

  if (response.ok) {
    const data = await response.json();
    ip = data.ip;
    console.log(ip);
  }
// имея ip отправляем второй запрос, на страну, город и т.п.
  let response2 = await fetch(`http://ip-api.com/json/${ip}?lang=ru&fields=country,city,timezone,zip`);
  if (response2.ok) {
    const data = await response2.json();
    console.log(data); 
// создаем параграф и выводим поля, которые получили
    const outputElem = document.createElement("p");
    outputElem.innerHTML = `<strong>Ваш IP: ${ip}</strong><br><hr>
                          Страна:${data.country}<br>
                          Город: ${data.city}<br>
                          Временная зона: ${data.timezone}<br>
                          Индекс: ${data.zip}`;
   document.querySelector("button").after(outputElem);
  }
})