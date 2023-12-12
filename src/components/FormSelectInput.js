
function FormSelectInput({list, label,value,name, handleChange}) {
  return (
    <div className="form-row">
    <label htmlFor={name} className="form-label">{label}:</label>
        <select className="form-select" onChange={handleChange} id={name}
        name={name} value={value}>
        {list.map((item, id)=>{
            return <option value={item} key={id}
            >{item}
            </option>
        })}
        </select>
    </div>
  )
}

export default FormSelectInput