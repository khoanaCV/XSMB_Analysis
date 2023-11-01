import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${day}/${month}/${year}`;
}

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    forgotPassword(email) {
        return axios
            .post(API_URL + "forgot_password",
                email, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
            )
    }

    resetPassword(token,password){
        return axios.post(API_URL + "reset-password",{
            token,
            password
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register( firstName, lastName, username, phone, email, password, address) {
        return axios.post(API_URL + "signup", {
            firstName, lastName, username, phone, email, password, address
        });
    }

    addUser2( firstName, lastName, username, phone, email, address, password,role) {
        return axios.post(API_URL + "signup", {
            firstName, lastName, username, phone, email, password, address,role
        });
    }

    
    editUser( firstName, lastName, username, phone, email,address) {
        return axios.post(API_URL + "edit_user", {
            firstName, lastName, username, phone, email,address
        });
    }

    addUser( firstName, lastName, username, phone, email,address) {
        return axios.post(API_URL + "add_user", {
            firstName, lastName, username, phone, email,address
        });
    }
 

    createServices(serviceTitle,
        createdDate ,
        updatedDate ,
        servicePrice,
        serviceDetail) {
            createdDate = formatDate(createdDate);
            updatedDate = formatDate(updatedDate);

        return axios.post(API_URL + 'create_services', {
            serviceTitle,
            createdDate,
            updatedDate,
            servicePrice,
            serviceDetail
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();