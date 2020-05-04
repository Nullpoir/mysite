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

// Top
const Top = (props) => {

  const [isLoaded,setIsLoaded] = useState(false)
  const [category,setCategory] = useState("")
  const [data,setData] = useState()
  const location = useLocation()

  useEffect(
    () => {
      // APIを叩きにいく関数
      async function fetchData(){
        //
        let query = location.search
        let qs = queryString.parse(query)
        let category = qs.categories ? qs.categories : "トップ"
        console.log(category)
        setCategory(category)
        const res = await fetch('/spa/1.0/article/?field=body&field=index&field=meta&'+query.slice(1))
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


  if(isLoaded){
    let list = data.results.slice();
    let tString = "nullab | " + {category}
      return(
        <div className="content-root">
          <Helmet
            title={tString}
            meta={[
              {name:"description",content:"自称フルスタックエンジニアが運営するブログ"}
            ]}
          />
          {/*  検索 */}
          {/*リスト表示 */}
          <ArticleList list={list} />
          <Link to='/?ff=ffa' >あ</Link>

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
