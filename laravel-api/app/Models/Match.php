
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    use HasFactory;

    protected $fillable = [
        'home_team',
        'away_team',
        'date',
        'time',
        'stadium_id',
        'group',
        'round',
        'home_score',
        'away_score',
        'status',
        'highlight_url',
    ];

    protected $casts = [
        'date' => 'date',
        'home_score' => 'integer',
        'away_score' => 'integer',
    ];

    // Relationships
    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    // Scopes
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeLive($query)
    {
        return $query->where('status', 'live');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeByTeam($query, $team)
    {
        return $query->where('home_team', $team)->orWhere('away_team', $team);
    }

    // Accessors
    public function getCityAttribute()
    {
        return $this->stadium->city ?? null;
    }
}
