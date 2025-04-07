import { BunRoute } from "@utils/RouteConstructor";
import { User } from "@models/user";

class UsersRoute extends BunRoute<'/users'> {
    get = async (req: Request) => {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        const users = await User.select({
            pagination: {
                limit,
                offset,
            }
        });

        return Response.json(users, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export default new UsersRoute({
    middlewares: [],
}).build();
