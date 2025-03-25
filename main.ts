import { Hono } from "hono";
import "jsr:@std/dotenv/load";

const app = new Hono();

app.get("/api/v3/settings", async (c) => {
  try {
    const netdataBaseUrl = Deno.env.get("NETDATA_BASE_URL") || "http://localhost:19999";

    // Fetch all registered nodes
    const registeredNodes = await fetch(`${netdataBaseUrl}/api/v1/registry?action=hello`, {
      headers: { ...c.req.header() },
    });

    if (!registeredNodes.ok) {
      console.error("Failed to fetch registered nodes:", registeredNodes.statusText);
      return c.json({ error: "Failed to fetch registered nodes" }, 500);
    }

    const registeredNodesJson = await registeredNodes.json();

    // Fetch the original settings
    const originalBody = await fetch(`${netdataBaseUrl}/api/v3/settings?file=default`, {
      headers: { ...c.req.header() },
    });

    if (!originalBody.ok) {
      console.error("Failed to fetch settings:", originalBody.statusText);
      return c.json({ error: "Failed to fetch settings" }, 500);
    }

    const originalBodyJson = await originalBody.json();

    // Override preferred_node_ids
    originalBodyJson.value.preferred_node_ids = [];
    for (const registeredNode of registeredNodesJson.nodes) {
      originalBodyJson.value.preferred_node_ids.push(registeredNode.machine_guid);
    }

    console.log("Modified Response:", JSON.stringify(originalBodyJson, null, 2));
    return c.json(originalBodyJson);

  } catch (error) {
    console.error("Unexpected error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.get("*", async (c) => {
  try {
    const netdataBaseUrl = Deno.env.get("NETDATA_BASE_URL") || "http://localhost:19999";
    const targetUrl = `${netdataBaseUrl}${c.req.path}${URL.parse(c.req.url)?.search || ""}`;

    const res = await fetch(targetUrl, {
      headers: { ...c.req.header() },
    });

    if (!res.ok) {
      console.error("Failed to proxy request:", res.statusText);
      return c.json({ error: "Proxy request failed" }, 500);
    }

    return res;
  } catch (error) {
    console.error("Proxy error:", error);
    return c.json({ error: "Proxy request failed" }, 500);
  }
});

Deno.serve({
  port: Number(Deno.env.get("PORT")) || 8000,
  hostname: Deno.env.get("HOST") || "::",
}, app.fetch);
