import { fromHono } from "chanfana";
import { Hono } from "hono";
import { RenderImage } from "./endpoints/render";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/api/render", RenderImage);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Render endpoint is registered via OpenAPI above

// Export the Hono app
export default app;
