# Mikro-ORM Test Repo
This repo can be used to submit reproductions of errors to the Mikro-ORM library.

It uses webpack and babel-typescript to build JS code instead of the typescript library directly.
It also stores entities in a separate package. 

# Config
1. Install modules: `yarn install`.
2. Start project: `yarn start`. This will configure environment variables, create schema, and build and run everything.

# Commands
These commands are available after configuring the environment variable.
	
In `package/entities`:
  * `yarn start` - Builds and watches both package and declarations (using screen)
  * `yarn build` - Builds package
  * `yarn ts`    - Builds declarations

In `package/app`:
  * `yarn start` - Run app (must be built first)
  * `yarn build` - Builds app');
  * `yarn orm:recreate` - Drops and creates the DB schema
