import React from 'react'
import DashboardVideo from "../utils/Dashboard_bg.mp4"
const Background = () => {


  return (
<>
<div class="absolute w-full ">

<video class="h-screen w-full object-cover" autoPlay loop muted>
            <source src={DashboardVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
</div>
</>
  )
}

export default Background