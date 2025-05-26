
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'total_price' => $this->total_price,
            'currency' => $this->currency,
            'purchase_date' => $this->purchase_date->format('Y-m-d H:i:s'),
            'status' => $this->status,
            'owner_name' => $this->owner_name,
            'owner_email' => $this->owner_email,
            'seat_number' => $this->seat_number,
            'ticket' => new TicketResource($this->whenLoaded('ticket')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
