export function postData(url, data){
  return fetch(url, {
    method: 'POST',
    body: data
  });
}
