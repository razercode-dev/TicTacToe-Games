let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

let xTurn = true;
let count = 0;
let gameActive = true;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    if(popupRef) popupRef.classList.add("hide");
    gameActive: true;
};

const winFunction = (letter) => {
    disableButtons();
    gameActive: false;
    if(letter == "X") {
        msgRef.innerHTML =  "&#x1F389 <br> 'X' Wins"
    } else {
        msgRef.innerHTML =  "&#x1F389 <br> 'O' Wins"
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E <br> It's a Draw";
};

newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winChecker = () => {

    if (!gameActive) return;

    for (let i of winningPattern) {
        let [element1, element2, element3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
        ];

        if (element1 != "" && (element2 != "") && (element3 != ""))
        if (element1 === element2 && element2 === element3) {

            winFunction(element1);
            return;
        }
    }
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (!gameActive || element.display) return;
        if (xTurn) {
            xTurn = false;

            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;

            element.innerText = "O";
            element.disabled = true;
        }

        count += 1;

        winChecker();


        if (count == 9) {
            drawFunction();
        }

    });
});

window.onload = enableButtons;