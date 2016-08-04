<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\askquestions;
use App\replyquecomments;
use App\replyanscomments;
use App\answercomments;
use App\answer;
use App\questioncomments;
use Illuminate\Support\Facades\Input;
use Session;
use Response;
use Auth;
use DB;
use App\topics;



class AskQuestionController extends Controller
{
    public function postQuestions(Request $request){
      $ques = new askquestions;
      $ques->title=$request->get('title');
      $ques->description=$request->get('description');
      $ques->topic=implode(",",$request->get('topic'));
      $ques->user_id=Auth::user()->id;
      //$ques->answer=Auth::user()->id;
       //print_r($ques);die;
       $ques->save();
      return $ques;
}	
// public function postTopic(Request $request){
// $tp=$request->get('topic_name');
//    $topic = new topics;
//    if($topic->topic_name != $tp){
//      $topic->topic_name=implode(",",$tp);
//      $topic->save();
//    }else{
//     return "topic is alredy in databse";
//    }
     

// }
public function getAllTopic(Request $request){
   $topics = DB::table('topics')->get();
   return $topics;
}

public function showQuestions(Request $request){
       $questions = DB::table('askquestions')
      ->join('users', 'askquestions.user_id', '=','users.id')
      ->get(['askquestions.id AS aks_id','askquestions.*','users.*']);
     /* $topicss  = "piece1 piece2 piece3 piece4 piece5 piece6";
$pieces = explode(" ", $pizza);*/
       //$questions = askquestions::all()->join('answers', 'answers.question_id', '=', 'askquestions.answer');
       //print_r($questions); die;

        return $questions;
}	
public function singleQuestions(Request $request){
     // $id=$request->all();
   $id = $request->segment(4);
   //echo($id); die;
   //echo $id; die;
     // $id = $id['0'];
    //DB::table('users')->whereIn('id', $array_of_ids)-
    $singleQuestions = askquestions::find($id);
    $singleQuestions->view +=1;
    $singleQuestions->save();

    
 
      // print_r($singleQuestions);
      //  die;

   return response()->json($singleQuestions);
} 

public function postAnswer(Request $request){
      $ans = new answer;
 // print_r($ans); die;
      $ans->description=$request->get('description');
      $a=$ans->question_id=$request->get('question_id');
      // print_r(Auth::user());die;
      $ans->user_id= Auth::user()->id;
      // $ans->view= Auth::user()->id;
      //print_r( $ans);
     // echo $id; die;
      //$ans->question_id=Auth::user()->id;
      // $ans->user_id=Auth::user()->id;
       // print_r($users);die;
      $ans->save();
      /*UPDATE `askquestions` 
set total_answers = ( SELECT count(*) FROM `answers` WHERE question_id = '5') where id = '5'*/
$updateQuestion=  askquestions::find($a);
$updateQuestion->total_answers = ($ans->where('question_id', $a)->count() );
// $users = DB::table('users')->count();
$updateQuestion->save();

      return response()->json([$ans]);
} 

public function getAllAnswer(Request $request){
  $segment = $request->segment(5);
    $answer = DB::table('answers')
    ->where('question_id', $segment)
   ->join('users', 'answers.user_id', '=','users.id')
      ->get(['answers.id AS ans_id','answers.*','users.*']);
      return response()->json($answer);;



} 

public function upVoteQuestion(Request $request){
   $id= $request->segment(4);

 //  echo($id); die;
 $updateQuestion=  askquestions::find($id);
if($updateQuestion->likes == 0 || $updateQuestion->likes == -1 ){
$updateQuestion->likes +=1;
 $updateQuestion->save();
};
//print_r($updateQuestion);die;        
   return $updateQuestion;
 
} 


public function downVoteQuestion(Request $request){
 $id= $request->segment(4);
 $updateQuestion=  askquestions::find($id);

if($updateQuestion->likes == 1 || $updateQuestion->likes == 0 ){
$updateQuestion->likes -=1;
$updateQuestion->save();
};
//print_r($updateQuestion);die;        
   return $updateQuestion;
 
  
} 
public function sortByMaxVote(Request $request){

$question = DB::table('askquestions')
                ->orderBy('likes', 'desc')
               ->join('users', 'askquestions.user_id', '=','users.id')
              ->get(['askquestions.id AS aks_id','askquestions.*','users.*']);
                

      return $question;
  }

