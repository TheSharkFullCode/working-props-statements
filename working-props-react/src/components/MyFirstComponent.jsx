import React, { useState } from 'react'

export default function MyFirstComponent({imagen,nombre, ImagenAlternativa}) {
    const [actual,setActual] = useState(imagen);
    const [verImagen,setVerImagen]= useState("visible");
    const [verNombre,setVerNombre] = useState("visible");
    const [clicks,setClicks ] = useState(0)
    const [verCaja,setVerCaja] = useState("");

    

    const ChangeActual=(e)=>{     


        if(actual === imagen){

          setActual(ImagenAlternativa)

        }else{

          setVerImagen("hidden")
        }
    }

      const OcultarTexto=(e)=>{
        // Decirle al click: quedate aqui nu subas:
        e.stopPropagation()// el click no sube a la caja

          setVerNombre('hidden')     

      }


      const ClickCaja=()=>{

        setClicks(clicks + 1)

        if(clicks + 1 === 3){
          setVerCaja('none')
        }
      }



  return (
    <>
    <div className="caja-reyes-godos"  onClick={ClickCaja} style={{display:verCaja}}>
        
      <img src={actual} onClick={ChangeActual}
      style={{visibility:verImagen}}
      alt="Rey_Atanagildo" />

      <p onClick={OcultarTexto} style={{visibility:verNombre}}>  {nombre}     </p>

    </div>
    </>
  )
}
