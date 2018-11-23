# Pley

> A Yelp item page clone.

## Related Projects

  - https://github.com/Pley-SDC/Recommended-Reviews-Module
  - https://github.com/Pley-SDC/popular-dishes-and-full-menu
  - https://github.com/Pley-SDC/reservation
  - https://github.com/Pley-SDC/overview

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#Requirements)
1. [Development](#development)

## Usage

> Seed the database on the console using npm run seed.
> Default configuration for database seeding is that mySql has no password
> and a root user. Reconfigure in package.json to match your mysql specs.
> Use npm run compile to launch webpack.
> Use npm start to host the server. Default port is 9001.
> type in localhost:9001/[1-100] (any number between 1-100) to visit the page
> corresponding to that restaurant.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## Server API

### Get restaurant info
  * GET /api/restaurants/:identifier
  * `identifier` can be unique restaurant name or id

### Add restaurant
  * POST /api/restaurants/
  * Expects json data in request body in format:
    ```json
    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "googleMap": "String location",
      "cost": "Number"
    }
    ```

### Update restaurant info
  * PUT /api/restaurant/:identifier
  * `identifier` can be unique restaurant name or id
  * Expects json image data in request body in format (include only keys to update):
    ```json
    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "googleMap": "String location",
      "cost": "Number"
    }
    ```

### Delete restaurant
  * DELETE /api/restaurant/:identifier
  * `identifier` can be unique restaurant name or id

### Get individual image
  * GET /api/images/:id
  * Returns json image data in format:
    ```json
    {
      "user": "String",
      "image": "image URL",
      "description": "String",
      "posted": "YYYY-MM-MM",
      "googleMap": "String location",
      "category": "String",
      "restaurant": "id Number",
      "cost": "Number"
    }
    ```

### Add image to restaurant
  * POST /api/restaurants/:restaurantId/images/
  * Expects json image data in request body in format:
    ```json
    {
      "user": "String",
      "image": "image URL",
      "description": "String",
      "posted": "YYYY-MM-MM",
      "googleMap": "String location",
      "category": "String",
      "restaurant": "id Number",
      "cost": "Number"
    }
    ```
### Update image info
  * PUT /api/restaurants/:restaurantId/:imageId
  * Expects json image data in request body in format (include only keys to update):
    ```json
    {
      "user": "String",
      "image": "image URL",
      "description": "String",
      "posted": "YYYY-MM-MM",
      "googleMap": "String location",
      "category": "String",
      "restaurant": "id Number",
      "cost": "Number"
    }
    ```
### Delete image
  * DELETE /api/images/:id

### Get restaurant data and data for all images related to restaurant
  * GET /api/:identifier
  * `identifier` can be unique restaurant name or id
  * Returns object with `restaurant` and `images` properties (both contain arrays)
