//___________________questioning controller_______________

app.controller('questionController',['$scope','$location','$window','$http','Auth','SessionService','$routeParams','$localStorage','$route','$timeout', 'oiSelect',
  function ($scope,$location,$window,$http,Auth,SessionService,$routeParams,$localStorage,$route,$timeout, oiSelect) {

$scope.userdata =$localStorage.userpp;

$scope.shopArr = function (){
      $http({
      method: 'get',
      url: "api/topics/get",
      // headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
      // data:$.param(id) ,
        }).then(function successCallback(response) {
         $scope.topicsArr=response.data;
        
         
         // console.log($localStorage.ss);
           
}, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });

  } 
$scope.shopArr();
// $scope.topic = [];

// $scope.saveTopic=function(){
// $scope.nameTopic=[];

//   for(var i in $scope.topic){
//     $scope.nameTopic.push($scope.topic[i].topic_name)
//   }
//  var topics={'topic_name':$scope.nameTopic};

//    $http({
//       method: 'post',
//       url: "api/topics/post" ,
//       data:$.param(topics),
//       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
//         }).then(function successCallback(response) {
//           console.log(response.data)
       
//     }, function errorCallback(response) {
//         console.log('error',response);
//        //$location.path("/welcome");
//       });
// }


$scope.userProfile=function(id){
        $http({
      method: 'get',
      url: "api/user/profile/" +id,

        }).then(function successCallback(response) {
          $scope.userpro=response.data[0];
          $localStorage.userpp=$scope.userpro;
          $location.path('/userProfile')
   console.log($scope.userpro);

    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}


$scope.postQuestion=function(){
  $scope.tpname=[];

  for(var i in $scope.topic){
    $scope.tpname.push($scope.topic[i].topic_name)
  }

      var questions={'title':$scope.title,'description':$scope.description,'topic':$scope.tpname};
      console.log(questions);
     $http({

      method: 'post',
      url: "api/user/question", 
      dataType: "JSON",
      data:$.param(questions) ,
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
      //  console.log(response);
        $location.path("/home");
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}

//  get all qusestions
     $http({
      method: 'get',
      url: "api/user/question/show",
        }).then(function successCallback(response) {
          $scope.questions=response.data;
//console.log($scope.questions);
      //for pagination of post
      $scope.currentPage = 1;
      $scope.totalItems = $scope.questions.length;
      //console.log($scope.totalItems);
     $scope.entryLimit = 5; 
     $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);
     //end pagination of post 
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
//}
$scope.singles= $localStorage.ss;

$scope.singleQuestion=function(id){
 // console.log(id)
  $http({
      method: 'get',
      url: "api/question/singlequestion/"+id,
      // headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
      // data:$.param(id) ,
        }).then(function successCallback(response) {
         // $scope.getsingleId=response.data;
         // console.log($scope.getsingleId);
           $localStorage.ss=response.data;
         // console.log($localStorage.ss);
            $location.path("/singleQuestion/" +id);
}, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
      }


 $scope.showBox=false;


//_____________methode for comment box___________


$scope.showCommentBox=function(id){
  if(Auth.isUserLoggedIn()){
   $scope.showBox=true;
  }else{
    alert("plz login first")
  }

}

$scope.showreplyBox=false;
$scope.cancelCommentBox=function(){
     $scope.showBox=false;
     $route.reload();
//$scope.showreplyBox = $scope.showreplyBox === false ? true: false;
}

$scope.showMore = false;
$scope.showText="Hide";
  $scope.toggleCustom = function() {
    // $timeout(function () {
        $scope.showMore = $scope.showMore === false ? true: false;
         $scope.showText = $scope.showText === 'Hide' ? 'Show': 'Hide';
    //}, 1000);
           
};
$scope.postQuestionComment=function(){
  var qcomment={'quescomment':$scope.question.comment,'question_id':$scope.singles.id};
 // console.log(qcomment)
     $http({

      method: 'post',
      url: "api/question/comment",
      dataType: "JSON",
      data:$.param(qcomment) ,
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {

      // console.log(response);
       $scope.question={};
       $route.reload();
        $scope.showBox=true
        //$location.path("/home");
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}

$scope.getAllQuesComment=function(id){
     $http({
      method: 'get',
      url: "api/question/comment/get/"+id,
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.getComment=response.data;
        //console.log($scope.getComment);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}


//$scope.editShow='0';
$scope.showEditCommentBox=function(index){
$scope.editindex=index;
 }

$scope.clickEdit=false;
$scope.cancelEditComm=function(){
  $route.reload();
  //$scope.clickEdit=false;
 // console.log($scope.clickEdit);
}

$scope.editQueComm=function(id){
$http({ 
        url: 'api/comment/edit/'+ id ,
        method: 'get'
     }).then(function (response) {
 
    $scope.editdata=response.data;
         $scope.clickEdit=true;
        console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.editSaveQueComm=function(id){
  alert($scope.comment.question_comment);
   var qcomment={'upComm':$scope.comment.question_comment,'edit_id':id};
       $http({ 
       url: 'api/comment/edit/'+ id ,
       method: 'put',
       dataType: "JSON",
       data:$.param(qcomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
    $scope.savedata=response.data;
     $route.reload();
    $scope.clickEdit=false;
    $route.reload();

        //console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}
$scope.removeQueComm=function(id){
$http({ 
        url: 'api/comment/delete/'+ id ,
        method: 'delete'
     }).then(function (response) {
      console.log("delete data");
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}


$scope.likeComment=function (id) {
  /// console.log(id);
 if(Auth.isUserLoggedIn()){

   $http({ 
        url: 'api/comment/likes/'+ id ,
        method: 'put'
     }).then(function (response) {

      $route.reload();
     
},function errorCallback(response) {
      console.log('error',response);
})
   
 }
   else{
      alert("We re sorry, but anonymous users are not allowed to like. Please login or Register a new account." );
   }

}

 
$scope.dislikeComment=function (id) {
  /// console.log(id);
 if(Auth.isUserLoggedIn()){

   $http({ 
        url: 'api/comment/dislike/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
})
   
 }
   else{
      alert("We re sorry, but anonymous users are not allowed to like or dislke. Please login or Register a new account." );
   }

}
//method for answerbox__________________________________________________

$scope.postAnswer=function(){
 // console.log($scope.description);
     $http({
      method: 'post',
      url: "api/question/answer",
      dataType: "JSON",
      data:$.param({'description':$scope.singles.dd,'question_id':$scope.singles.id}) ,
     headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
          $scope.ques=response;
         $scope.singles.dd="";
        $route.reload();
        
       // $scope.singleQuestion();
       // $location.path("/home");
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
} 
$scope.showCommentReplyBox=function(index){
  if(Auth.isUserLoggedIn()){
$scope.indexShow =index;

}else{
  alert("plz login first");
}
}
$scope.getAllAnswer=function(id){
     $http({
      method: 'get',
      url: "api/question/answer/get/"+id,
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.getAnswer=response.data;
      //console.log($scope.getAnswer);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}


$scope.removeAns=function(id){
$http({ 
        url: 'api/answer/delete/'+ id ,
        method: 'delete'
     }).then(function (response) {
      console.log("delete data");
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});            
}

//mehode for reply question box_____________________________

$scope.replyCommentBox=function(index){
$scope.replyindex=index;
 }

$scope.clickReply=false;
$scope.cancelReplyComm=function(index){
$route.reload();
 }

$scope.replyQueComm=function(id){
  //alert(id);
// $http({ 
//         url: 'api/comment/reply/'+ id ,
//         method: 'get'
//      }).then(function (response) {
//     $scope.replydata=response.data;
    $scope.clickReply=true;
//      console.log("edit data");
//       //$scope.clickEdit=true;
//      // $route.reload();
// },function errorCallback(response) {
//       console.log('error',response);
// });
         
}

$scope.savereplyQueComm=function(id){
  console.log($scope.comment.que_id)
 var repcomment={'replycomment':$scope.replycomment,'comment_id':$scope.comment.que_id};
       $http({ 
       url: 'api/comment/reply/'+ id ,
       method: 'post',
       dataType: "JSON",
       data:$.param(repcomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
     $scope.saveReply=response.data;
     $route.reload();
    //$scope.clickReply=false;
    //$route.reload();
     console.log("save data");
      //console.log($scope.saveReply);
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});        
}

$scope.getAllReplyComment=function(id){
     $http({
      method: 'get',
      url: "api/comment/reply/get/"+id,
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.replyComment=response.data;
       // console.log($scope.replyComment);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}

$scope.removeReplyComm=function(id){
$http({ 
        url: 'api/comment/reply/delete/'+ id ,
        method: 'delete'
     }).then(function (response) {
      console.log("delete data");
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.likeReplyComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/comment/reply/likes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   } else{
      alert("We re sorry, but anonymous users are not allowed to like.Please login or Register a new account.");
   }

   
     

}

$scope.dislikeReplyComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/comment/reply/dislikes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   } else{
      alert("We re sorry, but anonymous users are not allowed to like.Please login or Register a new account.");
   }

}
$scope.showEditReplyCommentBox=function(index){
$scope.editReplyindex=index;
 }

$scope.clickReplyEdit=false;
$scope.cancelReplyEditComm=function(){
  $route.reload();
  //$scope.clickEdit=false;
 // console.log($scope.clickEdit);
}

$scope.editReplyComm=function(id){
 // alert("hello");
$http({ 
        url: 'api/comment/reply/edit/'+ id ,
        method: 'get'
     }).then(function (response) {
 
    $scope.editReplydata=response.data;
         $scope.clickReplyEdit=true;
        console.log("edit Reply data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.editReplySaveComm=function(id){
   var replyeditcomment={'upRepComm':$scope.repComm.reply_comment,'replyedit_id':id};
       $http({ 
       url: 'api/comment/reply/edit/'+ id ,
       method: 'put',
       dataType: "JSON",
       data:$.param(replyeditcomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
    $scope.savereplydata=response.data;
    $scope.clickEdit=false;
    $route.reload();

        //console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

// if(Auth.isUserLoggedIn()){
//   console.log('okkkk');

// }else{
//   alert('Were sorry, but you cannot vote on your own post.');

 //__methode for answer comment box ______________

$scope.postAnswerComment=function(id){
var ans=document.getElementById("answercomment").value;
//console.log(ans);
var ancomment={'anscomment':ans,'answer_id':id};
 // console.log(qcomment)
     $http({
      method: 'post',
      url: "api/answer/comment",
      dataType: "JSON",
      data:$.param(ancomment) ,
          headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
      // console.log(response);
         $route.reload();
      // $scope.answer={};
       // $scope.showBox=true
        //$location.path("/home");
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}
 $scope.getTimes=function(n){
     return new Array(n);
   };


$scope.getAllAnsComment=function(id){
     $http({
      method: 'get',
      url: "api/answer/comment/get/"+id,
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.getAnsComment=response.data;
       // console.log($scope.getAnsComment);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}
$scope.likeAnsComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/answer/comment/likes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   }
  else{
   alert("We re sorry, but anonymous users are not allowed to like.Please login or Register a new account.")
   }

}
$scope.dislikeAnsComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/answer/comment/dislikes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   }
  else{
   alert("We re sorry, but anonymous users are not allowed to like.Please login or Register a new account.")
   }

}
$scope.clickAnsEdit=false;

$scope.showEditAnsCommentBox=function(index){
$scope.editAnsindex=index;
 }

$scope.editAnsComm=function(id){
 // alert("hello");
$http({ 
        url: 'api/answer/comment/edit/'+ id ,
        method: 'get'
     }).then(function (response) {
 
    $scope.editReplydata=response.data;
         $scope.clickAnsEdit=true;
        console.log("edit answer comment data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.editSaveAnsComm=function(id){
   var ansditcomment={'upAnsComm':$scope.comment.answer_comment,'answer_id':id};
       $http({ 
       url: 'api/answer/comment/edit/'+ id ,
       method: 'put',
       dataType: "JSON",
       data:$.param(ansditcomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
    $scope.saveansdata=response.data;
    $route.reload();

        //console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.deleteAnsComm=function(id){
$http({ 
        url: 'api/answer/comment/delete/'+ id ,
        method: 'delete'
     }).then(function (response) {
      console.log("delete data");
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});            
}

//-_reply answer comment function_______________________________

$scope.replyCommentAnsBox=function(index){
$scope.replyAnsindex=index;
 }
$scope.clickAnsReply=false;

$scope.replyAnsComm=function(id){
    $scope.clickAnsReply=true;

}

$scope.savereplyAnsComm=function(id){

 var repanscomment={'replycomment':$scope.answer.replyanscomment,'answer_id':$scope.answer.ans_id};
  console.log(repanscomment);
       $http({ 
       url: 'api/answer/comment/reply/'+ id ,
       method: 'post',
       dataType: "JSON",
       data:$.param(repanscomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
     $scope.saveAnsReply=response.data;
     $route.reload();
    //$scope.clickReply=false;
    //$route.reload();
     console.log("save answer reply data");
      //console.log($scope.saveReply);
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});        
}

$scope.getAllReplyAnsComment=function(id){
  console.log(id);
     $http({
      method: 'get',
      url: "api/answer/comment/reply/get/"+id,
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.replyAnsComment=response.data;
       console.log($scope.replyAnsComment);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}

$scope.removeReplyAnsComm=function(id){
$http({ 
        url: 'api/answer/comment/reply/delete/'+ id ,
        method: 'delete'
     }).then(function (response) {
      console.log("delete reply answer data");
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.likeReplyAnsComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/answer/comment/reply/likes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   }
else{
   alert("We re sorry, but anonymous users are not allowed to like. Please login or Register a new account.");
   
   }

}

$scope.dislikeReplyAnsComment=function (id) {
  /// console.log(id);
if(Auth.isUserLoggedIn()){
 $http({ 
        url: 'api/answer/comment/reply/dislikes/'+ id ,
        method: 'put'
     }).then(function (response) {
      $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
   }
else{
   alert("We re sorry, but anonymous users are not allowed to like. Please login or Register a new account.");
   
   }

}

$scope.showEditReplyAnsCommentBox=function(index){
$scope.editReplyAnsindex=index;
 }

$scope.clickReplyAnsEdit=false;

$scope.editReplyAnsComm=function(id){
 // alert("hello");
$http({ 
        url: 'api/answer/comment/reply/edit/'+ id ,
        method: 'get'
     }).then(function (response) {
 
    $scope.editReplyAnsdata=response.data;
         $scope.clickReplyAnsEdit=true;
        console.log("edit Reply ans  data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.editReplySaveAnsComm=function(id){
   var replyeditcomment={'upRepComm':$scope.repAnsComm.reply_comment,'replyedit_id':id};
       $http({ 
       url: 'api/answer/comment/reply/edit/'+ id ,
       method: 'put',
       dataType: "JSON",
       data:$.param(replyeditcomment) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
    $scope.savereplyansdata=response.data;
     $scope.clickReplyAnsEdit=false;
    $route.reload();

        //console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}



//________________________end reply answer function___________________



$scope.edAns= $localStorage.editan;
$scope.editAnswer=function(id){
$http({ 
        url: 'api/answer/edit/'+ id ,
        method: 'get'
     }).then(function (response) {
 
    $scope.editanswer=response.data;
    $localStorage.editan=$scope.editanswer;
      //console.log($scope.editanswer);
         //$scope.clickEdit=true;
         $location.path('/editAnswer/'+id);
       // console.log("editanswer");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}

$scope.editSaveAnswer=function(id){
  var editans={'upAns':$scope.edAns.description,'answer_id':id};
       $http({ 
       url: 'api/answer/edit/'+ id ,
       method: 'put',
       dataType: "JSON",
       data:$.param(editans) ,
       headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
     }).then(function (response) {
    $scope.saveditans=response.data;

 $location.path('singleQuestion/'+$localStorage.editan.question_id);

        //console.log("edit data");
      //$scope.clickEdit=true;
     // $route.reload();
},function errorCallback(response) {
      console.log('error',response);
});
         
}





//for vot ans methode_________________-

$scope.upVoteAns=function(id){
if(Auth.isUserLoggedIn()){
 if(Auth.getClientInfo().data.id != $scope.singles.user_id){
   $http({ 
        url: 'api/answer/likes/'+ id ,
       method: 'put'
     }).then(function (response) {
      $scope.answer=response.data;
    // console.log($scope.singles)
       $route.reload();
  // $scope.questions.forEach(function(value,index){
  //             if(value.id == id){
            
  //            //if(value.likes== 0 ||value.likes == -1){
  //                value.likes +=1;
  //                  console.log(value.likes)

  //             //}
  //           }

  //   });
},function errorCallback(response) {
      console.log('error',response);
});
   }
  else{
    if(Auth.getClientInfo().data.id == $scope.singles.user_id){
      alert("We are soorry ,but you don't like your post");
    }else{
     alert("plz login first");
   }
 }
}
 else{
  alert("plz login");
 }

}
$scope.getUserInfo =function(){
  return Auth.getClientInfo().data.id;
}
$scope.downVoteAns=function(id){
  if(Auth.isUserLoggedIn()){
  if(Auth.getClientInfo().data.id != $scope.singles.user_id){
   $http({ 
        url: 'api/answer/dislikes/'+ id ,
          method: 'put'
     }).then(function (response) {
        $scope.answer=response.data;
        $route.reload();
  // $scope.questions.forEach(function(value,index){
  //             if(value._id == id){
  //              if(value.dislike== 0 ||value.dislike == -1){
  //                value.dislike -=1;
  //             }
  //           }
  //   });
},function errorCallback(response) {
      console.log('error',response);
});
   }
  else{
    if(Auth.getClientInfo().data.id == $scope.singles.user_id){
      alert("We are soorry ,but you don't like your post");
    }else{
     alert("plz login first");
   }
  
}
}else{
  alert("plZ login first");
}
}


$scope.sortByMaxVoteForAns=function(){
     $http({
      method: 'get',
      url: "api/answer/sort/vote",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.answer=response.data;
       // console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
}


$scope.sortByNewlyAnswer=function(){
     $http({
      method: 'get',
      url: "api/answer/sort/newanswer",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.answer=response.data;
       // console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
});

}

$scope.sortByOldestAns=function(){
     $http({
      method: 'get',
      url: "api/answer/sort/oldest",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.answer=response.data;
       // console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
});

}

//for vote__________ and view method__________________________

$scope.upVote=function(id){
 if(Auth.isUserLoggedIn())
   {
   if(Auth.getClientInfo().data.id != $scope.singles.user_id){
   $http({ 
        url: 'api/question/likes/'+ id ,
       method: 'put'
     }).then(function (response) {

      $scope.singles=response.data;
    // console.log($scope.singles)
      //  $route.reload();
  $scope.questions.forEach(function(value,index){
              if(value.id == id){
            
             //if(value.likes== 0 ||value.likes == -1){
                 value.likes +=1;
                   console.log(value.likes)

              //}
            }

    });
},function errorCallback(response) {
      console.log('error',response);
});
   }
   else{
    if(Auth.getClientInfo().data.id == $scope.singles.user_id){
      alert("We are soorry ,but you don't like your post");
    }else{
     alert("plz login first");
   }
}
}
else{
   alert("plz login first");
}
}

$scope.downVote=function(id){
   if(Auth.isUserLoggedIn())
   {
      if(Auth.getClientInfo().data.id != $scope.singles.user_id){
       $http({ 
        url: 'api/question/dislikes/'+ id ,
          method: 'put'
     }).then(function (response) {
      $scope.singles=response.data;
       // $route.reload();
  $scope.questions.forEach(function(value,index){
              if(value._id == id){
               if(value.dislike== 0 ||value.dislike == -1){
                 value.dislike -=1;
              }
            }
    });
},function errorCallback(response) {
      console.log('error',response);
});
   }
   else{
    if(Auth.getClientInfo().data.id == $scope.singles.user_id){
      alert("We are soorry ,but you don't like your post");
    }else{
     alert("plz login first");
   }
}
}
else{
   alert("plz login first");
}
  
}

//For Sort from database  method _______________________

$scope.sortByMaxVote=function(){
     $http({
      method: 'get',
      url: "api/question/sort/vote",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.questions=response.data;
       // console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}

$scope.sortByNewlyCreated=function(){
     $http({
      method: 'get',
      url: "api/question/sort/newcreated",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.questions=response.data;
       // console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}
$scope.sortByMostView=function(){
     $http({
      method: 'get',
      url: "api/question/sort/mostview",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.questions=response.data;
        //console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}
$scope.sortByUpdated=function(){
     $http({
      method: 'get',
      url: "api/question/sort/updated",
      dataType: "JSON",
        }).then(function successCallback(response) {
        $scope.questions=response.data;
        //console.log($scope.questions);
      // $location.path("/singleQuestion/" +id);
    }, function errorCallback(response) {
        console.log('error',response);
       $location.path("/welcome");
      });
}

$scope.showSerachItems=false;
 //$scope.searchMeta=localStorage.dd
$scope.searchFromDB=function(){
  $http({
      method: 'post',
      url: "api/search",
      dataType: "JSON",
      data:$.param({'search':$scope.selectsearch.title}) ,
     headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
   $scope.searchMeta=response.data;
   //localStorage.dd=$scope.searchMeta
 // console.log( $scope.searchMeta)
       //$("#model").html(response.data).show();
   // var serachvalue=document.forms['search']['searchInputText'].value;
   //   console.log(serachvalue);

     //console.log($scope.search);
       // $location.path("/home");
    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
 
}
 $scope.matchSearch=function(){
   console.log($scope.selectsearch.title);
   $http({
      method: 'post',
      url: "api/search/get",
      dataType: "JSON",
      data:$.param({'searchmeta':$scope.selectsearch.title}) ,
     headers: { 'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
     $localStorage.ss=response.data;
     $location.path('singleQuestion/'+$localStorage.ss.id);
    // console.log( $scope.searchdata)

    }, function errorCallback(response) {
        console.log('error',response);
       //$location.path("/welcome");
      });
 };

   
  }]);



//get value from select javascript function
// var searchvalue= localStorage.dd;
// var myserach = {

// getData: function(title) {
//  value = title.options[title.selectedIndex].value;
//   localStorage.dd=value;
// ;
// var inputvalue=document.getElementById("search-query");
// inputvalue.value=value;

// }

// getMatchData : function(title,$scope) {
//   $.ajaxSetup({
//         headers: { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') }
//     });
// var data =value;
//  $.ajax({
//   type: "POST",
//   dataType: "json",
//   url: "api/search/get", //Relative or absolute path to response.php file
//   data: {'search':value},
//   // headers: { 'x-my-custom-header': 'some value' }
//   success: function(response) {
//     $scope.singles=response;
// window.location.href='http://localhost/newproject/public/#/singleQuestion/'+ $scope.singles[0].id;

// // var text='<div nodeid="145267" class="post-gravatar question-gravatar">'+ response[0].likes +'</div>';
// // $("#resltmeta").html(text).show();
//   // $("#single").html(response).show();
//    //console.log(response)


//   }
//   });
//   return false;
//   }

//}