import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import css from 'styled-jsx/css'
import {inquiry_style} from "./styles/inquiry-styles.js";
import AdsCard from './AdsCard.js'
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReCaptcha } from 'react-recaptcha-v3'
import { Helmet } from 'react-helmet';

class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ipaddr: '',
      email: '',
      text: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    let name = ReactDOM.findDOMNode(this.refs.name).value;
    let email = ReactDOM.findDOMNode(this.refs.email).value;
    let text = ReactDOM.findDOMNode(this.refs.text).value;

    let err = "";
    if(name == ""){
      err = err + "お名前をご記入ください\n";
    }

    if(text == ""){
      err = err + "本文をご記入ください\n";
    }

    if((email.indexOf("@") == -1) && (email != "") ){
      err = err + "正しいフォーマットで入力してください。\n";
    }

    if(err != ""){
      alert(err);
      return 0;
    }

    let body = {
      name: name,
      email: email,
      text: text,
    }
    // console.log(body);
    let result = confirm("送ってもよろしいでしょうか？");
    if(result){
      this.postInquiry(body);
      this.props.history.push("/");
    } else {
      return 0;
    }
  }

  postInquiry(body){
    return fetch("/sys/1.0/inquiry/",
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": this.getCookie("csrftoken"),
        },
        body:JSON.stringify(body),
      }
    );
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  componentDidMount() {
    loadReCaptcha("6LfR274UAAAAAMqfUOht9Qzt_AVMnhCepg7JkLjU");
  }

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>
            nullab | お問い合わせ
          </title>
        </Helmet>
        <h2>お問い合わせフォーム</h2>
        <form className="form" onSubmit={(event) => {this.handleSubmit(event);}}>
          お名前<br />
          <input
            className="name-field"
            ref="name"
            placeholder="名前（必須）"
            />
          メールアドレス（任意）<br />
          <input
            className="email-field"
            ref="email"
            placeholder="メール（任意）"
          />
          本文<br />
          <textarea
            className="text-field"
            ref="text"
            placeholder="本文（必須）"
          />
          <div className="submit-container">
            <button className="submit" name="submit" >送信</button>
          </div>
        </form>

        <ReCaptcha
            sitekey="6LfR274UAAAAAMqfUOht9Qzt_AVMnhCepg7JkLjU"
            action='homepage'
            verifyCallback={this.verifyCallback}
        />
        <style jsx>{inquiry_style}</style>
      </div>
    );
  }
}

export default withRouter(Inquiry);
