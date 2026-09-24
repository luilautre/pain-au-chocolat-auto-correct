function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var choix = "choco";
  if (item.storedChoice) {
    choix = item.storedChoice;
  }
  if (choix == "choco") {
    remplacerChocolatineParPain()
  } else {
    remplacerPainsParChoco()
  }
}

var getting = browser.storage.local.get("storedChoice");
getting.then(onGot, onError);

function remplacerChocolatineParPain(){
  var textNode;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,null,false);

  const rExpSing = new RegExp('chocolatine', 'gi');
  const rExpPlur = new RegExp('chocolatines', 'gi');

  while(textNode=walk.nextNode()) {
      textNode.nodeValue = textNode.nodeValue.replace(rExpPlur, 'pains au chocolat');
      textNode.nodeValue = textNode.nodeValue.replace(rExpSing, 'pain au chocolat');
  }

  document.title = document.title.replace(rExpPlur, 'pains au chocolat');
  document.title = document.title.replace(rExpSing, 'pain au chocolat');
}

function remplacerPainsParChoco(){
  var textNode;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,null,false);

  const rExpSing = new RegExp('pain( |-)au( |-)chocolat(?!s)', 'gi');
  const rExpPlur = new RegExp('(pains( |-)aux*( |-)chocolats*\b)|(pain( |-)aux*( |-)chocolats\b)', 'gi');

  while(textNode=walk.nextNode()) {
      textNode.nodeValue = textNode.nodeValue.replace(rExpPlur, 'chocolatines');
      textNode.nodeValue = textNode.nodeValue.replace(rExpSing, 'chocolatine');
  }

  document.title = document.title.replace(rExpPlur, 'chocolatines');
  document.title = document.title.replace(rExpSing, 'chocolatine');
}
