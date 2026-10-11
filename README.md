# 🥟 Get Me a Samosa

A crowdfunding platform where fans can support their favourite creators by buying them a samosa. Creators sign in with GitHub, connect their own Razorpay account, and get a public page where supporters can leave a payment and a message.

**Live site:** https://get-me-a-samosa-tan.vercel.app

> The site runs Razorpay in **Test Mode**, so no real money moves. Use Razorpay's test card numbers to try a payment.

## Features

- **GitHub login** with NextAuth. A profile is created automatically on first sign-in.
- **Public creator pages** at `/username` with a cover photo, profile picture, total raised and a Top 10 supporters list.
- **Creator dashboard** to edit name, username, pictures and Razorpay keys.
- **Razorpay payments** using each creator's own keys, so money goes straight to the creator.
- **Server-side payment verification.** A payment only counts after its signature is verified on the server.
- **Encrypted secrets.** Razorpay key secrets are encrypted with AES-256-GCM before they are stored, and are never sent back to the browser.
- **Fully responsive** layout for phones, tablets and desktops.
- **Animated WebGL gradient** background on the home page, with a plain gradient fallback when WebGL2 isn't available.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions), React |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth v4 (GitHub provider) |
| Database | MongoDB Atlas with Mongoose |
| Payments | Razorpay Checkout |
| UI extras | react-toastify, OGL (WebGL) |
| Hosting | Vercel |

## How a payment works

1. A supporter picks an amount on a creator's page.
2. A server action creates a Razorpay order with the creator's decrypted keys and saves a pending payment.
3. Razorpay Checkout opens in the browser and the supporter pays.
4. Razorpay posts the result to `/api/razorpay`, where the server verifies the signature.
5. Only a verified payment is marked as done, and the supporter is redirected back to the creator's page.

## Project structure

```
app/
  [username]/page.js          public creator page
  about/page.js               about page
  actions/useractions.js      server actions: initiate payment, update profile
  api/auth/[...nextauth]/     NextAuth route handler
  api/razorpay/route.js       Razorpay callback and signature verification
  dashboard/page.js           creator dashboard (login required)
  login/page.js               login page
  layout.js, page.js          root layout and home page
components/                   Navbar, Footer, Dashboard, PaymentPage, GradientWaves, ...
db/connectDb.js               cached MongoDB connection
lib/                          auth options, data helpers, encryption, validation
models/                       User and Payment schemas
public/                       images and gifs
```

## Getting started

### Requirements

- Node.js 20 or newer
- A MongoDB Atlas cluster (or any MongoDB database)
- A GitHub OAuth app
- A Razorpay account (Test Mode is enough)

### Install and run

```bash
git clone https://github.com/syedinjamulhaque/get-me-a-samosa.git
cd get-me-a-samosa
npm install
```

Create a `.env.local` file in the project root:

```dotenv
MONGO_URI=mongodb+srv://USER:PASSWORD@YOUR_CLUSTER.mongodb.net/get-me-a-samosa?retryWrites=true&w=majority
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
NEXTAUTH_SECRET=a_long_random_string
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
ENCRYPTION_KEY=64_hex_characters
```

Generate the two random values:

```bash
# NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

### GitHub OAuth app

Create an app under GitHub → Settings → Developer settings → OAuth Apps.

| Field | Local | Production |
|---|---|---|
| Homepage URL | `http://localhost:3000` | your Vercel URL |
| Callback URL | `http://localhost:3000/api/auth/callback/github` | `https://your-app.vercel.app/api/auth/callback/github` |

A GitHub OAuth app accepts one callback URL, so use one app for local development and another for production.

### Razorpay keys

Razorpay keys are **not** environment variables. Each creator enters their own Key ID and Key Secret on the dashboard, and the secret is stored encrypted.

1. In the Razorpay dashboard, switch to Test Mode and generate API keys.
2. Log in to the app, open `/dashboard`, and save the keys.
3. Visit `/yourusername` and make a test payment.

## Deployment (Vercel)

1. Import the repository in Vercel.
2. Add the environment variables above. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_URL` to your live URL, without a trailing slash, and use the production GitHub OAuth app's ID and secret.
3. Mark `MONGO_URI`, `NEXTAUTH_SECRET`, `ENCRYPTION_KEY` and `GITHUB_SECRET` as sensitive.
4. Allow Vercel to reach MongoDB Atlas under Network Access. Vercel's IP addresses change, so this means `0.0.0.0/0` with a strong database password.
5. Redeploy after changing any variable. Variables only apply to new deployments.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | start the development server |
| `npm run build` | create a production build |
| `npm start` | run the production build |
| `npm run lint` | run ESLint |

## Troubleshooting

- **Access Denied after GitHub login.** The sign-in code hit an error. Check the terminal (or Vercel Logs) for a line starting with `Sign-in failed:`.
- **`querySrv ECONNREFUSED`.** Your network blocks MongoDB's SRV lookup. Use the standard `mongodb://` connection string from Atlas (Connect → Drivers → older driver version).
- **`redirect_uri_mismatch`.** The GitHub callback URL doesn't match. It must end in `/api/auth/callback/github`.
- **Changes to `.env.local` have no effect.** Restart `npm run dev`.
- **Secrets can't be decrypted.** `ENCRYPTION_KEY` changed after they were saved. Re-save the keys on the dashboard.

## Security notes

- Razorpay secrets are encrypted at rest (AES-256-GCM) and never returned to the browser.
- Profile updates always use the identity from the logged-in session, never from form fields.
- Payments are confirmed only after server-side signature verification.
- Never commit `.env.local`.

## Author

**Syed Injamul Haque**, Full Stack Developer and CS undergraduate.

- GitHub: [@syedinjamulhaque](https://github.com/syedinjamulhaque)
- Portfolio: https://syed-injamul-haque.vercel.app/
