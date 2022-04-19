<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $comments = Comment::all();

        return view("comments.index", ["comments"=>$comments]);
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



        // $validator = Validator::make($request->all(),[
        //     "commentable_type" => "required|string",
        //     'commentable_id' => 'required|integer',
        //     'content' => 'required|string',
        // ]);

        // if($validator->fails())
        // {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $validator->messages()->toArray()
        //         ], 500);
        // }

        $newComment = new Comment();
        $newComment->content = $request->content; 
        $newComment->commentable_id = $request->commentable_id; 
        $newComment->commentable_type = $request->commentable_type;
        $newComment->user_id = Auth::guard("api")->id();
        $newComment->post_id = $request->post_id;
        $newComment->save();

        $latestCommentAdded = Comment::latest()->first();


        $notificationContent = "Initial value";
        $notificationUserId = 1;

        if(Str::contains($latestCommentAdded->commentable_type, "Post")) {
            $notificationContent = $latestCommentAdded->user->name . " made a comment on your post " . $latestCommentAdded->post->title;
            $notificationUserId = Post::where("id", $latestCommentAdded->commentable_id)->first()->user_id;
        } else {
            $notificationContent = $latestCommentAdded->user->name . " replied to one of your comments from the post " . $latestCommentAdded->post->title;
            $notificationUserId = Comment::where("id", $latestCommentAdded->commentable_id)->first()->user_id;
        }


        if($notificationUserId !== Auth::guard("api")->id()) {            
            $newNotification = new Notification();
            
            $newNotification->notifiable_type = "App\Models\Comment";
            $newNotification->notifiable_id = $latestCommentAdded->id;
            $newNotification->content = $notificationContent;
            $newNotification->user_id = $notificationUserId;
            $newNotification->save();
        }


        $responseMessage = "Comment added successfully";

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            // "data" => $newComment
        ], 200);
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
        $updatedComment = Comment::findOrFail($id);
        $updatedComment->content = $request->content; 

        $updatedComment->save();

        $responseMessage = "Comment updated successfully";

        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $updatedComment
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
        $comment = Comment::findOrFail($id);
        $comment->delete();

        $responseMessage = "Comment deleted successfully";


        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            // "data" => $newComment
        ], 200);

    }
}
