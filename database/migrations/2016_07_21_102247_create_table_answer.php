<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableAnswer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
        $table->increments('id');
        $table->string('description');
        $table->integer('user_id')->unsigned();
        $table->integer('question_id')->unsigned(); 
        $table->foreign('user_id')->references('id')->on('users');
        $table->integer('likes')->default(0);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
          Schema::drop('answers');
    }
}
