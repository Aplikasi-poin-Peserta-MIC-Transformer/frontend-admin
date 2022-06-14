import axios from 'axios'

const API_URL = "http://103.161.184.8/api/v1";

export const GET = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${API_URL}/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}

export const POST = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${API_URL}/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}

export const PUT = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.put(`${API_URL}/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}

export const DELETE = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}
