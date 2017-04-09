const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('client-fcm'));
app.use(bodyParser.json());

const admin = require('firebase-admin');

const serviceAccount = require(__dirname + '/key.json');

const ALL_TOKENS = {};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/api/token', (req, res) => {
  console.log(req.body);
  let token = req.body.token;

  ALL_TOKENS[token] = true;

  // lets just send them a message right now to all existing tokens!

  sendToDevice(Object.keys(ALL_TOKENS), {
    notification: {
      text: 'heya! from the server at ' + new Date()
    }
  });

  // send another one just to this device 10 seconds later, close browser in between...
  setTimeout(() => {
    sendToDevice([token], {
      notification: {
        text: '10 seconds later... heya! from the server at ' + new Date()
      }
    });
  }, 10000);

  res.status(200).send({ message: 'saved token!', token: token });
});

app.listen(8000);


function sendToDevice(tokens, payload) {
  admin.messaging().sendToDevice(tokens, payload)
    .then(function(response) {
      console.log("Successfully sent message:", response);
      response.results.forEach((result, idx) => {
        if (result.error) {
          if (result.error.code === 'messaging/registration-token-not-registered') {
            console.log('removing registration code', tokens[idx]);
            delete ALL_TOKENS[tokens[idx]];
          }
        }
      });
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });
}