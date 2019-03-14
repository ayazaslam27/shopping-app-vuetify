import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      })
      .then(function() {});
  });
}

function post(url, params, callback) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: { "Content-Type": "application/json" }
      })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      })
      .then(function() {});
  });
}

export default { get, post };
