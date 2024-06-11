import { Image } from "primereact/image"
import { useParams } from "react-router-dom"

const PrintQrCode = () => {
  const { uuid } = useParams()
  print()

  return (
    <>
      <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=http://192.168.2.113:5173/equipment/${uuid}`} />
    </>
  )
}
export default PrintQrCode