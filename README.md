# Hair Flash Studio website

A lightweight, four-page website for Hair Flash Studio in Waterloo, Sydney. Its dark design takes inspiration from the salon's Base44 prototype while using the original Hair Flash logo and licensed portrait.

## Run locally

Open `index.html` in a browser, or run a local static server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. The pages are at `/`, `/about/`, `/pricing/`, and `/contact/`.

## Deploy to Vercel

Import the [GitHub repository](https://github.com/virtuallywired/hairdresser-site) in Vercel. Select **Other** as the framework preset, leave the root directory as `./`, and do not set a build command. Vercel serves the static HTML pages. Future pushes to `main` trigger production deployments once the repository is connected.

## Content to confirm before going live

The phone number, email, address, hours, salon history and price guide came from the previous [Hair Flash website](https://www.hairflash.com.au/) and the salon's Base44 prototype. Confirm these details before publishing, especially prices and opening hours. The hero photo in `assets/hairflash-original-portrait.jpg` comes from the original Weebly export; CSS gives it a warmer, stronger appearance without changing the source file. The logo in `assets/hairflash-logo.png` is a web-sized copy of the user-supplied, enhanced original salon logo. The contact form opens an email draft in the visitor's email app; it does not store or send messages through a server.

The original Weebly export is unpacked locally in `old-site-data/weebly-export/` for reference. That folder is intentionally excluded from Git; the deployable site assets live in `assets/`.
