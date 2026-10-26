function App (data) {
  const text = document.getElementById("card-text");
  const number = document.getElementById("card-number");
  const card = document.getElementById("card-container");
  const back_button = document.getElementById("back-button");
  const forward_button = document.getElementById("forward-button");
  const topic_navigation = document.getElementById("topic-name");
  const set_navigation = document.getElementById("cards-name");
  //const enter_button = document.getElementById("enter");
  let current_topic = "Welcome!";//"Welcome!";
  let current_set = "Welcome!";//"Welcome!";
  let current_index = 0;
  let question = true;
  let current_data = data[current_topic][current_set];
  card.classList.remove("answer");
  text.classList.remove("text-answer");
  
  SetText(text, question, current_data, current_index);
  number.innerText = `${current_index+1}/${current_data.length}`;

  if (current_index == 0) { back_button.disabled = true; }
  else { back_button.disabled = false; }
  if (current_index == current_data.length-1) { forward_button.disabled = true; }
  else { forward_button.disabled = false; }

  OnClickSetup(data, text, number, card, back_button, forward_button, topic_navigation, set_navigation, current_topic, current_set, current_index, question, current_data);
  AddOptions(data, topic_navigation, set_navigation, current_topic, current_set);

  AddListeners(card, back_button, forward_button);
}

function SetText(text, question, current_data, current_index) {
  text.innerHTML = question ? current_data[current_index][0] : current_data[current_index][1];
  console.log((question ? current_data[current_index][0] : current_data[current_index][1]));
  if ((question ? current_data[current_index][0] : current_data[current_index][1]).includes("</math>")) {text.style.width = "fit-content";}
  else if ((question ? current_data[current_index][0] : current_data[current_index][1]).length > 350) {text.style.width = "95%";}
  else if ((question ? current_data[current_index][0] : current_data[current_index][1]).length > 250) {text.style.width = "90%";}
  else {text.style.width = "80%";}
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
    /*if (event.key == "Enter")
    {
      enter_button.onclick();
    }*/
  })
}

function OnClickSetup(data, text, number, card, back_button, forward_button, topic_navigation, set_navigation, current_topic, current_set, current_index, question, current_data) {
  card.onclick = () => {
    question = !question;
    card.classList.toggle("answer");
    text.classList.toggle("text-answer");
    
    SetText(text, question, current_data, current_index);
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
    SetText(text, question, current_data, current_index);
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
    SetText(text, question, current_data, current_index);
    number.innerText = `${current_index+1}/${current_data.length}`
  };
  topic_navigation.onchange = () => {
    console.log(topic_navigation.value)
    AddOptions(data, topic_navigation, set_navigation, topic_navigation.value, "");
  }
  /*enter_button.onclick = () => {
    current_topic = topic_navigation.value;
    current_set = set_navigation.value;
    current_index = 0;
    question = true;
    current_data = data[current_topic][current_set];
    card.classList.remove("answer");
    text.classList.remove("text-answer");
    
    text.innerHTML = current_data[current_index][0];
    number.innerText = `1/${current_data.length}`;

    back_button.disabled = true;
    if (current_index == current_data.length-1) { forward_button.disabled = true; }
    else { forward_button.disabled = false; }

    AddOptions(data, topic_navigation, set_navigation, current_topic, current_set);
  };*/
  set_navigation.onchange = () => {
    current_topic = topic_navigation.value;
    //current_set = set_navigation.value;
    current_index = 0;
    question = true;
    current_set = Array.from(set_navigation.options) // Convert options to an array
      .filter(option => option.selected)      // Filter selected options
      .map(option => option.value);           // Map to an array of values
    console.log(current_set);
    //var val = (selectedValues.map(x => data[x])); // Logs the selected values
    //console.log(val[0].concat(val.slice(1)))
    //console.log(val.flat())
    current_data = current_set.map(x => data[current_topic][x]).flat();
    //current_data = data[current_topic][current_set];
    card.classList.remove("answer");
    text.classList.remove("text-answer");
    
    text.innerHTML = current_data[current_index][0];
    number.innerText = `1/${current_data.length}`;

    back_button.disabled = true;
    if (current_index == current_data.length-1) { forward_button.disabled = true; }
    else { forward_button.disabled = false; }

    //AddOptions(data, topic_navigation, set_navigation, current_topic, current_set);
  }
}

