
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_id',
        'category',
        'price',
        'currency',
        'available',
        'max_per_person',
        'seat_type',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'available' => 'integer',
        'max_per_person' => 'integer',
    ];

    // Relationships
    public function match()
    {
        return $this->belongsTo(Match::class);
    }

    public function userTickets()
    {
        return $this->hasMany(UserTicket::class);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('available', '>', 0);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
