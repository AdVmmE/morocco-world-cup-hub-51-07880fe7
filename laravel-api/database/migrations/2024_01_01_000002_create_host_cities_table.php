
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('host_cities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->text('description');
            $table->json('attractions');
            $table->string('image');
            $table->string('image_alt')->nullable();
            $table->integer('population');
            $table->string('stadium');
            $table->decimal('distance_from_airport', 8, 2);
            $table->timestamps();
            
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('host_cities');
    }
};
