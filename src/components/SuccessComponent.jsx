import React, { useEffect } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'

const SuccessComponent = ({success, widthLength, setSuccess, setWidthLength}) => {
    useEffect(() => {
      let i = 100
      setInterval(() => {
          setWidthLength(`${i--}%`);
      }, 20)

      clearInterval();

      setTimeout(() => {
          setSuccess('');
          setWidthLength('100%');
      }, 2000);

      clearTimeout();
    }, [success]);

    useEffect(() => {
        document.getElementById('successLoader').style.width = widthLength
    }, [widthLength]);

  return (
    <div className= {`rounded-lg bg-successMsg absolute top-0 right-0 flex flex-col items-end  ${success==''? 'hidden' :''}`}>
        <div className='p-5 flex justify-end items-center gap-10 px-10 transition-all ease-out'>
            <MdErrorOutline />
            Success : {success}
            <VscError />
            
        </div>
        <div id='successLoader' className={`p-[2px] bg-green-900`}></div>
    </div>
  )
}

export default SuccessComponent