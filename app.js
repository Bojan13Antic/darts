let dartValue = ''
let dartType ='' 
let dartTypeIN = 'single'   
let dartTypeOUT = 'single'  
let playerID = 0
let player = []



function startGame() {   ///// FUNKCIJA ZA START IGRE I POSTAVLJANJE OSNOVIH PARAMETARA /// FUNCTION OF STARTING THE GAME AND SETTING BASIC PARAMETERS

    let playerCount = parseInt(document.querySelector('#playerCount').value)   /// parametar za broj igraca /// parameter for the number of players

    let startValue = parseInt(document.querySelector('#startValue').value) /// parametar za broj poena /// value of starting points

    let doubleIN = document.querySelector('#dartTypeIN')    /// parametar za double in vrednost /// parameter for double in value
    if (doubleIN.checked) {
        dartTypeIN = doubleIN.value
    }

    let doubleOUT = document.querySelector('#dartTypeOUT')  /// parametar za double out vrednost /// parameter for double out value
    if (doubleOUT.checked) {
        dartTypeOUT = doubleOUT.value
    }

    for (i=0; i<playerCount; i++) {  /// petlja za kreiranje objekta svakog igraca /// Loop for creating an object for each player
        player.push({
            playerID : 1,
            dartNumb : 0,
            dartTurn : 0,
            score : startValue
        })
        player[i].playerID = (i+1)
    }

    let startLog = document.querySelector('#start-log')  /// forma za dodavanje informacija o startovanoj igri /// form to add information about started game
    startLog.style.display = "block"
    let startChild = `<div>
                        <h2>THE GAME IS ON!</h2>
                        <p>Number of players: ${playerCount}</p>
                        <p>Number of points: ${startValue}</p>
                        <p>IN value: ${dartTypeIN}</p>
                        <p>OUT value: ${dartTypeOUT}</p>
                        <button onclick="restartGame()">Restart</button>
                    </div>`
    startLog.innerHTML = startChild

    let playerLog = document.querySelector('#player-log')  /// forma za dodavanje informacija o igracima /// form to add information about the players
    playerLog.style.display = "grid"
    let playerChild = ''
    for (i=0; i<playerCount; i++) {
        playerChild = playerChild + `<div class="player-single" id="player-id-${player[i].playerID}">
                                        <h3>Player ID: ${player[i].playerID}</h3>
                                        <p id="player-dart-${player[i].playerID}">Dart: ${player[i].dartNumb + 1}</p>
                                        <p id="player-score-${player[i].playerID}">Points: ${player[i].score}</p>
                                    </div>`
    }
    playerLog.innerHTML = playerChild

    document.querySelector('#start').style.display = "none"

}

let field = document.querySelectorAll('#g14')

