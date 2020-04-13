import React, { useEffect } from 'react';
import {ads_style} from "./styles/ads-styles.js";

export default function AdsCard(props) {
    useEffect(() => {
        if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
            window.adsbygoogle.push({});
        }
    }, [])

    return (
      <div className="ads-container">
        <ins className="adsbygoogle"
             data-ad-client="ca-pub-3503565180676807"
             data-ad-slot="3527053338"
             data-ad-format="auto"
             data-full-width-responsive="true"
             >
        </ins>
        <style jsx>{ads_style}</style>
      </div>
    );
}
