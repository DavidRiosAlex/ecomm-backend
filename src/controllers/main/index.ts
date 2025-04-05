import { RateLimiterMiddleware } from "@middlewares/rateLimiter";
import CSRFValidator from "@middlewares/csrfValidator";
import { BunRoute } from "@utils/RouteConstructor";
import { APP_VERSION, RELEASE_VERSION_DATE } from "@configs/index";
import { i18nMiddleware } from "@middlewares/i18nMiddleware";
import { StatusCodes } from "@utils/StatusCodes";

class MainController extends BunRoute<'/'> {
    get = async () => {
        return Response.json(
            { version: APP_VERSION, release_date: RELEASE_VERSION_DATE },
                StatusCodes.OK
        );
    }
}

export default new MainController({
    middlewares: [
        RateLimiterMiddleware,
        CSRFValidator,
        i18nMiddleware
    ]
}).build();
