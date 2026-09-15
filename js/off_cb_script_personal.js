const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector("#file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");


// ===== CV KNOWLEDGE BASE =====
const CV_CONTEXT = `
You are the personal AI assistant for Nazmul Hasan. 
You can only answer questions using the information provided below. 
Do not give information outside of this CV. 
If the question is unrelated to the CV, respond politely: 
"Please contact Nazmul Hasan for more details."

About Nazmul Hasan:

1. Professional Information:
- Profession: Software Engineer
- Specialization: ERP & Business Application Development
- Skills: ASP.NET, ASP.NET Web API, Next.js, JavaScript, jQuery, HTML, CSS, Bootstrap, Tailwind CSS, SQL Server, PHP, Nest.js
- Expertise: Web development, backend development, database administration, AI model integration, ERP and business software
- Experience: Developing ERP, Accounting, Inventory, and Business Management software; building scalable web applications; AI-based vehicle detection projects
- Projects: 
  * Inventory Management System
  * Accounting Software
  * Vehicle Detection using AI & Deep Learning
  * ERP solutions for business operations
  * Multi-class vehicle recognition system
  * AI-powered chatbots for portfolio websites

2. Academic Information:
- Bachelor's degree: BSc in Software Engineering from American International University-Bangladesh (AIUB)
- Education Experience: Experienced in building logic for educational platforms, Blackboard online classroom management
- School & College: Liaquat Ali Smrity School and College

3. AI & Technical Knowledge:
- Familiar with AI integration for web and software applications
- Experience using GPT-based AI and Gemini AI for chatbots and project assistants
- Knowledge of AI-based computer vision systems for object/vehicle detection

4. Work & Professional Experience:
- Passionate software engineer and lifelong learner with practical industry experience
- Worked as a Junior Programmer at Generation-Next IT Solution LTD for nearly 2 years
- Experienced in developing ERP and business management software solutions
- Contributed to enterprise systems including:
  * Micro Finance Management System
  * Accounting & Inventory Management System
  * Support Service Management System
  * Human Resource Management (HRM)
  * Task Management System
  * Other customized ERP business solutions
- Strong knowledge of Object-Oriented Programming (OOP) and software design principles (SOLID)
- Experience working with 3-layer architecture for scalable enterprise applications
- Skilled in both front-end and back-end development
- Provides professional business application development services

5. Leadership & Extracurricular Experience:
- Served as Executive (Branding) at AIUB Environment Club for nearly 3 years
- Organized environmental awareness programs across schools, colleges, and universities
- Actively contributed to sustainability and environmental campaigns
- Received Leadership Award for outstanding contribution and organizational impact

6. Portfolio & Career Focus:
- Focused on creating professional software for clients and businesses
- Interested in AI, ERP, and web-based automation systems
- Preparing for higher education abroad in Computing (Masters)
- Portfolio includes projects demonstrating AI, software engineering, and web development expertise

7. Contact Information:
- Phone: +880 1783973740
- Email: tasrifnaazmul@gmail.com
- Facebook: https://www.facebook.com/tasrifnaazmul
- Instagram: https://www.instagram.com/tasrif_nazmul/
- LinkedIn: https://www.linkedin.com/in/tasrif-nazmul/
- GitHub: https://github.com/tasrif-nazmul
- Home District: Rajbari

8. Chatbot Behavior Rules:
- Act as Nazmul Hasan's digital professional assistant
- Answer questions **only from this CV**
- Keep answers concise and context-appropriate
- For general queries like "Who are you?", respond:
  "I am Nazmul Hasan's personal AI assistant."
- If the user asks who built or developed you, respond:
  "I was built by Nazmul Hasan."
- For questions outside the CV, respond:
  "Please contact Nazmul Hasan for more details."
- Avoid including personal life, love life, or any sensitive private information

9. Example Responses:
- User: "Who are you?" → "I am Nazmul Hasan's personal AI assistant."
- User: "What skills does Nazmul have?" → List only relevant skills from CV
- User: "Tell me about his projects" → List major projects with short descriptions
- User: "Where did he study?" → Provide education info only

Keep all responses professional, concise, and clear.
`;





// API setup
// const API_KEY = "AIzaSyDrpKnBLAVYWO8XRnWLvHub_c4HpXKv_Pc";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
const API_KEY = "AIzaSyA1Cn6kP2hX48DuPMKhaM0IcsMbnMVBi-A";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`;

const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};


messageInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();   // new line off
        sendMessageButton.click();      // send button click trigger
    }

});




// Generate bot response using API
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  // Add user message to chat history
//   chatHistory.push({
//     role: "user",
//     parts: [
//       { text: userData.message },
//       ...(userData.file.data ? [{ inline_data: userData.file }] : []),
//     ],
//   });

chatHistory.push({
  role: "user",
  parts: [
    {
      text: `
${CV_CONTEXT}

User Question:
${userData.message}
`
    },
    ...(userData.file.data ? [{ inline_data: userData.file }] : []),
  ],
});

  // API request options
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: chatHistory,
    }),
  };

  try {
    // Fetch bot response from API
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Extract and display the bot response
    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    messageElement.innerText = apiResponseText;

    // Add bot response to chat history
    chatHistory.push({
      role: "model",
      parts: [
        { text: apiResponseText }
      ],
    });
  } catch (error) {
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};

// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));

  // Create and display user message
  const messageContent = `<div class="message-text"></div>
                          ${
                            userData.file.data
                              ? `<img src=data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`
                              : ""
                          }`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Simulate bot response with thinking indicator after a dely
  setTimeout(() => {
    const messageContent = `<svg 
            class="bot-avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 1024 1024"
          >
          <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
            ></path>
          </svg>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage && !e.shiftKey && window.inneerWidth > 768) {
    handleOutgoingMessage(e);
  }
});


// Auto resize message input
messageInput.addEventListener("input", (e) => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector("chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle file input change
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result.split(",")[1];

    // Store file data in userData
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };

    fileInput.value = "";
  };

  reader.readAsDataURL(file);
});

// Emoji picker setup
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  preview: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  }
});

document.querySelector(".chat-form").appendChild(picker);




sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());

chatbotToggler.addEventListener("click", () => { 
    document.body.classList.toggle("show-chatbot");
  });

  closeChatbot.addEventListener("click", () => { 
    document.body.classList.remove("show-chatbot");
  });
