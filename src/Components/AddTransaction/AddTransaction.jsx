import React, { useState } from "react";
import styles from "./AddTransaction.module.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { asyncAddTransaction } from "../../redux/operations/transactions";
import { validate } from "./validate";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";
import { getFromLocaleStorage } from "../../helpers/storage";

const costCategoryArr = [
  "дом",
  "машина",
  "путешествия",
  "спортзал",
  "образование",
  "подарки",
  "продукты",
  "дети",
  "комуналка",
  "ресторан",
  "техника",
  "аренда",
];
const profitCtegoryArr = ["зарплата", "депозит", "freelance", "роялти"];
const initialState = {
  date: Date.now(),
  category: "",
  sum: "",
  comment: "",
};

const AddTransaction = ({ modalCloser, title }) => {
  const [type, setType] = useState("+");
  const [form, setForm] = useState(initialState);
  const [categiryList, setCategiryList] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const selectHandler = () => {
    setCategiryList(!categiryList);
  };
  const inputHandler = (e) => {
    if (e.target.name === "type") {
      setType(e.target.value);
      setForm(initialState);
      return;
    }
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const changeDate = (date) => {
    setForm({ ...form, date });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const resaltValidate = validate(form);
    if (resaltValidate === "valid") {
      setErrors({});
      const newTransaction = {
        ...form,
        date: `${moment(form.date).format("DD/MM/YYYY")}`,
        // sum: Number(type + form.sum),
        sum: Number(form.sum),
        type: type,
      };

      const token = JSON.parse(
        getFromLocaleStorage("persist:auth-token").token
      );

      dispatch(asyncAddTransaction(newTransaction, token));
      // modalTogle();
      modalCloser();
    } else {
      setErrors(resaltValidate);
    }
  };
  const cloceModal = (e) => {
    if (e.target.title !== "cloce") {
      return;
    }
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modalCloser();        
      }
    });
    modalCloser();
  };

  const buildBtnTitle = (text) => {
    const words = text.split(" ");
    return words[0];
  };

  const { sum, date, category, comment } = form;
  return (
    <div className={styles.Overlay} onClick={cloceModal} title="cloce">
      <div className={styles.Container}>
        <div className={styles.HeadingContainer}>
          <div
            className={styles.CloceModalMobile}
            onClick={cloceModal}
            title="Close"
          ></div>
          <h3 className={styles.FormHeader}>{title}</h3>
          <div
            className={styles.CloceModal}
            onClick={cloceModal}
            title="Close"
          ></div>
        </div>
        <form className={styles.AddingForrm} onSubmit={submitHandler}>
          <fieldset className={styles.MainFormPart}>
            <div className={styles.RadioContainer}>
              <div className={`${styles.FormRadio} ${styles.Profit}`}>
                <input
                  id="profit"
                  type="radio"
                  name="type"
                  value="+"
                  defaultChecked
                  onChange={inputHandler}
                />
                <label htmlFor="profit">Доход</label>
              </div>

              <div className={`${styles.FormRadio} ${styles.Cost}`}>
                <input
                  id="cost"
                  type="radio"
                  name="type"
                  value="-"
                  onChange={inputHandler}
                />
                <label htmlFor="cost">Расход</label>
              </div>
            </div>
            <div className={styles.CategoryContainer}>
              <div
                className={
                  errors.category
                    ? `${styles.InputError} ${styles.Input} ${styles.Category}`
                    : `${styles.Input} ${styles.Category}`
                }
              >
                <p onClick={selectHandler} className={styles.SelectHeading}>
                  {category ? category : "Категория"}
                </p>

                {categiryList && (
                  <div className={styles.CategoryList}>
                    {(type === "+" ? profitCtegoryArr : costCategoryArr).map(
                      (el, index) => (
                        <div
                          key={index}
                          className={
                            type === "+"
                              ? `${styles.FormRadio} ${styles.CategoryProfitRadio} ${styles.CategoryRadio}`
                              : `${styles.FormRadio} ${styles.CategoryCostRadio} ${styles.CategoryRadio}`
                          }
                        >
                          <input
                            id={el}
                            type="radio"
                            name="category"
                            value={el}
                            onChange={inputHandler}
                            onClick={selectHandler}
                          />
                          <label htmlFor={el}>{el}</label>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              {errors.category && (
                <div className={styles.Errors}>
                  <p className={styles.ErrorsText}>{errors.category}</p>
                </div>
              )}
            </div>
            <div className={styles.InputContainer}>
              <div className={styles.SumAndDate}>
                <input
                  type="text"
                  placeholder="0.00"
                  name="sum"
                  defaultValue={sum}
                  onChange={inputHandler}
                  className={
                    errors.sum
                      ? `${styles.InputError} ${styles.Input} ${styles.Sum}`
                      : `${styles.Input} ${styles.Sum}`
                  }
                />
                <div className={`${styles.Input} ${styles.DateContainer}`}>
                  <DatePicker
                    selected={date}
                    onChange={changeDate}
                    locale={ru}
                    dateFormat="dd / MM / yyyy"
                    className={styles.Date}
                  />
                </div>

                {/* <input
									type="date"
									name="date"
									value={date}
									onChange={inputHandler}
									className={styles.Date}
								/>
								<label htmlFor="date">
									<input
										type="text"
									
										className={`${styles.Input} ${styles.DateLabel}`}
									/>
								</label> */}
              </div>
              {errors.sum && (
                <div className={styles.Errors}>
                  <p className={styles.ErrorsText}>{errors.sum}</p>
                </div>
              )}
            </div>

            <label htmlFor="comment">Комментарий</label>
            <textarea
              className={`${styles.Description} ${styles.Input}`}
              name="comment"
              id=""
              cols="30"
              rows="10"
              value={comment}
              onChange={inputHandler}
            ></textarea>
          </fieldset>
          <div className={styles.FormBtnPart}>
            <input
              type="submit"
              className={styles.Btn}
              value={buildBtnTitle(title)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;

AddTransaction.propTypes = {
  modalTogle: PropTypes.func,
  title: PropTypes.string,
};

AddTransaction.defaultProps = {
  title: "добавить транзакцию",
};
