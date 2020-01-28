let query = fetch("https://swapi.co/api/films/");
query
  .then(response => response.json())
  .then(result => {
    console.log(result.results);
    let films = result.results;
    for (let film of films) {
      let filmDiv = document.createElement("div");
      filmDiv.classList.add("film-item");

      let episodeName = document.createElement("p");
      episodeName.classList.add("episode-name");
      episodeName.innerText = film.title;
      filmDiv.append(episodeName);

      let episodeId = document.createElement("p");
      episodeId.classList.add("item");
      episodeId.innerText = `Episode ${film.episode_id} : ${film.release_date}`;
      filmDiv.append(episodeId);
               
      let openingCrawl = document.createElement("p");
      openingCrawl.classList.add("item");
      openingCrawl.innerHTML = `${film.opening_crawl}`;
      filmDiv.append(openingCrawl);
      
       document.querySelector(".wrapper").append(filmDiv);

    // получение персонажей   
      let charactersURLs = film.characters;
      let names = [];
      for (let characterURL of charactersURLs) {
      let namePromise = fetch (characterURL)
            .then(response => response.json())
            .then(character => character.name);
            names.push(namePromise)
      }

      Promise.all(names)
      .then (
        function (names) {
          let charactersDiv = document.createElement("div");
          charactersDiv.classList.add ("Characters");
          charactersDiv.innerHTML = `Characters: ${names}`;
          filmDiv.append(charactersDiv);
        }
      )
    }
  })

