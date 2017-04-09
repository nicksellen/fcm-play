console.log('all ready!');

var config = {
  messagingSenderId: "419508938143",
};
firebase.initializeApp(config);


const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
  getToken();
})
.catch(function(err) {
  console.log('Unable to get permission.', err);
});

messaging.onTokenRefresh(function() {
  getToken();
});

function sendTokenToServer(token) {
  fetch('/api/token', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  });
}

function getToken() {
  messaging.getToken()
  .then(function(token) {
    console.log('Got token: ', token);
    sendTokenToServer(token);
  })
  .catch(function(err) {
    console.log('Unable to retrieve token ', err);
  });
}

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload.notification.body);
  alert(payload.notification.body);
});
