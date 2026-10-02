import { useRef, useState } from 'react'
import Atanagildo from '../src/assets/reyes/rey_atanagildo.png'
import Sisebuto from '../src/assets/reyes/rey_Sisebuto.png'
import Incognito from '../src/assets/reyes/rey_incognito.png'
import Leogivildo from '../src/assets/reyes/rey_leogivildo.png'
import './App.css'
import MyFirstComponent from './components/MyFirstComponent';

function App() {
  const [messege,setMessege] = useState("")
  const [count,setCount] = useState(0);
  const [imagen,setImagen] = useState(Atanagildo);
  const refCaja = useRef()
  const cambio = 23.16;





  const Incrementar=(e)=>{
      refCaja.current.innerHTML =  Number( refCaja.current.innerHTML)+1

      if (count >= 9){
        
        setCount(0)

      } else{
        setCount(count +1)      
      }
  }

  const change =()=>{
    setImagen(imagen === Atanagildo ? Sisebuto : Atanagildo)

  }
  //La verdad es que este ejemplo que hizo el profesor es muy raro y lioso, pero lo hace para enseñar; 
  //lo ideal es count * cambio y asi obtengo el nuevo resultado.


  const convertir=()=>{
  refCaja.current.innerHTML =  Number( refCaja.current.innerHTML) * cambio
    
  //este ejemplo de abajo es que realmente mola porque si actualiza el estado y los dos valores no se pisan entre ellos
    setCount(count*cambio)

  }

  const Changevalue=(e)=>{
    setMessege( e.target.value)
  }

  // function incrementar(e){
  //   e.target.innerHTML = Number( e.target.innerHTML)+1;
  //   console.log(e);
    
  

  return (
    <>
        <div className="Caja" ref={refCaja} style={{background: count >= 8 ? 'red': ""}} onClick={Incrementar}>{count}</div>
        <div className="value-input">{messege}</div>
        <div className="container-button">
          <button onClick={convertir}>multiplicar</button>
        </div>

        <div className="container-img">
        <img src={imagen} onClick={change}/>
        </div>
        <div className="caja-input">
          <input type="text"
          value={messege}
          onChange={Changevalue} />
        </div>
        
        <hr />
        <div className="reyes-godos">

            <MyFirstComponent imagen={Atanagildo} nombre={"Atagildo"} ImagenAlternativa={Incognito}/>
            <MyFirstComponent imagen={Sisebuto} nombre={"sisebuto"} ImagenAlternativa={Incognito}/>
            <MyFirstComponent imagen={Leogivildo} nombre={"Leogivildo"} ImagenAlternativa={Incognito}/>
        </div>
    </>
  )
}

export default App
