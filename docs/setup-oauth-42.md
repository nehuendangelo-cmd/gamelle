# Configuration OAuth 42

## 1. Créer l'application 42

1. Va sur https://profile.intra.42.fr/oauth/applications
2. Clique sur **"Register a new app"**
3. Remplis les champs :

| Champ | Valeur |
|-------|--------|
| Name | `January - Dev` |
| Redirect URI | `http://localhost:3001/api/auth/42/callback` |
| Scopes | ✅ `public` (coché par défaut) |
| Public | Non coché |

4. Clique **"Submit"**

## 2. Copier les credentials

Après création, tu verras :
- **UID** (Client ID) → `FT_CLIENT_ID`
- **Secret** → `FT_CLIENT_SECRET`

## 3. Configurer .env

```bash
cd /Users/nehuen/january
cp .env.example .env
```

Édite `.env` :

```env
# 42 OAuth
FT_CLIENT_ID="ton_uid_ici"
FT_CLIENT_SECRET="ton_secret_ici"
FT_CALLBACK_URL="http://localhost:3001/api/auth/42/callback"

# JWT (génère une clé aléatoire)
JWT_SECRET="$(openssl rand -base64 32)"

# Database (utilise Supabase gratuit ou local)
DATABASE_URL="postgresql://user:password@localhost:5432/january"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## 4. Base de données

### Option A: Supabase (recommandé, gratuit)

1. Crée un compte sur https://supabase.com
2. Crée un nouveau projet
3. Va dans **Settings > Database**
4. Copie le **Connection string (URI)**
5. Colle dans `DATABASE_URL`

### Option B: PostgreSQL local

```bash
# macOS avec Homebrew
brew install postgresql@15
brew services start postgresql@15
createdb january
```

```env
DATABASE_URL="postgresql://localhost:5432/january"
```

## 5. Lancer le projet

```bash
# Appliquer le schema
pnpm db:push

# Lancer en dev
pnpm dev
```

## 6. Tester

1. Ouvre http://localhost:3000
2. Clique "Se connecter avec 42"
3. Tu seras redirigé vers l'intra 42
4. Après autorisation, tu reviens sur l'app connecté !
