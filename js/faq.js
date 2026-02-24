const conversations = [
  {
    q: "Who is Nazmul Hasan?",
    a: "Nazmul Hasan is a Software Engineer focused on ERP and business application development."
  },
  {
    q: "What are his core skills?",
    a: "He specializes in ASP.NET, Web API, JavaScript, Next.js and AI powered automation solutions."
  },
  {
    q: "What experience does he have?",
    a: "He develops real-world enterprise systems including accounting, inventory and ERP systems."
  }
];

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

let index = 0;

function typing(element, text, speed, callback) {

  element.innerHTML = "";
  element.classList.add("cursor");

  let i = 0;

  const timer = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(timer);
      element.classList.remove("cursor");

      if (callback)
        setTimeout(callback, 700);
    }

  }, speed);
}

function startConversation() {

  if (index >= conversations.length)
    index = 0;

  typing(questionEl, conversations[index].q, 40, () => {

  typing(answerEl, conversations[index].a, 25, () => {

    setTimeout(() => {

      // remove both together smoothly
      questionEl.innerHTML = "";
      answerEl.innerHTML = "";

      index++;
      startConversation();

    }, 2500);

  });

});
}

startConversation();