import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom/dist"

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgU, setMsgU] = useState('')
  const [msgP, setMsgP] = useState('')
  const userRef = useRef(null)
  const passwordRef = useRef(null)
  const navigation = useNavigate()

  const validate = () => {
    if (user.length === 0) {
      setMsgU('*Campo obrigatório!')
      userRef.current.focus()
      userRef.current.classList.add('p-invalid')
      setLoading(false)
      return false
    } else {
      userRef.current.classList.remove('p-invalid')
      setMsgU('')      
    }

    if (password.length === 0) {
      setMsgP('*Campo obrigatório!')
      passwordRef.current.focus()
      passwordRef.current.classList.add('p-invalid')
      setLoading(false)
      return false
    } else {
      userRef.current.classList.remove('p-invalid')
      setMsgP('')
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = validate()
    if (!isValid) {
      return
    }
    setLoading(true)
    navigation('menu')
  }
  return (
    <div className="flex justify-content-between h-screen">
      <div className="bg-blue-100 w-full flex justify-content-center align-items-center">
        <Card title="Login">
          <form action="#" onSubmit={handleSubmit}>
            <div className="flex flex-column">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText value={user} onChange={(e) => setUser(e.target.value)} ref={userRef} />
              </div>
              <span className="text-red-500">{msgU}</span>
            </div>
            <div className="flex flex-column">
              <div className="p-inputgroup flex-1 mt-5">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-key"></i>
                </span>
                <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef} />
              </div>
              <div></div>
              <span className="text-red-500">{msgP}</span>
            </div>
            <Button label="Acessar" type="submit" className="mt-3" loading={loading} />
          </form>
        </Card>
      </div >
    </div>
  )
}

export default Login