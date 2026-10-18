# Academia de Español – Vercel deploy

Files:
- index.html : the whole website
- api/ai.js  : Vercel serverless function (AI proxy, needs ANTHROPIC_API_KEY)

## Deploy (CLI)
1. npm i -g vercel
2. cd into this folder
3. vercel login
4. vercel            (accept defaults; Framework = Other; no build command)
5. vercel env add ANTHROPIC_API_KEY   (select Production + Preview, paste key)
6. vercel --prod

## Deploy (GitHub + dashboard)
1. Push this folder's contents to a GitHub repo (index.html and api/ at the repo root).
2. vercel.com > Add New > Project > import the repo.
3. Framework Preset: Other. Leave build command and output directory empty.
4. Environment Variables: ANTHROPIC_API_KEY = your key.
5. Deploy. (If you add the key later, redeploy.)

## Notes
- Site works without the key; AI features need it.
- /api/ai is public: set a spending limit on your API key.
- Logins are stored in each visitor's browser only (demo).
