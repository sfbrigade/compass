Welcome to Project Compass.

This is the beginnings of the repo of Project Compass located here on Slack.
https://sfbrigade.slack.com/archives/C01R8E75N1K

This is the main file for the project summary
https://docs.google.com/document/d/13S8i_FnynycBV8vipjiFO4DwM2tDbauoN212gAurUd4/edit#heading=h.2vr8ga7aqr4o

These are the main Figma files the team is using to develop the app on.  
(Make sure this goes to correct page)
https://www.figma.com/team_invite/redeem/GVUO8uYgZtnHXWrewd9DBH


How to Run Web Server:
1. cd to root folder (/project-compass)
2. Run `npm install` in terminal/cmd
3. Run `npm start` to start server

# Project Compass React Frontend

## Tech Stack
* React
* React-Router
* Material UI

## Getting Started
~~1. cd into /client~~
1. cd into /client
2. npm i
3. npm start


Recent Changes:
- moved installation of `node_modules` folder from `client` to `/` root (to accommodate for future Node.js requirement in backend development)
- Updated `.gitignore` setting match changes

## Getting Started with Docker

1. Install Docker Desktop

2. Clone this repo. Windows users, make sure that the git autocrlf setting is set to false so that carriage return characters are not inserted into files (which breaks them when they run inside the Linux container). To do so, open a Powershell and run: `git config --global core.autocrlf false`

3. In the repo directory, run: `docker compose up`

4. Wait a bit for the image to build, it should start both the client and server in development mode.  

   You can verify the client build is running by visiting: http://localhost:3000

   You can verify the server is running by hitting the health-check endpoint, i.e. by using curl: `curl http://localhost:8080/health`
