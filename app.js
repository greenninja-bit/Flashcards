function App (data, firstRun=false) {
  
  const text = document.getElementById("card-text");
  const number = document.getElementById("card-number");
  const card = document.getElementById("card-container");
  const back_button = document.getElementById("back-button")
  const forward_button = document.getElementById("forward-button")
  let current_index = 0
  let question = true;
  card.classList.remove("answer");
  
  text.innerText = question ? data[current_index][0] : data[current_index][1];
  number.innerText = `${current_index+1}/${data.length}`

  if (current_index == 0) { back_button.disabled = true; }
  else { back_button.disabled = false; }
  if (current_index == data.length-1) { forward_button.disabled = true; }
  else { forward_button.disabled = false; }

  OnClickSetup(text, number, card, back_button, forward_button, current_index, question, data);

  if (firstRun) {
    AddListeners(card, back_button, forward_button);
  }

}

function AddListeners (card, back_button, forward_button) {
  document.addEventListener("keyup", event => {
    //console.log(event.key);
    if (event.key == "ArrowRight" && !forward_button.disabled)
    {
      forward_button.onclick();
    }
    if (event.key == "ArrowLeft" && !back_button.disabled)
    {
      back_button.onclick();
    }
    if (event.key == " ")
    {
      card.onclick();
    }
    if (event.key == "Enter")
    {
      enter_button.onclick();
    }
  })
}

function OnClickSetup(text, number, card, back_button, forward_button, current_index, question, data) {
  card.onclick = () => {
    question = !question;
    card.classList.toggle("answer");
    
    text.innerText = question ? data[current_index][0] : data[current_index][1];
  };
  back_button.onclick = () => {
    //console.log(back_button.disabled);
    current_index--;
    question = true;
    card.classList.remove("answer");
    if (current_index == 0)
    {
      back_button.disabled = true;
      //console.log("disabled");
      //console.log(back_button.disabled);
    }
    else {
      back_button.disabled = false;
      //console.log("disabled");
      //console.log(back_button.disabled);
    }
    if (current_index == data.length-1)
    {
      forward_button.disabled = true;
    }
    else {
      forward_button.disabled = false;
    }
    text.innerText = question ? data[current_index][0] : data[current_index][1];
    number.innerText = `${current_index+1}/${data.length}`
  };
  forward_button.onclick = () => {
    //console.log(forward_button.disabled);
    current_index++;
    question = true;
    card.classList.remove("answer");
    console.log(current_index);
    if (current_index == 0)
    {
      back_button.disabled = true;
    }
    else {
      back_button.disabled = false;
    }
    if (current_index == data.length-1)
    {
      forward_button.disabled = true;
    }
    else {
      forward_button.disabled = false;
    }
    text.innerText = question ? data[current_index][0] : data[current_index][1];
    number.innerText = `${current_index+1}/${data.length}`
  };
}
function fetchData (filename, firstRun=false) {
  fetch(filename)
    .then(r=>r.text())
    .then(text => {
        let pairs = text
        .split("\r\n\r\n")
        .map(x => x
          .replace("\r", ""))
        .map(x => x
          .split("\n")
            .map(x => x
              .replace(new RegExp("//", "g"), "\n")));
        App(pairs, firstRun);
    })
}
const card_navigation = document.getElementById("cards-name")
const topic_navigation = document.getElementById("topic-name")
const enter_button = document.getElementById("enter")
enter_button.onclick = () => {
  fetchData(`flashcards/${topic_navigation.value}/${card_navigation.value}.txt`);
};
fetchData("flashcards/Biology/B4.txt", true);
