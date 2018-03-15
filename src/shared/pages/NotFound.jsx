// @flow

import React from 'react'
import Helmet from 'react-helmet'

const title = 'Page Not Found'

export default () => (
  <div>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: 'A page to say hello' }, { property: 'og:title', content: title }]}
    />
    <h1>{title}</h1>
  </div>
)