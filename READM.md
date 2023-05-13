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
- **Collections** - The user will see a list with the collection picture and a short description about the collection. The user can press the open button and be redirected to the collection page. The user will see a add collection button that redirects to the new collection page.

- **Collection-create** - The user sees a form that requires the following information: 
    1-Collection identification: collection title, coverImgSrc and short description; 
    2-Collection Items: title, itemSrc, description. The collection needs to have at least one collection Item.
    The user sees a Create collection button that saves the collection under the user ID. If the user had no previous collections, the isCreator should change from 'false' to 'true'

- **Collection-edit** - The user sees the information of the collection and can change it and save the changes. It is also possible to delete the collection through the delete collection button. The user must see a confirmation message when trying to delete a collection

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



| **Method** | **Route**                          | **Description**                                              |**Request - Body**                                        |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/home`                            | Main page route.  Renders `home`  view.                      | N/A                                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  | N/A                                                      |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/login`                           | Renders `login` form view.                                   | N/A                                                      |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `POST`     | `/logout`                          | Sends Logout request to the server.                          | N/A                                                      |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             | {name, email, password}                                  |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { name, email, password }                    |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  | {userId, [collectionID]}                                 |
| `POST`     | `/private/favorites`               | Private route. Adds a new favorite for the current user.     | {userId, [collectionID]}                                 |
| `DELETE`   | `/private/favorites/:collectionId` | Private route. Deletes the existing favorite from the current user. | {userId, [collectionID]}                          |
| `GET`      | `/private/follows`                 | Private route. Render the `follows` view.                    | {userId, follows: [UserId]}                              |
| `POST`     | `/private/follows`                 | Private route. Adds a new follows for the current user.      | {userId, follows: [UserId]}                              |
| `DELETE`   | `/private/follows/:userId`         | Private route. Deletes the existing follows from the current user. | {userId, follows: [UserId]}                        |
| `GET`      | `/creators`                        | Renders `creators-list` view.                                | {isCreator:true, User Model, Collection Model}           |
| `GET`      | `/creator/details/:id`             | Renders `creator-details` view for each creator.             | {isCreator:true, User Model, Collection Model}           |
| `GET`      | `/collections`                     | Renders `collections-list` view.                             | Collection Model                                         |
| `GET`      | `/collections/details/:id`         | Renders `collections-details` view for each collection.      | Collection Model                                         |
| `POST`     | `/collections/create`              | Renders `collections-create` view.                           | N/A                                                      |
| `PUT`      | `/collections/edit`                | Renders `collections-edit` view.                             | {Collection Model, Collection Items Model}               |
| `DELETE`   | `/collections/delete/:id`          | Renders `collections-details` view for each collection.      | {isCreator:true, User Model, Collection Model}           |






## Models

User model

```javascript
{
  id: String,
  name: String,
  email: String,
  password: String,
  isCreator:Boolean,
  ownedCollections:[CollectionId]
  follows: [userId], //The user follows
  favourites: [collectionsId],
  following: [userId] //The user is followed by other users
  }

```

Collection model

```javascript
{
  id: String,
  title: String,
  coverImgSrc: String,
  shortDescription: String,
  collectionItems:[itemID],
  favourites:[userId],
  dateCreated: Date
  }

```

Collection Item model

```javascript
{
  id: String,
  title: String,
  itemSrc: String,
  description: String
  
}

```
Messages model (Bonus)

```javascript
{
  id: String,
  userId: String,
  creatorId: String,
  messageBody: String,
  sendDate: Date
}
```
Reviews model (Bonus)

```javascript
{
  id: String,
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

[Repository Link](https://github.com/jodmadeira/GalleryHub)

<!-- [Deploy Link]() -->

<br>

### Slides

Link to be provided later

<!-- [Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing) -->

<br>

### Contributors
Henrique Ortiz - [`github`](https://github.com/Ricozzo) - [`Linkedin`](https://www.linkedin.com/in/henriqueortizpereira/)

João Madeira - [`github`](https://github.com/jodmadeira) - [`Linkedin`](https://www.linkedin.com/in/joaoddmadeira/)
