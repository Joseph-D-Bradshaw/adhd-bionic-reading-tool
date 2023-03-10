enum SupportedFonts {
  Arial = 'arial',
  Roboto = 'roboto',
  OpenSans = 'open-sans',
  Lexend = 'lexend'
}

const inputField: HTMLTextAreaElement = document.querySelector("#input-field");
const outputField: HTMLDivElement = document.querySelector("#output-container");
const fontSelector: HTMLSelectElement = document.querySelector('#font-selector')
const charsSelector: HTMLInputElement = document.querySelector('#chars-selector')
const charsLabel: HTMLSpanElement = document.querySelector('#chars-label')
const documentBody: HTMLBodyElement = document.querySelector('body')

let numOfBoldChars = 3;

const onInit = () => {
  // Reset font to default and keep selection in sync on page refresh
  documentBody.className = 'font-arial'
  fontSelector.selectedIndex = 0
  charsSelector.value = numOfBoldChars.toString()
  charsLabel.innerText = numOfBoldChars.toString()
  convertText() // if text is remembered from previously by the browser
}

const convertText = () => {
  const textToConvert: string = inputField.value;
  let matches = textToConvert.match(/[a-zA-Z0-9!?@\-_'\+=;:"]+\n?|\n/g);
  let words = matches.map((word) => {
    const bold = word.slice(0, numOfBoldChars)
    const regular = word.slice(numOfBoldChars)
    return `<strong>${bold}</strong>${regular}`;
  });

  let outputString = ""
  words.forEach(w => {
    outputString += w
    if (!w.includes('\n'))
      outputString += ' '
  })
  outputField.innerHTML = outputString
};

const selectFont = (selectElement: HTMLSelectElement) => {
  const fontName: string = selectElement.value
  const isSupported = Object.values(SupportedFonts).includes(fontName as SupportedFonts)
  if (isSupported) {
    documentBody.className = `font-${fontName}`
    return
  }
  console.error(`${fontName} is not a supported font`)
}

const updateLabel = () => {
  numOfBoldChars = charsSelector.valueAsNumber
  charsLabel.innerText = numOfBoldChars.toString()
  convertText()
}

document.addEventListener("DOMContentLoaded", () => {
    onInit()
})
