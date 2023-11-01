import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import userService from '../../services/user.service';
import './Post.css';
import { Card, Form, Button } from "react-bootstrap";
import authService from '../../services/auth.service';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from 'react-icons/fa';
import './PostView.css'
function PostView() {
    const id = useParams();

    const [post, setPost] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [comments, setComments] = useState([]);
    const [postExist, setPostExist] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const fetPostData = async () => {
        try {
            const response = await userService.getPostDetails(id.id);
            setPost(response.data);
            setPostExist(true);

            const response2 = await userService.getPostImage(id.id);
            setImageUrl(response2.data);

            const response3 = await userService.getUserInfo(id.id);
            setCurrentUser(response3.data);

            const user = authService.getCurrentUser();
            setIsManager(user.roles.includes("ROLE_MANAGER"));
            setIsUser(user.roles.includes("ROLE_USER"));
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Error fetching posts. Please try again later.');
        }

    };

    useEffect(() => {
        fetPostData();
    }, []);

    const onSubmit = async (event) => {
        try {
            const content = event.content;
            const postId = id.id;
            const response = await axios.post('http://localhost:8080/api/post/comments/submit', { postId, content }, { headers: authHeader() });
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

    const handleEdit = (postId) => {
        // nave.push(`/post/edit/${postId}`);
    };

    const handleDeleteComment = async (commentId) => {
        console.log(commentId);
    }

    const handleDelete = async (postId) => {
        try {
            if (currentUser.id !== post?.user?.id) {
                throw new Error("You are not authorized to delete this post.");
            }
            await userService.deletePost(postId);
            toast.success("Post deleted successfully.");
            navigate("/post");
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error(error.message);
        }
    };
    return (
        <Card className="my-4">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <Card.Body>
                <div className="d-flex align-items-center">
                    <img src={userService.getUserPfpLink(post?.user?.id)} alt="" className="rounded-circle mr-3" width="50" height="50" />
                    <div className='ml-5'>
                        <h5>{post?.user?.username}</h5>
                        <p className="text-muted">{post.title}</p>
                    </div>
                </div>
                <hr />
                <div>
                    <img src={userService.getImagePostLink(id.id)} alt="" className="img-fluid" />
                    <p>{post.content}</p>
                </div>
                <hr />
                <h6>Comments</h6>
                {
                    isUser && (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="d-flex align-items-center">
                                <img src={userService.getUserPfpLink(currentUser?.id)} alt={post?.user?.username} className="rounded-circle mr-3" width="30" height="30" />
                                <Form.Control type="text" placeholder="Add a comment..." className='ml-2' {...register('content', { required: true })} />
                                <Button variant="primary" type="submit" className="ml-2">Submit</Button>
                            </Form.Group>
                        </Form>
                    )
                }
                <div>
                    {
                        post?.comments?.map((comment, index) => (
                            <div className="d-flex align-items-center my-3" key={index}>
                                <img src={userService.getUserPfpLink(comment.userDto.id)} alt={comment.userDto.username} className="rounded-circle mr-3" width="30" height="30" />
                                <div className='ml-5'>
                                    <h6>{comment.userDto.username}</h6>
                                    <p>{comment.content}</p>

                                    {
                                        // isManager && (
                                        // <div className="d-flex align-items-center">
                                        //     <Button
                                        //         variant="danger"
                                        //         onClick={() => handleDeleteComment(comment.id)}
                                        //         className="p-1"
                                        //     >
                                        //         <FaTrash size={14} />
                                        //     </Button>
                                        // </div>
                                        // )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Card.Body>
        </Card>
    );
}
export default PostView;