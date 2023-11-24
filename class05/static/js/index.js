const inputMessage = document.querySelector('#inputMessage');
document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // const formData = new FormData(e.target);
  // const data = Object.fromEntries(formData);
  // console.log(data);
  // fetch('/message', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  // })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //         console.error('Error:', error);
  //     });
  alert(JSON.stringify({ message: inputMessage?.value }));
});
