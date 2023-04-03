import React, { useEffect, useRef } from 'react'

const Message = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div ref={ref} className='message owner'>
      <div className="messageInfo">
        <img src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg" alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello, Capt!</p>
        <img src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/09/04/4102259019.jpg" alt="" />
      </div>
    </div>
  )
}

export default Message