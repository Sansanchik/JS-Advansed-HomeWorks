let interval;
document.querySelector('.begin_butt').onclick = (event) => {
    event.preventDefault();
    let form = document.querySelector('form');
    interval = form.elements.timeset.value;
      try {
      if (!interval) {
        throw new beginAlert('Выберите сложность')
     }
      if (interval) {
        console.log(interval);
       new Game();
    }
}     catch (e) { alert(e.message);}
};

function beginAlert(message) {
    this.message = message;
}; 

'use strict';

let quatrosArray = [...table.getElementsByClassName('quatro')];
let playerScore = 0;
let computerScore = 0;
let totalScore = 0;


function rnd(max){
      return Math.floor(Math.random()*(max));
  };

function showWinner() {
  let result;
  let output = document.querySelector('.output');
        if (totalScore === 50){
            if(playerScore > (totalScore / 2)){
                    result = `Игрок выйграл с ${playerScore} очками!!!`
                    output.innerHTML = result
                }
                  if(computerScore > (totalScore / 2)){
                    result = `Компьютер выйграл с ${computerScore} очками!!!`
                         output.innerHTML = result
                }
                
                if(playerScore === (totalScore / 2)){
                  result = `Ну что ж - ничья!`
                       output.innerHTML = result
                }
        }
          return result;
  };

class Game {
      constructor(){}

      play = setInterval(() => {
          let index = rnd(quatrosArray.length);
              if(quatrosArray[index].className === 'quatro'){
                quatrosArray[index].classList.replace('quatro', 'active');
          };
       
          let changeColor = setTimeout(() =>{
            if (quatrosArray[index].className === 'active'){
              quatrosArray[index].classList.replace('active', 'computer');
              computerScore++;
              totalScore++;
            }
          }, interval);
        
          table.onclick = () => {
            let target = event.target;
            if (target.className !== 'active') return;
            quatrosArray[index].classList.replace('active', 'player');
            if (target.className === 'player'){
              playerScore++;
              totalScore++;
          }
          };

          if(totalScore === 50){
            clearInterval(this.play);
            console.log(totalScore);
            showWinner();
          };
          
        }, interval)
};