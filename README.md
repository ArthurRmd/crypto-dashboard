# M2 I2L - Crypto dashboard projet
Authors: 
- REMOND Arthur
- SLAMA Tigran

# How to build:

## Back

```sh
cp .env.example .env # edit .env with database informations
cd server
composer install
pp artisan key:generate
php artisan migrate:fresh --seed
php artisan serve

```

# Front
```sh
cd front
npm install
npm start # browser should open on http://localhost:3000
```

