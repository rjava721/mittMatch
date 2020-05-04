// the code does not handle any shuffling
// the first next-card should be set to fa-atom in order to the program to work 
// however, 2 cards cannot be clicked at the same time
// the restart button unflips every card on the right side and resets the score but does not refresh the next-card (bug)
// the cards match successfully and next-card updates in the order of the given array


// parent element of all cards on the right
const deck = document.getElementById('cards');

// the card on the left
const nextCard = document.getElementById('next-card');

// array like structure that stores the classe names of #next-card, will be used to update next-card 
const leftCardTokenList = nextCard.firstElementChild.classList;

// array the 2 cards we want to check, left one and the right one
const openCards = [];

// count as a score
let score = document.getElementById('score');
let count = 0;
score.innerHTML = count;

// variable to make sure only one card is clicked at a time
let cardOpened = false;

// boolean to keep track of when 2 cards are the same, then update next-card, note : next-card is leftCard in terms of variable names
leftCardMatch = false;

// will attach an eventListener and reset at every click
let restartButton = document.querySelector('div.restart');

// array of all the next cards for updating the left-side
let allCards = ["fa-frog","fa-feather-alt","fa-cogs","fa-anchor","fa-fan","fa-bolt","fa-hat-wizard","fa-apple-alt","fa-bell","fa-bomb","fa-brain"];


// method to execute whenever a card on the deck is clicked
deck.addEventListener('click', function(e) {
  
  //if its an unopened card
  if (e.target.nodeName === 'LI' && !(e.target.classList.contains('show')) && !(e.target.classList.contains('matched'))) {

    // if the LI is a card and it has not been opened
    if (e.target.classList.contains('card') && cardOpened === false) {
      e.target.classList.add('show');// flip the card
      cardOpened = true;// the card is open

      // increase score and add the right and left icon elements inside an array that will compare to match them
      if (cardOpened = true) {
        count++;// increase the score
        score.innerHTML = count;

        openCards.length = 0;// empty the array, to avoid bugs
        openCards.push(e.target);// insert the element in an array
        openCards.push(nextCard);// insert as well, to compare both cards
        
        setTimeout (function() {

          if (openCards.length === 2) {
      
            // trim() does not change the original string
            // now matching the elements that are inside the array
            if (openCards[0].innerHTML.trim() === openCards[1].innerHTML.trim()) {
              e.target.classList.add('matched');// change the right side to new color and lock it down
              leftCardMatch = true;// both cards are the same
              updateLeftCard();
              cardOpened = false;// reset and restart the process of selecting a card and checking it

              // should use a forEach loop inside deck if all of them contain matched then alert
              if(count >= 12) {
                alert (`You won, it only took you ${count} moves`);
              }
              
            } else {
            // the two cards don't match
            e.target.classList.remove('show');// unflip the curent card 
            cardOpened = false;
            openCards.length = 0;//clear array
            }

          } else { 
            // the array length is not 2
            openCards.length = 0;
            e.target.classList.remove('show');
            cardOpened = false;
          }
        },500);
      }
    }
  }
});


// bug alert - because could not work on shuffling
// there aren't 12 elements inside the array
// the first icon on the left side is fa-atom
// and having it in the array causes the icon not to update
// that is because once 2 cards are matched,
// the same icon should not be added to the token list
// that is why fa-atom got removed.
let updateLeftCard = function () {
  for (let i = 0; i < allCards.length; i++) {

    if (leftCardMatch) {
      leftCardTokenList.replace(`${leftCardTokenList[1]}`,`${allCards[i]}`);//takes the exact current token fa-currentIcon and sets it a new icon
      allCards.shift();//shift() removes the first element of the array
      leftCardMatch = false;// set it to false to stop the loop. otherwise the loop goes on till the end of the array and it the left side won't update
    }
  }  
}

// handling the restart button
restartButton.addEventListener('click', function () {
  score.innerHTML = 0;// reset the score
  count = 0;

  for (let i = 0; i < deck.children.length; i++) {

    if (deck.children[i].classList.contains('matched')) {
      deck.children[i].classList.remove('matched','show');// unflip all flipped cards
      
      
      // once all cards are matched, click on brain again, next card becomes atom
      if (leftCardTokenList[1]==='fa-brain') {
        leftCardTokenList[1].replace('fa-brain','fa-atom');
        allCards = ["fa-atom","fa-frog","fa-feather-alt","fa-cogs","fa-anchor","fa-fan","fa-bolt","fa-hat-wizard","fa-apple-alt","fa-bell","fa-bomb","fa-brain"];// reset the array again because it got emptied inside updateLeftCard()
      }
    }
  }
});


// could not shuffle
// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}