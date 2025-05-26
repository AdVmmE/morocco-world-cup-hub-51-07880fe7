
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('home_team', 100);
            $table->string('away_team', 100);
            $table->date('date');
            $table->string('time');
            $table->foreignId('stadium_id')->constrained()->onDelete('cascade');
            $table->string('group', 50)->nullable();
            $table->string('round', 50)->nullable();
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->enum('status', ['scheduled', 'live', 'completed'])->default('scheduled');
            $table->string('highlight_url')->nullable();
            $table->timestamps();
            
            $table->index(['date', 'status']);
            $table->index(['home_team', 'away_team']);
            $table->index('stadium_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
