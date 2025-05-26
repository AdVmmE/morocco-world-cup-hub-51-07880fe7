
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'capacity',
        'image',
        'status',
        'progress',
        'description',
        'features',
        'matches',
        'start_date',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'features' => 'array',
        'start_date' => 'date',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    // Relationships
    public function hostCity()
    {
        return $this->belongsTo(HostCity::class, 'city', 'name');
    }

    public function matches()
    {
        return $this->hasMany(Match::class);
    }

    // Scopes
    public function scopeOperational($query)
    {
        return $query->where('status', 'Operational');
    }

    public function scopeUnderConstruction($query)
    {
        return $query->where('status', 'Under Construction');
    }

    public function scopeCompleted($query)
    {
        return $query->where('progress', 100);
    }

    // Accessors
    public function getCoordinatesAttribute()
    {
        return [$this->latitude, $this->longitude];
    }
}
