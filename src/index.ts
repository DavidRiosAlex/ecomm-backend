import { StatusCodes } from "@utils/StatusCodes";
import { routes } from "./routes";

Bun.serve({
    development: true,
    port: 3001,
    routes,
    fetch: () => {
        return new Response("Not Found", StatusCodes.NOT_FOUND);
    }
});
