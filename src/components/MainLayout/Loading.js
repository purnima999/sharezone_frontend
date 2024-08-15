import React from 'react';
import loading from '../../images/loadinganim.gif';
import { useSelector } from 'react-redux';

export default function Loading() {

  const layOutLoading = useSelector((state) => state?.utilityCallFunctionSlice?.isLoading);
  
  return (
    <>
      {layOutLoading && < div className="al_mainLoading" >
        <img src={loading} alt="loading" />
      </div >}
    </>
  )
}
