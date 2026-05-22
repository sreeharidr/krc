/**
 * Minimal Worker entry for Kurnool Rheumatology Centre.
 *
 * Why this exists:
 * Cloudflare's static-assets binding with `html_handling: "none"` keeps URLs
 * intact (so /about.html doesn't get redirected to /about), but it does NOT
 * automatically serve /index.html for the bare root `/`. This Worker handles
 * that one case and passes everything else straight through to assets.
 */
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Serve the homepage at /
        if (url.pathname === '/') {
            const indexUrl = new URL('/index.html', url);
            return env.ASSETS.fetch(new Request(indexUrl, request));
        }

        // Everything else: hand off to static assets (includes 404 handling)
        return env.ASSETS.fetch(request);
    },
};