 public function sortByNewCreatedPost(Request $request){
$question = DB::table('askquestions')
                ->orderBy('created_at', 'desc')
                 ->get();
               

      return $question;
  }
   public function sortByMostView(Request $request){
$question = DB::table('askquestions')
                ->orderBy('view', 'desc')
                  ->join('users', 'askquestions.user_id', '=','users.id')
                 ->get(['askquestions.id AS aks_id','askquestions.*','users.*']);
               

      return $question;
  }

public function sortByUpdated(Request $request){
$question = DB::table('askquestions')
                ->orderBy('updated_at', 'desc')
                // ->join('users', 'askquestions.user_id', '=','users.id')
                 ->get();

      return $question;
  }

public function searchAll(Request $request){
  $search = $request->get('search');
  if($search != ""){
$query= trim($search);
$searchAll=DB::table('askquestions')
         ->where('id', 'LIKE', '%'.$query.'%')
         ->orwhere('title', 'LIKE', '%'.$query.'%')
         ->orwhere('description', 'LIKE', '%'.$query.'%')
         ->orwhere('topic', 'LIKE', '%'.$query.'%')
         ->get();

    // return $searchAll;  
 if(!empty($searchAll)){ 
 //echo '<select  id="model" class="show" size="10" style="width: 100%;" onChange="getData(this);">';
   return $searchAll;
   }else{
     echo 'No Record Found';
         }
  // echo  '</select>';
      
  }
}
public function serachMatch(Request $request){
//if($request->ajax()){
$search = $request->get('searchmeta');

$matchsearch = DB::table('askquestions')->where('title', $search)->get();

return response()->json($matchsearch[0]);
//}

}

public function questionComment(Request $request){
       $comm = new questioncomments;
      $comm->question_comment=$request->get('quescomment');
         $a=$comm->question_id=$request->get('question_id');
      $comm->user_id=Auth::user()->id;
      //$ques->answer=Auth::user()->id;
       // print_r($ques);die;
       $comm->save();

       return $comm;
}
public function getquestionComment(Request $request){

  $segment = $request->segment(5);
// echo $segment;die;
  $answer = DB::table('questioncomments')
  ->where('question_id', $segment)
  ->leftjoin('users', 'questioncomments.user_id', '=','users.id')
  ->get(['questioncomments.id AS que_id', 'questioncomments.*','users.*']);
  // $users = DB::table('users')
  //           ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
  //           ->get();
  // print_r($answer);die;
      return $answer;
}


public function likeComment(Request $request){

 $id = $request->segment(4);

//print_r($id);die;
$updatecomment=  questioncomments::find($id);

 $updatecomment->likes +=1;

 $updatecomment->save();

return $updatecomment->likes;


}
public function dislikeComment(Request $request){

 $id = $request->segment(4);

//print_r($id);die;
$updatecomment=  questioncomments::find($id);

 $updatecomment->likes -=1;

 $updatecomment->save();

return $updatecomment->likes;


}

public function deleteComment(Request $request){

 $id = $request->segment(4);
//print_r($id);die;
$delecomment=  questioncomments::find($id);
 $delecomment->delete();
return $delecomment;
}

public function editComment(Request $request){

 $id = $request->segment(4);
//print_r($id);die;
$editcomment=  questioncomments::find($id);

return $editcomment;
}

public function editSaveComment(Request $request){
//print_r($request->all());die;
$id=$request->get('edit_id');
$content= $request->get('upComm');
$updateEdit=  questioncomments::find($id);
 $updateEdit->question_comment =$content;
 $updateEdit->save();
 return $updateEdit;


}


public function replyComment(Request $request){
      $reply = new replyquecomments;
      $reply->reply_comment=$request->get('replycomment');
      $reply->question_id=$request->segment(4);
      $reply->comment_id=$request->get('comment_id');
      $reply->user_id=Auth::user()->id;

      $reply->save();

      return $reply;


}
public function getreplyComment(Request $request){
  $id=$request->segment(5);
 $reply = DB::table('replyquecomments')
 ->where('comment_id', $id)
 ->leftjoin('users', 'replyquecomments.user_id', '=','users.id')
  ->get(['replyquecomments.id AS replyque_id', 'replyquecomments.*','users.*']);
  

  return $reply;


}
public function deleteReplyComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
$delereplycomment=  replyquecomments::find($id);
 $delereplycomment->delete();
return $delereplycomment;
}
public function likeReplyComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
$updateReplycomment=  replyquecomments::find($id);

 $updateReplycomment->likes +=1;

 $updateReplycomment->save();

