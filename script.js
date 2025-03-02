const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

const generateBtn = document.getElementById("generateBtn");
const passwordList = document.getElementById("passwordList");
const passwordCountInput = document.getElementById("passwordCount");
const includeUppercase = document.getElementById("includeUppercase");
const uppercaseCountInput = document.getElementById("uppercaseCount");
const includeLowercase = document.getElementById("includeLowercase");
const lowercaseCountInput = document.getElementById("lowercaseCount");
const includeNumbers = document.getElementById("includeNumbers");
const numberCountInput = document.getElementById("numberCount");
const includeSymbols = document.getElementById("includeSymbols");
const symbolCountInput = document.getElementById("symbolCount");

generateBtn.addEventListener("click", () => {
  generatePasswords();
});

function generatePasswords() {
  passwordList.innerHTML = "";
  const passwordCount = parseInt(passwordCountInput.value, 10) || 1;
  const useUppercase = includeUppercase.checked;
  const uppercaseCount = parseInt(uppercaseCountInput.value, 10) || 0;
  const useLowercase = includeLowercase.checked;
  const lowercaseCount = parseInt(lowercaseCountInput.value, 10) || 0;
  const useNumbers = includeNumbers.checked;
  const numberCount = parseInt(numberCountInput.value, 10) || 0;
  const useSymbols = includeSymbols.checked;
  const symbolCount = parseInt(symbolCountInput.value, 10) || 0;
  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
    alert("少なくとも1つは文字種を選択してください。");
    return;
  }
  const totalLength =
    (useUppercase ? uppercaseCount : 0) +
    (useLowercase ? lowercaseCount : 0) +
    (useNumbers ? numberCount : 0) +
    (useSymbols ? symbolCount : 0);
  if (totalLength === 0) {
    alert("含める文字数が 0 です。各文字種の数を設定してください。");
    return;
  }
  for (let i = 0; i < passwordCount; i++) {
    const pwd = generateSinglePassword(
      useUppercase, uppercaseCount,
      useLowercase, lowercaseCount,
      useNumbers, numberCount,
      useSymbols, symbolCount
    );
    addPasswordToList(pwd);
  }
}

function generateSinglePassword(
  useUppercase, uppercaseCount,
  useLowercase, lowercaseCount,
  useNumbers, numberCount,
  useSymbols, symbolCount
) {
  let resultArray = [];
  if (useUppercase && uppercaseCount > 0) {
    for (let i = 0; i < uppercaseCount; i++) {
      resultArray.push(getRandomChar(UPPERCASE_CHARS));
    }
  }
  if (useLowercase && lowercaseCount > 0) {
    for (let i = 0; i < lowercaseCount; i++) {
      resultArray.push(getRandomChar(LOWERCASE_CHARS));
    }
  }
  if (useNumbers && numberCount > 0) {
    for (let i = 0; i < numberCount; i++) {
      resultArray.push(getRandomChar(NUMBER_CHARS));
    }
  }
  if (useSymbols && symbolCount > 0) {
    for (let i = 0; i < symbolCount; i++) {
      resultArray.push(getRandomChar(SYMBOL_CHARS));
    }
  }
  return shuffleArray(resultArray).join("");
}

function getRandomChar(chars) {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function addPasswordToList(password) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center";
  const span = document.createElement("span");
  span.textContent = password;
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "コピー";
  copyBtn.className = "btn btn-outline-light btn-sm copy-btn ms-auto";
  copyBtn.addEventListener("click", () => {
    copyToClipboard(password);
  });
  li.appendChild(span);
  li.appendChild(copyBtn);
  passwordList.appendChild(li);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("クリップボードにコピーしました: " + text);
    })
    .catch(() => {
      alert("コピーに失敗しました。");
    });
}
