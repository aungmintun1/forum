const Thread = require('./../models/threadModel');
const Comment = require('./../models/commentModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


exports.getThreads = catchAsync(async (req, res, next) => {
    const threadsWithoutTotal = await Thread.find().populate('likes').populate('comments');

     const threads = threadsWithoutTotal.map(thread => {
      // Convert document to a plain object to modify it
      const threadObject = thread.toObject();
      threadObject.totalComments = thread.comments.length;
      threadObject.totalLikes = thread.likes.length;
  
      return threadObject;
    });


   
    res.status(200).render('base', {
      threads,
    });
  });
  
  
  exports.getOneThread = catchAsync(async (req, res, next) => {
    
    //find user through id in URL and then populate shirts field
    const thread = await Thread.findById(req.params.threadId).populate('likes')

     const commentsWithoutTotal = await Comment.find({ thread: req.params.threadId })
  .populate('commentLikes') // For top-level comments
  .populate({
    path: 'replies',
    populate: [
      { path: 'commentLikes' }, // Populate commentLikes for the first level of replies
      {
        path: 'replies',
        populate: [
          { path: 'commentLikes' }, // Populate commentLikes for the second level of replies
          {
            path: 'replies',
            populate: { 
              path: 'commentLikes', // Continue this pattern as needed for deeper levels
              // ... Any further nested levels would go here
            }
          }
        ]
      }
    ]
  });
    
 
  const comments = commentsWithoutTotal.map(comment => {
    //first map of total likes
    const commentObject = comment.toObject();
    commentObject.totalLikes = comment.commentLikes.length;
    
    //second map
    if (commentObject.replies && commentObject.replies.length > 0) {
      commentObject.replies = commentObject.replies.map(reply=>{

        const replyObject = reply;
        replyObject.totalLikes= replyObject.commentLikes.length;

        //third map
        if (replyObject.replies && replyObject.replies.length > 0){
          replyObject.replies = replyObject.replies.map(third=>{
            const thirdObject = third;
            thirdObject.totalLikes = thirdObject.commentLikes.length
            return thirdObject;
        })
      }
        return replyObject;
      });
    }

    return commentObject;
  });


    const totalComments = comments.length;
    const totalThreadLikes = thread.likes.length;

    const user = await User.findById(req.user.id);

    res.status(200).render('thread', {
      thread,
      comments,
      totalComments,
      totalThreadLikes,
      user
    });
    
  });

  exports.login = catchAsync(async (req, res, next) => {

    res.status(200).render('login', {
    status: "success"
    });
  });