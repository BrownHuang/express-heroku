const axios = require('axios'); //axios 輕量化的 request 套件 (方便快速載入)

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

const getHistory = async () => {
  let url = getApiUrl() + 'api/history/';
  let result = await axios.get(url);
  console.log(result)
}

getHistory();