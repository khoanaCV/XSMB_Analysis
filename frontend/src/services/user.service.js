import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${day}/${month}/${year}`;
}

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'api/mod/children', { headers: authHeader() });
    }

    getUnassignedChildMod() {
        return axios.get(API_URL + 'api/mod/unassignedChild', { headers: authHeader() });
    };

    getAllClassesMod() {
        return axios.get(API_URL + 'api/mod/classes', { headers: authHeader() });
    }

    getAllBooking() {
        return axios.get(API_URL + 'api/mod/booking/all', { headers: authHeader() });
    }

    getAllBookingByUser(id) {
        return axios.get(API_URL + 'account/booked?id=' + id, { headers: authHeader() });
    }

    postAssignClass(childId, classId) {
        return axios.post(API_URL + 'api/mod/assignChild', { childId, classId }, { headers: authHeader() });
    }

    postApproveBooking(bookingId) {
        return axios.post(API_URL + 'api/mod/booking/approve', bookingId, { headers: authHeader() })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    postDeniedBooking(bookingId) {
        return axios.post(API_URL + 'api/mod/booking/deny', bookingId, { headers: authHeader() })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getAllChildrenOfUser() {
        return axios.get(API_URL + 'account/current-user-children', { headers: authHeader() });
    }


    getClassDetails(id) {
        return axios.get(API_URL + 'api/mod/class?id=' + id, { headers: authHeader() });
    }

    getChildrenFromClass(id) {
        return axios.get(API_URL + 'api/mod/class/children?id=' + id, { headers: authHeader() });
    }

    deleteClass(id) {
        return axios.delete(API_URL + 'api/mod/class/delete?id=' + id, { headers: authHeader() });
    }

    getChildInfo(id) {
        return axios.get(API_URL + 'account/users/child?id=' + id, { headers: authHeader() });
    }

    getClassFromChild(id) {
        return axios.get(API_URL + 'account/getClassFromChild?id=' + id, { headers: authHeader() });
    }

    submitChildren(firstName,
        lastName,
        dob,
        gender,
        interest,
        needs,
        note) {
        dob = formatDate(dob);

        return axios.post(API_URL + 'account/submit_children', {
            firstName,
            lastName, dob,
            gender,
            interest,
            needs,
            note
        }, { headers: authHeader() });
    }


    getAllService() {
        return axios.get(API_URL + "api/service/all", { headers: authHeader() });
    }

    getServiceDetail(id) {
        return axios.get(API_URL + "api/service/service?id=" + id, { headers: authHeader() });
    }

    postSubmitService(id, childId, isPaid) {
        return axios.post(API_URL + 'account/booknow', { id, childId, isPaid }, { headers: authHeader() })
    }

    postEditService(formData, id) {
        return axios.put(API_URL + `api/service/edit/${id}`, formData, { headers: authHeader() })
    }

    postCreatePost(formData) {
        return axios.post(API_URL + 'api/post/create', formData, { headers: authHeader() })
    }

    getPostDetails(id) {
        return axios.get(API_URL + 'api/post?id=' + id, { headers: authHeader() });
    }

    getPostImage(id) {
        return axios.get(API_URL + 'api/post/image?id=' + id, { headers: authHeader() });
    }

    getAllPost(page, size) {
        return axios.get(API_URL + `api/post/all?page=${page}&size=${size}`, { headers: authHeader() });
    }

    getUserInfo() {
        return axios.get(API_URL + 'account/detail', { headers: authHeader() });
    }

    updateUserInfo(formData) {
        return axios.put(API_URL + 'account/update', formData, { headers: authHeader() });
    }

    getUserPfp(id) {
        return axios.get(API_URL + 'account/image?id=' + id, { headers: authHeader() });
    }

    getImagePostLink(id) {
        return API_URL + 'api/post/image?id=' + id;
    }
    getUserPfpLink(id) {
        return API_URL + 'account/image?id=' + id;
    }

    deletePost(id) {
        return axios.delete(API_URL + 'api/post/delete?id=' + id, { headers: authHeader() });
    }

    postDeleteService(id) {
        return axios.post(API_URL + 'api/mod/delete?id=' + id, { headers: authHeader() });
    }

}

export default new UserService();