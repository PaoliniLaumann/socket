const renderMessages = (data) => {
  const html = data
    .map((message) => {
      return `
                <div class="mx-1 d-flex align-items-center">
                    <p class="mb-0 msg-email" required>${message.email} </p>
                    <p class="mb-0 mx-1 msg-date">${message.date}: </p>
                    <i class="msg-text mx-1">${message.message}</i>
                 </div>   
                `;
    })
    .join("");
  document.getElementById("chat").innerHTML = html;
};

socket.on("messages", (data) => {
  renderMessages(data);
  console.log(data);
});

const addMessages = () => {
  let date = new Date();
  let output =
    String(date.getDate()).padStart(2, "0") +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  const text = {
    date: output,
    email: document.getElementById("formEmail").value,
    message: document.getElementById("formMessage").value,
  };
  socket.emit("new-message", text);
};

const btn = document.getElementById("formChat");

btn.addEventListener("submit", (e) => {
  e.preventDefault();
  addMessages();
});
