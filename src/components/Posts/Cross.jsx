import CrossPost from '../../assets/post-cross.png'

import React from 'react'

const Cross = () => {
  return (
    <img
          src={CrossPost}
          alt="Creative Graveyard Logo"
          className="h-13 w-13 object-contain "
          draggable="false"
        />
  )
}

export default Cross