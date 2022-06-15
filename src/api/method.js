import axios from 'axios'

const URL = "https://api-poin-peserta.herokuapp.com/api/v1";
// const URL = "http://localhost:3000/api/v1";

export const GET = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${URL}/${path}`, body)
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
    axios.post(`${URL}/${path}`, body)
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
    axios.put(`${URL}/${path}`, body)
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
    axios.delete(`${URL}/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}
