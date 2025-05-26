
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_id')->constrained()->onDelete('cascade');
            $table->string('category', 100);
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->integer('available');
            $table->integer('max_per_person');
            $table->string('seat_type', 100)->nullable();
            $table->timestamps();
            
            $table->index(['match_id', 'category']);
            $table->index('available');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
