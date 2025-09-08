"scripts": {
    "start": "vite",
    "dev": "env-cmd -f .env vite",
    "stage": "env-cmd -f .env.stage vite",
    "preprod": "env-cmd -f .env.preprod vite",
    "prod": "env-cmd -f .env.prod vite",
    "build": "vite build",
    "build:stage": "env-cmd -f .env.stage vite build",
    "build:preprod": "env-cmd -f .env.preprod vite build",
    "build:prod": "env-cmd -f .env.production vite build",
    "test": "tsc",
    "lint": "eslint src --ext ts,tsx,cjs",
    "preview": "vite preview --port 8080",
    "format": "prettier --write .",
    "prepare": "husky install",
    "create-hook": "husky add .husky/pre-commit"
},
  

// Note: You need to create these files in the root directory of your project
// .env
// .env.prod
// .env.stage
// .env.preprod
