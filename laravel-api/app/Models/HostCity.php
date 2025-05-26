
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostCity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'attractions',
        'image',
        'image_alt',
        'population',
        'stadium',
        'distance_from_airport',
    ];

    protected $casts = [
        'attractions' => 'array',
        'population' => 'integer',
        'distance_from_airport' => 'decimal:2',
    ];

    // Relationships
    public function stadiums()
    {
        return $this->hasMany(Stadium::class, 'city', 'name');
    }

    // Scopes
    public function scopeByPopulation($query, $min, $max = null)
    {
        $query->where('population', '>=', $min);
        if ($max) {
            $query->where('population', '<=', $max);
        }
        return $query;
    }
}
