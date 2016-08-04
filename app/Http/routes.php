<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
//________________Landing page________________

Route::get('/', function () {
    return view('welcome');
});

	
//________________user signup and login ________________

Route::group(array('prefix'=>'/api'),function(){
Route::post('signup/user', 'UserController@store');
Route::post('login/auth', 'UserController@userLogin');
Route::post('logout/destroy', 'UserController@userLogout');
Route::get('user/profile/{id}', 'UserController@userProfile');

Route::post('user/question', 'AskQuestionController@postQuestions');
Route::get('user/question/show', 'AskQuestionController@showQuestions');
Route::get('question/singlequestion/{id}', 'AskQuestionController@singleQuestions');

Route::post('question/answer', 'AskQuestionController@postAnswer');
Route::get('question/answer/get/{id}', 'AskQuestionController@getAllAnswer');

Route::put('question/likes/{id}', 'AskQuestionController@upVoteQuestion');
Route::put('question/dislikes/{id}', 'AskQuestionController@downVoteQuestion');

Route::get('question/sort/vote', 'AskQuestionController@sortByMaxVote');
Route::get('question/sort/newcreated', 'AskQuestionController@sortByNewCreatedPost');
Route::get('question/sort/mostview', 'AskQuestionController@sortByMostView');
Route::get('question/sort/updated', 'AskQuestionController@sortByUpdated');

Route::post('search', 'AskQuestionController@searchAll');
Route::post('search/get', 'AskQuestionController@serachMatch');

Route::post('question/comment', 'AskQuestionController@questionComment');
Route::get('question/comment/get/{id}', 'AskQuestionController@getquestionComment');
Route::put('comment/likes/{id}', 'AskQuestionController@likeComment');
Route::put('comment/dislike/{id}', 'AskQuestionController@dislikeComment');

Route::delete('comment/delete/{id}', 'AskQuestionController@deleteComment');
Route::get('comment/edit/{id}', 'AskQuestionController@editComment');
Route::put('comment/edit/{id}', 'AskQuestionController@editSaveComment');

Route::post('comment/reply/{id}', 'AskQuestionController@replyComment');
Route::get('comment/reply/get/{id}', 'AskQuestionController@getreplyComment');
Route::delete('comment/reply/delete/{id}', 'AskQuestionController@deleteReplyComment');
Route::put('comment/reply/likes/{id}', 'AskQuestionController@likeReplyComment');
Route::put('comment/reply/dislikes/{id}', 'AskQuestionController@dislikeReplyComment');
Route::get('comment/reply/edit/{id}', 'AskQuestionController@editReplyComment');
Route::put('comment/reply/edit/{id}', 'AskQuestionController@editSaveReplyComment');

Route::post('answer/comment', 'AskQuestionController@answerPostComment');
Route::get('answer/comment/get/{id}', 'AskQuestionController@getAnsComment');
Route::put('answer/likes/{id}', 'AskQuestionController@upVoteAnswer');
Route::put('answer/dislikes/{id}', 'AskQuestionController@downVoteAnswer');
Route::delete('answer/delete/{id}', 'AskQuestionController@deleteAnswer');
Route::get('answer/edit/{id}', 'AskQuestionController@editAnswer');
Route::put('answer/edit/{id}', 'AskQuestionController@editSaveAnswer');

Route::get('answer/sort/vote', 'AskQuestionController@sortByMaxAnsVote');
Route::get('answer/sort/newanswer', 'AskQuestionController@sortByNewCreatedAnswer');
Route::get('answer/sort/oldest', 'AskQuestionController@sortByOldestAnswer');

Route::delete('answer/comment/delete/{id}', 'AskQuestionController@deleteAnswerComment');
Route::put('answer/comment/likes/{id}', 'AskQuestionController@likeAnsComment');
Route::put('answer/comment/dislikes/{id}', 'AskQuestionController@dislikeAnsComment');
Route::get('answer/comment/edit/{id}', 'AskQuestionController@editAnsComment');
Route::put('answer/comment/edit/{id}', 'AskQuestionController@editSaveAnsComment');



Route::post('answer/comment/reply/{id}', 'AskQuestionController@replyAnsComment');
Route::get('answer/comment/reply/get/{id}', 'AskQuestionController@getreplyAnsComment');
Route::delete('answer/comment/reply/delete/{id}', 'AskQuestionController@deleteReplyAnsComment');
Route::put('answer/comment/reply/likes/{id}', 'AskQuestionController@likeReplyAnsComment');
Route::put('answer/comment/reply/dislikes/{id}', 'AskQuestionController@dislikeReplyAnsComment');
Route::get('answer/comment/reply/edit/{id}', 'AskQuestionController@editReplyAnsComment');
Route::put('answer/comment/reply/edit/{id}', 'AskQuestionController@editSaveReplyAnsComment');
Route::get('question/answer/get/{id}', 'AskQuestionController@getAllAnswer');
Route::get('topics/get', 'AskQuestionController@getAllTopic');
// Route::post('topics/post', 'AskQuestionController@postTopic');

});


//________________________________________________________

Route::get('api/csrf', function() {
    return Session::token();
});