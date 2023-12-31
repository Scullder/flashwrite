import axiosClient from "@/axios-client"

const getAll = (callback, filter = {}) => {
  // TODO: transform {obj} filter to {string} query
}

const get = (id, callback, errorCallback,) => {
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
        // errorCallback()
      }
    })
}

const create = (blogData, callback, errorCallback) => {
  const formData = new FormData()

  for (let key in blogData) {
    formData.append(key, blogData[key]);
  }

  axiosClient
    .post('/blogs', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status === 422) {
        errorCallback(response.data.errors)
      }
    })
}

const update = (id, blogData, callback, errorCallback) => {
  const formData = new FormData()

  for (let key in blogData) {
    formData.append(key, blogData[key]);
  }

  axiosClient
    .post(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status === 422) {
        errorCallback(response.data.errors)
      }
    })
}

export { getAll, get, update, create }