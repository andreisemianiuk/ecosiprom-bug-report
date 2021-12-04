import React from 'react'
import {container,item,itemTitle,itemInfo} from '../styles/contactHeader.module.css'

export const ContactHeader = () => {
  return (
    <div className={container}>
      <div className={item}>
        {/*<span className={itemTitle}>Наш адрес</span>*/}
        <div className={itemInfo}>220073 г. Минск ул. Гусовского 2а</div>
      </div>
      <div className={item}>
        {/*<span className={itemTitle}>Позвоните нам</span>*/}
        <div className={itemInfo}>
          +375 (29) 662-30-04<br/>+375 (17) 275-23-06
        </div>
      </div>
      {/*<div className={item}>*/}
      {/*  <span className={itemTitle}>График работы</span>*/}
      {/*  <div className={itemInfo}>пн-пт: 09.00 - 18.00,<br/>сб-вс: выходной</div>*/}
      {/*</div>*/}
    </div>
  )
}