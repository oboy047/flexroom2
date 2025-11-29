import { RouteMiddleware } from "rwsdk/router";

export const setCommonHeaders =
  (): RouteMiddleware =>
  ({ response, rw: { nonce } }) => {
    if (!import.meta.env.VITE_IS_DEV_SERVER) {
      response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload",
      );
    }

    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "no-referrer");

    response.headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );

    // UPDATED CSP – now includes connect-src for Appwrite

    response.headers.set(
      "Content-Security-Policy",
      (
        "default-src 'self'; " +
        "connect-src 'self' https://fra.cloud.appwrite.io; " +    // 🔥 ADDED THIS
        "script-src 'self' 'unsafe-eval' 'nonce-" + nonce + "' https://challenges.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' https://images.unsplash.com data: https:; " +   // allow your room images
        "frame-src 'self' https://challenges.cloudflare.com; " +
        "frame-ancestors 'self'; " +
        "object-src 'none';"
      )
    );
  };
