<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


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

        $initialRole = "User";

        $data = [
            "name" => $request->name,
            "email" => $request->email,
            "role" => $initialRole,
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

        return response()->json([
        "success" => true,
        "message" => $responseMessage,
        "data" => $user
        ], 200);
    }

    public function getAll()
    {
        $responseMessage = "Fetched all users";
        $users = User::all();

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $users
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
        $updatedUser = User::findOrFail($id);


        if($request->has("password")) {
            $credentials = [
                "email" => $updatedUser->email,
                "password" => $request->password,
            ];

            // $credentials = $request->only(["email","password"]);

            if(!Hash::check($request->password, $updatedUser->password))
            {
                $responseMessage = "Invalid password";
                return response()->json([
                "success" => false,
                "message" => $responseMessage,
                "error" => $responseMessage
                ], 422);
            }

            $updatedUser->password = Hash::make($request->newPassword);
        }

        if($request->has("name")) {
            $updatedUser->name = $request->name; 
        }

        if($request->has("email")) {
            $updatedUser->email = $request->email; 
        }

        if($request->has("image")) {
            $image = $request->file('image');

            $firebase_storage_path = "Images/";
            $localFolder = public_path("firebase-temp-uploads")."/";
            $extension = $image->getClientOriginalExtension();
            $fileName = $updatedUser->name; 
            $randomUniqueString = Str::random(15);
            $file = $randomUniqueString . $fileName . "." . $extension;
    
    
            if($image->move($localFolder, $file)) {
                $uploadedFile = fopen($localFolder.$file, "r");
        
                app("firebase.storage")->getBucket()->upload($uploadedFile, ["name" => $firebase_storage_path. $file]);
    
                unlink($localFolder.$file);
    
                $imageReference = app("firebase.storage")->getBucket()->object($firebase_storage_path. $file);
    
    
                if ($imageReference->exists()) {
                    $now = new \DateTime();
                    $expiresAt = $now->add(new \DateInterval("P1Y"));
                    $image = $imageReference->signedUrl($expiresAt);
    
                    $updatedUser->image = $image; 
    
    
                  } else {
                    return response()->json([
                        'success' => false,
                        'message' => "File didn't upload properly"
                        ], 500);    
                }
    
            } else {
                return response()->json([
                    'success' => false,
                    'message' => "Something wrong with file copy"
                    ], 500);
            }
        }


        $updatedUser->save();

        $responseMessage = "User updated successfully";

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $updatedUser,
        ], 200);
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
