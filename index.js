const Rita = require('./rita-full')

const names = process.argv.slice(2);

for(name of names){
  acrotiche = createAcrotiche(name);
  printAcrotiche(acrotiche);
}

/*
  @param name {string} name to create acrotiche
  @returns string[] words for the acrotiche
*/
function createAcrotiche(name){
  name = name.toLowerCase();
  [subject, verb, object] = divideNameInThree(name);

  subject = getAdjectiveNoun(subject)
  verb = getAdverbVerb(verb)
  object = getAdjectiveNoun(object)

  return subject.concat(verb, object);
}

function captialize(word){
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
}

/*
  @param acrotiche {string[]} Words created
*/
function printAcrotiche(acrotiche){
  for(let i = 0; i < acrotiche.length; i++){
    for(let j = 0; j < i; j++)
    process.stdout.write(" ");
    
    console.log(acrotiche[i]);
  }
}

function divideNameInThree(name){
  const length = name.length;
  const firstDivision = length * 1 / 3;
  const secondDivision = length * 2 / 3;

  return [name.slice(0, firstDivision), name.slice(firstDivision, secondDivision), name.slice(secondDivision)];
}

function keepDrawingUntil(letter, pos){
  let word = 0;
  do {
    word = Rita.randomWord(pos);
  } while(word[0] !== letter);
  return word;
}

function getAdjectiveNoun(word){
  result = []
  for(const letter of word.slice(0, word.length-1)){
    result.push(keepDrawingUntil(letter, 'jj'));
  }
  result.push(keepDrawingUntil(word[word.length-1], 'nn'));
  return result;
}

function getAdverbVerb(word){
  result = []
  for(const letter of word.slice(0, word.length-1)){
    result.push(keepDrawingUntil(letter, 'rb'));
  }
  result.push(keepDrawingUntil(word[word.length-1], 'vb'));
  return result;
}