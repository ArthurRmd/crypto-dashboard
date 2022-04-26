<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Investment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        'updated_at',
        'user_id',
        'crypto_id',
        'id',
    ];

    /**
     * @return belongsTo
     */
    public function crypto(): belongsTo
    {
        return $this->belongsTo(Crypto::class);
    }
}