return $updateReplycomment->likes;


}

public function dislikeReplyComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
$updateReplycomment=  replyquecomments::find($id);

 $updateReplycomment->likes -=1;

 $updateReplycomment->save();

return $updateReplycomment->likes;


}

public function editReplyComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
$editreplycomment=  replyquecomments::find($id);

return $editreplycomment;
}


public function editSaveReplyComment(Request $request){
//print_r($request->all());die;
$id=$request->get('replyedit_id');

//$content= $request->get('upRepComm');
$updatereplyEdit=  replyquecomments::find($id);

 $updatereplyEdit->reply_comment = $request->get('upRepComm');
 $updatereplyEdit->save();

 return $updatereplyEdit;


}

public function answerPostComment(Request $request){
 // return print_r($request->get('anscomment'));die;
   $answr = new answercomments;
     $answr->answer_comment= $request->get('anscomment');
    /// print_r($answr);die;
    $answr->answer_id=$request->get('answer_id');
    $answr->user_id=Auth::user()->id;
      //$ques->answer=Auth::user()->id;
       // print_r($ques);die;
       $answr->save();

       return $answr;

}
public function getAnsComment(Request $request){

  $segment = $request->segment(5);

 //echo $segment;die;
  $answer = DB::table('answercomments')
  ->where('answer_id', $segment)
  ->leftjoin('users', 'answercomments.user_id', '=','users.id')
  ->get(['answercomments.id AS comans_id', 'answercomments.*','users.*']);
  // $users = DB::table('users')
  //           ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
  //           ->get();
  // print_r($answer);die;
      return $answer;
}



//_________--up or down vote answer

public function upVoteAnswer(Request $request){
   $id= $request->segment(4);
 $updateAnswer=  answer::find($id);

if($updateAnswer->likes == 0 || $updateAnswer->likes == -1 ){
$updateAnswer->likes +=1;
 $updateAnswer->save();    
 } 
   return $updateAnswer;
 
} 

public function downVoteAnswer(Request $request){
 $id= $request->segment(4);
 $updateAnswer=  answer::find($id);

if($updateAnswer->likes == 1 || $updateAnswer->likes == 0 ){
$updateAnswer->likes -=1;
$updateAnswer->save();
}
//print_r($updateQuestion);die;        
   return $updateAnswer;
 
} 
//_________--edit  or delete  answer

public function deleteAnswer(Request $request){

 $id = $request->segment(4);
//print_r($id);die;
$deleanswer=  answer::find($id);
 $deleanswer->delete();
return $deleanswer;
}


public function editAnswer(Request $request){

 $id = $request->segment(4);
//print_r($id);die;
$editanswer=  answer::find($id);

return $editanswer;
}

public function editSaveAnswer(Request $request){
//print_r($request->all());die;
$id=$request->get('answer_id');
$content= $request->get('upAns');
$updateEdit=  answer::find($id);
 $updateEdit->description =$content;
 $updateEdit->save();
 return $updateEdit;


}

