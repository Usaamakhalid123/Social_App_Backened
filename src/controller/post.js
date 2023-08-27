import express from "express";
import postModel from "../model/post.js";
import userModel from "../model/user.js";
import mongoose from "mongoose";

const limit=2;

const postController = {
 
getAll: async (req, res) => {
    const page = req.query.page || 1; // Get the requested page from query params

    try {
        const totalPosts = await postModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await postModel.find()
            .sort({createdAt:-1})  // Sort posts in descending order of creation time (latest first)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return res.json({
            page,
            totalPages,
            posts
        });
    } catch (error) {
        console.error('Error getting posts:', error);
        return res.status(500).json({ error: 'Error getting posts' });
    }
},

  

getSingle: async (req, res) => {
    const { id } = req.params;
    try {
        let user;
    
        if (mongoose.Types.ObjectId.isValid(id)) {
          // If id is a valid ObjectId, search by _id
          user = await userModel.findById(id);
        } else {
          // Otherwise, search by email
          user = await userModel.findOne({ email: id });
        }
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
  
      const posts = await postModel.aggregate([
        {
          $match: {
            user_id: user._id,
          },
        },
        {
          $lookup: {
            from: "comments", 
            localField: "_id",
            foreignField: "post_id",
            as: "comments",
          },
        },
      ]);
  
      return res.json({ user, posts });
    } catch (err) {
      console.error('Error getting post:', err);
      return res.status(500).json({ message: "Error getting post" });
    }
  },
  

    create:async (req,res)=>{
        const { title, description, user_id, comments } = req.body;

        try {
            const post = await postModel.create({
                title,
                description,
                user_id:req.user._id,
                Comments: [] // Initialize with provided comments or an empty array
            });

            return res.json({ message: "Post created successfully", post });
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: "Error creating post" });
        }
    },
    like: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await postModel.findById(id);

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            const userId = req.user._id; // Get the user's ID from the token
            const userLiked = post.likes.includes(userId);

            if (userLiked) {
                // User already liked the post, so dislike it
                post.likes -= 1;
            } else {
                // User didn't like the post, so like it
                post.likes += 1;
            }

            await post.save();

            return res.json({ message: "Post like updated", post });
        } catch (error) {
            console.error("Error updating post like:", error);
            return res.status(500).json({ error: "Error updating post like" });
        }
    
    
    },
    
        getUsersPost:async (req,res)=>{
        try{ 
            const {id}=req.params;
            const userPosts= await postModel.find({user_id:userId});

            return res.json(userPosts);
        } catch (error) {{
            console.log("Error getting users",error);
            return res.status(500).json({error:"Error getting users"});
        }
    }
   },
   delete: async (req,res)=>{
    try{
        const {id}=req.params;
        const deletePost=await postModel.findByIdAndDelete(id);

        if(!deletePost){
            return res.status(404).json({error:"Post not found"});
        }

        return res.json({message:"post deleted successfully"});
    } catch(err){
        console.log("Error deleting post",err);
        return res.status(500).json({error:"Error deleting post"});
    }

   },
   addComment: async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body; // sending content in the request body

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.id; // user's ID is stored in req.user
        const newComment = {
            user_id: userId, // Use the fetched user's ID
            content: content
        };

        post.Comments.push(newComment);

        await post.save();

        return res.json({ message: "Comment added", post });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ error: "Error adding comment" });
    }
   },
   emailPosts: async (req, res) => {
    try {
      const email = req.params.email;
  
      const posts = await postModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $match: {
            "user.email": email
          }
        },
        {
          $project: {
            "user.user_password": 0 // eliminating password
          }
        }
      ]);
  
      console.log(posts);
      res.status(200).json(posts); // Send the posts as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  getTodayPosts: async (req,res)=>{
    try{
        const currentDate = new Date();

        const dayStart=new Date(currentDate);
        dayStart.setHours(0,0,0,0); // Set the day start 

        const dayEnd= new Date(currentDate);
        dayEnd.setHours(23,59,59,999); // Set the end of the day #24 hours

        const todayPosts=await postModel.find({
            createdAt:{$gte:dayStart, $lte:dayEnd}
        }).populate("Comments.user_id");

        return res.json({message:"Today posts are:", posts:todayPosts});
    } 
    catch (err) {
        console.log("Getting error fetching today posts",err);
        return res.status(500).json({message:"Error fetching today posts"});

    }

  },



};

export default postController;