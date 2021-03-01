import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from '../src/store';
import {PersistGate} from 'redux-persist/integration/react';

/* Páginas*/
import Login from './view/login';
import NewUser from './view/newUser';
import Home from './view/home';
import Cliente from './view/cliente';
import Produto from './view/produto';
import Servico from './view/servico';
import Relatorio from './view/relatorio';
import Registro from './view/registro';
import LostPassword from './view/lostpassword';
import CadastroCliente from './view/cliente/cadastroCliente';
import CadastroServico from './view/servico/cadastroServico';
import CadastroProduto from './view/produto/cadastroProduto';
import CadastroRegistro from './view/registro/cadastroRegistro';



function App() {
  return (
    // - Rotas e navegação entre páginas
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/newuser' component={NewUser}></Route>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/lostpassword' component={LostPassword}></Route>
          <Route exact path='/cliente' component={Cliente}></Route>
          <Route exact path='/produto' component={Produto}></Route>
          <Route exact path='/servico' component={Servico}></Route>
          <Route exact path='/registro' component={Registro}></Route>
          <Route exact path='/relatorio' component={Relatorio}></Route>
          <Route exact path='/cadastrocliente' component={CadastroCliente}></Route>
          <Route exact path='/cadastroservico' component={CadastroServico}></Route>
          <Route exact path='/cadastroproduto' component={CadastroProduto}></Route>
          <Route exact path='/cadastroregistro' component={CadastroRegistro}></Route>
          <Route path='/editcliente/:idCliente' component={CadastroCliente}></Route>
          <Route path='/editservico/:idServico' component={CadastroServico}></Route>
          <Route path='/editproduto/:idProduto' component={CadastroProduto}></Route>
          <Route path='/editregistro/:idRegistro' component={CadastroRegistro}></Route>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
