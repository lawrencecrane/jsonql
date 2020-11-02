## Getting started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
WEBSOCKET_URI=http://localhost:3000 npm run start:dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

### Start WebSocket server

To be able to connect to websocket server, start that from the [backend](../backend) -folder.

## Building and running in production mode

To create an optimised version of the app to serve with static web server:

```bash
npm run build
```
