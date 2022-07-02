import React from 'react';
import ReactDOM from 'react-dom/client';
import {isMobile} from 'react-device-detect';
import Cookies from 'universal-cookie';

import './index.css';
import reportWebVitals from './reportWebVitals';

import bgVideo from './bgv.mp4';

fetch('https://linzomarket.ru/analytics.php');
const cookies = new Cookies();

function jump(h){
    var url = window.location.href;
    window.location.href = "#"+h;
    window.history.replaceState(null,null,url);
}

class UserInput extends React.Component {
  onTodoChange(value) {
    this.setState({val: value});
  }
  constructor(props) {
    super(props);

    this.state = {
      val: props.default ? props.default : "",
      clicked: false
    }

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.state.clicked)
      this.setState({
        clicked: true,
        val: this.props.clickval ? this.props.clickval : ""
      })
  }
  render() {
    return <input type="text" value={this.state.val} onChange={e => {
      this.onTodoChange(e.target.value);
      if (this.props.onChange) this.props.onChange(e.target.value);
    }}
    onClick={this.handleClick} onFocus={this.handleClick}></input>
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class VideoBackground extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
     return (
       <div class="background-video">
        <div class="bg-nofade">
          <video autoPlay loop muted src={this.props.src}></video>
        </div>
         <div class="bg-fade">
           <video autoPlay loop muted src={this.props.src}></video>
         </div>
         <div class="bg-tint"></div>
       </div>
     )
  }
}

