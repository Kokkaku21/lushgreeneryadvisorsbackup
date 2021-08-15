import render from 'dom-serializer';
import React from 'react';
import Helmet from 'react-helmet';

function Title({title}) {
    var defaultTile = "Lush Greenery Financial";
    return(
        <Helmet>
            <meta charSet='utf-8'/>
            <title>{title ? title : defaultTile}</title>
        </Helmet>
    )
}

export default Title;