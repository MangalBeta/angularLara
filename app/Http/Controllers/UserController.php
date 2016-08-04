<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Requests;
use Hash;
use Illuminate\Support\Facades\Input;
use Session;
use Response;
use Auth;
use DB;

class UserController extends Controller
{

public function store(Request $request){
       $users = new User;
       $users->name=$request->get('name');
       $users->lastname=$request->get('lastname');
       $users->email=$request->get('email');
       $users->password=Hash::make($request->get('password'));
       //print_r($users);die;
       $users->save();
 
      return $users;
}	

public function userLogin(Request $request){
   
if(Auth::attempt(Input::only('email','password'))){
return Auth::user();
}else{
return 'invalid username/pass combo';
}


}

public Function userLogout(){
Auth::logout();
return 'logged out';
}

public function userProfile(Request $request){
$id = $request->segment(4);
   $user = DB::table('users')
   ->where('id',$id)
   ->get();
    
   return response()->json($user);

}

}
