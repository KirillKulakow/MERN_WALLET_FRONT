import React from 'react'
import style from "./Currency.module.css";


const CurrencyTable =({el, index}) => {

    return (
        <li className={style.exData} key ={index}>
          <div className={style.exItem}>{`${el.currency}`}</div>
          <div className={style.exItem}>{`${Number(el.purchaseRate).toFixed(2)}`}</div>
          <div className={style.exItem}>{`${Number(el.saleRate).toFixed(2)}`}</div>
        </li>
      );
}

export default CurrencyTable