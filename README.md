
## Todo list app

A simple todo list app with users.

Users can:
- add/update/delete/assign tasks to other users
- update username and password

The task list is shared with all users registered 

![Login screen](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/LoginAndRegister.png)

![Login screen](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/Tasks.png)

![User settings](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/DeleteTaskAndSettings.png)


### How to run this project?

#### Configure project

- Download the project ( git clone / download zip )

- Configure

```
$ cd server/
$ npm install
```

**Note**: This project needs mongodb database is installed to run correctly

#### Run project

After configure the project:

- Start mongod

```
$ mongod
```

- Start app (in /server folder)

```
$ npm start
```

### Tecnologies and libraries used in this project

**Frontend**:
- React JS (hooks)
- Redux
- Redux thunk
- Jest

**Backend**:
- Node JS
- MongoDB
- Express JS




