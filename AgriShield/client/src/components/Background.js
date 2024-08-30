import React from 'react'

const Background = () => {

  const boxes = [];
  for (let i = 0; i < 400; i++) {
    // Adjust the number of boxes as needed
    boxes.push(
      <div
        key={i}
        class=" bg-white md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 hover:bg-gray-300 min-h-14 min-w-14  "
      ></div>
    );
  }

  return (
<>
<div class=" absolute h-72 w-full bg-slate-500  from-[rgba(22,30,248,0.3)] to-[rgba(22,30,248,0.9)]   backscreen"></div>
      <div class="flex flex-wrap justify-evenly items-center gap-y-[2px] gap-x-[2px]  w-full h-full absolute overflow-hidden">
        {boxes}
      </div>
</>
  )
}

export default Background