import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserTransaction,
  deleteUsersTransaction,
} from "../../redux/operations/transactions";
import styles from "./TableTransactionItem.module.css";
import { getFromLocaleStorage } from "../../helpers/storage";
import { sumParser } from "../../helpers/convertator";

const TableTransactionItem = ({ transaction }) => {
  const { date, type, category, comment, sum, balance, _id } = transaction;
  const [isEditSum, setIsEditSum] = useState(false);
  const [isEditCommentary, setIsEditCommentary] = useState(false);
  const [editFields, setEditFields] = useState({ sum, comment });

  const token = JSON.parse(getFromLocaleStorage("persist:auth-token").token);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setEditFields({ ...editFields, [name]: value });
  };

  const editSum = () => {
    setIsEditSum(true);
  };

  const editCommentary = () => {
    setIsEditCommentary(true);
  };

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter" && e.key !== "Escape") return;

    closeEdit();

    const transaction = {
      sum: editFields.sum,
      comment: editFields.comment,
    };

    dispatch(updateUserTransaction(_id, transaction, token));
  };

  const deleteHandler = () => {
    dispatch(deleteUsersTransaction(_id, token));
  };

  const closeEdit = () => {
    setIsEditSum(false);
    setIsEditCommentary(false);
  };

  return (
    <li
      className={`${styles.tableTransactionItem} ${
        type === "+" ? styles.plus : styles.minus
      }`}
    >
      <div className={`${styles.cell} ${styles.cellDate}`}>
        <p className={styles.cellTitle}>Дата</p>
        <p className={`${styles.cellData} ${styles.date}`}>{date}</p>
      </div>
      <div className={`${styles.cell} ${styles.cellType}`}>
        <p className={styles.cellTitle}>Тип</p>
        <p className={styles.cellData}>{type}</p>
      </div>
      <div className={`${styles.cell} ${styles.cellCategory}`}>
        <p className={styles.cellTitle}>Категория</p>
        <p className={styles.cellData}>{category}</p>
      </div>
      <div
        className={`${styles.cell} ${styles.cellComment} ${styles.editCom}`}
        onClick={editCommentary}
      >
        <p className={styles.cellTitle}>Комментарий</p>
        {isEditCommentary ? (
          <input
            type="text"
            value={editFields.comment}
            name="comment"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.cellDataFieldComment}
            maxLength="40"
            autoFocus
            onBlur={closeEdit}
          />
        ) : (
          <p className={`${styles.cellData}`}>{editFields.comment}</p>
        )}
      </div>
      <div
        className={`${styles.cell} ${styles.cellSum} ${styles.editSum}`}
        onClick={editSum}
      >
        <p className={styles.cellTitle}>Сумма</p>
        {isEditSum ? (
          <input
            type="number"
            value={editFields.sum}
            name="sum"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.cellDataFieldSum}
            maxLength="40"
            autoFocus
            onBlur={closeEdit}
          />
        ) : (
          <p
            className={`${styles.cellData} ${styles.sum} ${styles.edit}`}
            onClick={editSum}
          >
            {sumParser(editFields.sum)}
          </p>
        )}
      </div>
      <div className={`${styles.cell} ${styles.cellBalance}`}>
        <p className={styles.cellTitle}>Баланс</p>
        <p className={styles.cellData}>{sumParser(balance)}</p>
      </div>
      <div className={styles.delete}>
        <div className={styles.deleteIconSmall} onClick={deleteHandler}></div>
        <div className={styles.deleteWord} onClick={deleteHandler}>
          <p>delete</p>
        </div>
      </div>
    </li>
  );
};

export default TableTransactionItem;
