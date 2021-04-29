document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const newGame = document.querySelector('#newGame')
    const resetGame = document.querySelector('#resetGame')
    const width = 4
    let squares = []
    let score = 0

    //gamePlay



    newGame.addEventListener("click", (MouseEvent) => {
        event.preventDefault();
        function createBoard() {
            for (let i = 0; i < width * width; i++) {
                const square = document.createElement('div');
                square.innerText = ""
                square.style.border = "1px solid black";
                square.style.borderRadius = "10px";
                square.style.margin = "1px";

                gridDisplay.appendChild(square)
                squares.push(square)
            }
            generate()
            generate()
        }

        createBoard()
    });


    // random numbers

    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares [randomNumber].innerText == 0) {
            squares[randomNumber].innerText = 2
            checkForGameOver()
        } else generate()
    }

    // swipe right

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerText
                let totalTwo = squares[i + 1].innerText
                let totalThree = squares[i + 2].innerText
                let totalFour = squares[i + 3].innerText

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                console.log(row)

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zero = Array(missing).fill(0)

                let newRow = zero.concat(filteredRow)
                squares[i].innerText = newRow[0]
                squares[i + 1].innerText = newRow[1]
                squares[i + 2].innerText = newRow[2]
                squares[i + 3].innerText = newRow[3]
            }
        }
    }


    //move left

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerText
                let totalTwo = squares[i + 1].innerText
                let totalThree = squares[i + 2].innerText
                let totalFour = squares[i + 3].innerText

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                console.log(row)

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerText = newRow[0]
                squares[i + 1].innerText = newRow[1]
                squares[i + 2].innerText = newRow[2]
                squares[i + 3].innerText = newRow[3]

            }
        }
    }


    // swipe down

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerText
            let totalTwo = squares[i + width].innerText
            let totalThree = squares[i + (width * 2)].innerText
            let totalFour = squares[i + (width * 3)].innerText

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerText = newColumn[0]
            squares[i + width].innerText = newColumn[1]
            squares[i + (width * 2)].innerText = newColumn[2]
            squares[i + (width * 3)].innerText = newColumn[3]
        }
    }


    // swipe up

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerText
            let totalTwo = squares[i + width].innerText
            let totalThree = squares[i + (width * 2)].innerText
            let totalFour = squares[i + (width * 3)].innerText

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerText = newColumn[0]
            squares[i + width].innerText = newColumn[1]
            squares[i + (width * 2)].innerText = newColumn[2]
            squares[i + (width * 3)].innerText = newColumn[3]
        }
    }


    function combineRows() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerText === squares[i + 1].innerText) {
                let combinedTotal = parseInt(squares[i].innerText) + parseInt(squares[i + 1].innerText)
                squares[i].innerText = combinedTotal
                squares[i + 1].innerText = 0
                score += combinedTotal
                scoreDisplay.innerText = score;

            }
        }
        checkForWin()
    }

    function combineColumns() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerText === squares[i + width].innerText) {
                let combinedTotal = parseInt(squares[i].innerText) + parseInt(squares[i + width].innerText)
                squares[i].innerText = combinedTotal
                squares[i + width].innerText = 0
                score += combinedTotal
                scoreDisplay.innerText = score;

            }
        }
        checkForWin()
    }

    //assigned keycode

    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }

    document.addEventListener('keyup', control)


    function keyRight() {
        moveRight()
        combineRows()
        moveRight()
        generate()
    }


    function keyLeft() {
        moveLeft()
        combineRows()
        moveLeft()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumns()
        moveDown()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumns()
        moveUp()
        generate()
    }


    // check for the number 2048 in the squares to win

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerText == 2048) {
                resultDisplay.innerText = alert('You Win');
                document.removeEventListener('keyup', control)
            }
        }
    }

    // if no zeros on board to lose

    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerText == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerText = alert('You Lose')
            document.removeEventListener('keyup', control)
        }

    }

    //leaderboard , not working

    let playerName = prompt("Enter you Name");

    let playerArray = [
        {name: playerName.value, score: score.value},
        {name: playerName.value, score: score.value},
        {name: playerName.value, score: score.value},
        {name: playerName.value, score: score.value},
        {name: playerName.value, score: score.value}
    ];

    function helloPlayer() {
        let player = document.getElementById('helloPlayer')
        let Hello = document.createElement('span');

        Hello.innerText = ('Hi There') + " " + playerName + " " + "Let's play";
        player.appendChild(Hello)


    }
    helloPlayer()

    console.log(playerName)

    function updateLeaderboardView() {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = playerArray[{name: playerName[1]}]; // null

        playerArray.sort(function (a, b) {
            return b.score - a.score
        });


        for (let i = 0; i < score.length; i++) {
            let name = document.createElement("div");
            let score = document.createElement("div");
            name.classList.add("name");
            score.classList.add("score");

            name.innerText = playerArray[i].name;
            score.innerText = playerArray[i].score;

            let scoreRow = document.createElement("div");

            scoreRow.appendChild(name);
            scoreRow.appendChild(score);
            leaderboard.appendChild(scoreRow);

            score.push(scoreRow);
        }
    }
    updateLeaderboardView()
    newGame.removeEventListener("click", (MouseEvent))
})
