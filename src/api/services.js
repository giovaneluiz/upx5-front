import axios from 'axios'

export const getUserAll = async () => {
  try {      
    const res = await axios.get(`${process.env.BASE_URL_UPX5}/user`, {
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