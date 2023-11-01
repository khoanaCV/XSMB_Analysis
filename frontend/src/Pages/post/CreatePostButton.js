import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CreatePostButton.css'

const CreatePostButton = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/post/submit');
    };

    return (
        <Button variant="primary" className="create-post-button" onClick={handleClick}>
            Create Post
        </Button>
    );
};

export default CreatePostButton;

// CSS styles
