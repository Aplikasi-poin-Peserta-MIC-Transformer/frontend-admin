import axios from 'axios'

export const GET = (path, body) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`/${path}`, body)
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
    axios.post(`/${path}`, body)
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
    axios.put(`/${path}`, body)
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
    axios.delete(`/${path}`, body)
      .then((result) => {
        resolve(result.data);
      }, (err) => {
        reject.apply(err);
      })
  })
  return promise
}
