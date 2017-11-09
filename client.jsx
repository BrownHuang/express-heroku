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


class HistoryItem extends React.Component{
  render(){
    const { formatted_Address, lat, lng, queryAddress } = this.props.item;    
    return <li> <b>{queryAddress}</b>, ({lat}, {lng}) <br /> {formatted_Address} </li>
  }

}

class History extends React.Component {

  //生命週期 - 設定初始化狀態
  constructor(props){
    super(props);
    this.state = {
      data:[]
    };
  }

  async getHistory () {
    let url = getApiUrl() + '/api/history/';
    let { data } = await axios.get(url);
    //console.log('data:', data);
    this.setState({ data });
  }

  //生命週期 - component 掛載上去時啟動
  componentDidMount(){
    this.getHistory();
  }

  render() {

    console.log('[render]',this.state);

    return this.state.data.map((item) => {
      return <HistoryItem item = {item}/>
    }) 

  }
}

class App extends React.Component{


  async search () {
    let  url = getApiUrl() + '/api/search?address=總統府';
    let { data } = await axios.get(url);
    console.log(data);
  }

  render(){
    return (
      <div>
        <input type="text"/>
        <button onClick={this.search}> search </button>
        <History />
      </div>
    )
  }

}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <App />,
  document.getElementById('root')
)