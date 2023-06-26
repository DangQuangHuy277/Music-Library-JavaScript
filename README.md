# Music-Library
a simple RESTful API of music library
# Server Side

## Database diagram

![Untitled](https://github.com/DangQuangHuy277/Music-Library/assets/62865419/72e060b5-a0ee-4b86-9d1f-921ce6e811ec)

First change directory to server by ```cd server``` then

# Install nessessory dependency, package for server
(If yarn is not installed then install using ```npm install --global yarn```)

Run this command by terminal
```yarn install```

# Set up database
- Enable postgreSQL extension to auto generate id 
(Run this command by psql of postgreSQL to add extension to postgreSQL to use auto generate uuid):
```CREATE EXTENSION IF NOT EXISTS "uuid-ossp";```

The following commands are run in the server directory

- Run this to create database 
```sequelize db:migrate``` and ```sequelize db:migrate --env=test``` (for test environment)
 OR
```npx sequelize-cli db:migrate``` and ```npx sequelize-cli db:migrate --env=test```

- Run this to create sample record for database
```sequelize db:seed:all``` and ```sequelize db:seed:all --env=test```
or
```npx sequelize-cli db:seed:all``` and ```npx sequelize-cli db:seed:all --env=test```

# Test and Using
## RESTful API

Note that all API URL have format: `/api/Endpoint`

| Method | Endpoint | Description |
| ------ | ---------| ----------- |
| GET | /songs | Returns a list of all songs |
| POST | /songs | Creates a new song |
| GET | /songs/\:id | Returns a specific song by ID|
| PATCH | /songs/\:id | Updates a specific song by ID|
| DELETE | /songs/\:id | Deletes a specific song by ID|
| GET | /albums | Returns a list of all albums |
| POST | /albums | Creates a new album |
| GET | /albums/\:id | Returns a specific album by ID |
| PATCH | /albums/\:id | Updates a specific album by ID |
| DELETE | /albums/\:id | Deletes a specific album by ID |
| GET | /artists | Returns a list of all artists |
| POST | /artists | Creates a new artist |
| GET | /artists/\:id | Returns a specific artist by ID |
| PATCH | /artists/\:id | Updates a specific artist by ID |
| DELETE | /artists/\:id | Deletes a specific artist by ID |
| GET | /artists/\:id/albums | Return list album of a specific artist |
| GET | /artists/\:id/songs | Return list songs of a specific artist |
| GET | /albums/\:id/songs | Return list songs of a specific album |
| GET | /songs/\:id/artist | Return list songs of a specific artist |

## Testing
- Run ```yarn run start:dev``` to run server -> Test by request from Postman or https://hoppscotch.io/
- Note: Unit test only use after turning off authentication and authorization to test each API function only

