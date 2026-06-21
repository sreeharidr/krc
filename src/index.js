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

        // Redirect www.rheumatology.center → rheumatology.center (canonical host).
        // Preserves path, query, and fragment. 301 = permanent, so browsers and
        // search engines stop requesting the www variant entirely.
        if (url.hostname === 'www.rheumatology.center') {
            url.hostname = 'rheumatology.center';
            return Response.redirect(url.toString(), 301);
        }

        // Serve the homepage at /
        if (url.pathname === '/') {
            const indexUrl = new URL('/index.html', url);
            return env.ASSETS.fetch(new Request(indexUrl, request));
        }

        // Everything else: hand off to static assets (includes 404 handling)
        return env.ASSETS.fetch(request);
    },
};
