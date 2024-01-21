import summarizer from 'nodejs-text-summarizer';

function summarizeText() {
    var inputText = document.getElementById("inputText").value;

    // Ensure the input text is not empty
    if (inputText.trim() === "") {
        alert("Please enter text before summarizing.");
        return;
    }
    var text = inputText;
    var result = summarizer(text);

    document.getElementById("outputSummary").innerText = result;
}