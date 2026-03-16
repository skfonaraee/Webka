import InputField from "./InputField"
import SubmitButton from "./SubmitButton"

function RegistrationForm() {

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target

    const user = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      city: form.city.value,
      age: form.age.value
    }

    console.log(user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>

      <InputField label="Username" type="text" name="username" placeholder="Enter username" />
      <InputField label="Email" type="email" name="email" placeholder="Enter email" />
      <InputField label="Password" type="password" name="password" placeholder="Enter password" />
      <InputField label="Phone" type="tel" name="phone" placeholder="Enter phone number" />
      <InputField label="City" type="text" name="city" placeholder="Enter city" />
      <InputField label="Age" type="number" name="age" placeholder="Enter age" />

      <SubmitButton text="Register" />
    </form>
  )
}

export default RegistrationForm
