alert('Welcome to Chat development');
// eslint-disable-next-line no-unused-vars
const username = prompt('Enter your usernameer');


// eslint-disable-next-line no-unused-vars, no-undef
const socket = io('http://localhost:8080', {
  auth: {
    username: 'admin',
  },
});