class Website extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Иван",
      email: "ivan@yandex.ru",
      phone: "+7" + randint(423000000, 424999999),
      msg: "Здравствуйте!\n\n"
    }
  }
  setStateCallback(st) {
    this.setState(st);
  }
  render() {
    return (
      <div className="baseApp">
        <VideoBackground src={bgVideo} />
        <div className="app">
          <div className="header">
            <div className="header-logo">
              <h1>Линзомаркет<p>сеть торговых автоматов</p></h1>
            </div>
            <div className="header-buttons">
              <div className="header-button" style={{"marginRight": "0", "borderRight": "1px solid #c8cac8", width: "220px"}} onClick={()=>{jump("locations")}}><p>Расположение автоматов</p></div>
              <div className="header-button" onClick={()=>{jump("contacts")}}><p>Связаться с нами</p></div>
              <div className="header-button" onClick={()=>{jump("item-display")}}><p>Каталог товаров</p></div>
              {cookies.get("nomobile") ? <div style={{background: "#d9b77e", width: "200px", fontSize: "24pt", fontWeight: "700", maxHeight: "8vh"}} className="header-button" onClick={()=>{window.location.href = "/m"; cookies.remove("nomobile")}}><p>Вернуться в мобильную версию</p></div> : null}
            </div>
          </div>
          <div className="contents">
            <div className="locations" id="locations">
              <h1>Расположение автоматов</h1>
              <div className="grid1">
                <div className="text-address-list">
                  <ul>
                    <li>ТЦ "МОРЕ" - Некрасовская 49а, 1 этаж</li>
                    <li>Супермаркет "Яппи" - Некрасовская 76</li>
                    <li>ТВК "Калина Молл" - Калинина 8. -1 этаж</li>
                    <li>Супермаркет "Реми сити" - Народный пр. 20</li>
                    <li>"Луговая ПЕРЕХОД" - 3 этаж</li>
                    <li>Супермаркет "Реми" - Деревенская 16</li>
                    <li>Супермаркет "Реми" - Борисенко 25</li>
                    <li>ТЦ "Первореченский" - пр-т Острякова 13, 1 этаж</li>
                    <li>ТЦ "Березка" - Русская 16, 1 этаж</li>
                  </ul>
                </div>
                <div className="map"><iframe className="embedmap" src="https://www.google.com/maps/d/embed?mid=1ExTNSvrrlI0bcIrkJ7G4Oep8uJ60uto&hl=en&ehbc=2E312F" width="640" height="480"></iframe></div>
              </div>
            </div>
            <div className="item-display" id="item-display">
              <h1>Каталог товаров</h1>
              <div className="items">
                <div className="items-cont">
                  <div className="item oasys"><p className="itemtitle">Acuvue Oasys</p><p className="itemdesc">Любая диоптрия<br/><span className="price">Цена: 2000</span></p></div>
                  <div className="item oasys1day"><p className="itemtitle">Acuvue Oasys 1Day</p><p className="itemdesc">Любая диоптрия<br/><span className="price">Цена: 2500</span></p></div>
                  <div className="item moist"><p className="itemtitle">Acuvue Moist</p><p className="itemdesc">Любая диоптрия<br/><span className="price">Цена: 2200</span></p></div>
                  <div className="item trueye"><p className="itemtitle">Acuvue TruEye</p><p className="itemdesc">Любая диоптрия<br/><span className="price">Цена: 2500</span></p></div>
                </div>
              </div>
            </div>
            <div className="contacts" id="contacts">
              <h1>Контакты</h1>
              <p>Телефон: +79024888465 или +79025061011<br/>Почта: linzomarket.vl@mail.ru</p>
            </div>
            <div className="contactform">
              <h1>Форма обратной связи</h1>
              <div className="c-form">
                <p>Также вы можете связаться с нами через сайт.</p>
                <p>Ваше имя: <UserInput default={this.state.name} onChange={e => this.setState({name: e})}/><br/>
                Ваша почта: <UserInput default={this.state.email} onChange={e => this.setState({email: e})}/><br/>
                Ваш номер телефона: <UserInput default={this.state.phone} clickval="+7" onChange={e => this.setState({phone: e})}/><br/>
                Ваше сообщение:<br/><textarea id="c-form-msg" onChange={e => this.setState({ msg : e.target.value })}>{this.state.msg}</textarea><br/>
                <button onClick={() => {
                  if (this.state.name == "") {
                    alert("Введите имя!");
                    return;
                  }
                  if (this.state.msg == "") {
                    alert("Введите сообщение!")
                    return;
                  }
                  let uri_ = "https://linzomarket.ru/message.php?name="+window.encodeURIComponent(this.state.name)+"&msg="+window.encodeURIComponent(this.state.msg);
                  if (this.state.email != "") uri_ += "&email="+window.encodeURIComponent(this.state.email);
                  if (this.state.phone != "") uri_ += "&phone="+window.encodeURIComponent(this.state.phone);
                  fetch(uri_).then(response => response.json())
                  .then(data => this.setState({response: data['info']}));
                }}>Отправить!</button></p>
                <p className="response-msg">{this.state.response}</p>
              </div>

            </div>
            <div className="footer">
              <p className="legalinfo">ИП Пустовалова Елена Леонидовна<br/>
              ИНН: 253601234260<br/>
              ОГРНИП: 318253600077455
              </p>
              <p className="designer">designed by <a href="https://blek.codes" target="_blank">blek</a><br/>
              background video by <a href="https://www.youtube.com/channel/UC7nxXZU_UsVrNdeaA5BYEeA">ALL In 4K</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// background by <a href="https://unsplash.com/@konstantinkleine" target="_blank">Konstantin Kleine</a>
if (isMobile && !cookies.get("nomobile")) {
  window.location.href = "/m";
  const root = ReactDOM.createRoot(document.body);
  root.render(
    <React.StrictMode>
      <h1 style={{color: "black"}}>Ваш браузер не поддерживает автоматической переадресации</h1>
      <p style={{color: "black"}}>Нажмите <a href="/m" style={{color: "black"}}>здесь</a>, чтобы перейти на мобильную версию сайта.</p>
    </React.StrictMode>
  );
} else {

  if (cookies.get("cookie_agree") != 'true')  alert("Этот вебсайт использует куки файлы. Все они нужны для обеспечения функционирования сайта, и не используются для сбора персональных данных.\n\nЕсли вы не хотите использовать куки файлы, отключите их в настройках браузера для этого сайта.")
  cookies.set('cookie_agree', 'true', { path: '/' });

  const root = ReactDOM.createRoot(document.body);
  //<div className="text"><p>DEMO</p></div>
  root.render(
    <React.StrictMode>
      <Website/>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
