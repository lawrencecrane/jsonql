declare module "*.svelte" {
  class Element {
    constructor(args: { target: HTMLElement; props: { [key: string]: any } });
  }

  export default Element;
}
