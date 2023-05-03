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

* open .env file in the current directory and replace the following database details with your own and save it.
```
MY_SQL_USER = "myuser"(replace)
PASSWORD = "mypassword"(replace)
DB = "mydb"(replace)

```

* Run the following command to install packages related to backend
  
```
npm install
```

 * Finally run the following command to run backend server 
```
node index.js
```

>Now you can see the connection is succeed and the server is listening on 
