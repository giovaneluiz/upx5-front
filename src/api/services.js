import axios from 'axios'
import { env } from '../../env'

const BASEURL = import.meta.env.BASE_URL_UPX5 || env.BASE_URL_UPX5

export const getUserAll = async () => {
  try {      
    const res = await axios.get(`${BASEURL}/user`, {
      headers: {
      'Content-Type': 'application/json'
      }
    })        
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    return null
  }
}