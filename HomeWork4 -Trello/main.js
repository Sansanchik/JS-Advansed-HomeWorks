class Column {
  constructor(columnTitle) {
    this.title = columnTitle;
    this.cards = [];
  }

  render() {
    //создаем колонку и кнопки
    const column = document.createElement("div");
    column.classList.add("column");

    const title = document.createElement("h2");
    title.classList.add("column-title");
    title.innerText = this.title;
    column.append(title);

    const sortButton = document.createElement("button");
    sortButton.classList.add("sort-cards-btn");
    sortButton.innerHTML = `Sort`;
    column.prepend(sortButton);

    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");
    column.append(cardsContainer);

    const addButton = document.createElement("button");
    addButton.classList.add("add-card-btn");
    addButton.innerText = "+ Add card";
    column.append(addButton);

    document.body.append(column);
    //Add card кнопка
    addButton.addEventListener("click", (e) => {
      this.addCard(e.target.closest(".column").querySelector(".cards-container"));
    })

    //Sort cards кнопка
    sortButton.addEventListener("click", (e) => {
      this.sortCards(e.target.closest(".column"));
    })

    //card drag&drop
    column.addEventListener("mousedown", (e) => {
      const currentCard = e.target;
      if (currentCard.classList.contains("card")) {
        document.body.style.cursor = "move";

        currentCard.style.position = "absolute";
        currentCard.style.zIndex = 100;
    //смещение на момент клика = Y мыши отностиельно окна - ( Y верха Карточки - Y верха Колонки )
        let shiftY = e.clientY - (currentCard.getBoundingClientRect().top - document.querySelector(".column").getBoundingClientRect().top);

        document.addEventListener("mousemove", moveCard);
        function moveCard(e) {
          currentCard.style.top = e.clientY - shiftY + "px";
        }

        document.addEventListener("mouseup", (e) => {
          document.removeEventListener("mousemove", moveCard);
          const cards = Array.from(e.target.closest(".column").querySelectorAll(".card"));
          if (cards.every(card => card.getBoundingClientRect().top > parseInt(currentCard.style.top))) {
            e.target.closest(".column").querySelector(".cards-container").prepend(currentCard);
          } else {
            for (let card of cards) {
              let cardRect = card.getBoundingClientRect();
              if (parseInt(currentCard.style.top) > cardRect.top) {
                card.after(currentCard);
              }
            }
          }
          //очистка стилей для установки в новой позиции
          currentCard.style.position = "static";
          currentCard.style.top = "";
          document.body.style.cursor = "initial";
        })
      };
    })
  }

  addCard(container) {
    let newCard = new Card;
    newCard.render(container);
  }

  sortCards(column) {
    const cards = Array.from(column.querySelectorAll(".card"));
    //сортировка по тексту 'textarea'
    cards.sort(function (a, b) {
      let firstText = a.firstElementChild.value.toUpperCase();
      let secondText = b.firstElementChild.value.toUpperCase();
      if (firstText < secondText) {
        return -1;
      } else {
        return 1;
      }
    });
    for (let card of cards) {
      column.querySelector(".cards-container").append(card);
    }
  }
}

// создание класса карточка 
class Card {
  constructor(text = "Add your task", color = "#6F9FD8") {
    this.text = text;
    this.color = color;
  }
  render(container) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.insertAdjacentHTML("afterbegin", `<textarea name="card-text" id="card-text" >${this.text}</textarea>`);
    card.style.backgroundColor = this.color;
    container.append(card);
  }
}

//запуск

let column = new Column("To do");
column.render();