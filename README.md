# fcm play

Just playing around with FCM.

You need to create some FCM account/credentials stuff, you can do that in the [FCM console](https://console.firebase.google.com/).

Then download the json file of credentials it'll give you, or request new credentials at:

```
https://console.firebase.google.com/project/<project-id>/settings/serviceaccounts/adminsdk
```

Name it `key.json` and put it in the root of this project, then:

```
npm install
node .
```

And visit [http://localhost:8000](localhost:8000). Your eyes should bleed with the ugliest and the `alert()` notifications, but it shows a few things:

- registration using FCM, service worker, and posting registration to backend
- web push API only. no android/ios stuff.
- notifying multiple registration tokens at once (try two browsers)
- removing invalid registrations

Warning: it's all pretty ugly. I gotta go to the park before it's dark. My hammock is calling.
