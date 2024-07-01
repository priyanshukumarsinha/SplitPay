import React, { useEffect } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'

const ErrorComponent = ({error, widthLength, setError, setWidthLength}) => {
    useEffect(() => {
      let i = 100
      setInterval(() => {
          setWidthLength(`${i--}%`);
      }, 20)

      clearInterval();

      setTimeout(() => {
          setError('');
          setWidthLength('100%');
      }, 2000);

      clearTimeout();
    }, [error]);


    useEffect(() => {
        document.getElementById('errorLoader').style.width = widthLength
    }, [widthLength]);

  return (
    <div className= {`rounded-lg bg-errorMsg absolute top-0 right-0 flex flex-col items-end  ${error==''? 'hidden' :''}`}>
            <div className='p-5 flex justify-end items-center gap-10 px-10 transition-all ease-out'>
                <MdErrorOutline />
                An error occured : {error}
                <VscError />
                
            </div>
            <div id='errorLoader' className={`p-[2px] bg-red-700`}></div>
    </div>
  )
}

export default ErrorComponent