
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StadiumResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'city' => $this->city,
            'capacity' => $this->capacity,
            'image' => $this->image,
            'status' => $this->status,
            'progress' => $this->progress,
            'description' => $this->description,
            'features' => $this->features,
            'matches' => $this->matches,
            'start_date' => $this->start_date->format('Y-m-d'),
            'coordinates' => [$this->latitude, $this->longitude],
            'host_city' => new HostCityResource($this->whenLoaded('hostCity')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
