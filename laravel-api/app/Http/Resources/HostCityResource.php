
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostCityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'attractions' => $this->attractions,
            'image' => $this->image,
            'image_alt' => $this->image_alt,
            'population' => $this->population,
            'stadium' => $this->stadium,
            'distance_from_airport' => $this->distance_from_airport,
            'stadiums' => StadiumResource::collection($this->whenLoaded('stadiums')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