public function sortByMaxAnsVote(Request $request){

$answer = DB::table('answers')
                ->orderBy('likes', 'desc')
                ->get();

      return $answer;
  }


 public function sortByNewCreatedAnswer(Request $request){
   $answer = DB::table('answers')
                ->orderBy('created_at', 'desc')
                ->get();

      return $answer;
  }
 public function sortByOldestAnswer(Request $request){
   $answer = DB::table('answers')
                ->orderBy('created_at', 'asec')
                ->get();

      return $answer;
  }
  public function deleteAnswerComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
 $deleanswercomm=  answercomments::find($id);
 $deleanswercomm->delete();
return $deleanswercomm;
}



public function likeAnsComment(Request $request){

 $id = $request->segment(5);

//print_r($id);die;
$updateAnscomment=  answercomments::find($id);

 $updateAnscomment->likes +=1;

 $updateAnscomment->save();

return $updateAnscomment->likes;


}
public function dislikeAnsComment(Request $request){

 $id = $request->segment(5);

//print_r($id);die;
$updateAnscomment=  answercomments::find($id);

 $updateAnscomment->likes -=1;

 $updateAnscomment->save();

return $updateAnscomment->likes;


}

public function editAnsComment(Request $request){

 $id = $request->segment(5);
//print_r($id);die;
$editAnscomment=  answercomments::find($id);

return $editAnscomment;
}


public function editSaveAnsComment(Request $request){
//print_r($request->all());die;
$id=$request->get('answer_id');
//$content= $request->get('upRepComm');
$updateAnsEdit=  answercomments::find($id);

 $updateAnsEdit->answer_comment = $request->get('upAnsComm');
 $updateAnsEdit->save();

 return $updateAnsEdit;


}

//reply answer comment function _______________________

public function replyAnsComment(Request $request){
      $reply = new replyanscomments;
      $reply->reply_comment=$request->get('replycomment');
      $reply->comment_id=$request->segment(5);
      $reply->answer_id=$request->get('answer_id');
      $reply->user_id=Auth::user()->id;
      $reply->save();
      return $reply;

}

public function getreplyAnsComment(Request $request){
  $id=$request->segment(6);
  
 // print_r($id);die;
 $reply = DB::table('replyanscomments')
 ->where('comment_id', $id)
 ->leftjoin('users', 'replyanscomments.user_id', '=','users.id')
  ->get(['replyanscomments.id AS reply_id', 'replyanscomments.*','users.*']);
 
  return $reply;


}

public function deleteReplyAnsComment(Request $request){
 $id= $request->segment(6);
//print_r($id);die;
$delereplycomment=  replyanscomments::find($id);
 $delereplycomment->delete();
return $delereplycomment;
}


public function likeReplyAnsComment(Request $request){
 $id = $request->segment(6);
//print_r($id);die;
$updateReplycomment=  replyanscomments::find($id);

 $updateReplycomment->likes +=1;

 $updateReplycomment->save();

return $updateReplycomment->likes;


}


public function dislikeReplyAnsComment(Request $request){
 $id = $request->segment(6);
//print_r($id);die;
$updateReplycomment=  replyanscomments::find($id);

 $updateReplycomment->likes -=1;

 $updateReplycomment->save();

return $updateReplycomment->likes;


}

public function editReplyAnsComment(Request $request){

 $id = $request->segment(6);
//print_r($id);die;
$editreplycomment=  replyanscomments::find($id);

return $editreplycomment;
}


public function editSaveReplyAnsComment(Request $request){
//print_r($request->all());die;
$id=$request->get('replyedit_id');
//$content= $request->get('upRepComm');
$updatereplyEdit=  replyanscomments::find($id);
 $updatereplyEdit->reply_comment = $request->get('upRepComm');
 $updatereplyEdit->save();
 return $updatereplyEdit;

}

























}




               
