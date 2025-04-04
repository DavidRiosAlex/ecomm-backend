import type { RequestContext } from "@utils/RouteConstructor";
import type { Server } from "bun";
import i18next from "i18next";


i18next.init<{
    en: Record<string, string>;
    es: Record<string, string>;
}>({
    lng: "en",
    fallbackLng: "en",
    defaultNS: 'messages',
    resources: {
        en: { messages: await Bun.file("src/translations/en/messages.json").json() },
        es: { messages: await Bun.file("src/translations/en/messages.json").json() },
    }
})

export const i18nMiddleware = (request: Bun.BunRequest, server: Server, ctx: RequestContext) => {
	const language = request.headers.get("accept-language")?.split(",")[0] || "en";
    console.log(language, Bun.file("src/translations/en/messages.json").json())
    const i18n = i18next.cloneInstance({ initAsync: false, initImmediate: false, lng: language });
	i18n.changeLanguage(language);
	ctx.i18n = { t: i18n.t.bind(i18n) };
};
