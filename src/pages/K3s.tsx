import React from "react"
import pdf from "../Image/fc47c355-7a06-434a-a047-7ca362be58d0_K3s_Setup_and_Manage_Cluster.pdf" 
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
