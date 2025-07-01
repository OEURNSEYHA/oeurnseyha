import React from "react"
import pdf from "../Image/e5e78a1f-d4b8-4631-b53e-a3ec3ec26beb_K3s_Setup_and_Manage_Cluster.pdf" 
const K3s:React.FC = ()=> {
  return (
    <>
    <iframe
                          src={pdf}
                          width="100%"
                          height="1000vh"
                          title="K3s Setup PDF"
                        />
    </>
  )
}

export default K3s
