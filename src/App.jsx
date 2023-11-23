import { useState } from 'react';
import './App.css';

function App() {
  const [animaisPerdidos, setAnimaisPerdidos] = useState([]);
  const [novoAnimal, setNovoAnimal] = useState({
    nome: '',
    tipo: '',
    cor: '',
    localizacao: '',
    detalhes: '',
    imagemUrl: '',
    status: 'desaparecido',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimaisPerdidos((prevAnimais) => [...prevAnimais, novoAnimal]);
    setNovoAnimal({
      nome: '',
      tipo: '',
      cor: '',
      localizacao: '',
      detalhes: '',
      imagemUrl: '',
      status: 'desaparecido',
    });
  };

  const handleStatusChange = (index) => {
    setAnimaisPerdidos((prevAnimais) => {
      const novosAnimais = [...prevAnimais];
      novosAnimais[index].status =
        novosAnimais[index].status === 'desaparecido' ? 'encontrado' : 'desaparecido';
      return novosAnimais;
    });
  };

  const handleRemove = (index) => {
    setAnimaisPerdidos((prevAnimais) => {
      const novosAnimais = [...prevAnimais];
      novosAnimais.splice(index, 1);
      return novosAnimais;
    });
  };

  const AnimalList = ({ animals }) => (
    <ul>
      {animals.map((animal, index) => (
        <li key={index}>
          <img src={animal.imagemUrl} alt={animal.nome} />
          <div>
            <p>
              {animal.nome} - {animal.tipo} - {animal.cor} - {animal.localizacao} - {animal.detalhes}
            </p>
            <button onClick={() => handleStatusChange(index)}>
              {animal.status === 'desaparecido' ? 'Desaparecido' : 'Encontrado'}
            </button>
            <button onClick={() => handleRemove(index)}>Remover</button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="app">
        <h1 className="titulo_cadastro">Encontre seu animal perdido</h1>
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar Animal Perdido</h2>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={novoAnimal.nome}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Tipo:
            <input
              type="text"
              name="tipo"
              value={novoAnimal.tipo}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Cor:
            <input
              type="text"
              name="cor"
              value={novoAnimal.cor}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Ultima vez visto:
            <input
              type="text"
              name="localizacao"
              value={novoAnimal.localizacao}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Detalhes:
            <textarea
              name="detalhes"
              value={novoAnimal.detalhes}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Link da Imagem do Animal:
            <input
              type="url"
              name="imagemUrl"
              value={novoAnimal.imagemUrl}
              onChange={handleInputChange}
              placeholder="Insira o link da imagem"
            />
          </label>
          <button type="submit">Cadastrar</button>
        </form>

        <div className="lista-animais">
          <h2>Animais Perdidos</h2>
          <AnimalList animals={animaisPerdidos} />
        </div>
      </div>
    </>
  );
}

export default App;
