
## Todo list app

A simple todo list app with users.

Users can:
- add/update/delete/assign tasks to other users
- update username and password

The task list is shared with all users registered 

![Login screen](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/DesktopLogin.png)

![User settings](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/NotificationUserUpdated.png)

![Assign task to user](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/AssignTask.png)

![Message delete task](https://github.com/Ricardo272727/todo-list-app/blob/master/screenshots/DeleteTask.png)



### How to run this project?

#### Configure project

- Download the project ( git clone / download zip )


- Switch to branch production:

```
$ git checkout production
```

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

- Start app

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




