import React, { useEffect,useState } from 'react'
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import './stylus/privacy.styl'

const Privacy = (props) => {
  const [loadContent,setLoadContent] = useState(false)

  // サイドバーのコンテンツ描画
  useEffect(
    () => {
      if(!loadContent){
        props.setSideContent((<SideContent />))
        setLoadContent(true)
      }
    },
    []
  )
  // プライバシーポリシー
  return(
    <div>
    <Helmet>
      <title>
        nullab | プライバシーポリシー
      </title>
    </Helmet>
        <h2 id="1">プライバシーポリシー</h2>

        <h2 id="2">当サイトに掲載されている広告について</h2>
          当サイトでは、第三者配信の広告サービス（グーグルアドセンス等）を利用しています。
          このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。またGoogleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、<a href="https://policies.google.com/technologies/ads">こちら</a>をクリックしてください。

          <h2 id="3">当サイトが使用しているアクセス解析ツールについて</h2>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは<a href="https://www.google.com/analytics/terms/jp.html">こちら</a>、または<a href="https://policies.google.com/technologies/partner-sites">こちら</a>をクリックしてください。

          <h2 id="4">免責事項</h2>
          当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
    </div>
  )
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


export default Privacy;
