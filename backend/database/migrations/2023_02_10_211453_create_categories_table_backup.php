<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
        
            $table->string('name');
       
            $table->longText('description')->nullable();
         
            $table->timestamps();
        }, 'ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci if not exists');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
