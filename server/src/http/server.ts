import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { authenticateFromLink } from "./routes/authenticate-from-link";
import { getManagedRestaurant } from "./routes/get-managed-restaurant";
import { getProfile } from "./routes/get-proflile";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";
import { signOut } from "./routes/sign-out";

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      origin: (request): boolean => {
        const origin = request.headers.get("origin");

        if (!origin) {
          return false;
        }

        return true;
      },
    })
  )
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status;

        return error.toResponse();
      }
      default: {
        console.error(error);

        return new Response(null, { status: 500 });
      }
    }
  });

app.listen(3333, () => {
  console.log("🔥 HTTP server running!");
});
