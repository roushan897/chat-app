import React from 'react';

import {auth} from '../firebase';

const style = {
    button: `bg-gray-200 px-4 py-2 hover:bg-gray-100`
}

const LogOut = () => {
    
  return (
    <button onClick={()=> auth.signOut(auth)} className={style.button}>
      LogOut
    </button>
  )
}

export default LogOut;
