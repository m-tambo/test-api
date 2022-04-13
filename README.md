## Installation

Make sure Node.js is installed.

Use npm command to install necessary npm packages:

```
npm i
```

Create env file in root and add variables (3rd party API hostname, port)

```
touch .env
```

## Start application locally

```
npm start
```

## Hit users endpoint

Use browser navigation or curl request.

```
localhost:<PORT>/users
```


## Docker option
Make sure Docker is installed and running locally.

```
docker build -t users-api .
docker run --expose=<port-from-env-file> -p <desired-port>:<port-from-env-file> users-api
```
To verify that the service is running, use the `docker ps` command.

*In this case, the `/users` endpoint will be available at localhost:<desired-port>/users from the docker run command, not the exposed port.*

## Testing

Run tests using `npm test`.
