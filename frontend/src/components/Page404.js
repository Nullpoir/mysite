import React, { useEffect,useState } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet';
import './stylus/page404.styl'

const Page404 = ()=> {

  return(
    <div>
      <Helmet>
        <title>
          nullab | お探しのページは存在しません。
        </title>
      </Helmet>

      <div className="page-404">
        お探しのページは存在しません。
      </div>
    </div>
  )
}
export default Page404
