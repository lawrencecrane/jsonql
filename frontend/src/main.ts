import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "hello from the otherside",
  },
});

export default app;
