import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cliente } from "../types/cliente";

function Servico() {
  const [servico, setServico] = useState<Cliente>({
    nomeCliente: "",
    dataInicio: "",
    dataTermino: "",
    description: "",
    valorPago: 0,
    valorServico: 0,
    dataPagamento: "",
  });
  const [servicos, setServicos] = useState<Cliente[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/servico/findAll")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [servico]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServico({ ...servico, [name]: value });
  };

  const handleLimp = () => {
    setServico({
      nomeCliente: "",
      dataInicio: "",
      dataTermino: "",
      description: "",
      valorPago: 0,
      valorServico: 0,
      dataPagamento: "",
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (servico.id) {
      axios
        .put(`http://localhost:8080/api/servico/`, servico)
        .then((response) => {
          const index = servicos.findIndex((s) => s.id === servico.id);
          const newServicos = [...servicos];
          newServicos[index] = response.data;
          setServicos(newServicos);
          handleLimp();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:8080/api/servico/", servico)
        .then((response) => {
          setServicos([...servicos, response.data]);
          handleLimp();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDelete = (id: any) => {
    axios
      .delete(`http://localhost:8080/api/servico/${id}`)
      .then(() => {
        setServicos(servicos.filter((s) => s.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelar = (id: any) => {
    axios.post("http://localhost:8080/api/servico/" + id).then((res) => {
      setServico(res.data);
      handleLimp();
    });

  };

  return (
    <>
      <div className='container'>
        <h1>Cadastro de Serviços</h1>
        <form onSubmit={handleSubmit}>
          <div className='col-6'>
            <div>
              <label htmlFor=''>Nome do cliente:</label>
              <input
                type='text'
                name='nomeCliente'
                value={servico?.nomeCliente}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Data de Início:</label>
              <input
                type='date'
                name='dataInicio'
                value={servico?.dataInicio}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Data de Termino:</label>
              <input
                type='date'
                name='dataTermino'
                value={servico?.dataTermino}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Descrição do serviço:</label>
              <input
                type='text'
                name='description'
                value={servico?.description}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Valor Pago R$:</label>
              <input
                type='number'
                name='valorPago'
                value={servico?.valorPago}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Valor do Serviço</label>
              <input
                type='number'
                name='valorServico'
                value={servico?.valorServico}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div>
              <label htmlFor=''>Data de Pagamento:</label>
              <input
                type='date'
                name='dataPagamento'
                value={servico?.dataPagamento}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-success'>
              {servico.id !== undefined ? "Alterar" : "Salvar"}
            </button>
            <button
              type='reset'
              className='btn btn-outline-secondary'
              onClick={handleLimp}
            >
              Limpar campos
            </button>
          </div>
        </form>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Nome</th>
              <th scope='col'>Descrição</th>
              <th scope='col'>Valor</th>
              <th scope='col'>Status</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((serv, id) => (
              <tr key={id}>
                <td>{serv.nomeCliente}</td>
                <td>{serv.description}</td>
                <td>{serv.valorServico}</td>
                <td>{serv.status}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => setServico(serv)}
                  >
                    Alterar
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => handleDelete(serv.id)}
                  >
                    Excluir
                  </button>

                  <button
                    type='button'
                    className='btn btn-warning'
                    onClick={() => cancelar(serv.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Servico;
