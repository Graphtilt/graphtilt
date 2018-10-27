var gameCode = null;

if(localStorage.ip == undefined) {
    localStorage.ip = Math.floor(Math.random() * 10000000);
}

function pageOn() {
    for(var i = 0; i < document.getElementsByClassName("page").length; i++) {
        if(document.getElementsByClassName("page")[i].style.transform = 'none') {
            return i;
        }
        return false;
    }
}

function nextPage() {
    document.getElementsByClassName("page")[pageOn() + 1].style.transform = "none";
    document.getElementsByClassName("page")[pageOn()].style.transform = "translateX(-200%)";
}

function startGame(gameId, input) {
    firebase.database().ref("games/" + gameId + "/questions").once("value", function(snapshot) {
        if(snapshot.exists()) {
            if(input) {
                gameCode = input.value;
                input.style.borderBottom = "3px solid green";
                nextPage();
            }
        } else {
            if(input) {
                input.value = '';
                input.style.borderBottom = "3px solid red";
                input.style.animation = "shake 0.5s";
            } else {
                alert('Game not found');
            }
        }
    });
}

function addPlayer(nickname) {
    firebase.database().ref("games/" + gameCode + "/players/" + nickname).set(localStorage.ip).then(function() {
        nextPage();
    }).catch(function(error) {
        throw error;
    });
}

function createGame(questions, answers) {
    let key = Math.floor(Math.random() * 10000000);
    firebase.database().ref("games/"  + key).set({
        'questions' : questions,
        'answers' : answers,
        'players': [],
        'playing':false
    }).then(function() {
        window.location.href = '?' + key;
    }).catch(function(error){
        throw error;
    });
}

if(window.location.href.split("?")[1]) {
    firebase.database().ref("games/3249035/players").on("child_added", function(snapshot) {
        console.log(snapshot.val());
    });
}
