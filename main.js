var SupportedFonts;
(function (SupportedFonts) {
    SupportedFonts["Arial"] = "arial";
    SupportedFonts["Roboto"] = "roboto";
    SupportedFonts["OpenSans"] = "open-sans";
    SupportedFonts["Lexend"] = "lexend";
})(SupportedFonts || (SupportedFonts = {}));
const inputField = document.querySelector("#input-field");
const outputField = document.querySelector("#output-container");
const fontSelector = document.querySelector('#font-selector');
const charsSelector = document.querySelector('#chars-selector');
const charsLabel = document.querySelector('#chars-label');
const documentBody = document.querySelector('body');
let numOfBoldChars = 3;
const onInit = () => {
    // Reset font to default and keep selection in sync on page refresh
    documentBody.className = 'font-arial';
    fontSelector.selectedIndex = 0;
    charsSelector.value = numOfBoldChars.toString();
    charsLabel.innerText = numOfBoldChars.toString();
    convertText(); // if text is remembered from previously by the browser
};
const convertText = () => {
    const textToConvert = inputField.value;
    let matches = textToConvert.match(/\w+,?\.?|\w+,?.?\n|\n/g);
    let words = matches.map((word) => {
        const bold = word.slice(0, numOfBoldChars);
        const regular = word.slice(numOfBoldChars);
        return `<strong>${bold}</strong>${regular}`;
    });
    let outputString = "";
    words.forEach(w => {
        outputString += w;
        if (!w.includes('\n'))
            outputString += ' ';
    });
    outputField.innerHTML = outputString;
};
const selectFont = (selectElement) => {
    const fontName = selectElement.value;
    const isSupported = Object.values(SupportedFonts).includes(fontName);
    if (isSupported) {
        documentBody.className = `font-${fontName}`;
        return;
    }
    console.error(`${fontName} is not a supported font`);
};
const updateLabel = () => {
    numOfBoldChars = charsSelector.valueAsNumber;
    charsLabel.innerText = numOfBoldChars.toString();
    convertText();
};
document.addEventListener("DOMContentLoaded", () => {
    onInit();
});
