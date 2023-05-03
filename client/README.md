# SimplyOnline

### Front-end Design

The front-end of the SimplyOnline web application is designed using React JS, a popular framework for building single-page applications.

- **User Interface:** The user interface is designed to be intuitive and user-friendly, with clear and concise layouts and color schemes.
- **Navigation:** The navigation system is designed to provide easy access to all the features of the application, with clearly labeled menus and icons.

## Running Frontend Server:

* Clone the repository
```
git clone https://github.com/htmw/SimplyOnline.git
```
* Install NodeJS LTS version from https://nodejs.org/en/ for your Operating System.
* Navigate to client folder and install required libraries:
```
cd client/
npm install
```
* In case of any error run audit and install once more:
```
npm audit fix --force && npm install
```

* open .env file in the current directory and replace the following database details with your own and save it.
```
APP_ID = "youragoraRTC-app_id"
BACKEND_URL = "backend-end running port"
```

* Run the following command to run the front-end(client):
```
npm start
```

>Now you can see the client running on localhost
