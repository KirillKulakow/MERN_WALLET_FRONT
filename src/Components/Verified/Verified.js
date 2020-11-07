import React from "react";
import styles from "./Verified.module.css";
export const Verified = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.WrapperTitle}>
        <h1 className={styles.Title}>На вашу почту отправлено подтверждение</h1>
        <p className={styles.Content}>
          На Ваш почтовый ящик отправлено сообщение, содержащее ссылку для
          подтверждения правильности e-mail адреса. Пожалуйста, перейдите по
          ссылке для завершения регистрации.{" "}
          <span className={styles.SubText}>
            Если письмо не пришло в течение 15 минут, проверьте папку «Спам».
            Если письмо вдруг попало в эту папку, откройте письмо, нажмите
            кнопку «Не спам» и перейдите по ссылке подтверждения. Если же письма
            нет и в папке «Спам», попробуйте подписаться ещё раз. Возможно, вы
            ошиблись при вводе адреса.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Verified;
