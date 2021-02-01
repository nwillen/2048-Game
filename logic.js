import Game from "/game.js"

function init() {

    let game = new Game(4)
    game.setupNewGame()

    let _board = document.createElement('table')
    _board.id = 'board'
    _board.setAttribute('border', 1)
    _board.setAttribute('cellspacing', 6)

    let counter = 0
    for (let i = 0; i < 4; i++) {
        let row = document.createElement('tr')
        _board.appendChild(row)
        for (let j = 0; j < 4; j++) {
            let cell = document.createElement('td')
            cell.setAttribute('height', 90)
            cell.setAttribute('width', 90)
            cell.setAttribute('align', 'center')
            cell.setAttribute('valign', 'center')
            cell.id = counter
            counter++
            row.appendChild(cell)
        }
    }

    document.getElementById('2048game').appendChild(_board)
    updateBoard(game.getGameState())
    game.onWin(function () {
        let winner = document.createElement('p')
        winner.innerHTML = "You Win!"
        document.getElementById('data').appendChild(winner)
    })

    game.onLose(function () {
        let loser = document.createElement('p')
        loser.innerHTML = "Game Over :("
        document.getElementById('data').appendChild(loser)
    })

    document.addEventListener('keydown', function (event) {
        if (!game.won && !game.over) {
            switch (event.code) {
                case 'ArrowRight':
                    game.move('right')
                    updateBoard(game.getGameState())
                    break;
                case 'ArrowLeft':
                    game.move('left')
                    updateBoard(game.getGameState())
                    break
                case 'ArrowDown':
                    game.move('down')
                    updateBoard(game.getGameState())
                    break
                case 'ArrowUp':
                    game.move('up')
                    updateBoard(game.getGameState())
                    break
            }
        }
        let clone = document.getElementById(game.getRecent()).cloneNode(true)
        document.getElementById(game.getRecent()).parentNode.replaceChild(clone, document.getElementById(game.getRecent()))
    })

    document.getElementById('reset').addEventListener('click', function () {
        game.setupNewGame()
        updateBoard(game.getGameState())
        document.getElementById('loser').remove()
        document.getElementById('winner').remove()
    })

    function updateBoard(gameState) {
        let colors = ["holder", "#7d95bd", "#42c7a8", "#9070c4", "#cf6399", "#bce8b5", "#7dbdb1", "#b4d46a", "#f2b783", "#7bcce3", "#e37b7b", "#782424"]

        document.getElementById('board').remove()
        let _board = document.createElement('table')
        _board.id = 'board'
        _board.setAttribute('border', 1)
        _board.setAttribute('cellspacing', 6)
        let counter = 0
        for (let i = 0; i < 4; i++) {
            let row = document.createElement('tr')
            _board.appendChild(row)
            for (let j = 0; j < 4; j++) {
                let cell = document.createElement('td')
                cell.setAttribute('height', 90)
                cell.setAttribute('width', 90)
                cell.setAttribute('align', 'center')
                cell.setAttribute('valign', 'center')
                cell.style.transition = 'all .15s'
                cell.id = counter
                counter++
                
                row.appendChild(cell)
            }
        }
        document.getElementById('2048game').appendChild(_board)
        //--------------//
        for (let i = 0; i < 16; i++) {
            if (gameState.board[i] != 0) {
                document.getElementById(i).innerHTML = gameState.board[i]
                document.getElementById(i).style.background = colors[Math.log2(gameState.board[i])]
            } else {
                document.getElementById(i).innerHTML = ""
                document.getElementById(i).style.background = "lightgray"
            }
        }
        document.getElementById('score').innerHTML = "Score: " + gameState.score
    }
}


init()