import { Image } from "primereact/image"
import { useParams } from "react-router-dom"

const PrintQrCode = () => {
  const { uuid } = useParams()

  return (
    <>
      <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=https://projeto-upx5.netlify.app/manutencao/${uuid}`} />
    </>
  )
}
export default PrintQrCode