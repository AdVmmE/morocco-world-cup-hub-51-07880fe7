
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('summary', 500);
            $table->text('content');
            $table->string('author', 100);
            $table->string('category', 100);
            $table->string('image');
            $table->json('tags');
            $table->timestamps();
            
            $table->index(['category', 'created_at']);
            $table->fullText(['title', 'summary', 'content']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
