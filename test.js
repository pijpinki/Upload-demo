class App {
  use(enpintOrHandler, ...handlers) {
    const endpoint =
      typeof enpintOrHandler === "string" ? enpintOrHandler : "/";

    handlers.forEach((handler) => handler(this.req, this.res));
  }
}
