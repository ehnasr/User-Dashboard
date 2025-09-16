import styles from "./Input.module.css";

export default function Input({ label, error, hint, ...rest }) {
  return (
    <div className={styles.formField}>
      {label ? <label>{label}</label> : null}
      <input {...rest} />
      {error ? (
        <div className={styles.error}>
          {error}
        </div>
      ) : hint ? (
        <div className={styles.muted}>{hint}</div>
      ) : null}
    </div>
  );
}
