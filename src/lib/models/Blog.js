import axiosClient from "@/axios-client"

const getAll = (callback) => {

}

const get = (id, callback, filters = {}) => {
  axiosClient
    .get(`/blogs/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status === 404) {
        // return 404
      }
    })
}

const update = (id, data, callback) => {

}

const create = (data, callback) => {

}

export { getAll, get, update, create }