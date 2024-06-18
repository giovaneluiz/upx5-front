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

export const getEquipments = async () => {
  try {
    const res = await axios.get(`${env.BASE_URL_UPX5}/equipment`)
    if (res) {
      return res.status === 200 ? res.data.equipments : null
    }
  } catch (error) {
    return null
  }
}

export const insertEquipament = async (equipment) => {  
  try {
    const res = await axios.post(`${env.BASE_URL_UPX5}/equipment`, {
      name: equipment.name,
      active: true,
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      description: equipment.description
    })
    if (res) {
      return res.status === 201 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateEquipament = async (equipment) => {
  try {
    const res = await axios.patch(`${env.BASE_URL_UPX5}/equipment/${equipment.id}`, {
      name: equipment.name,
      description: equipment.description,
      lastManutentionDate: equipment.lastManutentionDate,
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      status: equipment.status
    })
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}


export const updateStatusEquipment = async (equipment) => {
  try {
    const res = await axios.patch(`${env.BASE_URL_UPX5}/equipment/${equipment.id}`, {
      name: equipment.name,
      lastManutentionDate: equipment.lastManutentionDate,
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      description: equipment.description,
      active: equipment.status === false ? true : false,      
    })
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}