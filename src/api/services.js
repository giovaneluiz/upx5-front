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

export const updateActiveUser = async (user) => {
  
  try {
    const res = await axios.post(`${env.BASE_URL_UPX5}/register`, {
      name: user.name,
      CPF: user.CPF,      
      status: user.status,
      userCPF: user.CPF
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

export const getEquipmentById = async (equipmentId) => {
  try {
    const res = await axios.get(`${env.BASE_URL_UPX5}/equipment/${equipmentId}`)
    if (res) {
      return res.status === 200 ? res.data.equipment : null
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
      lastManutentionDate: new Date(equipment.lastManutentionDate),
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      status: equipment.status,
      active: equipment.active,
      maintenanceCount: Number(equipment.maintenanceCount)
    })
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateActiveEquipment = async (equipment) => {    
  try {
    const res = await axios.patch(`${env.BASE_URL_UPX5}/equipment/${equipment.id}`, {
      name: equipment.name,
      description: equipment.description,
      lastManutentionDate: new Date(equipment.lastManutentionDate),
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      status: equipment.status,
      active: equipment.active ? false : true,
      maintenanceCount: equipment.maintenanceCount,
    })
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateMaintenance = async (equipment) => {  
  try {  
    const res = await axios.patch(`${env.BASE_URL_UPX5}/equipment/${equipment.id}`, {
      name: equipment.name,
      description: equipment.description,
      lastManutentionDate: new Date(equipment.lastManutentionDate),
      nextManutentionDate: new Date(equipment.nextManutentionDate),
      currentInstallationDate: new Date(equipment.currentInstallationDate),
      location: equipment.location,
      serialNumber: equipment.serialNumber,
      status: equipment.status.name,
      active: equipment.active,
      maintenanceCount: equipment.maintenanceCount + 1,
    })    
    if (res) {
      return res.status === 200 ? res.data : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}