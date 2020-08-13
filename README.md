# Webbed backend

HR tech application with built-in slack bot that integrates with IBM Watson's Personality Insights and Natural Language Understanding. The backend for this application is built with Ruby on Rails and can be found [here](https://github.com/tharveybrown/teams-backend).

This application requires a slack client id, which can be obtained after [registering a new bot](https://api.slack.com/apps). Once registered, set the following redirect uris:

- http://localhost:3001/auth/callback
- http://localhost:3000/dashboard

Sample .env congiguration below:

```.env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SLACK_REDIRECT_URI=http://localhost:3001/auth/callback
REACT_APP_CLIENT_REDIRECT=http://localhost:3000/dashboard
REACT_APP_SLACK_CLIENT_ID=<slackClientId>
```

To start the application, run `npm start` from this repository and `rails s` from the backend repository.
