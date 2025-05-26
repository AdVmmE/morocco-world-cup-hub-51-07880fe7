
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('total_price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->timestamp('purchase_date');
            $table->enum('status', ['active', 'used', 'cancelled', 'refunded'])->default('active');
            $table->string('owner_name');
            $table->string('owner_email');
            $table->string('seat_number')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('ticket_id');
            $table->index('purchase_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_tickets');
    }
};
