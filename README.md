# Chatq Social Network SPA

[![Logo](https://res.cloudinary.com/dar4inn2i/image/upload/v1552651172/contest.jpg)]

### Description
Chatq is your point of inspirational. A place to share photos and make stories out of them.

Chatq comes from Chautauqua - a movement that was created in the late
 nineteenth century with a unique idea for education by lectures(talks). The first actual lecture took place on the lake Chautauqua,
 from where the name comes.

Nowadays, in the technology era, internet literally floods us with information about everything,
but not always with one that brings us satisfaction makes us more knowledgeable, aware or inspired. We like the idea making a place,
where people can search for pure inspiration and
be a part of that, by creating their own story. So here we are now!
### Tech

Fantasy Tour de France uses a number of open source projects to work:
* [MongoDB](https://www.mongodb.com) - Free and open-source cross-platform document-oriented database
* [Mongoose](http://mongoosejs.com/index.html) - Elegant MongoDB object modeling for NodeJS
* [NodeJS](https://nodejs.org/en/) - Evented I/O for the backend
* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for NodeJS
* [JSONWebToken](https://jwt.io) - Used for authorization
* [ReactJS](https://reactjs.org) - A JavaScript library for building user interfaces
* [Ant.Design](https://ant.design/) - A React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.
* [Cloudinary](https://cloudinary.com/) - Cloudinary is the media management platform for web and mobile developers. An end-to-end solution for all your image and video needs.

The goal of this project is to show the core concepts of building SPA with ExpressJS and ReactJS and using file storage cloud API (in my case Cloudinary). In this project I've used:

* React Regular Components
* React Higher Order Components
* React Stateless Functional Components where no state is needed
* React Router for routing
* Request, Auth, CRUD and helper services in attempt to abstract some of the functions, making them reusable

### Installation

Chatq requires
* [MongoDB](https://www.mongodb.com/download-center#community) v3.6+
* [NodeJS](https://nodejs.org/en/) v8+

Install MongoDB and start the database (port: 27017)

```sh
$ cd back-end
$ start-mongodb
```

Install the dependencies and start the server (port: 8000)

```sh
$ cd back-end
$ npm install
$ npm start
```

Install the dependencies and start the client (port: 3000)

```sh
$ cd..
$ cd front-end
$ npm install
$ npm start
```

### Features

- Anonymous users
    - View all open groups and details about each story
    - View all comments for a certain story
    - View all current challenges and details about them
    - View information about how to get involved into the social network
    - Login/Register

- Authenticated users
    - Create a story in open group with 4 photos and storyline
    - Add comments to all stories
    - Join to a challenge with story
    - Browse all old challenges and their stories
    - Start / Stop following group
    - Start / Stop following user
    - Browse all user stories
    - Make changes to his stories from the open groups
    - Make changes to his stories from active challenges before deadline
    - Delete his stories
    - Delete his comments

- Admin users
    - Create/Edit challenges
    - Create/Edit categories
    - Delete users stories
    - Delete users

### Authors

* [Nino Bonev](https://github.com/NinoBonev/Gotcha)

### License
----

MIT