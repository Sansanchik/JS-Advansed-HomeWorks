window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://swapi.co/api/films/');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } 
        else {
            const filmList = JSON.parse(xhr.response);
            const resultList = filmList.results;
            resultList.forEach(elem => {
                let newDiv = document.createElement("div");
                newDiv.innerHTML = `<p class="item-title">Movie title: ${elem.title}</p>
                    <p class="item">Episode number: ${elem.episode_id}. 
                    Release Date:${elem.release_date} </p>
                    <p class="item">Description: ${elem.opening_crawl}</p>
                    <button class="button" id="button">Список персонажей</button>`;
                newDiv.classList.add("film-item");
                newDiv.id = elem.episode_id;
                document.getElementById("film-cont").appendChild(newDiv);
            });

            document.addEventListener("click", function (e) {
                let eventTarget;
                if (e.target.classList.contains("button")) {
                    eventTarget = e.target;
                    document.getElementById('floatingCirclesG').style.display = "block";
                }
                const eventFilmId = eventTarget.parentNode.id;

                let newParag = document.createElement("span");
                newParag.innerHTML = "Список персонажей: ";
                resultList.forEach(elem => {
                    if (elem.episode_id == eventFilmId) {
                        const charactersList = elem.characters;
                        charactersList.forEach(item => {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', item);
                            xhr.send();
                            xhr.onload = function () {
                                if (xhr.status !== 200) {
                                    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                                } else {
                                    newParag.innerHTML += `${JSON.parse(xhr.response).name};`;
                                    document.getElementById('floatingCirclesG').style.display = "none";
                                }
                            }
                        });
                    }
                    xhr.onerror = function () {
                        alert("Запрос не удался");
                    };
                });
                newParag.classList.add("item");
                document.getElementById(eventFilmId).appendChild(newParag);
                eventTarget.remove();
            });
        }
    }

    xhr.onerror = function () {
        alert("Запрос не удался");
    };
}
