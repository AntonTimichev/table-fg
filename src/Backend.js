
export default url => {
  return new Promise((success, fail) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', url, true);

    xhr.addEventListener('load', () => {
      xhr.status >= 200 && xhr.status < 400
        ? success(xhr.response)
        : fail(new Error(`Request Failed: ${xhr.statusText}`));
    });

    xhr.addEventListener('error', () => {
        fail(new Error('Network Error'));
    });

    xhr.send();
  });
};
