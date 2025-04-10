import type { RequestContext } from "@utils/RouteConstructor";
import { StatusCodes } from "@utils/StatusCodes";
import type { Server } from "bun";

type SessionData = {
    userId: string;
    sessionId: string;
};
// This is a simple in-memory session store for demonstration purposes.
// In a real application, you would use a database or a more robust session management system.
const sessions = new Map<string, SessionData>();

export const sessionCookieName = 'eaa-session';

const Authenticator = (request: Bun.BunRequest, server: Server, ctx: RequestContext): Response | void => {
    // ecomm application access-session
    const auth = request.cookies.get(sessionCookieName);
    if (!auth) {
        return new Response('Unauthorized', StatusCodes.UNAUTHORIZED);
    }
    const authData = sessions.get(auth);
    if (!authData) {
        // Session not found or expired
        return new Response('Unauthorized', StatusCodes.UNAUTHORIZED);
    }
    const { userId } = authData;
    const user = {
        id: userId,
    }
    ctx.auth.user = user;
}

export const createAuthSession = (userId: number): string => {
    const sessionGenerated = Bun.randomUUIDv7("hex", Date.now())
    sessions.set(sessionGenerated, { userId: userId.toString(), sessionId: sessionGenerated });
    return sessionGenerated;
}

export default Authenticator;
