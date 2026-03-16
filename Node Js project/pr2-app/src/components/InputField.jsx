function InputField({ label, type, name, placeholder }) {
  return (
    <div>
      <label>{label}</label><br />
      <input type={type} name={name} placeholder={placeholder} required />
      <br /><br />
    </div>
  )
}

export default InputField
