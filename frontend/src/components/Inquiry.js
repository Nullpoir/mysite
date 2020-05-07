import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import queryString from 'query-string'
import {
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-v3'
import { ReCaptcha } from 'react-recaptcha-v3'
import { Helmet } from 'react-helmet';
import './stylus/inquiry.styl'

const Inquiry = (props) => {
  const history = useHistory()
  const [name,setName] = useState("")
  const [ipaddr,setIpaddr] = useState("")
  const [email,setEmail] = useState("")
  const [text,setText] = useState("")
  const [loadContent,setLoadContent] = useState(false)

  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  // 問合せAPIへPOST
  const postInquiry = (body) => {
    return fetch("/sys/1.0/inquiry/",
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(body),
      }
    );
  }
  // CSRFToken取得
  const getCookie = (n) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does cookie string begin with the name we want?
            if (cookie.substring(0, n.length + 1) === (n + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(n.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = "";
    if(name == ""){
      err = err + "お名前をご記入ください\n";
    }

    if(text == ""){
      err = err + "本文をご記入ください\n";
    }

    if((email.indexOf("@") == -1) && (email != "") ){
      err = err + "メールアドレスを正しいフォーマットで入力してください。\n";
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
      postInquiry(body);
      history.push("/");
    } else {
      return 0;
    }
  }

  const handleChange = (e) => {
    let value = e.target.value
    let clsName = e.target.className
    switch (clsName) {
      case 'name-field':
        setName(value)
        break
      case 'email-field':
        setEmail(value)
        break
      case 'text-field':
        setText(value)
        break
      default:
        break
    }
  }

  // ReCaptcha&サイドバー設定
  useEffect(
    () => {
      if(!loadContent){
        props.setSideContent((<SideContent />))
        setLoadContent(true)
      }
      loadReCaptcha("6LfR274UAAAAAMqfUOht9Qzt_AVMnhCepg7JkLjU")
    },
    []
  )


  return(
    <div>
      <Helmet>
        <title>
          nullab | お問い合わせ
        </title>
      </Helmet>
      <h2 className="head">お問い合わせフォーム</h2>
      <form className="form" onSubmit={(e) => {handleSubmit(e)}}>
        <label>お名前</label>
        <input
          className="name-field"
          placeholder="名前（必須）"
          onChange={handleChange}
          />
        <label>メールアドレス（任意）</label>
        <input
          className="email-field"
          placeholder="メール（任意）"
          onChange={handleChange}
        />
        <label>本文</label>
        <textarea
          className="text-field"
          placeholder="本文（必須）"
          onChange={handleChange}
        />
        <div className="submit-container">
          <button className="submit" name="submit" >送信</button>
        </div>
      </form>

      <ReCaptcha
          sitekey="6LfR274UAAAAAMqfUOht9Qzt_AVMnhCepg7JkLjU"
          action='homepage'
          verifyCallback={verifyCallback}
      />
    </div>
  );
}

const SideContent = (props) => {
  const content = (
    <div>
      <h2>自己紹介</h2>
      名前：ぬるぽいんた<br/>
      自称フルスタックエンジニア＆スローループマイスター<br/>
    </div>
  )
  return(content)
}

export default Inquiry
