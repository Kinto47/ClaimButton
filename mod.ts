import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const PORT = 8000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // Servire il file index.html
  if (url.pathname === "/") {
    const file = await Deno.readFile("./public/index.html");
    return new Response(file, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  }

  // Servire il file CSS
  if (url.pathname === "/style.css") {
    const file = await Deno.readFile("./public/style.css");
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  // Servire il file JavaScript
  if (url.pathname === "/app.js") {
    const file = await Deno.readFile("./public/app.js");
    return new Response(file, {
      headers: {
        "content-type": "application/javascript",
      },
    });
  }

  return new Response("Not Found", { status: 404 });
}

console.log(`Server running on http://localhost:${PORT}/`);
await serve(handler, { port: PORT });
