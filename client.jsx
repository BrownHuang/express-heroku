const axios = require('axios'); //axios 輕量化的 request 套件 (方便快速載入)

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;  //http://127.0.0.1:3000 (依瀏覽器環境而改變)
}

const getHistory = () => {
  let url = getApiUrl() + '/api/history/';
  axios.get(url).then((result) => {
    console.log(result.data)
  });
}

getHistory();