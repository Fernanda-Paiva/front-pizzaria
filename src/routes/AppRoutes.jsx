import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
 
import HomeFuncionario from "../pages/HomeFuncionario/HomeFuncionario"
import ListarProduto from "../pages/ListarProduto/ListarProduto"
import ListarCategoria from "../pages/ListarCategoria/ListarCategoria"
 
 
// BrowserRoutes: Recarrega toda página
// HashRoutes: Recarega apenas partes necessárias da página
 
 
const AppRoutes = () =>{
 
    return (
     <HashRouter>
        <Routes>
         
           <Route
             path="/"
             element={<HomeFuncionario/>}
           />
            <Route
             path="/home"
             element={<HomeFuncionario/>}
           />
           <Route
             path="/produtos"
             element={<ListarProduto/>}
           />
            <Route
             path="/categorias"
             element={<ListarCategoria/>}
           />
 
        </Routes>
     
     </HashRouter>
    )
}
 
export default AppRoutes