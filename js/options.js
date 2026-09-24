function saveOptions(e) {
  e.preventDefault();
  var form = document.querySelector("form");
  var data = new FormData(form);
  var output = "";
  for (const entry of data) {
    output = entry[1];
  };
  console.log(`log : ${output}`);
  browser.storage.local.set({
  storedChoice: output
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.getElementsByName('monChoix').value = result.storedChoice;
  }
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  var getting = browser.storage.local.get("storedChoice");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
