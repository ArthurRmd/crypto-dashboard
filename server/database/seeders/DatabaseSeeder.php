<?php

namespace Database\Seeders;

use App\Http\Controllers\CryptoController;
use App\Models\Crypto;
use App\Models\Investment;
use App\Models\User;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
        ]);

        Artisan::call('db:seed --class=CryptoSeeder ');

        $cryptos = Crypto::query()
            ->orderBy('price_usd', 'desc')
            ->limit(6)
            ->get();

        foreach ($cryptos as $crypto) {

            $priceUsd = random_int(100,200);
            Investment::create([
                'crypto_id'=> $crypto->id,
                'user_id'=> $user->id,
                'crypto_value'=> $priceUsd / $crypto->price_usd,
                'price_usd'=> $priceUsd,
            ]);
        }
    }
}
