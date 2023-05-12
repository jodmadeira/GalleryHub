# Gallery Hub

<br>



## Description

Platform that allows artists and content creators to present their productions, receive feedback and explore monetization opportunities



<br>

## User Stories

### User Experience
- **Navbar** - The user sees a nav bar at the top of the Website. The Navbar is showned on everypage of the website. The Navbar shows the buttons: Home, Collections, Creators, Favourites, Follows and  Search. The user also sees the Profile button on the right side that opens a hidden menu with the buttons LogIn and Signup if there is no user in session or Logout if there is a user in session. Each button will have links to their respective page. If the user tries to open Favourites or Follows and there is no user in session, a message will appear informing the user it must login before being able to navigate to those pages.
- **Signup** - The user sees a container centered in the screen that allows to input name, email, password and confirm password fields. The user receives an error message if there is an error filling the form and a success message if the signup is successful.
- **Login** - The user sees a container centered in the screen that allows to input email and password fields. The user receives an error message if there is an error filling the form and a success message if the login is successful. After login the name of the user appears next to the profile button on the NavbAr
- **Logout** - The user clicks on the profile icon and is able to see the buttons profile and logout. When logout is clicked, the user session finnishes and the user name disappears from next to the profile button. The user is redirected to the homepage.
- **Home page** - The Home page will contain an introductory message explaining the purpose of the website and how both users and creators can interact with it. It will showcase 4 random collections in a carousel. The user can click on one of the shown collections and it will redirect to the collection page.
- **Collections** - The user will see a list with the collection picture and a short description about the collection. The user can press the open button and be redirected to the collection page.
- **Collection:id page** -The user sees the name of the collection on the top with a button to like/favourite the collection and an "about section" with the following information: creator, short description and # of likes/favourites. Below there is a gallery with the items of the collection. There is an image for each with a title.
- **Creators** - The user sees a gallery with each creator information. For each creator, the information shown is: name, number of collections, name of most recent collection, # of follows a button to follow the creator, a button to search the creators collections and a contact button. When the user clicks the follow buttons, it increases the follow count in the screen. When the user clicks the collections button, it will go to the collections page, filtered to the creators collections. When the user clicks the contact button, a contect form appears with the fields: Subject, message and send button.
- **Favourites, Follows** - The Favourites and Follows page will only be accessible if there is a user in session. The favourites page will show a collections page filtered to the users favourites. The follows page will show a creators page filtered to the users follows. 
- **Search** - Clicking on it will allow user to search for both creators names or collection titles. The search page will show 2 section. The first for the creators that match the search and the second for the collections that match the search.
- **Profile Page** - The user is able to change the name, email and password. The user can press the Save button and the changes will be applied

### Error Handling
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              |**Request - Body**                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `DELETE`   | `/private/favorites/:restaurantId` | Private route. Deletes the existing favorite from the current user. |                                                        |
| `GET`      | `/restaurants`                     | Renders `restaurant-list` view.                              |                                                          |
| `GET`      | `/restaurants/details/:id`         | Renders `restaurant-details` view for the particular restaurant. |                                                          |







## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  creator:{
    isCreator:Boolean,
    collectionId:[CollectionId]
  },
  favourites: [FavoriteId],
  follows: [UserId]
  }

```

Collection model

```javascript
{
  title: String,
  coverImgSrc: String,
  shortDescription: String,
  favourites: [CollectionId],
  follows: [UserId],
  dateCreated: Date
  }

```

Collection Item model

```javascript
{
  itemSrc: String,
  title: String,
  description: String
  
}

```
Messages model

```javascript
{
  userId: String,
  creatorId: String,
  messageBody: String,
  sendDate: Date
}
```

<br>

## API's


<br>


## Packages

IronLauncher
Bootstrap

<br>

## Backlog

<br>


## Links

### Git

[Repository Link]()

[Deploy Link]()

<br>

### Slides

Link to be provided later

<!-- [Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing) -->

<br>

### Contributors
Henrique Ortiz - [`github`](https://github.com/Ricozzo) - [`Linkedin`](https://www.linkedin.com/in/henriqueortizpereira/)

João Madeira - [`github`](https://github.com/jodmadeira) - [`Linkedin`](https://www.linkedin.com/in/joaoddmadeira/)
