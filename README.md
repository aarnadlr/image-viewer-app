# Image-viewer-app:
# Pinterest-inspired React app running with Docker on Google Cloud Run

## Live deployment: https://hello2-p5g4ghuiha-pd.a.run.app/


---


## About Image-viewer-app:
- **Front-end:** TypeScript React / NextJS
- **Back-end:** Vercel serverless functions (NodeJS)
- **Database:** Cloudinary
- **Deployment:** Docker container on Google Cloud Run (NodeJS)
---
## App Features:
- User may download individual images
- User may select multiple images to download a bundled .zip file
- Unit tests with Jest / React Testing Library
- Fully responsive UI
- Light/dark modes
- Lazy loading images


---
## To run with Docker:


1. Install Docker on your machine.
2. Build container: `docker build -t image-viewer-app .` .
3. Run container: `docker run -p 3000:3000 image-viewer-app` .

View your images created with `docker images`.

---

## To Run Locally in Node:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


---
## To run Jest Tests

```bash
npm test
```
