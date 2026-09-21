import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
import CredentialUser from "../../components/CredentialUser"
 
 const ListarCategoria = () => {

    return (
        <div className="container">
          <MenuFuncionario/>
          <CredentialUser title="Lista de Categorias"/>

          <p>Listar Categoria do Produto</p>
        </div>
    )

 }

 export default ListarCategoria