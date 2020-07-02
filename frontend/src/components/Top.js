import React, { useState,useEffect } from 'react'
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import queryString from 'query-string'
import LazyLoad from 'react-lazyload'
import {
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet'
import './stylus/top.styl'
import Search from './subcomponents/Top/Search'
import Categories from './subcomponents/Top/Categories'
import Pager from './subcomponents/Top/Pager'
import Tags from './subcomponents/Top/Tags'
import AdsCard from './AdsCard.js'


// Top
const Top = (props) => {

  const [isLoaded,setIsLoaded] = useState(false)
  const [category,setCategory] = useState("")
  const [data,setData] = useState()
  const [loadContent,setLoadContent] = useState(false)
  const location = useLocation()

  // 初回ロードとGETパラメータ遷移の対応
  useEffect(
    () => {
      // APIを叩きにいく関数
      async function fetchData(){
        //
        let query = location.search
        let qs = queryString.parse(query)
        setCategory(qs.categories ? qs.categories : "トップ")
        const res = await fetch('/spa/1.0/article/?field=body&field=index&field=meta&field=related_posts&'+query.slice(1))
        res
          .json()
          .then(
            res => {
              setData(res)
              setIsLoaded(true)
            }
          )
          .catch(err => console.log(err))

      }
      fetchData()
    },
    [location]
  )
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


  if(isLoaded){
    let list = data.results.slice();
      return(
        <div className="content-root">
          <Helmet
            title={"nullab | " + category}
            meta={[
              {name:"description",content:"自称フルスタックエンジニアが運営するブログ"}
            ]}
          />
          {/*  検索 */}
          <Search />
          {/*  カテゴリ表示 */}
          <Categories />
          {/*リスト表示 */}
          <ArticleList list={list} />
          {/*ページャー */}
          <Pager
            current={data.current}
            next={data.next}
            prev={data.previous}
            last={data.last}
            />
          <AdsCard />
        </div>
      );
    } else {
        return(
          <div className="null-field">
            <Helmet>
              <title>
                nullab | トップ
              </title>
            </Helmet>
          </div>
        );
    }

}
export default Top

const ArticleList = (props) =>  {
  const items = props.list.map(
    (item,index) => <Card
                      id={item.pk}
                      key = {index}
                      title = {item.title}
                      thumbnail = {item.thumbnailUrl}
                      pub_date = {item.pubDate}
                      tags = {item.tags}
                      />
                    )
  return(
    <div className="card-container">
      {items}
    </div>
  )
}
const Card= (props) => {
  let dt = moment(props.pub_date);
  return(
    <article className="card">
      <Link to={"/article/"+props.id}>
      <div className="card-link-field">
        <div className="card-thumbnail-container">
          <LazyLoad>
            <img className="card-thumbnail" src={props.thumbnail} />
          </LazyLoad>
        </div>
        <div className="card-date" >{dt.format("YYYY/MM/DD HH:mm:ss")}</div>
        <div className="card-title">{props.title}</div>
      </div>
      </Link>

      {
        props.tags != undefined &&
          <div className="card-lower">
            <Tags tags={props.tags} />
          </div>
      }

    </article>
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
