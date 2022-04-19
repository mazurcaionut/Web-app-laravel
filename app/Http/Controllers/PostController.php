<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use \App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $posts = Post::all();

        return view("posts.index", ["posts"=>$posts]);
    }


    public function getAll()
    {
        $responseMessage = "Posts data";

        $postsWithRelations = Post::with("user")->orderBy("created_at", "DESC")->get();

        $data = $postsWithRelations;
    
        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data
        ], 200);
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
        // // return response()->json([
        // //     'success' => true,
        // //     'message' => "Tester"
        // //     ], 200);

        $request->validate([
            'image' => 'required',
          ]);

        // $validator = Validator::make($request->all(),[
        //     // "image" => "required",
        //     'title' => 'required|string',
        //     'description' => 'required|string',
        // ]);

        // if($validator->fails())
        // {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $validator->messages()->toArray()
        //         ], 500);
        // }

        $image = $request->file('image');

        $firebase_storage_path = "Images/";
        $localFolder = public_path("firebase-temp-uploads")."/";
        $extension = $image->getClientOriginalExtension();
        $fileName = $request->title; 
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

                $newPost = new Post();
                $newPost->title = $request->title; 
                $newPost->description = $request->description; 
                $newPost->image = $image;
                $newPost->user_id = Auth::guard("api")->id();
                $newPost->save();

                $data = [
                    "title" => $request->title,
                    "description" => $request->description,
                    "image" => $image,
                    "user_id" => Auth::guard("api")->user()->id,
                ];        

                $responseMessage = "Post created";

                return response()->json([
                    "success" => true,
                    "message" => $responseMessage,
                    "data" => $data
                ], 200);


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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getOne($id)
    {
        //
        $responseMessage = "Single post data";
        $post = Post::with("user","comments")->findOrFail($id);

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $post
        ], 200);
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
        $updatedPost = Post::findOrFail($id);

        if($request->has("title")) {
            $updatedPost->title = $request->title; 
        }

        if($request->has("description")) {
            $updatedPost->description = $request->description; 
        }

        if($request->has("image")) {
            // $updatedPost->description = $request->description; 
            $image = $request->file('image');

            $firebase_storage_path = "Images/";
            $localFolder = public_path("firebase-temp-uploads")."/";
            $extension = $image->getClientOriginalExtension();
            $fileName = $request->title; 
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
    
                    $updatedPost->image = $image; 
    
    
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


        $updatedPost->save();

        $responseMessage = "Post updated successfully";

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
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
        $post = Post::findOrFail($id);
        $post->delete();

        $responseMessage = "Post deleted successfully";

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            // "data" => $newComment
        ], 200);
    }
}
