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
    return <li key={this.props.index}> <b>{queryAddress}</b>, ({lat}, {lng}) <br /> {formatted_Address} </li>
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

    //console.log('[render]',this.state);

    return this.state.data.map((item, index) => {
      return <HistoryItem item={item} key={index}/>
    }) 

  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  async search () {
    let input = this.state.input;
    let  url = getApiUrl() + `/api/search?address=${input}`;
    let { data } = await axios.get(url);
    this.history.getHistory();
    console.log(data);
  }


  handleChange(event){
    //console.log(event.target.value);
    let value = event.target.value;
    this.setState({input: value});
  }

  setHistory(history){
    this.history = history;
  }

  render(){
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <h2 className="ui teal image header">
            <i className="hand spock icon"></i>
            <div className="content">
              Search for food
            </div>
          </h2>
          <div className="ui action input">
            <input type="text"
              onChange={this.handleChange.bind(this)} />
            <button className="ui blue button"
              onClick={this.search.bind(this)}>
              search
            </button>
          </div>
          <div className="ui horizontal divider">
            Places  
          </div>
          <History ref={this.setHistory.bind(this)} />
        </div>
      </div>
    )
  }

}

// 將 App 元件載入 root element 裡頭
ReactDOM.render(
  <App />,
  document.getElementById('root')
)