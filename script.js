let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

//Penghasil Nilai Acak
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  //Dua nilai acak antara 1 dan 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

  //Untuk mendapatkan operator acak
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  //Menyelesaikan persamaan
  let solution = eval(`${num1}${randomOperator}${num2}`);

  //Untuk menempatkan input pada posisi acak
  //(1 untuk nomor1, 2 untuk nomor2, 3 untuk operator, apa pun(4) untuk solusi)
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }

  //Cek inputan user
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;
    //Jika inputan user tidak kosong
    if (userInput) {
      //Jika jawaban user benar
      if (userInput == answerValue) {
        stopGame(`Yippie! Jawabanmu <span>Benar</span> `);
      }
      //Jika operator yang diinputkan user selain +,-,*
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Silahkan masukkan operator yang valid";
      }
      //Jika jawaban user salah
      else {
        stopGame(`Oops! Jawabanmu <span>Salah</span> `);
      }
    }
    //Jika inputan user kosong
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Silahkan masukkan angka";
    }
  });
};

//Memulai permainan
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Kontrol dan visibilitas button
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});

//Menghentikan permainan
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Main Lagi";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};