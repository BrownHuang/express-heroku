const axios = require('axios'); //axios 輕量化的 request 套件 (方便快速載入)
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;  //http://127.0.0.1:3000 (依瀏覽器環境而改變)
}

/*
const getHistory = () => {
  let url = getApiUrl() + '/api/history/';
  axios.get(url).then((result) => {
    console.log(result.data)
  });
}
*/

const getHistory = async () => {
  let url = getApiUrl() + '/api/history/';
  let { data } = await axios.get(url);
  console.log('data:', data)
}

getHistory();

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <Hello name="ggm" />,
  document.getElementById('root')
)