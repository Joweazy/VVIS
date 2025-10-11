# 🚂 Railway Deployment Guide for VVIS

## Prerequisites
- GitHub account
- Railway account (sign up at railway.app)
- Your Spotify API credentials

## Step-by-Step Deployment

### 1. Push to GitHub
```powershell
git add .
git commit -m "Prepare for Railway deployment"
git push origin master
```

### 2. Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `VVIS` repository
5. Railway will automatically detect and deploy using the Dockerfile

### 3. Configure Environment Variables

In Railway dashboard → Your project → Variables tab, add:

```
ASPNETCORE_ENVIRONMENT=Production
Spotify__ClientId=YOUR_SPOTIFY_CLIENT_ID
Spotify__ClientSecret=YOUR_SPOTIFY_CLIENT_SECRET
Spotify__RedirectUri=https://your-app.railway.app
PORT=5000
```

**Important:** Update `Spotify__RedirectUri` with your actual Railway URL after deployment!

### 4. Set Up Custom Domain (Optional)

1. In Railway dashboard → Settings tab
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `vvis.yourdomain.com`)
4. Add the CNAME record to your domain provider:
   - Type: `CNAME`
   - Name: `vvis` (or `@` for root domain)
   - Value: `your-app.railway.app`

5. Update the `Spotify__RedirectUri` environment variable to your custom domain

### 5. Update Spotify Dashboard

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Click **"Edit Settings"**
4. Add your Railway URL to **Redirect URIs**:
   - `https://your-app.railway.app`
   - Or your custom domain: `https://vvis.yourdomain.com`
5. Save changes

## Monitoring

- View logs in Railway dashboard → Deployments tab
- Check app health at your Railway URL
- Monitor usage (Railway shows metrics for free)

## Troubleshooting

**Build fails?**
- Check Railway logs for specific errors
- Ensure all NuGet packages are restored

**App won't start?**
- Verify environment variables are set correctly
- Check that PORT is set to 5000 or use Railway's auto-assigned port

**Spotify auth fails?**
- Verify redirect URIs match in both Spotify Dashboard and Railway env vars
- Check that ClientId and ClientSecret are correct

## Cost

- **Free tier:** 500 hours/month (plenty for friends)
- **After free tier:** ~$5/month for always-on hosting

## Local Development

Continue developing locally as before:
```powershell
cd VVIS.Server
dotnet run
```

The app will auto-deploy to Railway when you push to GitHub!
