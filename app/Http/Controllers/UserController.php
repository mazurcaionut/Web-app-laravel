<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware("auth:api",["except" => ["login","register"]]);
        $this->user = new User;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
        'name' => 'required|string',
        'email' => 'required|string|unique:users',
        'password' => 'required|min:6|confirmed',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
                ], 500);
        }

        $data = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ];

        $this->user->create($data);
        $responseMessage = "Registration Successful";
        
        return response()->json([
        'success' => true,
        'message' => $responseMessage
        ], 200);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
        'email' => 'required|string',
        'password' => 'required|min:6',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 500);
        }
        $credentials = $request->only(["email","password"]);
        $user = User::where('email',$credentials['email'])->first();
        
        if($user)
        {
            if(!auth()->attempt($credentials))
            {
                $responseMessage = "Invalid username or password";
                return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
                ], 422);
            }
            $accessToken = auth()->user()->createToken('authToken')->accessToken;
            $responseMessage = "Login Successful";
            return $this->respondWithToken($accessToken,$responseMessage,auth()->user());
        } else{
            $responseMessage = "Sorry, this user does not exist";
            return response()->json([
            "success" => false,
            "message" => $responseMessage,
            "error" => $responseMessage
            ], 422);
        }
    }


    public function viewProfile()
    {
        $responseMessage = "user profile";
        $user = Auth::guard("api")->user();

        // $currentUserId = Auth::guard("api")->id();
        // $data = User::with("notifications")->findOrFail($currentUserId);
        return response()->json([
        "success" => true,
        "message" => $responseMessage,
        "data" => $user
        ], 200);
    }


    public function logout()
    {
        $user = Auth::guard("api")->user()->token();
        $user->revoke();
        $responseMessage = "successfully logged out";
        return response()->json([
        'success' => true,
        'message' => $responseMessage
        ], 200);
    }

    // public function currentUser()
    // {
    //     $user = auth("api")->user();
    //     return $user;
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
