import { useState, memo } from "react";
import "./tarefas.css";

function Tarefas({texto}){

    const[concluida, setConcluida] = useState(false);

    const alternarConcluida = () =>{
        setConcluida(!concluida);
    }

    return(
        <li><input type="checkbox" onChange={alternarConcluida}/><span className={concluida ? 'concluida' : ''}>{texto}</span><button>Remover</button></li>
    )
}
export default memo(Tarefas);