# Usage

Copy `.envrc.sample` to `.envrc` and fill in the values.


Run below to allow the `.envrc` file to be loaded.
```bash
direnv allow .
```

Run below to install the dependencies.
```bash
npm ci
```

Run below to run the database
```bash
docker-compose up -d
```

Run below to start the server.
```bash
npm start
```

# Routes

## POST /:userId/:amount

Send negative amount to reduce the balance of the user.

Only one user balance is available, so it does not matter what the userId is.
