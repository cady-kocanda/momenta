# Supabase Setup Guide

## 🚀 Quick Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready

### 2. Get Your Project Credentials
1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy your:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### 3. Set Up Environment Variables
Create a `.env` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pinterest API Configuration (for backend)
PINTEREST_APP_ID=your_pinterest_app_id
PINTEREST_APP_SECRET=your_pinterest_app_secret
```

### 4. Run Database Migration
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-id

# Run the migration
supabase db push
```

### 5. Deploy Edge Functions
```bash
# Deploy the Pinterest OAuth function
supabase functions deploy pinterest-oauth
```

## 🔧 Pinterest API Setup (Optional)

If you want Pinterest integration:

1. Go to [Pinterest Developers](https://developers.pinterest.com/)
2. Create a new app
3. Get your App ID and App Secret
4. Add them to your `.env` file

## ✅ Verification

After setup, your app should:
- ✅ Compile without TypeScript errors
- ✅ Connect to Supabase database
- ✅ Have Pinterest OAuth functionality (if configured)

## 🐛 Troubleshooting

- **TypeScript errors**: Make sure you have the latest dependencies installed
- **Connection issues**: Verify your Supabase URL and keys are correct
- **Migration errors**: Ensure your Supabase project is active and accessible
