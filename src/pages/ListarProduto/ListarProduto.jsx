import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
import CredentialUser from "../../components/CredentialUser"
import Modal from "../../components/Modal"

import api from "../../services/api"

const ListarProduto = () => {

   // useState: é um hook do React que serve para armazenar e controlar o estado de um componente (variáveis)
  //           ele permite que você declare variáveis que lembram valores entre renderizações do componente
 
  // Composição [nome da variável, função para alterar o valor da variável] = (valor inicial da variável)
  // Exemplo: Quero declarar uma variável numero cujo valor inicie com 0
  // const [numero, setNumero] = useState(0)
  // Para nosso aplicativo, preciso de uma array de produtos iniciando com um array vazio

  const [produtos, setProdutos] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idProdutoAExcluir, setIdProdutoAExcluir] = useState(null)

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
  useEffect(() => {

    api
      .get("/produtos")
      .then((response) => {
        console.log(response.data.data)
        setProdutos(response.data.data)
      })
      .catch((error) => {
        console.error(
          "Erro ao buscar a lista de produtos.",
          error
        )
      })

  }, [])

  
  const openModal = (id) => {
    setIdProdutoAExcluir(id)
    setIsModalOpen(true)
  }

  // Exclui o produto
  const deleteProduto = async () => {

    try {

      const response = await api.delete(
        `/produtos/${idProdutoAExcluir}`
      )

      alert(response.data.message)

      // Remove o produto da lista sem precisar
      // buscar novamente todos os produtos
      setProdutos((produtosAtuais) =>
        produtosAtuais.filter(
          (produto) => produto.id !== idProdutoAExcluir
        )
      )

    } catch (error) {

      console.error("Erro ao excluir produto:", error)

      alert(
        `Não foi possível excluir o produto com o id ${idProdutoAExcluir}`
      )

    }

    setIsModalOpen(false)

    setIdProdutoAExcluir(null)
  }

  return (
    <div className="container">

      <MenuFuncionario />

      <CredentialUser title="Lista de Produtos" />

      <div className="table-responsive">

        <table className="table table-bordered table-striped table-hover">

          <thead className="table-success">

            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>

          </thead>

          <tbody>

            {produtos.map((produto) => (

              <tr key={produto.id}>

              {/*numero */}
              <td style={{fontSize: " 13px "}}>{produto.codigo}</td>

                {/* Nome */}
                <td style={{ fontSize: "13px" }}>
                  {produto.nome}
                </td>

                {/* Preço */}
                <td style={{ fontSize: "13px" }}>
                  {
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(produto.precoVenda)
                  }
                </td>

                {/* Descrição */}
                <td style={{ fontSize: "13px" }}>
                  {produto.descricao}
                </td>

                {/* Ações */}
                <td
                  className="text-center fs-6"
                  style={{ width: "100px" }}
                >

                  {/* Botão de Editar */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>

                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => openModal(produto.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Botão Novo Produto */}
      <div className="text-end mt-3">

        <Link
          to="/produto/novo"
          className="btn btn-success"
        >
          <i className="fas fa-plus"></i>{" "}
          Novo Produto
        </Link>

      </div>

      {/* Modal de confirmação */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setIdProdutoAExcluir(null)
        }}
        onConfirm={deleteProduto}
      />

    </div>
  )
}

export default ListarProduto
