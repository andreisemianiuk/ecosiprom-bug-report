import React from 'react'
import {container, item, itemInfo} from '../styles/contactHeader.module.css'

export const ContactHeader = () => {
  return (
    <div className={container}>
      <div className={item}>
        <div className={itemInfo}>220073 г. Минск ул. Гусовского 2а</div>
      </div>
      <div className={item}>
        <div className={itemInfo}>
          +375 (29) 662-30-04<br/>+375 (17) 275-23-06
        </div>
      </div>
    </div>
  )
}