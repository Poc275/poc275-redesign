// normalised letter distributions - http://www.thecountdownpage.com/letters.htm
var vowels = ['A', 'A', 'A', 
                'E', 'E', 'E', 'E', 
                'I', 'I', 'I',
                'O', 'O', 'O',
                'U'];

var consonants = ['B', 'B',
                    'C', 'C', 'C',
                    'D', 'D', 'D', 'D', 'D', 'D',
                    'F', 'F',
                    'G', 'G', 'G',
                    'H', 'H',
                    'J', 
                    'K', 
                    'L', 'L', 'L', 'L', 'L',
                    'M', 'M', 'M', 'M',
                    'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
                    'P', 'P', 'P', 'P',
                    'Q', 
                    'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R',
                    'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S',
                    'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T',
                    'V',
                    'W',
                    'X', 
                    'Y',
                    'Z'];

var letters = "";
var cells = document.getElementsByClassName('boardTile');
var pick = 0;
var timer = 30;

var httpRequest;
var associativeWordList = new Array(119703);
var wordList = [];

var draggedTile;
var clockTimerId;

var resultsPara = document.getElementById('results');
var canvas = document.getElementById('clock');
var canvasContext = canvas.getContext('2d');


// load dictionary
readDictionaryFile();

initialise();


function readDictionaryFile() {
    // cross browser AJAX test
    if (window.XMLHttpRequest) {
        // Firefox, Chrome, Safari, Opera
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }

    if (!httpRequest) {
        // cannot create an AJAX instance
    }

    httpRequest.onreadystatechange = getContents;
    httpRequest.open("GET", "dict.txt");
    httpRequest.send();
}


function getContents() {
    try {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var contents = httpRequest.responseText;
                wordList = contents.split(/\r\n|\r|\n/g);
                buildAssociativeArray();
            } else {
                alert("There was a problem with the request");
            }
        }
    }
    catch(e) {
        alert(e.Description);
    }
}


function buildAssociativeArray() {
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i];
        associativeWordList[word] = word;
    }
}


function newGameButtonClick() {
    // re-enable buttons
    var buttons = document.getElementsByClassName('letter-buttons');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

    // reset clock
    clearInterval(clockTimerId);
    timer = 30;

    canvasContext.clearRect(0, 0, 250, 250);
    canvasContext.beginPath();
    canvasContext.moveTo(125, 125);
    canvasContext.lineTo(125, 10);
    canvasContext.stroke();

    // clear game/board tiles
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].style.backgroundColor = "#c0c0c0";
    }

    var playerCells = document.getElementsByClassName('playerTile');
    for (var i = 0; i < playerCells.length; i++) {
        playerCells[i].textContent = '';
        playerCells[i].style.backgroundColor = "#c0c0c0";
    }

    // reset pick and letters
    pick = 0;
    letters = "";

    // reset and hide results
    resultsPara.innerHTML = "";
    resultsPara.style.visibility = 'hidden';
}


function vowelButtonClick() {
    var letter = vowels[getRandomNumber("vowel")];
    letters += letter;
    cells[pick].textContent = letter;
    cells[pick].style.backgroundColor = "#56a6fc";
    pick++;

    if (pick >= 9) {
        startGame();
    }
}


function consonantButtonClick() {
    var letter = consonants[getRandomNumber("consonant")];
    letters += letter;
    cells[pick].textContent = letter;
    cells[pick].style.backgroundColor = "#56a6fc";
    pick++;

    if (pick >= 9) {
        startGame();
    }
}