field.forEach(function (curr) {
    curr.addEventListener("click", function (event) {
        let dartValue = event.target.getAttribute('data-value')
        let dartType = event.target.getAttribute('data-type')

        dartValue = parseInt(dartValue)
        
    if (dartType !== null) {

        if ((player[`${playerID}`].score === parseInt(startValue.value)) && (dartType !== dartTypeIN) && (document.querySelector('#dartTypeIN').checked)) {    /// upitnik za Double IN /// question for Double IN
            errorLog('FAULT! First dart has to be in the DOUBLE field')    /// greska u slucaju pogresnog INa a IN postoji i strelica JESTE prva /// error in case of a false IN but IN exists and the dart IS the first
      
            player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica // darts counter
            document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Dart: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica // LOG the number of darts
            if (player[`${playerID}`].dartNumb % 3 == 0) {
            player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova // turn counter
            changePlayer()              /// menja igraca jer je bacio 3 strelice /// changing the active player because throwing all 3 darts in one turn
            }
        } else {
                    currValue = player[`${playerID}`].score - dartValue
                    if (currValue < 0) {
            errorLog('FAULT! You crossed maximum points. Next player!')
            changePlayer()                              /// menja igraca jer je prebacio /// chaging the active player because points are over the maximum
                    } else if (currValue > 1) {
                        player[`${playerID}`].score = currValue
                        document.querySelector(`#player-score-${playerID + 1}`).innerHTML = `Points: ${player[`${playerID}`].score}`     // LOG preostali potrebi poeni za igraca // LOG needed points left to win
                        player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica // darts counter
                        document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Dart: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica // LOG the number of darts
                            if (player[`${playerID}`].dartNumb % 3 == 0) {
                            player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova // turn counter
                            changePlayer()              /// menja igraca jer je bacio 3 strelice /// changing the active player because throwing all 3 darts in one turn
                    }
                    } else {
                        if (currValue === 0) {
                            if (dartTypeOUT === 'single') {
                                player[`${playerID}`].score = currValue
                                endGame(playerID)
                            } else {
                                if (dartType === dartTypeOUT) {
                                player[`${playerID}`].score = currValue
                                endGame(playerID)
                                } else {
                                    errorLog('FAULT! The dart has to be in the field ' + dartTypeOUT + '. Next player!')
                                    changePlayer()                                  /// menja igraca jer nije double out /// changing the active player because of false double out value
                                }
                            }
                        } else {
                            if (dartTypeOUT === 'single') {
                                player[`${playerID}`].score = currValue
                                document.querySelector(`#player-score-${playerID + 1}`).innerHTML = `Points: ${player[`${playerID}`].score}`     // LOG preostali potrebi poeni za igraca // LOG needed points left to win
                                player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica
                                document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Dart: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica // LOG the number of darts
                                    if (player[`${playerID}`].dartNumb % 3 == 0) {
                                player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova // turn counter
                                changePlayer()              /// menja igraca jer je bacio 3 strelice /// changing the active player because throwing all 3 darts in one turn
                            }
                            } else {
                                errorLog('FAULT! In this case the number of left points cannot be 1. Next player!')
                                changePlayer()      /// menja igraca jer na doubleOUT ne moze da ostane 1 na kraju /// changing the active player because it is fault to left 1 at doubleOUT
                            }
                        }      
                    }
                }
    } else {
        errorLog('False clicked. Try to click on the field, not on the line')    /// greska u slucaju pogresnog kliktanja /// error in case of wrong click
    }
                })
            })

function changePlayer() {   /// FUNKCIJA PROMENE IGRACA /// FUNCTION OF CHANGING THE ACTIVE PLAYER
    if (playerID < player.length-1) {
        destylePlayer(playerID)
        playerID = playerID + 1
        stylePlayer(playerID)
        } else {
        destylePlayer(playerID)
        playerID = 0
        stylePlayer(playerID)
        }
    }

function endGame(ID) {    /// FUNKCIJA ZA ZAVRSETAK IGRE /// FUNCTION OF ENDING THE GAME
    document.querySelector('#win-log').style.display = "flex"
    document.querySelector('#win-log').innerHTML = `<h2>VICTORY!!! Player ${(ID + 1)} has won!</h2>
                                                        <button onclick="restartGame()">New game</button>`
    document.querySelector('#start-log').innerHTML = ""
    document.querySelector('#start-log').style.display = "none"
}

function restartGame() {
    dartValue = '';
    dartType ='' 
    dartTypeIN = 'single'   
    dartTypeOUT = 'single'  
    playerID = 0
    player = []

    document.querySelector('#start').style.display = "flex"
    document.querySelector('#win-log').style.display = "none"
    document.querySelector('#win-log').innerHTML = ""
    document.querySelector('#player-log').style.display = "none"
    document.querySelector('#player-log').innerHTML = ""
    document.querySelector('#start-log').style.display = "none"
    document.querySelector('#start-log').innerHTML = ""
    
}

function stylePlayer(playerID) {
    let singleStyle = document.querySelector(`#player-id-${playerID+1}`)
    singleStyle.style.border = "solid red 2px"
    singleStyle.style.borderRadius = "0.25rem"
    singleStyle.style.boxShadow = "0 10px 10px rgba(0,0,0,0.3)"
}

function destylePlayer(playerID) {
    player[`${playerID}`].dartNumb = 0
    let singleStyle = document.querySelector(`#player-id-${playerID+1}`)
    singleStyle.style.border = "none"
    singleStyle.style.boxShadow = "none"
    document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Dart: ${player[`${playerID}`].dartNumb + 1}`
}

function errorLog(errorText) {
    errorField = document.querySelector('#error-log')
    errorField.style.display = "block"
    errorField.innerHTML = `<h3>${errorText}</h3>`
    setTimeout(() => {
        errorField.style.display = "none"
        errorField.innerHTML = ''
    }, "5000")
}