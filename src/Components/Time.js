import React, {useState} from 'react'


export function Time(){
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()

    const [Ctime,setCtime] = useState(time)

    const updateTime =() =>{
        time= new Date().toLocaleTimeString()
        setCtime(time)
    }
    setInterval(updateTime, 1000);
    return <h4 style={{textAlign:"right",paddingRight:"20px", color:"#FB8122",margin:"0" }}>{date}, {Ctime}</h4>
}