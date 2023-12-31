# backend-finalproject-gigih

# Final Project Generasi GIGIH (Backend)

This repository was created as proof that the Final Project Generation Gigih 3.0 Full Stack Engineering by GoTo Impact Foundation has been completed

## Front-End Final Project

If you want to see Front-End Final Project Generasi Gigih you can access :
`https://github.com/zidaneibrahimf7/frontend-finalproject-gigih`

# Project Development Schema

![Architecture Final Project Schema](./docs/Architecture_FinalProject_Gigih.drawio-2.png)

## Database Structure

![Database Schema](./docs/finalproject-be-gigih.jpg)

There are 3 collections in the database models:

- `videoList`
- `productList`
- `commentList`

## API Architecture

![API Architecture](./docs/finalproject-be-gigih-apiarch.drawio.png)

the API structure

- `User` is the user who will consume the API give some response and request
- `Backend` is the backend server that will serve the API (Node JS and Express JS) to get request from user and get response the database from mongodb. finally the backend give a response to user again
- `MongoDB` is the database that will store the data to response the request from backend

## API Request and Response

### VideosList

```json
{
  "videoID": "string",
  "title": "string",
  "thumbnailUrl": "string"
}
```

### ProductList

```json
{
  "videoID": "string",
  "productID": "string",
  "linkProduct": "string",
  "productName": "string",
  "price": "number"
}
```

### CommentList

```json
{
  "videoID": "string",
  "username": "string",
  "comment": "string",
  "timestamp": "date" , "default: Date.now()"
}
```

The `productList` and `commentList` collection have a field called `videoID` which is a reference to the `videoID` field of the `videosList` collection.

inside the `Backend Architecture` there are 2 layers:

- `routes` : layer that will handle the request from the `User` and send the response back to the `User`
- `models` : is the layer that will handle the data from the `MongoDB` and send the data back to the `routes`

## List APIs

### API Request and Response

| Method | Endpoint                               | Description                          | Access |
| ------ | -------------------------------------- | ------------------------------------ | ------ |
| GET    | `/api`                                 | first API generate                   | user   |
| GET    | `/api/video/`                          | get all video list video Thumbnail   | user   |
| GET    | `/api/product/:videoID`                | get product properties from videoID  | user   |
| GET    | `/api/product/search`                  | get product details search bar       | user   |
| GET    | `/api/comment/:videoID`                | get all comment list from database   | user   |
| POST   | `/api/comment/submit-comment`          | post comment list to database        | user   |
| DELETE | `/api/comment/delete-comment/:videoID` | delete comment user list in database | user   |

API list example you can see at [!API Example Request and Response](https://gist.github.com/zidaneibrahimf7/440cda5e17d8e41e67258d2f0bb676c4)

The list of APIs is as follows:

### GET /api

This endpoint allows users to get thumbnail in videoList.

- URL Params:
  None
- Data Params:
  None
- Headers:
  None
- Success Response
  `CODE: 200`

  - Content:

  ```json
  ["Welcome to Tokopedia Play Clone API Zidane"]
  ```

### GET api/videos

This endpoint allows users to get thumbnail in videoList.

- URL Params:
  None
- Data Params:
  None
- Headers:
  Content-Type: application/json
- Success Response
  `CODE: 200`

  - Content:

  ```json
  [
    {
      "videoTitle": "String",
      "videoID": "String",
      "thumbnailUrl": "String"
    }
  ]
  ```

- Error Response

  `CODE: 404`

  - Content:

  ```json
  {
    "message": "Videos not found"
  }
  ```

### GET api/product/:videoID

This endpoint allows users to get product from productList with videoID required

- URL Params:
  required: `videoID=[string]`
- Data Params:
  None
- Headers:
  context-type: application/json
- Success Response :
  `Code: 200`

  - Content:

  ```json
  [
    {
      "videoID": "String",
      "productID": "String",
      "linkProduct": "String",
      "productName": "String",
      "price": Number
    }
  ]
  ```

- Error Response :
  `Code: 500`
  Content:

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

  `Code: 404`
  Content:

  ```json
  {
    "message": "Video ID is not found in database"
  }
  ```

### GET api/comment/:videoID

This endpoint returns all comments of a video by its videoID

- URL Params:
  required: `videoID=[string]`
- Data Params:
  None
- Headers:
  Context-text: application/json
- Success Response
  `Code: 200`

  - Content:

  ```json
  {
    "videoID": "String",
    "username": "String",
    "comment": "String",
    "timestamp": "Date"
  }
  ```

- Error Response
  `Code: 500`

  - Content:

  ```json
  {
    "message": "Internal server error"
  }
  ```

  `Code: 404`

  - Content:

  ```json
  {
    "message": "Video ID not found in database"
  }
  ```

  ### POST api/comment/submit-comment

This endpoint returns all comments of a video by its videoID

- URL Params:
  required:
- Data Params:
  None
- Headers:
  Context-text: application/json
- Success Response
  `Code: 200`

  - Content:

  ```json
  {
    "videoID": "String",
    "username": "String",
    "comment": "String",
    "timestamp": "Date", "Default: format(Date.Now())"
  }
  ```

- Error Response
  `Code: 500`

  - Content:

  ```json
  {
    "response": "Fail",
    "message": "Internal server error"
  }
  ```

  `Code: 409`

  - Content:

  ```json
  {
    "message": "Video ID not found in database"
  }
  ```

  ### DELETE api/comment/submit-comment

This endpoint returns all comments of a video by its videoID

- URL Params:
  required:
- Data Params:
  None
- Headers:
  Context-text: application/json
- Success Response
  `Code: 200`

  - Content:

  ```json
  {
    "message": "Comment deleted successfully"
  }
  ```

- Error Response
  `Code: 404`

  - Content:

  ```json
  {
    "message": "Comment not found!"
  }
  ```

  `Code: 500`

  - Content:

  ```json
  {
    "message": "Internal server error"
  }
  ```

  `Code: 409`

  - Content:

  ```json
  {
    "message": "Video ID not found in database"
  }
  ```

## How to run! (Getting Started Run Locally)

### Environment Equipment

Create a `.env` file in the project root and Build your own Database Url `Your (MONGODB_DATABASE_URL)`

1. Clone this repository

```bash
git clone `https://github.com/zidaneibrahimf7/backend-finalproject-gigih.git`
```

2. Install dependencies

```bash
npm install
```

3. Run the server

```bash
npm start
```

4. Build your .env and build your own PORT. So you can access the database using `http://localhost:(YourPortNumber)`

## Improvement API Server Side

1. Server Side Event in Comment Feature :
   - user can write comment and submit it without refresh a page.
     Endpoint: `/api/comment/submit-comment`
   - User can delete comments by clicking "delete
     Endpoint : `/api/comment/delete-comment/:videoID`
2. Search Box Feature API :
   - User can write some product name and found the product detail.
     Endpoint:` /api/product/search`

## Deployment

You can access backend server API at [Deployment API Tokopedia Play Clone](https://backend-finalproject-gigih.vercel.app/api)
