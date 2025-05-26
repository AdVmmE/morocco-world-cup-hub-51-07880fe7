
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'match_id' => $this->match_id,
            'category' => $this->category,
            'price' => $this->price,
            'currency' => $this->currency,
            'available' => $this->available,
            'max_per_person' => $this->max_per_person,
            'seat_type' => $this->seat_type,
            'match' => new MatchResource($this->whenLoaded('match')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
