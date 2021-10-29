import * as React from 'react'
import Layout from '../components/Layout'
import {contactName, container, description, info, name, title,map} from '../styles/contacts.module.css'
import MyMap from '../components/MyMap'

export default function ContactsPage() {
  return (
    <Layout>
      <section className={container}>
        <div className={description}>
          <h3 className={title}>Контактная информация</h3>
          <div className={contactName}>Наш адрес:</div>
          <p className={info}>220073, Республика Беларусь<br/>г. Минск ул. Гусовского 2а</p>
          <div className={contactName}>Телефон:</div>
          <p className={info}>+375 (17) 202-23-06<br/>+375 (17) 202-23-52<br/>+375 (29) 662-30-04</p>
          <div className={contactName}>Email:</div>
          <p className={info}>info@ecosiprom.com</p>
          <p className={name}>ООО "Экосипром"</p>
        </div>
        <div className={map}>
          <MyMap />
        </div>
      </section>
    </Layout>
  )
}
