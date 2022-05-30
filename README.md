# M2 I2L - Crypto dashboard projet
Authors: 
- REMOND Arthur
- SLAMA Tigran

# How to build:

## Back

- PHP 8.1
- Composer 2
- MySQL 
- port 8000 available

```sh
cp .env.example .env # edit .env with database informations
 
 ### EXAMPLE ###
 # DB_DATABASE=crypto-dashboard
 # DB_USERNAME=username
 # DB_PASSWORD=password
```
```sh
cd server
composer install
pp artisan key:generate
php artisan migrate:fresh --seed
php artisan serve

```

# Front

- Node 16.15.0
- npm 8.5.5
```sh
cd front
npm install
npm start # browser should open on http://localhost:3000
```

