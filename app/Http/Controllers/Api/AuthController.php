<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\loginRequest;
use App\Http\Requests\signupRequest;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(signupRequest $request){
        
$data=$request->validated();
$user=User::create([
    'name'=> $data['name'],
    'email'=> $data['email'],
    'password'=> bcrypt( $data['password'] ) 
]);
$token=$user->createToken('main')->plainTextToken;
return response(compact('token','user'));
    }
    public function login(loginRequest $request){
        $credentials=$request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                "message"=>"provided email or password is incorrect"
            ],422);

        }
        $user =Auth::user();
      $token=$user->createToken('main')->plainTextToken;
return response(compact('token','user'));

    }
    public function logout(Request $request){
        $user=$request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}
