import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CredentialsUser from "../../components/CredentialUser";
import MenuFuncionario from "../MenuFuncionario/MenuFuncionario";
import api from "../../services/api";

function EditarProduto() {
 const [produto, setProduto] = useState({
 nome: "",
 descricao: "",
 precoVenda: 0,
 categoriaId: 0
 });

 const [categoriaId, setCategoriaId] = useState("");
 const [categorias, setCategorias] = useState([]);

 const { id } = useParams();
 const navigate = useNavigate();

 useEffect(() => {
  api
   .get(`/produtos/${id}`)
   .then((response) => {
 const dados = response.data.data;
 setProduto(dados);
  if (dados?.categoria?.id) {
  setCategoriaId(dados.categoria.id);
 }
 })
 .catch((error) => {
  console.error(`Erro ao buscar a lista de produtos.${error}`);
 });
  api
  .get("/categorias")
  .then((response) => {
 
 setCategorias(response.data.data);
 })
 .catch((error) => {
 console.error(`Erro ao buscar a lista de categorias. ${error}`);
 });

 }, []);
  const atualizarProduto = async (e) => {
   e.preventDefault(); // Cancela o reload da página
 
 try {
  const response = await api.put(`/produtos/${produto.id}`, produto, {
  headers: {
  "Content-Type": "application/json",
 },
 });
  console.log("Produto atualizado " + response.data);
  alert(`${response.data.data.nome} atualizada sucesso`);
   navigate("/produtos");
 } catch (error) {
  console.error(`Não foi possível salvar o produto ${error}`);
 }
 };
 const handleChange = (e) => {
 //setProduto({ ...produto, [e.target.name]: e.target.value }); funciona sem o codStatus
  const { name, value, type } = e.target;
  const parsedValue = name === "codStatus" ? value === "true" : value;
  setProduto((prev) => ({
  ...prev,
 [name]: parsedValue,
 }));
 };

 const handleChangeCategoria = (e) => {
 const novoId = e.target.value;
 setCategoriaId(novoId);
 setProduto((prev) => ({
 ...prev,
 categoriaId: novoId,
 }));
};
 return (


 <div className="container mt-4">
 <MenuFuncionario />
 <CredentialsUser title="Edição de Produto" />
 <form onSubmit={atualizarProduto} className="bg-light p-4 rounded shadow">
  {/* Nome do Produto */}
 <div className="mb-3">
 <input
  type="text"
  name="nome"
  className="form-control"
  placeholder="Digite o nome do produto"
  value={produto.nome}
  onChange={handleChange}
  required
 />
 </div>
  {/* Preço */}
  <div className="mb-3">
  <input
  type="number"
  name="precoVenda"
  className="form-control"
  placeholder="Digite o preço"
  value={produto.precoVenda}
  onChange={handleChange}
  required
 />
 </div>
 {/* Descrição */}
 <div className="mb-3">
 <textarea
 name="descricao"
 className="form-control"
 rows="3"
 placeholder="Digite a descrição do produto"
 value={produto.descricao}
 onChange={handleChange}
 required
 ></textarea>
 </div>
 <div className="mb-3">
 <label className="block mb-1 font-semibold">Categoria</label>
 <select
 value={categoriaId}
 onChange={handleChangeCategoria}
 className="border p-2 w-full rounded"
 required
 >
 <option value="">Selecione uma categoria</option>
 {categorias
 .filter((cat) => cat.codStatus === true)
 .map((cat) => (
 <option key={cat.id} value={cat.id}>
 {cat.nome}
 </option>
 ))}
 </select>
 </div>
 <div className="mb-3">
 <h6>Ativar ou Desativar Produto</h6>
 <label>
 <input
 type="radio"
 name="codStatus"
 value="true"
 checked={produto.codStatus === true}
 onChange={handleChange}
 />
 Ativo
 </label>
 <br />
 <label>
 <input
 type="radio"
 name="codStatus"
 value="false"
 checked={produto.codStatus === false}
 onChange={handleChange}
 />

 </label>
 </div>
 <br />
  {/* Upload de Imagem */}
  <div className="mb-3"></div>
  {/* Botão de Enviar */}
  <button type="submit" className="btn btn-primary w-100">
  Enviar
 </button>
 </form>
  </div>
  );
}
export default EditarProduto