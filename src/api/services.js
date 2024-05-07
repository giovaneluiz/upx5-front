import axios from "axios"

export const login = async (cpf, password) => {
  try {
    const res = await axios.post(`$/usuario-web/login`, {
      cpf,
      password
    })
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    return null
  }
}