import { sessionCookieName } from "@middlewares/authenticator";
import { User } from "@models/user/index";
import { hashPassword } from "@utils/passwords";
import { BunRoute } from "@utils/RouteConstructor";
import { StatusCodes } from "@utils/StatusCodes";

class LoginRoute extends BunRoute<'/login'> {
    post = async (req: Request) => {
        try {
            const { email, password } = await req.json();
            if (!email || !password) {
                return Response.json({ error: StatusCodes.UNAUTHORIZED.statusText }, StatusCodes.UNAUTHORIZED);
            }

            const user = await User.selectByEmail(email);
            const isValid = (await hashPassword(email, password)) === user.password;
            if (!isValid) {
                return Response.json({ error: StatusCodes.UNAUTHORIZED.statusText }, StatusCodes.UNAUTHORIZED);
            }

            const session = await user.createSession();
            
            return Response.json({
                cookies: [ {
                    name: sessionCookieName,
                    value: session.session
                } ],
            }, StatusCodes.CREATED);
        } catch (error) {
            return Response.json({
                error: StatusCodes.INTERNAL_SERVER_ERROR.statusText
            }, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    };
}

export default new LoginRoute({
    middlewares: [],
}).build();