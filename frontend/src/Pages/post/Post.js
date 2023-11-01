import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import userService from '../../services/user.service';
import './Post.css';

function Post() {

    const id = useParams();
    const [post, setPost] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [comments, setComments] = useState([]);
    const [postExist, setPostExist] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const fetPostData = async () => {
        const response = await userService.getPostDetails(id.id);
        const data = response.data;
        setPost(data);
        setPostExist(true);

        const response2 = await userService.getPostImage(id.id);
        const data2 = response2.data;
        setImageUrl(data2);
    };

    useEffect(() => {
        fetPostData();
    }, [post]);

    if (!post) {
        return <div>Loading...</div>
    }

    const onSubmit = (event) => {
        try {
            const content = event.comment;
            const postId = id.id;
            const response = axios.post('http://localhost:8080/api/post/comments/submit', { postId, content }, { headers: authHeader() });
            const data = response.data;
            setSuccessMessage('Comment Successfully!');
            setComments(data);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('An error occurred while submitting the form. ' + error.response.data.message);
            setSuccessMessage(null);
            console.log(error.response.data.message)
        }
    };

    return (
        <div className="container">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            {postExist ? (
                <div className="card-body">
                    <div className="post">
                        <div className="img">
                            <img src={`http://localhost:8080/api/post/image?id=${id.id}`} className="card-img-top" alt="Post" />
                        </div>
                        <div className={imageUrl ? "col-md-8" : "col"}>
                            <h5>{post.title}</h5>
                            <p>{post.content}</p>
                        </div>
                    </div>
                    <hr />
                    <h5 className="card-subtitle mb-2 text-muted">{post.comments.length} Comments</h5>
                    <div className="comments">
                        {post.comments.length === 0 && <p>No comments yet.</p>}
                        {post.comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p className=''>{comment.userDto.username}:</p>
                                <p className=''>{comment.content}</p>
                            </div>
                        ))}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="text">Text:</label>
                                <textarea {...register('comment', { required: true })} className="form-control"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Add comment</button>
                        </form>
                    </div>
                </div>
            ) : (<div className="alert alert-danger">
                Post not found</div>)}
        </div>
    );
}
export default Post;