import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './landing-logo.svg';
import klogo from './k-logo.svg';
import decoLogo from './deco-logo.svg';
import iconCoding from './icon-coding.svg';
import iconUi from './icon-ui.svg';
import iconDesign from './icon-design.svg';
import titleMarkLeft from './title-mark-left.svg';
import titleMarkRight from './title-mark-right.svg';
import menuIcon from './menu-icon.svg';
import data from './portfolio.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      portfolio: [],
      portfolioCategory: "all",
      opacity: 0,
      display: false
     };
     this.scrollTo = this.scrollTo.bind(this);
     this.scrollStep = this.scrollStep.bind(this);
     this.renderPortfolio = this.renderPortfolio.bind(this);
     this.setCategory = this.setCategory.bind(this);
     this.showMenu = this.showMenu.bind(this);
  }
  componentDidMount(){
    this.setState({
      portfolio: data.data
    });
  }
  scrollStep(tarele) {
    console.log(window.document.documentElement.offsetHeight);
    let tar = ReactDOM.findDOMNode(this.refs[tarele]);
    var target = tar.offsetTop-100;
    console.log(target);
    if (Math.abs(window.pageYOffset - target) < 5) {
      clearInterval(this.state.intervalId);
      console.log("test");
    }else if((window.pageYOffset>=(window.document.documentElement.offsetHeight-window.innerHeight))&&(target-window.pageYOffset>0)){
      clearInterval(this.state.intervalId);
    }else if((window.pageYOffset==0)&&(target-window.pageYOffset<0)){

    }
    window.scroll(0, window.pageYOffset + ((target-window.pageYOffset>0)?5:-5));
  }
  scrollTo(target) {
    let intervalId = setInterval(() => this.scrollStep(target), 1);
    if(this.state.display==true){
      window.document.body.style.overflow = "auto";
      this.setState({opacity: 1}, () => {
          this.timeout = setInterval(() => {
            this.setState({opacity:this.state.opacity-0.05});
            if(this.state.opacity==0||this.state.opacity<0){
              clearInterval(this.timeout);
              this.setState({display: false});
            }
          },1);
      });
    }
    this.setState({ intervalId: intervalId });
  }
  setCategory(e){
    this.setState({
      portfolioCategory: e.target.value
    });
  }
  renderPortfolio(){
    var renderArr = this.state.portfolio.slice();
    for(var i=0;i<renderArr.length;i++){
      let check=0;
      for(var j=0;j<renderArr[i].type.length;j++){
        if(renderArr[i].type[j]==this.state.portfolioCategory)check++;
      }
      if(this.state.portfolioCategory=="all")check++;
      if(check==0){
        renderArr.splice(i,1);
        i--;
      }
    }
    if(renderArr.length==0){
      return (
        <div className="col-md-12" style={{height: 450}}>
          <h3 style={{textAlign: "center",lineHeight: "450px",fontSize: 21,color: "gray"}}>暫無資料!</h3>
        </div>
      );
    }else{
      return renderArr.map((item,index) => (
        <div className="col-md-4">
          <div className="portfolio-block">
          <div className="preview-img" style={{backgroundImage: "url("+item.img+")"}} />
          <h5 className="project-title">{item.title}</h5>
          <p className="project-description">{String(item.description).split('#br').map(i => { return <p>{i}</p> })}</p>
          <div className="project-detail-btn">
            {(item.hasCode) && (<a href={item.codeLink} target="_blank"><button className={item.hasDemo?"outline":""}>原始碼</button></a>)}
            {(item.hasDemo) && (<a href={item.demoLink} target="_blank"><button>{item.demoTitle?item.demoTitle:"線上Demo"}</button></a>)}
          </div>
          </div>
        </div>
      ));
    }
  }
  showMenu(event){
    console.log('test');
    this.setState({display: true});
    window.document.body.style.overflow = "hidden";
    this.setState({opacity: 0}, () => {
        this.timeout = setInterval(() => {
          this.setState({opacity:this.state.opacity+0.05});
          if(this.state.opacity==1||this.state.opacity>1){
            clearInterval(this.timeout);
          }
        },1);
    });
  }
  render() {
    return (
      <div className="App">
        <div className="mobile-link" style={{display: (this.state.display)?"table":"none",opacity: this.state.opacity}}>
          <div>
          <a onClick={() => this.scrollTo('studio-feature')}>服務內容</a>
          <a onClick={() => this.scrollTo('portfolio')}>作品集</a>
          <a onClick={() => this.scrollTo('contactus')}>聯絡我們</a>
          </div>
        </div>
        <div className="App-header">
        <img onClick={this.showMenu} src={menuIcon} className="menu-icon" />
          <img src={klogo} className="header-logo" alt="logo" />
          <div className="Link-area">
            <div>
              <a onClick={() => this.scrollTo('studio-feature')}>服務內容</a><div className="sperator"></div>
              <a onClick={() => this.scrollTo('portfolio')}>作品集</a><div className="sperator"></div>
              <a onClick={() => this.scrollTo('contactus')}>聯絡我們</a>
            </div>
          </div>
        </div>
        <div className="App-body container">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="studio-intro">
            Ms.300k是以三個大學志同道合的同學組成，提供各類網站與管理系統、平台開發、手機APP、網站優化等等，從UI到產品開發使客戶擁有良好的外包體驗，雖是大學生但我們積極進取且富有責任心，我們有十足的把握完成每位顧客的需求。
          </p>
          <h5 className="titleDeco studio-feature-title"><p>服務內容</p></h5>
          <div className="studio-feature row" ref="studio-feature">
            <div className="col-md-4">
              <img src={iconCoding} className="Feature-icon"/>
              <h5>網頁/軟體開發</h5>
              <p>
                網站＆軟體一條龍服務，從UI設計到架設開發，從提案 -> 報價 -> 簽約製作 -> 視覺設計 -> 前後端程式與資料庫開發 -> 上線驗收->成品提交，全套流程一次包辦。
              </p>
            </div>
            <div className="col-md-4">
              <img src={iconUi} className="Feature-icon"/>
              <h5>UI設計</h5>
              <p>
                UI視覺設計，提供客製化的設計及切版，無論網站及APP皆提供客製化產品視覺諮詢及設計，使客戶在良好的溝通下獲得滿意的視覺體驗。
              </p>
            </div>
            <div className="col-md-4">
              <img src={iconDesign} className="Feature-icon"/>
              <h5>平面/Logo設計</h5>
              <p>
                客製化的平面視覺設計，替您量身打造屬於您的品牌視覺，包括平面DM、海報，網頁廣告、Banner，品牌Logo、名片，甚至是一整套的品牌識別設計，都能替您服務。
              </p>
            </div>
          </div>
          <div className="portfolio" ref="portfolio">
            <h5 className="titleDeco"><p>作品集</p></h5>
            <select className="portfolio-filter" onChange={this.setCategory}>
              <option value="all">全部</option>
              <option value="web">網頁/軟體開發</option>
              <option value="ui">UI設計</option>
              <option value="design">平面/Logo設計</option>
            </select>
            <div className="portfolio-display row">
              {this.renderPortfolio()}
            </div>
          </div>
          <div className="contactus" ref="contactus">
            <h5 className="titleDeco"><p>聯絡我們</p></h5>
            <div className="contactus-area">
              <img src={decoLogo} className="deco-img"/>
              <p>電子信箱(歡迎來信詢價)</p>
              <a href="mailto:ms300kstudio@gmail.com">ms300kstudio@gmail.com</a>
              <p>518外包網</p>
              <a href="https://case.518.com.tw/workroom-index-4285411.html">https://case.518.com.tw/workroom-index-4285411.html</a>
            </div>
          </div>
        </div>
        <div className="footer">
          ®2018 Ms.300K Studio. All Rights Reserved.
          <div className="kbar"></div>
        </div>
      </div>
    );
  }
}

export default App;
