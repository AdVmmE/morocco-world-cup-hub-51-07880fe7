
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'home_team' => $this->home_team,
            'away_team' => $this->away_team,
            'date' => $this->date->format('Y-m-d'),
            'time' => $this->time,
            'stadium' => $this->stadium->name ?? null,
            'city' => $this->stadium->city ?? null,
            'group' => $this->group,
            'round' => $this->round,
            'home_score' => $this->home_score,
            'away_score' => $this->away_score,
            'status' => $this->status,
            'highlight_url' => $this->highlight_url,
            'stadium_details' => new StadiumResource($this->whenLoaded('stadium')),
            'tickets' => TicketResource::collection($this->whenLoaded('tickets')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
