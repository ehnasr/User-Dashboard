export default function Input({ label, error, hint, ...rest }) {
  return (
    <div className="form-field">
      {label ? <label>{label}</label> : null}
      <input {...rest} />
      {error ? (
        <div className="muted" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      ) : hint ? (
        <div className="muted">{hint}</div>
      ) : null}
    </div>
  );
}
