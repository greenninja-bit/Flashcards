function App (data) {
  const text = document.getElementById("card-text");
  const number = document.getElementById("card-number");
  const card = document.getElementById("card-container");
  const back_button = document.getElementById("back-button");
  const forward_button = document.getElementById("forward-button");
  const topic_navigation = document.getElementById("topic-name");
  const set_navigation = document.getElementById("cards-name");
  const enter_button = document.getElementById("enter");
  let current_topic = "Biology";
  let current_set = "B4";
  let current_index = 0;
  let question = true;
  let current_data = data[current_topic][current_set];
  card.classList.remove("answer");
  text.classList.remove("text-answer");
  
  text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
  topic_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
  set_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
  number.innerText = `${current_index+1}/${current_data.length}`;

  if (current_index == 0) { back_button.disabled = true; }
  else { back_button.disabled = false; }
  if (current_index == current_data.length-1) { forward_button.disabled = true; }
  else { forward_button.disabled = false; }

  OnClickSetup(data, text, number, card, back_button, forward_button, topic_navigation, set_navigation, enter_button, current_topic, current_set, current_index, question, current_data);
  AddOptions(data, topic_navigation, set_navigation, current_topic, current_set);

  AddListeners(card, back_button, forward_button);
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

function OnClickSetup(data, text, number, card, back_button, forward_button, topic_navigation, set_navigation, enter_button, current_topic, current_set, current_index, question, current_data) {
  card.onclick = () => {
    question = !question;
    card.classList.toggle("answer");
    text.classList.toggle("text-answer");
    
    text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
  };
  back_button.onclick = () => {
    //console.log(back_button.disabled);
    current_index--;
    question = true;
    card.classList.remove("answer");
    text.classList.remove("text-answer");
    if (current_index == 0) { back_button.disabled = true; }
    else { back_button.disabled = false; }
    if (current_index == current_data.length-1) { forward_button.disabled = true; }
    else { forward_button.disabled = false; }
    text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
    number.innerText = `${current_index+1}/${current_data.length}`
  };
  forward_button.onclick = () => {
    //console.log(forward_button.disabled);
    current_index++;
    question = true;
    card.classList.remove("answer");
    text.classList.remove("text-answer");
    console.log(current_index);
    if (current_index == 0) { back_button.disabled = true; }
    else { back_button.disabled = false; }
    if (current_index == current_data.length-1) { forward_button.disabled = true; }
    else { forward_button.disabled = false; }
    text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
    number.innerText = `${current_index+1}/${current_data.length}`
  };
  topic_navigation.onchange = () => {
    console.log(topic_navigation.value)
    AddOptions(data, topic_navigation, set_navigation, topic_navigation.value, "");
  }
  enter_button.onclick = () => {
    current_topic = topic_navigation.value;
    current_set = set_navigation.value;
    current_index = 0;
    question = true;
    current_data = data[current_topic][current_set];
    card.classList.remove("answer");
    text.classList.remove("text-answer");
    
    text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
    topic_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
    set_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
    number.innerText = `${current_index+1}/${current_data.length}`;

    if (current_index == 0) { back_button.disabled = true; }
    else { back_button.disabled = false; }
    if (current_index == current_data.length-1) { forward_button.disabled = true; }
    else { forward_button.disabled = false; }

    AddOptions(data, topic_navigation, set_navigation, current_topic, current_set);
  };
}

function AddOptions(data, topic_navigation, set_navigation, current_topic, current_set) {
  topic_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
  set_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
  for (let topic in data) {
    //console.log(topic);
    topic_navigation.innerHTML += `<option value=${topic}${(topic == current_topic) ? " selected=&quotaelected&quot" :""}>${topic.replaceAll("_", " ")}</option>`
  }
  for (let set in data[current_topic]) {
    set_navigation.innerHTML += `<option value=${set}${(set == current_set) ? " selected=&quotaelected&quot" :""}>${set.replaceAll("_", " ")}</option>`
  }
}

function fetchData (filename) {
  fetch(filename)
    .then(r=>r.text())
    .then(text => {
        let topics = text.split("\r\n================\r\n");
        let topicObject = {};
        for (let i = 0; i<topics.length; i+=2) {
          let sets = topics[i+1]
          .split("\r\n----------------\r\n");

          let setObject = {};

          for (let j = 0; j<sets.length; j+=2) {
            //console.log(sets[j]);

            setObject[sets[j]
              .replaceAll(" ", "_")] = 
            sets[j+1]
            .split("\r\n\r\n")
            .map(x => x
              .replace("\r", ""))
            .map(x => x
              .split("\n")
                .map(x => x
                  .replaceAll("//", "<br>")
                  .replaceAll("##", "</ul>")
                  .replaceAll("#", "<ul>")
                  .replaceAll("**", "</li>")
                  .replaceAll("*", "<li>")));
          }
          //console.log(topics[i])
          topicObject[topics[i]
            .replaceAll(" ", "_")] = 
          setObject;
        }

        let pairs = text
        .split("\r\n\r\n")
        .map(x => x
          .replace("\r", ""))
        .map(x => x
          .split("\n")
            .map(x => x
              .replaceAll("//", "<br>")
              .replaceAll("##", "</ul>")
              .replaceAll("#", "<ul>")
              .replaceAll("**", "</li>")
              .replaceAll("*", "<li>")));

        App(topicObject);
    })
}
fetchData("flashcards/FlashCards.txt");
