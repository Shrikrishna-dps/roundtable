# Deployment Guide (Part 1: Backend)

Because our Frontend relies on the Backend API, we **must** deploy the Backend first. Once Render gives us a live URL, we will use that URL as an environment variable in our Vercel frontend.

Follow these exact steps to get your backend live on Render.

## Step 1: Create a New GitHub Repository
1. Go to [GitHub.com](https://github.com/) and log in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name it something like `roundtable-backend`.
4. Leave it as Public (or Private), do **NOT** initialize it with a README or .gitignore.
5. Click **Create repository**. 
6. Copy the URL of this new repository (it should look like `https://github.com/your-username/roundtable-backend.git`).

## Step 2: Push Backend Code to GitHub
Open your terminal (or Command Prompt / PowerShell), navigate into your backend folder, and run these commands one by one:

```bash
# 1. Move into the backend folder
cd "c:\Users\shrik\OneDrive\Desktop\RT 1 - Copy\backend"

# 2. Initialize a fresh Git repository
git init

# 3. Add all your files (node_modules and .env will be safely ignored)
git add .

# 4. Commit your code
git commit -m "Initial backend commit"

# 5. Link it to your new GitHub repository (Paste the URL you copied in Step 1)
git remote add origin https://github.com/your-username/roundtable-backend.git

# 6. Push the code up to GitHub
git push -u origin main
```

## Step 3: Deploy on Render
1. Go to [Render.com](https://render.com) and log in (you can use your GitHub account).
2. Click **New +** at the top and select **Web Service**.
3. Connect your GitHub account (if you haven't already) and select the `roundtable-backend` repository you just created.
4. Fill out the configuration:
   - **Name:** `roundtable-api` (or whatever you like)
   - **Region:** Choose whatever is closest to you.
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **CRITICAL: Add Environment Variables**
   Scroll down to the "Environment Variables" section and click "Add Environment Variable". You must add your Razorpay keys exactly as they appear in your local `.env` file:
   - Key: `RAZORPAY_KEY_ID` | Value: `rzp_test_TgCo6LwmXKcweO`
   - Key: `RAZORPAY_KEY_SECRET` | Value: `LWJWpCHqbn9grmg5tRfmMJAs`
6. Click **Create Web Service** at the bottom.

## Step 4: Wait and Copy the Link
Render will now install your dependencies and launch your server. It takes about 2-3 minutes.
Once it says "Live" with a green checkmark, look near the top left of the dashboard. You will see a URL that looks something like:
`https://roundtable-api-xyz.onrender.com`

**Copy that exact URL and paste it back into our chat!** Once you give me that link, I will give you Part 2 to deploy the frontend.

---

# Deployment Guide (Part 2: Frontend)

Congratulations on getting the Backend live! Now we just need to push your frontend code to Vercel and tell it where the backend is located.

## Step 1: Push Frontend Code to GitHub
You mentioned you already have an existing GitHub repository for this frontend connected to Vercel. We will use that!
Open your terminal (or Command Prompt / PowerShell), navigate to your main root folder, and run these commands:

```bash
# 1. Move into the main root folder
cd "c:\Users\shrik\OneDrive\Desktop\RT 1 - Copy"

# 2. If it's not a git repo yet, initialize it and link it
git init
git remote add origin https://github.com/your-username/your-existing-frontend-repo.git

# 3. Create a new branch (so we don't accidentally break your old code)
git checkout -b fullstack-update

# 4. Add and commit all changes (Our root .gitignore will block the backend folder automatically!)
git add .
git commit -m "Deploy dynamic architecture and Razorpay"

# 5. Push the new branch to GitHub
git push -u origin fullstack-update
```

## Step 2: Configure Vercel Environment Variables
Before Vercel builds the new code, we **must** give it the API link.
1. Go to your existing project on the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** > **Environment Variables**.
3. Add these two exact keys:
   - Key: `VITE_RAZORPAY_KEY_ID` | Value: `rzp_test_TgCo6LwmXKcweO`
   - Key: `VITE_API_URL` | Value: `https://roundtable-api-kf4z.onrender.com/api` *(Notice the /api at the end!)*
4. Hit **Save**.

## Step 3: Switch the Branch and Deploy!
1. Still in the Vercel Settings, go to **Git** on the left menu.
2. Under "Production Branch", type in `fullstack-update` (or whatever branch name you used) and click Save.
3. Go back to the **Deployments** tab and click **Deploy** (or trigger a rebuild).

Wait 1 minute, and your brand new Full-Stack application will be live on the internet!