function AddOptions(data, topic_navigation, set_navigation, current_topic, current_set, first=true) {
  if (first)
  {
    //topic_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
    topic_navigation.innerHTML = "";
    //set_navigation.innerHTML = "<option disabled selected value=&quotnone&quot></option>"
    set_navigation.innerHTML = "";
    set_navigation.value = null;
  }
  for (let topic in data) {
    //console.log(topic);
    topic_navigation.innerHTML += `<option value=${topic}${(topic == current_topic) ? " selected=&quotaelected&quot" :""} class="option">${topic.replaceAll("_", " ")}</option>`
  }
  for (let set in data[current_topic]) {
    if (current_set != "")
    {
      set_navigation.innerHTML += `<option value=${set}${(set == current_set) ? " selected=&quotaelected&quot" :""} class="option">${set.replaceAll("_", " ")}</option>`
    }
    else 
    {
      set_navigation.innerHTML += `<option value=${set} class="option">${set.replaceAll("_", " ")}</option>`
    }
  }
}

function fetchData (filename) {
  fetch(filename)
    .then(r=>r.text())
    .then(text => {
        let topics = text.replaceAll("\r", "").replaceAll("  ", "").split("\n================\n");
        console.log(topics);
        let topicObject = {};
        for (let i = 0; i<topics.length; i+=2) {
          console.log(topics[i+1])
          let sets = topics[i+1]
          .split("\n----------------\n");

          let setObject = {};

          for (let j = 0; j<sets.length; j+=2) {
            //console.log(sets[j]);

            setObject[sets[j]
              .replaceAll(" ", "_")] = 
            sets[j+1]
            .split("\n\n\n")
            .map(x => x
              .split("\n\n")
                .map(x => x
                  //.replaceAll("<#", "<ul>")
                  .replaceAll("<**", "TAGulENDTAGTAGliENDTAG")
                  .replaceAll("**>", "TAG/liENDTAGTAG/ulENDTAG")
                  //.replaceAll("<*", "<li>")
                  //.replaceAll("*>\n", "</li>")
                  .replaceAll("\n*>", "TAG/liENDTAGTAGliENDTAG")
                  //.replaceAll("#>", "</ul>")
                  .replaceAll("<f", "TAGmath display=blockENDTAGTAGmiENDTAG")
                  .replaceAll("===", " = TAG/miENDTAGTAGmfracENDTAGTAGmiENDTAG")
                  .replaceAll("///", "TAG/miENDTAGTAGmiENDTAG")
                  .replaceAll("f>", "TAG/miENDTAGTAG/mfracENDTAGTAG/mathENDTAG")
                  .replaceAll("/img", "TAGimg style='max-width:300px' src=")
                  .replaceAll("img/", "&quotENDTAG")
                  .replaceAll("'/'", "/")
                  .replaceAll("---\n", "")
                  .replaceAll("\n", "TAGbrENDTAG")
                  .replaceAll("<", "TAGbENDTAG")
                  .replaceAll(">", "TAG/bENDTAG")
                  .replaceAll("ENDTAG", ">")
                  .replaceAll("TAG", "<")));
            
            console.log(setObject[sets[j]
              .replaceAll(" ", "_")])
          }
          //console.log(topics[i])
          topicObject[topics[i]
            .replaceAll(" ", "_")] = 
          setObject;
        }

        App(topicObject);
    })
}
fetchData("flashcards/Flashcards.txt");
