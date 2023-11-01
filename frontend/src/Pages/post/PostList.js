import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePostButton from './CreatePostButton';
import authService from '../../services/auth.service';

const PostList = () => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState("");

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const user = authService.getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userService.getAllPost(page, size);
                setPosts(data.data);
                setShowModeratorBoard(user?.roles?.includes("ROLE_MANAGER"));
            } catch (error) {
                console.error('Error fetching posts:', error);
                toast.error('Error fetching posts. Please try again later.');
            }
        };
        fetchData();
    }, [page, size]);


    const handleClick = (id) => {
        navigate(`/post/${id}`, { replace: true });
    }

    const handleDelete = async (postId) => {
        try {
            setPostIdToDelete(postId);
            setShowDeleteModal(true);
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Error deleting post. Please try again later.");
        }
    };

    const confirmDelete = async () => {
        try {
            await userService.deletePost(postIdToDelete);
            const updatedPosts = posts.filter((post) => post.id !== postIdToDelete);
            setPosts(updatedPosts);
            toast.success("Post deleted successfully.");
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Error deleting post. Please try again later.");
        }
    };

    return (
        <Container>
            <Row>
                <ToastContainer />
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    {
                        user ? (<CreatePostButton />
                        ) : (
                            <div></div>
                        )
                    }

                </Col>
            </Row>
            <Row>
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    // render posts
                    <Col md={{ span: 8, offset: 2 }}>
                        {posts?.map((post) => (
                            <Card key={post.id} className="mb-3">
                                <Row>
                                    <Col md={4}>
                                        <Image src={post.imageLink ? userService.getImagePostLink(post.id) : 'https://via.placeholder.com/150'} thumbnail />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Header>{post.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {post.user.username}
                                            </Card.Subtitle>
                                            <Card.Text>{post.content}</Card.Text>
                                            <Button variant="primary" onClick={() => handleClick(post.id)}>
                                                Read More
                                            </Button>
                                            {
                                                showModeratorBoard && (
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(post.id)}
                                                        className="ml-2"
                                                    >
                                                        Delete
                                                    </Button>
                                                )
                                            }
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Col>
                )}
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Button
                        variant="primary"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="primary"
                        disabled={posts?.length < size}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </Col>
            </Row>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PostList;