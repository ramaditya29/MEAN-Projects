/**
 * Created by root on 2/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

String.prototype.toObjectId = function() {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};
var postModel = new Schema({
        postId : ObjectId,
        postName : String,
        postContent: String
});

var Posts = mongoose.model('Posts', postModel);

exports.newPost = function(postName, postContent, callback){
    var newPost = new Posts({postName: postName, postContent: postContent});

    newPost.save(function(error){
       if(error){
           console.log("error" + error.toString());
           throw error;
       }
        console.log("Post created Successfully");
        callback(null, "Post Created Successfully");
    });
};

exports.allPosts = function(callback){
    Posts.find({}, function(error, post){
       if(error){
           throw error;
       }
       callback(error , post);
    });
};

exports.getPostById = function(id, callback){
    Posts.find({_id: id.toObjectId()}).exec(function(error, post){
       if(error){
           throw error;
       }
       callback(error, post);
    });
}