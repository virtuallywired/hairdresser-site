# Hair Flash Studio website

A lightweight, single-page website for Hair Flash Studio in Waterloo, Sydney.

## Run locally

Open `index.html` in a browser, or run a local static server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Vercel

Import the [GitHub repository](https://github.com/virtuallywired/hairdresser-site) in Vercel. Select **Other** as the framework preset, leave the root directory as `./`, and do not set a build command. Vercel will serve `index.html` from the project root. Future pushes to `main` trigger production deployments once the repository is connected.

## Content to confirm before going live

The phone number, email, address, hours, salon history and price guide came from the previous [Hair Flash website](https://www.hairflash.com.au/). Confirm these details before publishing, especially prices and opening hours. The hero image is newly generated artwork for this project.
