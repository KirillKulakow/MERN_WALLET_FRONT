import React, { useState, useEffect } from "react";
import style from "./Currency.module.css";
import moment from "moment";
import axios from "axios";
import CurrencyTable from './CurrencyTable'


const Currency = () => {

  const requestCurrencyURL = `https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/exchange_rates?json&date=${moment(
  Date.now()
).format("DD.MM.yyyy")}`;

  const [arrayOfExchange, setArrayOfExchange] = useState([]);
  const [loader, setLoader] = useState(false)
  

    const getData = async() => 
    {try 
      {
      const res = await axios.get(requestCurrencyURL)
      setArrayOfExchange([...arrayOfExchange, ...res.data.exchangeRate])} 
      catch (e) {
        console.log(e);
      } finally {setLoader(false)}
    }

    useEffect(() => {
      setLoader(true)
      getData()
    }, [])

  const currencyArray = arrayOfExchange.filter(el => 
    el.currency === "EUR" ||
   el.currency === "USD" ||
   el.currency === "RUB" ||
   el.currency === "PLZ"
   )

 


  return (
    <div className={style.wrapper}>
      <div className={style.exchange}>
        <div className={style.exHead}>
          <p className={style.exHeadText}>Валюта</p>
          <p className={style.exHeadText}>Покупка</p>
          <p className={style.exHeadText}>Продажа</p>
        </div>
        {loader && <div className={style.lds_ring}><div></div><div></div><div></div><div></div></div>}
        <ul>
        {/* <Suspense fallback={<p>...Loading</p>}> */}
       
          {!loader &&
          currencyArray.map((el, index) => 
            <CurrencyTable el={el} key={index} index={index}/>
            
          )} 
          {/* </Suspense> */}

        </ul>
      </div>

      <div className={style.chart}>
      </div>
    </div>
  );
};

export default Currency;
