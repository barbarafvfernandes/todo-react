import Tarefas from './Tarefas'
import {useState, useEffect, useContext} from 'react';
import { useInput } from '../hooks/useInput';

const API_URL = 'https://crudcrud.com/api/486a919d8b6d4d2b99aa9e25eccf4d16/tarefas';

function ListaTarefas() {
  {/*app() é um componente react*/ }

  const [listTarefas, setTarefas] = useState([]);
  const tarefa = useInput();
  const {usuario} = useContext(UserContext);

  //Buscar dados na API quando o componente for montado
  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(dados => setTarefas(dados))
    .catch(error => console.error("Erro ao buscar tarefas:", error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(tarefa.valor === '') return;

    //Envio da nova tarefa para API:

    //const novoId = listTarefas[listTarefas.length -1].id +1; API do crud crud gera um id automático 
    const nova = {usuario: usuario.nome, texto: tarefa.valor}
    fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(nova)
    })
    .then(res => res.json())
    .then(tarefaCriada => {
      setTarefas([...listTarefas, tarefaCriada]);
      tarefa.limpar();//limpa o campo de entrada input
    })
    .catch(error => console.error("Erro ao adicionar tarefas:", error))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite uma nova tarefa"
          value={tarefa.valor}
          onChange={tarefa.onChange}
        />
        <button type='submit'>Adicionar</button>
      </form>
      <ul>
        {listTarefas
        .filter(tarefa => tarefa.usuario === usuario.nome)
        .map(tarefa => <Tarefas key={tarefa._id} texto={tarefa.texto} />)}
      </ul>
    </>
  )
}

export default ListaTarefas