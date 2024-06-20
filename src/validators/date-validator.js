export const dateValidator = {
  currentInstallationDateTemplate(rowData) {
    if (rowData.currentInstallationDate) {
      const date = new Date(rowData.currentInstallationDate)
      return (
        date.toLocaleDateString('pt-BR')
      )
    }
  },

  nextManutentionDateTemplate(rowData) {
    if (rowData.nextManutentionDate) {
      const date = new Date(rowData.nextManutentionDate)
      return (
        date.toLocaleDateString('pt-BR')
      )
    }
  },

  lastManutentionDateTemplate(rowData) {    
    if (rowData.lastManutentionDate !== '1970-01-01T00:00:00.000Z') {
      const date = new Date(rowData.lastManutentionDate)
      return (
        date.toLocaleDateString('pt-BR')
      )
    }
  }
}

