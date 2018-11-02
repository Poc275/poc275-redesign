var computerWords = [];
var computerWordsFound = 0;
var associativeWordList = new Array(119703);
var combinations = [];
var nCombinations = 0;


onmessage = function (e) {
    associativeWordList = e.data.words;
    findCombinations("", e.data.board);

    for (var i = 0; i < nCombinations; i++) {
        var word = combinations[i].toLowerCase();
        var wordSearch = associativeWordList[word];

        if (typeof(wordSearch) === "undefined") {
        } else {
            var j = 0;
            while (j < computerWordsFound && computerWords[j] != word) {
                j++;
            }
            if (j == computerWordsFound) {
                computerWords[computerWordsFound] = word;
                computerWordsFound++;
            }          
        }
    }

    postMessage(computerWords);
}


function findCombinations(prefix, letters) {
    // base case   
    if (letters.length == 0) {
    }
    else {
        for (var i = 0; i < letters.length; i++) {

            if ((prefix + letters.substring(i, i + 1)).length > 3) {
                combinations[nCombinations] = prefix + letters.substring(i, i + 1);
                nCombinations++;
            }

            findCombinations(prefix + letters.substring(i, i + 1),
                letters.substring(0, i) + letters.substring(i + 1, letters.length));
        }
    }
}


// function findWord(word) {
//     //console.log("find word loop");
//     var letter = word.substring(0, 1).toLowerCase();
//     var start = letter.charCodeAt() - "a".charCodeAt();
//     var startIndex = letterIndexArray[start];
//     var endIndex = letterIndexArray[start + 1];

//     while (startIndex < endIndex && word.toLowerCase() != wordList[startIndex]) {
//         startIndex++;
//         nIterations++;
//     }

//     if (startIndex < endIndex) {
//         var i = 0;

//         while (i < computerWordsFound && computerWords[i] != word) {
//             i++;
//             //console.log("word found loop");
//         }
//         if (i == computerWordsFound) {
//             computerWords[computerWordsFound] = word;
//             computerWordsFound++;
//             // console.log(word);
//         }
//     }
// }