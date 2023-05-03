# SimplyOnline

Spring 2023 - Fall 2023

​
[View Project Description as PDF](https://github.com/htmw/SimplyOnline/blob/main/documents/sprint-1/SO_Project_description.pdf) | <a id="raw-url" href="https://github.com/htmw/SimplyOnline/blob/main/documents/sprint-1/SO_Project_description.docx">Download Project Description as Word Document</a>

## Project Design

Front end of simply online is implemented using React.
WebRTC technology is used to add the video communication capabilities.
Backend is implemented using Node.js and database system we used is MySQL

## Funtional requirements of the Application

1.User Authentication: The application should allow users to create an account with a unique username and password. Users should be able to log in to the application using their credentials. Credentials should be stored in the database by encryption.<br/>

2.Creating and Joining Rooms: The application should allow users to create a room for their class. Users should be able to join existing rooms for their classes by entering a room name or link.<br/>

3.Video Calling: The application should enable video calling between users in the same room. Users should be able to mute and unmute their audio and video during the call.<br/>

4.Screen Sharing: The application should allow users to share their screens with other users in the same room. Users should be able to control which screen is being shared and who can see it.<br/>

5.Face Recognition and Attendance: The application should capture images of users' faces during the video call. The application should analyze these images using the Deep Face library to recognize users and mark their attendance. The application should provide the lecturer with a summary of attendance for each class.

### Front-end Design

The front-end of the SimplyOnline web application is designed using React JS, a popular framework for building single-page applications.

- **User Interface:** The user interface is designed to be intuitive and user-friendly, with clear and concise layouts and color schemes.
- **Navigation:** The navigation system is designed to provide easy access to all the features of the application, with clearly labeled menus and icons.

### Back-end Design

The back-end of the SimplyOnline web application is designed using Node JS, a popular framework for building scalable and performant applications.

- **RESTful API:** The back-end provides a RESTful API for the front-end to communicate with the server.
- **Database Access:** The back-end interacts with the MySQL database system to store and retrieve data.

## File Structure

Our application is structured as follows:

| File Name        | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Backend          | This folder contains the database schema and dummy data.                                    |
| Client           | This folder contains the codes for Front End.                                               |
| Demo-Videos      | This folder contains the photos of each team member that are used on the project Wiki page. |
| Documents        | This folder contains all the Project Deliverable files featured on the project Wiki page.   |
| Face-recognition | This folder contains the codes for face recognition written in python.                      |


## Technology Stack:

- Framework : React
- Backend : Express JS, Node JS
- Face-recognition: Deepface, Flask (Python libraries)
- Database : MySQL
- Version Control: Git
- Code Editor : Visual Studio Code

## Running Backend Server:

* Clone the repository
```
git clone https://github.com/htmw/SimplyOnline.git
```

* move to backend directory
```
cd backend/
```
* Make sure you have Node, mysql installed and correctly set up.
* Create a new database in MySQL using:
```
mysql -u root -p
```
Enter mysql password, then run:

* Download sql file given in the backend directory & Enter the following command and execute to create a database and its related tables required for the project
```
source sql.sql;
```

* Run the following command to install packages related to backend
  
```
npm install
```

 * Finally run the following command to run backend server 
```
node index.js
```

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
* Run the following command to run the front-end(client):
```
npm start
```

## Running face-recognition server:

* Clone the repository
```
git clone https://github.com/htmw/SimplyOnline.git
```
* Install python and pip from python.org
* Navigate to face-recognition folder and install required libraries:

```
cd face-recognition/
pip install -r requirements.txt
```
* Run the following command to run face-recognition server
```
python home.py
```


