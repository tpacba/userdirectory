import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=5&nat=us";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  results: function() {
    return axios.get(BASEURL);
  }
};
