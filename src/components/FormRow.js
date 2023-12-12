
function FormRow({type, name, label, onChange, value}) {
  return (
    <div className="form-row">
        <label className="form-label">{label}:</label>
        <input className="form-input" id={name} name={name} type={type} onChange={onChange} value={value}/>
    </div>
  )
}

export default FormRow