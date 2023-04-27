let dartValue = ''
let dartType ='' 
let dartTypeIN = 'single'   
let dartTypeOUT = 'single'  
let playerID = 0
let player = []



function startGame() {   ///// FUNKCIJA ZA START IGRE I POSTAVLJANJE OSNOVIH PARAMETARA

    let playerCount = parseInt(document.querySelector('#playerCount').value)   /// parametar za broj igraca

    let startValue = parseInt(document.querySelector('#startValue').value) /// parametar za broj poena

    let doubleIN = document.querySelector('#dartTypeIN')    /// parametar za double in vrednost
    if (doubleIN.checked) {
        dartTypeIN = doubleIN.value
    }

    let doubleOUT = document.querySelector('#dartTypeOUT')  /// parametar za double out vrednost
    if (doubleOUT.checked) {
        dartTypeOUT = doubleOUT.value
    }

    for (i=0; i<playerCount; i++) {  /// petlja za kreiranje objekta svakog igraca
        player.push({
            playerID : 1,
            dartNumb : 0,
            dartTurn : 0,
            score : startValue
        })
        player[i].playerID = (i+1)
    }

    let startLog = document.querySelector('#start-log')  /// forma za dodavanje informacija o startovanoj igri
    startLog.style.display = "block"
    let startChild = `<div>
                        <h2>STARTOVANA IGRA!</h2>
                        <p>Broj igrača: ${playerCount}</p>
                        <p>Broj poena je: ${startValue}</p>
                        <p>IN je: ${dartTypeIN}</p>
                        <p>OUT je: ${dartTypeOUT}</p>
                        <button onclick="restartGame()">Restart</button>
                    </div>`
    startLog.innerHTML = startChild

    let playerLog = document.querySelector('#player-log')  /// forma za dodavanje informacija o igracima
    playerLog.style.display = "grid"
    let playerChild = ''
    for (i=0; i<playerCount; i++) {
        playerChild = playerChild + `<div class="player-single" id="player-id-${player[i].playerID}">
                                        <h3>Igrač broj: ${player[i].playerID}</h3>
                                        <p id="player-dart-${player[i].playerID}">Strelica: ${player[i].dartNumb + 1}</p>
                                        <p id="player-score-${player[i].playerID}">Poeni: ${player[i].score}</p>
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

        if ((player[`${playerID}`].score === parseInt(startValue.value)) && (dartType !== dartTypeIN) && (document.querySelector('#dartTypeIN').checked)) {    /// upitnik za Double IN
            errorLog('Pogodak nije validan! Prva strelica mora da padne u polje double')    /// greska u slucaju pogresnog INa a IN postoji i strelica JESTE prva
      
            player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica
            document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Strelica: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica
            if (player[`${playerID}`].dartNumb % 3 == 0) {
            player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova
            changePlayer()              /// menja igraca jer je bacio 3 strelice
            }
        } else {
                    currValue = player[`${playerID}`].score - dartValue
                    if (currValue < 0) {
            errorLog('Pogodak nije validan! Prebacili ste broj potrebnih poena. Na potezu je sledeći igrač.')
            changePlayer()                              /// menja igraca jer je prebacio
                    } else if (currValue > 1) {
                        player[`${playerID}`].score = currValue
                        document.querySelector(`#player-score-${playerID + 1}`).innerHTML = `Poeni: ${player[`${playerID}`].score}`     // LOG preostali potrebi poeni za igraca
                        player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica
                        document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Strelica: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica
                            if (player[`${playerID}`].dartNumb % 3 == 0) {
                            player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova
                            changePlayer()              /// menja igraca jer je bacio 3 strelice
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
                                    errorLog('Pogodak nije validan! Strelica mora da zavriši u polje ' + dartTypeOUT + '. Na potezu je sledeći igrač.')
                                    changePlayer()                                  /// menja igraca jer nije double out
                                }
                            }
                        } else {
                            if (dartTypeOUT === 'single') {
                                player[`${playerID}`].score = currValue
                                document.querySelector(`#player-score-${playerID + 1}`).innerHTML = `Poeni: ${player[`${playerID}`].score}`     // LOG preostali potrebi poeni za igraca
                                player[`${playerID}`].dartNumb = player[`${playerID}`].dartNumb +1 // brojac strelica
                                document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Strelica: ${player[`${playerID}`].dartNumb + 1}`    // LOG broj strelica
                                    if (player[`${playerID}`].dartNumb % 3 == 0) {
                                player[`${playerID}`].dartTurn = player[`${playerID}`].dartTurn + 1 // brojac krugova
                                changePlayer()              /// menja igraca jer je bacio 3 strelice
                            }
                            } else {
                                errorLog('Pogodak nije validan! U ovom slučaju broj preostalih poena mora biti deljiv sa 2. Na potezu je sledeći igrač.')
                                changePlayer()      /// menja igraca jer na doubleOUT ne moze da ostane 1 na kraju
                            }
                        }      
                    }
                }
    } else {
        errorLog('Kliknuli ste na liniju. Trudite se da kliknete na odgovarajuće polje')    /// greska u slucaju pogresnog kliktanja
    }
                })
            })

function changePlayer() {   /// FUNKCIJA PROMENE IGRACA
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

function endGame(ID) {    /// FUNKCIJA ZA ZAVRSETAK IGRE
    document.querySelector('#win-log').style.display = "flex"
    document.querySelector('#win-log').innerHTML = `<h2>POBEDA!!! Pobedio je igrač broj ${(ID + 1)}</h2>
                                                        <button onclick="restartGame()">Nova igra</button>`
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
    document.querySelector(`#player-dart-${playerID + 1}`).innerHTML = `Strelica: ${player[`${playerID}`].dartNumb + 1}`
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