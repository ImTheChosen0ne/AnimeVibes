

# AnimeVibes
Check out [AnimeVibes](https://animevibes.onrender.com)

## Contents
- [About](#about)
- [Author](#author)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Database Scheme](#database-scheme)
- [User Stories](#user-stories)
- [Wire Frames](#wire-frames)
- [Stack](#stack)

## About
AnimeVibes was written by a Matthew Almeida as a capstone project during my time studying at appAcademy. This mockup of TikTok was written and built on a React & Redux front-end and Flask back-end with SQLAlchemy as an ORM.

## Author
 * Matthew Almeida
   * https://github.com/ImTheChosen0ne
   * https://www.linkedin.com/in/matthew-almeida-103425183/

## Splash Page
![splash](https://user-images.githubusercontent.com/66566925/174560214-c0601b18-8cbe-4ce4-895c-8bf8b196eeb5.gif)

## Post and comments
![Post and comments](https://user-images.githubusercontent.com/66566925/174561250-05f8e96e-eb7e-4741-9167-e3a6eaf2f7d0.gif)

## Profile page
![Profile page](https://user-images.githubusercontent.com/66566925/174562986-bf32d1d3-29f3-4da1-a4a7-0762f259c31e.gif)

## Favorites/Likes
![Favorites/likes](https://user-images.githubusercontent.com/66566925/174560214-c0601b18-8cbe-4ce4-895c-8bf8b196eeb5.gif)

## Search
![Search](https://user-images.githubusercontent.com/66566925/174561250-05f8e96e-eb7e-4741-9167-e3a6eaf2f7d0.gif)

## Messaging
![Messaging](https://user-images.githubusercontent.com/66566925/174562986-bf32d1d3-29f3-4da1-a4a7-0762f259c31e.gif)

## Features
  [MVP Feature List](https://github.com/ImTheChosen0ne/Capstone-project/wiki/Features)

 * Users & Authentication
 * Posts
 * Comments
 * Favorites
 * Likes
 * Search
 * Messaging

 ## Technologies Used
 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

 ## Database Scheme
 [Database Scheme](https://github.com/ImTheChosen0ne/Capstone-project/wiki/Schema)

 ## User Stories
 [User Stories](https://github.com/ImTheChosen0ne/Capstone-project/wiki/User-Stories)

 ## Wire Frames
 [Wire Frames](https://github.com/ImTheChosen0ne/Capstone-project/wiki/Wireframes)

 ## Stack
 * React: https://react.dev/
 * Redux: https://redux.js.org/
 * Flask: https://flask.palletsprojects.com/en/2.3.x/
 * WTForms: https://wtforms.readthedocs.io/en/3.0.x/
 * SQAlchemy: https://www.sqlalchemy.org/
