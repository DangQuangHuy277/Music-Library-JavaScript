# Music-Library-API
a simple RESTful API of mucsic library 
# Create postgerSQL extension to auto generate id
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# Run this to create database
sequelize db:migrate
# or
npx sequelize-cli db:migrate

# Run this to create sample database
sequelize db:seed:all
# or
npx sequelize-cli db:seed:all
