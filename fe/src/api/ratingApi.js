import axiosClient from "./axiosClient";

const ratingApi = {
  getRatingsByCourse: (courseId) => {
    return axiosClient.get(`/course/ratings/${courseId}`);
  },
  addRating: (commentData) => {
    console.log("Data Rating: ", commentData);
    return axiosClient.post("/course/rating/add", commentData);
  },
};

export default ratingApi;