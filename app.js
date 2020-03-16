/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

- If a player draws two 6's in a row, they lose their entire score. After that, it's the next player's turn.
- Use two die
- Allow the players to input what the max score needs to be
*/
var scores, roundScore, activePlayer, dice, gamePlaying, maxScore;

init();

//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

// setter - set a value
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// getter - get a value
//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function() {
    // do something here 
    if (gamePlaying) {
        // 1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        //var diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number is NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            if ((dice1 === 6) && (dice2 === 6)) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                //Add score
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            //Next player
            nextPlayer();
        } 
        
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current core with to the players global score
        scores[activePlayer] += roundScore;
            
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        // Undefined, 0, null or "" are COERCED to false
        if (input) {
            maxScore = input
       } else {
           maxScore = 100;
       }

        // Check if the player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // update the UI
            nextPlayer();
        }
    }


});

//just passing function to Event Listener - call back function
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
        //document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        // Instead use toggle
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //document.getElementById('dice-1').style.display = 'none';
        //document.getElementById('dice-2').style.display = 'none';
}

function init() {
    gamePlaying = true;
    // Reset score to 0
    scores = [0,0];
    // Set active Player to Player 0
    activePlayer = 0;
    // Reset roundScore
    roundScore = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove all to ensure no active classes are set
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');


    document.querySelector('.player-0-panel').classList.add('active');

}


