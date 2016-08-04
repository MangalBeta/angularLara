<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAskquestiontable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         
        Schema::create('askquestions', function (Blueprint $table) {
        $table->increments('id');
        $table->string('title');
        $table->string('description');
        $table->string('topic');
        $table->integer('user_id')->unsigned();
    $table->foreign('user_id')->references('id')->on('users');
      $table->integer('likes')->default(0);
       $table->integer('total_answers')->default(0);
       $table->integer('view')->default(0);
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
        Schema::drop('askquestions');
    }
}
