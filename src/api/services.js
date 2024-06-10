import axios from 'axios'
import { env } from '../../env'

export const getUserAll = async () => {
  try {
    const res = await axios.get(`${env.BASE_URL_UPX5}/user`)
    if (res) {
      return res.status === 200 ? res.data.users : null
    }
  } catch (error) {
    return null
  }
}

export const insertUser = async (user) => {
  console.log(user)
  try {
    const res = await axios.post(`${env.BASE_URL_UPX5}/register`, {
      name: user.name,
      CPF: user.cpf,
      password: user.password
    })
    if (res) {
      return res.status === 201 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}