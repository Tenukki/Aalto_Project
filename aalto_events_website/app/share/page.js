
import QRCode from "react-qr-code";

export default function Liked() {
    return (
      <div className="flex flex-row items-center justify-center h-screen bg-sky-100 p-5">
        <QRCode bgColor="rgb(243,244,246)" value="https://aalto-design.vercel.app/" />
      </div>
    )
  }
  