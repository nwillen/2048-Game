export default class Game {

    constructor(size) {
        this.size = size
        this.board = []
        this.score = 0
        this.won = false
        this.over = false
        this.setupNewGame()
        this.moveObservers = []
        this.loseObservers = []
        this.winObservers = []
        this.recent = -1
        this.animationSchedule = []
        this.animating = false
    }

    setupNewGame() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.board[i] = 0
        }
        this.score = 0
        this.won = false
        this.over = false
        this.addTile()
        this.addTile()
    }

    addTile() {
        let slot = -1
        do {
            slot = Math.floor(Math.random() * this.size * this.size)
        } while (this.board[slot] != 0)
        if (Math.floor(Math.random() * 10) > 0) {
            this.board[slot] = 2
        } else {
            this.board[slot] = 4
        }
        this.recent = slot
    }

    loadGame(gameState) {
        this.board = gameState.board
        this.score = gameState.score
        this.won = gameState.won
        this.over = gameState.over
    }

    move(direction) {
        let board_copy = [...this.board]
        switch (direction) {
            case "up":
                for (let i = 0; i < this.size; i++) {
                    let compare = i
                    for (let j = i + this.size; j <= i + this.size * (this.size - 1); j += this.size) {
                        if (this.board[compare] == this.board[j] && this.board[compare] != 0) {
                            this.score += this.board[compare] * 2
                            this.board[compare] = this.board[compare] * 2
                            this.board[j] = 0
                            this.animationSchedule.push({start:j, end: compare, direction:"up"})
                            compare = j
                        } else if (this.board[j] != 0) {
                            compare = j
                        }
                    }
                }

                for (let k = 0; k < this.size; k++) {
                    for (let i = 0; i < this.size; i++) {
                        let open = -1
                        for (let j = i; j <= i + this.size * (this.size - 1); j += this.size) {
                            if (this.board[j] == 0 && open == -1) {
                                open = j
                            }
                            if (open != -1 && this.board[j] != 0) {
                                this.board[open] = this.board[j]
                                this.board[j] = 0
                                this.animationSchedule.push({start:j, end:open, direction:"up"})

                                open = -1
                            }
                        }
                    }
                }
                break
            case "down":
                for (let i = this.size * (this.size - 1); i < this.size * this.size; i++) {
                    let compare = i
                    for (let j = i - this.size; j >= i % this.size; j -= this.size) {
                        if (this.board[compare] == this.board[j] && this.board[compare] != 0) {
                            this.score += this.board[compare] * 2
                            this.board[compare] = this.board[compare] * 2
                            this.board[j] = 0
                            this.animationSchedule.push({start:j, end: compare, direction:"down"})
                            compare = j
                        } else if (this.board[j] != 0) {
                            compare = j
                        }
                    }
                }

                for (let k = 0; k < this.size; k++) {
                    for (let i = this.size * (this.size - 1); i < this.size * this.size; i++) {
                        let open = -1
                        for (let j = i; j >= i % this.size; j -= this.size) {
                            if (this.board[j] == 0 && open == -1) {
                                open = j
                            }
                            if (open != -1 && this.board[j] != 0) {
                                this.board[open] = this.board[j]
                                this.board[j] = 0
                                this.animationSchedule.push({start:j, end:open, direction:"down"})
                                open = -1
                            }
                        }
                    }
                }
                break
            case "right":
                for (let i = this.size - 1; i < this.size * this.size; i += this.size) {
                    let compare = i
                    for (let j = i - 1; i - j != this.size; j--) {
                        if (this.board[compare] == this.board[j] && this.board[compare] != 0) {
                            this.score += this.board[compare] * 2
                            this.board[compare] = this.board[compare] * 2
                            this.board[j] = 0
                            this.animationSchedule.push({start:j, end: compare, direction:"right"})
                            compare = j
                        } else if (this.board[j] != 0) {
                            compare = j
                        }
                    }
                }

                for (let k = 0; k < this.size; k++) {
                    for (let i = this.size - 1; i < this.size * this.size; i += this.size) {
                        let open = -1
                        for (let j = i; i - j != this.size; j--) {
                            if (this.board[j] == 0 && open == -1) {
                                open = j
                            }
                            if (open != -1 && this.board[j] != 0) {
                                this.board[open] = this.board[j]
                                this.board[j] = 0
                                this.animationSchedule.push({start:j, end:open, direction:"right"})
                                open = -1
                            }
                        }
                    }
                }
                break
            case "left":
                for (let i = 0; i <= this.size * (this.size - 1); i += this.size) {
                    let compare = i
                    for (let j = i + 1; j - i != this.size; j++) {
                        if (this.board[compare] == this.board[j] && this.board[compare] != 0) {
                            this.score += this.board[compare] * 2
                            this.board[compare] = this.board[compare] * 2
                            this.board[j] = 0
                            this.animationSchedule.push({start:j, end: compare, direction:"left"})
                            compare = j
                        } else if (this.board[j] != 0) {
                            compare = j
                        }
                    }
                }

                for (let k = 0; k < this.size; k++) {
                    for (let i = 0; i <= this.size * (this.size - 1); i += this.size) {
                        let open = -1
                        for (let j = i; j - i != this.size; j++) {
                            if (this.board[j] == 0 && open == -1) {
                                open = j
                            }
                            if (open != -1 && this.board[j] != 0) {
                                this.board[open] = this.board[j]
                                this.board[j] = 0
                                this.animationSchedule.push({start:j, end:open, direction:"left"})
                                open = -1
                            }
                        }
                    }
                }
                break
        }
        let testMove = true
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] != board_copy[i]) {
                testMove = false
            }
        }
        if (this.board.includes(2048)) {
            this.won = true
            this.winObservers.forEach(fn => fn(this.getGameState()))
        }
        if (!testMove) {
            this.addTile()
            this.moveObservers.forEach(fn => fn(this.getGameState()))
        }
        let testFull = true
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == 0) {
                testFull = false
            }
        }
        for (let i = 0; i < this.size; i++) {
            for (let j = i; j < i + this.size * (this.size - 1); j += this.size) {
                if (this.board[j] == this.board[j + this.size]) {
                    testFull = false
                }
            }
        }
        for (let i = 0; i <= this.size * (this.size - 1); i += this.size) {
            for (let j = i; j - i != this.size - 1; j++) {
                if (this.board[j] == this.board[j + 1]) {
                    testFull = false
                }
            }
        }

        if (testFull) {
            this.over = true
            this.loseObservers.forEach(fn => fn(this.getGameState()))
        }
    }

    toString() {
        let output = ""
        let count = this.size - 1
        for (let i = 0; i < this.size * this.size; i++) {
            output += this.board[i] + " "
            if (i == count) {
                output += "\n"
                count += this.size
            }
        }
        return output
    }

    onMove(callback) {
        this.moveObservers.push(callback)
    }

    onWin(callback) {
        this.winObservers.push(callback)
    }

    onLose(callback) {
        this.loseObservers.push(callback)
    }

    getGameState() {
        let gameState = { board: this.board, score: this.score, won: this.won, over: this.over }
        return gameState
    }

    getRecent() {
        return this.recent;
    }
}



