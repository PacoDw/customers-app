export const apiGet = url => () => fetch(url).then(r => r.json())

export const apiPut = (url, id, obj) => () =>
  fetch(`${url}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: new Headers({ "Content-type": "application/json" })
    }
  )
    .then(res => res.json())
    .then(r => {
      if (r.error) {
        return Promise.reject(r.validation);
      }
    })