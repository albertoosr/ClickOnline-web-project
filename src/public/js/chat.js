
//mensajes
const username = document.getElementById("username");
const mensajes = document.getElementById("mensajes");
const mensaje = document.getElementById("mensaje");
const send = document.getElementById("send");

send.addEventListener("click", () => {
    socket.emit('chat:message', {
        username: username.value,
        mensaje: mensaje.value 
    })

  console.log({
      username: username.value,
      mensaje: mensaje.value
  })
});

socket.on('chat:message', (data) => {
    console.log(data)
});