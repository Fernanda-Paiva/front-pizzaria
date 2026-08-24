import {useState, useEffect} from "react"
 
import { Link } from "react-router-dom"
 
import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
import api from "../../services/api"
import { use } from "react"
 
const ListarProduto = () =>{
   
  // useState: é um hook do React que serve para armazenar e controlar o estado de um componente (variáveis)
  //           ele permite que você declare variáveis que lembram valores entre renderizações do componente
 
  // Composição [nome da variável, função para alterar o valor da variável] = (valor inicial da variável)
  // Exemplo: Quero declarar uma variável numero cujo valor inicie com 0
  // const [numero, setNumero] = useState(0)
  // Para nosso aplicativo, preciso de uma array de produtos iniciando com um array vazio
 
  const [produtos, setProdutos] = useState([])
 
  // useEffect: é um hook do React que serve para executar códigos que ficam fora do controle direito da renderização
  // visual, os chamados "efeitos colaterais"
  // Exemplo: buscar dados de uma API, configurar cronometros, fazer algo quando o usuário aperta uma tecla,
  //          aplicar o Modo Escuro na página
 
  // Em nossa página, vamos utilizar para acessar a API-BACK END e carregar nossa tabela de produtos toda vez
  // que a página for carregada.
 
  // useEffect ( função que será executava, [quando esse valor for alterado a função é chamada novamente] )
  // Obs: [] manter vazio, quando você quiser o seu código rode exatamente uma única vez, logo após o componente
  //      aparecer na tela pela primeira vez
  // Resumindo []: Execute isso quando a página carregar e depois "ignore", importa o que mude na tela!
 
  useEffect(()=>{
 
      api
         .get("/produtos")
         .then((response)=>{
          // deu certo :)
          console.log(response.data.data)
          setProdutos(response.data.data)
         })
         .catch((error)=>{
            // deu ruim :(
            console.error("Erro ao buscar a lista de produtos. ", error)
          })
 
  },[])
 
    // const arrayProdutos = [
    //     {
    //          id: 1,
    //          codigo: 1,
    //          nome: "Pizza de Calabresa",
    //          precoVenda: 59.90,
    //          descricao: "Pizza de Calabresa com bastante cebola"
    //     },
 
    //     {
    //          id: 2,
    //          codigo: 2,
    //          nome: "Pizza de Queijo",
    //          precoVenda: 58.95,
    //          descricao: "Pizza de Queijo Mussarela com rodelas de tomate",
    //     },
 
    //     {
    //          id: 3,
    //          codigo: 3,
    //          nome: "Pizza de Nutella",
    //          precoVenda: 55.80,
    //          descricao: "Pizza doce com recheio de Nutella"
    //     }
    // ]
 
   
 
 
    return (
        <div className="container">
             <MenuFuncionario/>
 
              <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-sucess">
            <tr>
              {/* <th>Código</th> */}
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th> {/* Nova coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto)=> (
               
            <tr key={produto.id}>
 
                {/* numero */}
                {/* <td style={{ fontSize: "13px" }}>{produto.codigo}</td>
                 */}
 
                {/* nome */}
                <td style={{ fontSize: "13px" }}>{produto.nome}</td>
                <td style={{ fontSize: "13px" }}>
                     {
 
 
                        /* preço */
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(produto.precoVenda)
                     }
                </td>
 
 
                {/* descrição */}
                <td style={{ fontSize: "13px" }}> {produto.descricao}  </td>
                <td className="text-center fs-6" style={{ width: "100px" }}>
 
 
                  {/* Botão de Editar */}
                  <button
                    className="btn btn-sm btn-primary me-2">
                    <i className="fas fa-pencil-alt"></i>{""}
                    {/* Ícone de editar */}
                  </button>
 
 
                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger">
                    <i className="fas fa-trash-alt"></i>{""}
                    {/* Ícone de excluir */}
                  </button>
                </td>
              </tr>
           
 
             ))}
           
 
             
          </tbody>
        </table>
      </div>
 
             <div className="text-end mt-3">
                <Link
                to="/produto/novo"
                className={`btn btn-success`}>
               
                <i className="fas fa-plus"></i>
                Novo Produto
                </Link>
             </div>
 
    </div>
    )
 
 
}
 
export default ListarProduto
 
 
 