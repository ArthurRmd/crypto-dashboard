<?php

namespace App\Console\Commands;

use App\Models\Crypto;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateCrypto extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:crypto';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $cryptos = Crypto::all();

        $response = Http::get('https://api.coincap.io/v2/assets')
            ->json()['data'];

        $newCryptoDataById = array_column($response, null,'id');

        foreach ($cryptos as $crypto) {
            $crypto->update([
                'price_usd'=> $newCryptoDataById[$crypto->api_id]['priceUsd'],
                'change_percent_24h'=> $newCryptoDataById[$crypto->api_id]['changePercent24Hr'],
            ]);
        }

    }
}
