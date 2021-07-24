const renderNotes = ({ touched }, notes) => {
  if (!touched) return <div className="notes">{notes}</div>;
};

const renderError = ({ error, touched }) => {
  if (touched && error) return <div className="error">{error}</div>;
};

const renderField = ({ input, label, meta, notes, type }) => {
  const className = `${meta.error && meta.touched ? 'error-field' : ''}`;
  return (
    <div className={className}>
      <input {...input} autoComplete="off" placeholder={label} type={type} />
      <span className="underline"></span>
      {renderNotes(meta, notes)}
      {renderError(meta)}
    </div>
  );
};

export default renderField;
