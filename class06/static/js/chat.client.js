/* eslint-disable no-undef */
// alert('Welcome to Chat development');
// eslint-disable-next-line no-unused-vars
// const username = prompt('Welcome to Chat, please enter your username');

// https://sweetalert2.github.io/
Swal.fire({
  title: 'Welcome to Chat',
  input: 'text',
  // inputAttributes: {
  //   autocapitalize: "off"
  // },
  showCancelButton: true,
  confirmButtonText: 'Get in',
  allowOutsideClick: false,
}).then((result) => {
  if (result.isConfirmed) {
    startChat(result.value);
  }
});

function startChat(username) {

    // eslint-disable-next-line no-unused-vars, no-undef
    const socket = io({
      auth: {
        username,
      },
    });
    // use socket io to connect to the server
    socket.on('NewUser', NewUser => {
        console.log('New message from '+ NewUser);
    })

}
