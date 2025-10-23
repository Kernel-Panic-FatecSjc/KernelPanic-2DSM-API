'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './App.module.css';
 
const opcoesMes = [
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
];
 
const opcoesAno = [
  { value: 2020, label: '2020' },
  { value: 2021, label: '2021' },
  { value: 2022, label: '2022' },
  { value: 2023, label: '2023' },
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
];
 
const Styles = {
  option: (provided, state) => ({
    ...provided,
    fontFamily: "'Poppins', 'Inter', sans-serif",
    color: state.isSelected ? 'white' : '#333',
  }),
  control: (provided) => ({
    ...provided,
    fontFamily: "'Poppins', 'Inter', sans-serif",
    minWidth: '120px',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: "'Poppins', 'Inter', sans-serif",
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
 
export default function Page() {

  const [vendedores, setVendedores] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState(null);
  const [anoSelecionado, setAnoSelecionado] = useState(null);
  const [vendedorSelecionado, setVendedorSelecionado] = useState('');

  const fetchVendedores = async () => {
  try {
    const response = await axios.get('http://localhost:5000/vendedor');
    const vendas = response.data;

    const mapa = new Map();

    vendas.forEach((venda) => {
      const id = venda.funcionario.funcionario_ID;
      const nome = venda.funcionario.nome;
      const valorVenda = parseFloat(venda.valor_total || '0');
      const status = venda.status;

      if (!mapa.has(id)) {
        mapa.set(id, {
          nome,
          visitas: 0,
          vendas: 0,
          faturamento: 0,
        });
      }

      const vendedor = mapa.get(id);
      vendedor.visitas += 1;

      if (status === 'Fechada') {
        vendedor.vendas += 1;
        vendedor.faturamento += valorVenda;
      }
    });

    setVendedores(Array.from(mapa.values()));
  } catch (err) {
    console.error('Erro ao carregar vendedores:', err);
  }
};

  useEffect(() => {
    fetchVendedores();
  }, []);

  const filterVendedor = vendedores.filter((vendedor) => vendedor.nome.toLowerCase().includes(vendedorSelecionado.toLowerCase()));

  const totalVisitas = vendedores.reduce((total, v) => total + v.visitas, 0);
  const totalVendas = vendedores.reduce((total, v) => total + v.vendas, 0);
  const taxaConversaoGeral = totalVisitas > 0 ? ((totalVendas / totalVisitas) * 100).toFixed(2) : '0';
  const totalFaturamento = vendedores.reduce((total, v) => total + v.faturamento, 0);
  
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h2>{taxaConversaoGeral}%</h2>
          <p>Taxa de conversão Geral%</p>
        </div>
        <div className={styles.card}>
          <h2>{totalVisitas}</h2>
          <p>Visitas comerciais</p>
        </div>
        <div className={styles.card}>
          <h2>{totalVendas}</h2>
          <p>Vendas fechadas</p>
        </div>
        <div className={styles.card}>
          <h2>
            {totalFaturamento.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h2>
          <p>Faturamento</p>
        </div>
      </div>
 
      <div className={styles.desempenhoVendedores}>
        <div className={styles.desempenhoHeader}>
          <h1>Desempenho de vendedores</h1>
          <div className={styles.filtro}>
            <Select
              instanceId="filtro-mes"
              options={opcoesMes}
              styles={Styles}
              placeholder="Mês"
              value={mesSelecionado}
              onChange={setMesSelecionado}
            />
            <Select
              instanceId="filtro-ano"
              options={opcoesAno}
              styles={Styles}
              placeholder="Ano"
              value={anoSelecionado}
              onChange={setAnoSelecionado}
            />
            <input
              type="text"
              placeholder="Vendedor..."
              className={styles.inputVendedor}
              value={vendedorSelecionado}
              onChange={(e) => setVendedorSelecionado(e.target.value)}
            />
          </div>
        </div>
 
        <table className={styles.tabelaDesempenho}>
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Visitas</th>
              <th>Vendas</th>
              <th>Taxa de conversão</th>
              <th>Faturamento (R$)</th>
            </tr>
          </thead>
          <tbody>
            {filterVendedor.map((v, index) => {
              const taxa =
                v.visitas > 0
                  ? ((v.vendas / v.visitas) * 100).toFixed(2) + '%'
                  : '0%';
              return (
                <tr key={index}>
                  <td className={styles.nomeVendedor}>{v.nome}</td>
                  <td>{v.visitas}</td>
                  <td>{v.vendas}</td>
                  <td>{taxa}</td>
                  <td>
                    {v.faturamento.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}