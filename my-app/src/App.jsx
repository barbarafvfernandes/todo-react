import { useState, useEffect } from 'react';
import { UserContext } from './contexts/userContext';
import ListaTarefas from './components/ListaTarefas';
import Login from './components/Login';


/*app() é um componente App()*/
function App() {

  const [usuario, setUsuario] = useState({ nome: null, estaLogado: false });


  return (
    <UserContext.Provider value = {{usuario, setUsuario}}>
      <>
        <h1>To Do List:</h1>
        {usuario.estaLogado ? <ListaTarefas /> : <Login />}
      </>
    </UserContext.Provider>
  )
}

export default App