function initialise() {
    if (Modernizr.draganddrop) {
        var boardTiles = document.getElementsByClassName('boardTile');
        var playerTiles = document.getElementsByClassName('playerTile');
        for (var i = 0; i < boardTiles.length; i++) {
            boardTiles[i].setAttribute('draggable', 'true');
            boardTiles[i].addEventListener('dragstart', boardTileDragStart, false);
            boardTiles[i].addEventListener('dragenter', boardTileDragEnter, false);
            boardTiles[i].addEventListener('dragover', boardTileDragOver, false);
            boardTiles[i].addEventListener('dragleave', boardTileDragLeave, false);
            boardTiles[i].addEventListener('drop', boardTileDrop, false);
            boardTiles[i].addEventListener('dragend', boardTileDragEnd, false);

            playerTiles[i].setAttribute('draggable', 'true');
            playerTiles[i].addEventListener('dragstart', boardTileDragStart, false);
            playerTiles[i].addEventListener('dragenter', boardTileDragEnter, false);
            playerTiles[i].addEventListener('dragover', boardTileDragOver, false);
            playerTiles[i].addEventListener('dragleave', boardTileDragLeave, false);
            playerTiles[i].addEventListener('drop', boardTileDrop, false);
            playerTiles[i].addEventListener('dragend', boardTileDragEnd, false);
        }
    } else {
        // TODO - need a library backup
        alert("This browser doesn't support drag and drop, functionality will therefore be limited");
    }

    // initialise canvas
    canvasContext.strokeStyle = '#000';
    canvasContext.moveTo(125, 125);
    canvasContext.lineTo(125, 10);
    canvasContext.stroke();
}


function boardTileDragStart(e) {
    e.target.style.opacity = '0.4';
    e.dataTransfer.setData("text/plain", e.target.textContent);
    draggedTile = e.target;
}


function boardTileDragEnter(e) {
    
}


function boardTileDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}


function boardTileDragLeave(e) {
    
}


function boardTileDrop(e) {
    e.preventDefault();
    var text = e.dataTransfer.getData("text/plain");
    // swap letters around
    draggedTile.textContent = e.target.textContent;
    e.target.textContent = text;
}


function boardTileDragEnd(e) {
    e.target.style.opacity = '1';
    
}


function getRandomNumber(type) {
    if (type === "vowel") {
        return Math.floor(Math.random() * vowels.length);
    } else if (type === "consonant") {
        return Math.floor(Math.random() * consonants.length);
    }
}

function startGame() {
    // disable the buttons and start the clock
    var buttons = document.getElementsByClassName('letter-buttons');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    clockTimerId = setInterval(updateClock, 1000);

    // find possible words from the letters - on a new thread
    if (!!window.Worker) {
        var wordFinderWorker = new Worker("wordFinder.js");
        var workerData = {
            board: letters,
            words: associativeWordList
        };
        wordFinderWorker.postMessage(workerData);

        wordFinderWorker.onmessage = function (e) {
            var computerWords = e.data;

            if (computerWords.length > 0) {
                resultsPara.innerHTML = "The computer found " + computerWords.length + " words 🎉<br />The longest word/s were:<br />";

                // sort by length
                computerWords.sort(function (a, b) {
                    return b.length - a.length;
                });

                // show longest word/s
                var i = 0;
                while (computerWords[i].length === computerWords[0].length) {
                    resultsPara.innerHTML += computerWords[i];
                    resultsPara.innerHTML += "<br />";
                    i++;
                }
            } else {
                resultsPara.innerHTML = "The computer didn't find any words 🤯";
            }
        }
    } else {
        alert("Web workers not supported in this browser, this operation will take too long to complete.");
    }
}


function updateClock() {
    if (timer === 0) {
        // end timer
        clearInterval(clockTimerId);
        checkResult();
        resultsPara.style.visibility = 'visible';
    } else {
        --timer;

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        canvasContext.save();
        canvasContext.strokeStyle = '#000';

        canvasContext.translate(125, 125);
        canvasContext.rotate((30 - timer) * (Math.PI / 30));
        canvasContext.translate(-125, -125);

        canvasContext.moveTo(125, 125);
        canvasContext.lineTo(125, 10);
        canvasContext.stroke();

        canvasContext.restore();

    }
}


function checkResult() {
    // get users word from table and check validity
    var playerTiles = document.getElementsByClassName('playerTile');
    var playerWord = "";
    var isValidWord = false;

    for (var i = 0; i < playerTiles.length; i++) {
        if (playerTiles[i].textContent !== "") {
            playerWord += playerTiles[i].textContent;
        }
    }

    if (playerWord.length > 0) {
        isValidWord = associativeWordList[playerWord.toLowerCase()] ? true : false;
    }

    if (isValidWord) {
        for (var i = 0; i < playerWord.length; i++) {
            playerTiles[i].style.backgroundColor = '#00FF00';
        }
    } else {
        for (var i = 0; i < playerWord.length; i++) {
            playerTiles[i].style.backgroundColor = '#FF0000';
        }
    }
}