
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stadiums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city', 100);
            $table->integer('capacity');
            $table->string('image');
            $table->enum('status', ['Operational', 'Under Construction', 'Planned']);
            $table->integer('progress')->default(0);
            $table->text('description');
            $table->json('features');
            $table->integer('matches')->default(0);
            $table->date('start_date');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->timestamps();
            
            $table->index(['city', 'status']);
            $table->index(['latitude', 'longitude']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stadiums');
    }
};
