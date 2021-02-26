# Project Mithril Reviews API

## Tech Stack

<table>
  <tr>
    <td>Languages</td>
    <td>
      <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
      <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td>Frameworks & Libraries</td>
    <td>
      <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
    </td>
  </tr>
  <tr>
    <td>Hosting</td>
    <td>
      <img alt="Docker" src="https://img.shields.io/badge/-docker-2496ED?&style=for-the-badge&logo=docker&logoColor=white"/>
      <img alt="AWS" src="https://img.shields.io/badge/AWS%20-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/>
    </td>
  </tr>
  <tr>
    <td>Databases</td>
    <td>
      <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>
  </tr>
</table>

## Usage

1. Run `npm install` to download dependencies.
2. Run `npm run sever` to start the API. By default runs on port 8080.
3. 

## Endpoints

- GET '/reviews' - returns reviews for a specific product ID specified in request.query. -
  Example result:
  `{ "product": "2", "page": 0, "count": 5, "results": [ { "review_id": 5, "rating": 3, "summary": "I'm enjoying wearing these shades", "recommend": false, "response": null, "body": "Comfortable and practical.", "date": "2019-04-14T00:00:00.000Z", "reviewer_name": "shortandsweeet", "helpfulness": 5, "photos": [{ "id": 1, "url": "urlplaceholder/review_5_photo_number_1.jpg" }, { "id": 2, "url": "urlplaceholder/review_5_photo_number_2.jpg" }, // ... ] }, { "review_id": 3, "rating": 4, "summary": "I am liking these glasses", "recommend": false, "response": "Glad you're enjoying the product!", "body": "They are very dark. But that's good because I'm in very sunny spots", "date": "2019-06-23T00:00:00.000Z", "reviewer_name": "bigbrotherbenjamin", "helpfulness": 5, "photos": [], }, // ... ] }`

- GET '/reviews/meta' - returns metadata for the reviews of a specific product ID specified in request.query -
  Example result:
  `{ "product_id": "2", "ratings": { 2: 1, 3: 1, 4: 2, // ... }, "recommended": { 0: 5 // ... }, "characteristics": { "Size": { "id": 14, "value": "4.0000" }, "Width": { "id": 15, "value": "3.5000" }, "Comfort": { "id": 16, "value": "4.0000" }, // ... }`

- POST '/reviews' -
  Example body:
  `{ "product_id":12012, "rating":5, "summary":"wow amazing", "body":"truly incredible product wow", "recommend": true, "name":"Minister of Mergery", "email":"nunyabizness@yahoo.com", "photos":[], "characteristics":{} } `

- PUT '/reviews/:review_id/helpful - Update a review to show it was found helpful

- PUT '/reviews/:review_id/report - Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.


