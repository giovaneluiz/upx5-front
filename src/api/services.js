import axios from "axios"
import { env } from '../../env'

export const getUserAll = async () => {
  try {
    const res = await axios.get(`${env.BASEURL}/user`)
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    return null
  }
}