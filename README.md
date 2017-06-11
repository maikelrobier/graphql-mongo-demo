## Installation
```
yarn install
```
Also download and install *mongodb*.

## Running
### Database:
```
mongod --dbpath ~/Databases/mongo
```
### API:
```
yarn run-server
```
### Client:
```
yarn start
```

## TODO
- [ ] Add relay mutation in the client
- [ ] Query root array field using the viewer workaround
- [ ] Test queries with variables (test with setVariables in the client)
- [ ] Check out Facebook's DataLoader
- [ ] Compare to boilerplates like Create GraphQL Server
- [ ] Think about permission handling
- [ ] Add eslint
- [ ] Add live reload
- [ ] Add logger
- [ ] Support for relay subscriptions
- [ ] Add flow
- [ ] Add unit tests
- [ ] Plug in promise lib for mongoose
- [ ] Add lib for migrations
