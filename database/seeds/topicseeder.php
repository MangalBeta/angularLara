<?php

use Illuminate\Database\Seeder;

class topicseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
       public function run()
    {
         DB::table('topics')->insert(array(
          array('topic_name'=>'cake','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
              array('topic_name'=>'laravel','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),  
              array('topic_name'=>'php','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                 array('topic_name'=>'node','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                    array('topic_name'=>'json','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                       array('topic_name'=>'html','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                          array('topic_name'=>'angularjs','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                             array('topic_name'=>'react','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                array('topic_name'=>'codeginator','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                   array('topic_name'=>'express','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                      array('topic_name'=>'wordpress','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                         array('topic_name'=>'drupel','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                            array('topic_name'=>'zoomla','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25'),
                                               array('topic_name'=>'magento','created_at'=>'2016-07-21 12:24:46','updated_at'=>'2016-07-22 12:25:25')   
                                                 

          ));
    }
}
