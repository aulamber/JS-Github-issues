export const post = (url, data) => {
  // Default options are marked with *
  const options = {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  };

  return fetch(url, options).then(response => response.json()); // parses response to JSON
};

export const get = url => {
  return fetch(url, { headers: { 'Accept-Encoding': 'gzip' } });
};
