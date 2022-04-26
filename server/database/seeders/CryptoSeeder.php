<?php

namespace Database\Seeders;

use App\Models\Crypto;
use http\Env\Response;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class CryptoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('https://api.coincap.io/v2/assets')
            ->collect();

        foreach (array_slice($response['data'],0,25) as $crypto) {
            Crypto::create([
                'api_id'=> $crypto['id'],
                'name'=> $crypto['name'],
               'symbol'=> $crypto['symbol'],
               'price_usd'=> $crypto['priceUsd'],
               'change_percent_24h'=> $crypto['changePercent24Hr'],
            ]);
        }

    }
}
