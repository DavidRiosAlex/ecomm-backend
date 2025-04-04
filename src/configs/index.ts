export const APP_VERSION = Bun.env.APP_VERSION || '0.0.1';
export const RELEASE_VERSION_DATE = Bun.env.RELEASE_VERSION_DATE || new Date().toISOString();
export const APP_SECRET_CSRF = Bun.env.APP_SECRET_CSRF || 'dummy-secret';

