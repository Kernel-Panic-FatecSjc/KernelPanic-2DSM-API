"use state"

import React, {useState} from 'react'


const CalculadoraCotacao = () => {

  const [veiculo, setVeiculo] = useState("");
  const [km, setKm] = useState("");
  const [ajudante, setAjudante] = useState("");
  const [avValorem, setAvValorem] = useState("");
  const [gris, setGris] = useState("");
  const [valorFinal, setValorFinal] = useState(null);


  const calcularFrete = () => {
    
    const tabelaBase = {
      fiorino: 150,
      van: 180,
      vuc: 220,
      "3/4": 280,
      toco: 320,
      truck: 400,
      carreta: 500,
      "carreta-trucada": 600,
      moto: 80
    };

    if (!veiculo || !km) {
      alert("Preencha pelo menos o veículo e a quilometragem!");
      return;
    }

    const kmValor = parseFloat(km.replace(",", "."));
    const ajud = parseInt(ajudante) || 0;
    const valorem = parseFloat(avValorem.replace(",", ".")) || 0;
    const grisValor = parseFloat(gris.replace(",", ".")) || 0;

    if (isNaN(kmValor)) {
      alert("Digite uma quilometragem válida!");
      return;
    }


    //coloquei valores aleatorios so pra preencher espaço (ainda serao detalhados)
    const base = tabelaBase[veiculo] || 0;
    const custoKm = kmValor * 2.5; 
    const custoAjudante = ajud * 100; 
    const resultado = base + custoKm + valorem + grisValor + custoAjudante;

    setValorFinal(resultado.toFixed(2));
  }

  return (
    <div className="cotacao-container">
      <h2 className="cotacao-titulo">Calculadora de Frete</h2>

      <div className="principal">
        <label>Veículo</label>
        <select
          value={veiculo}
          onChange={(e) => setVeiculo(e.target.value)}
        >
          <option value="">Selecione o veículo</option>
          <option value="fiorino">Fiorino</option>
          <option value="van">Van</option>
          <option value="vuc">VUC</option>
          <option value="3/4">3/4</option>
          <option value="toco">Toco</option>
          <option value="truck">Truck</option>
          <option value="carreta">Carreta</option>
          <option value="carreta-trucada">Carreta Trucada</option>
          <option value="moto">Moto</option>
        </select>
      </div>

      <div className="principal">
        <label>KM</label>
        <input
          type="text"
          value={km}
          onChange={(e) => setKm(e.target.value)}
          placeholder="Digite a quilometragem"
        />
      </div>

      <div className="botoes">
        <button className="botao-calcular" onClick={freteMinimo}>Frete Mínimo</button>
        <button className="botao-calcular" onClick={usarAdicionais}>Usar Adicionais</button>
      </div>

      <div className="principal">
        <label>Ajudante</label>
        <input
          type="text"
          value={ajudante}
          onChange={(e) => setAjudante(e.target.value)}
          placeholder="Quantidade de ajudantes"
        />
      </div>

      <div className="principal">
        <label>Av valorem</label>
        <input
          type="text"
          value={avValorem}
          onChange={(e) => setAvValorem(e.target.value)}
          placeholder="Digite o valor"
        />
      </div>

      <div className="principal">
        <label>GRIS</label>
        <input
          type="text"
          value={gris}
          onChange={(e) => setGris(e.target.value)}
          placeholder="Digite o GRIS"
        />
      </div>

      <button className="botao-calcular" onClick={calcularFrete}>
        Frete Total
      </button>

      {valorFinal && (
        <p className="resultado">Frete Total: R$ {valorFinal}</p>
      )}
    </div>
  )
}

export default CalculadoraCotacao;
