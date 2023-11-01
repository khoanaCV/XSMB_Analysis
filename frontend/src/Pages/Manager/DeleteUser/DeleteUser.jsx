import axios from 'axios';

function deleteUser(id) {
  axios.delete(`/api/users/${id}`)
    .then(response => {
      console.log(`User with ID ${id} has been deleted.`);
      // Update the UI or perform any other necessary actions
    })
    .catch(error => {
      console.error(`Error deleting user with ID ${id}: ${error}`);
      // Handle any errors that occur during the delete request
    });
}
