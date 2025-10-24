"use client"

import React, {useState} from 'react'
import styles from './App.module.css'; 

const CalculadoraCotacao = () => {
  const [veiculo, setVeiculo] = useState("");
  const [km, setKm] = useState("");
  const [ajudante, setAjudante] = useState("");
  const [avValorem, setAvValorem] = useState("");
  const [gris, setGris] = useState("");
  const [valorFinal, setValorFinal] = useState(null);

  // 🔹 Tabela base e frete mínimo
  const tabelaBase = {
    fiorino: { base: 150, minimo: 200 },
    van: { base: 180, minimo: 250 },
    vuc: { base: 220, minimo: 300 },
    "3/4": { base: 280, minimo: 350 },
    toco: { base: 320, minimo: 400 },
    truck: { base: 400, minimo: 500 },
    carreta: { base: 500, minimo: 600 },
    "carreta-trucada": { base: 600, minimo: 700 },
    moto: { base: 80, minimo: 100 },
  };

  // 🔸 Frete mínimo
  const freteMinimo = () => {
    if (!veiculo) {
      alert("Selecione um veículo para calcular o frete mínimo!");
      return;
    }

    const valorMinimo = tabelaBase[veiculo].minimo;
    setValorFinal(valorMinimo.toFixed(2));
  };

  // 🔸 Adicionais (GRIS, ajudante, av valorem)
  const usarAdicionais = () => {
    const ajud = parseInt(ajudante) || 0;
    const valorem = parseFloat(avValorem.replace(",", ".")) || 0;
    const grisValor = parseFloat(gris.replace(",", ".")) || 0;

    const custoAjudante = ajud * 100;
    const adicionais = custoAjudante + valorem + grisValor;

    if (adicionais === 0) {
      alert("Nenhum adicional informado!");
      return;
    }

    setValorFinal((prev) => {
      const atual = parseFloat(prev) || 0;
      return (atual + adicionais).toFixed(2);
    });
  };

  // 🔸 Frete completo
  const calcularFrete = () => {
    if (!veiculo || !km) {
      alert("Preencha pelo menos o veículo e a quilometragem!");
      return;
    }

    const kmValor = parseFloat(km.replace(",", "."));
    if (isNaN(kmValor)) {
      alert("Digite uma quilometragem válida!");
      return;
    }

    const ajud = parseInt(ajudante) || 0;
    const valorem = parseFloat(avValorem.replace(",", ".")) || 0;
    const grisValor = parseFloat(gris.replace(",", ".")) || 0;

    const { base, minimo } = tabelaBase[veiculo];
    const custoKm = kmValor * 2.5;
    const custoAjudante = ajud * 100;
    const resultado = base + custoKm + valorem + grisValor + custoAjudante;

    // Garante que o valor nunca fique abaixo do mínimo
    const valorFinal = Math.max(resultado, minimo);

    setValorFinal(valorFinal.toFixed(2));
  };
  
  return (
    <div className={styles.calculadoraContainer}>
      <div className={styles.calculadoraContent}>
        
        <div className={styles.calculadoraRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Veículo</label>
            <select
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
              className={styles.formSelect}
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

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>KM</label>
            <input
              type="text"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="Digite a quilometragem"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.calculadoraBotoes}>
          <button className={styles.botaoSecundario} onClick={freteMinimo}>
            Frete Mínimo
          </button>
          <button className={styles.botaoSecundario} onClick={usarAdicionais}>
            Usar Adicionais
          </button>
        </div>

        <div className={styles.calculadoraRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ajudante</label>
            <input
              type="text"
              value={ajudante}
              onChange={(e) => setAjudante(e.target.value)}
              placeholder="Quantidade de ajudantes"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Av valorem</label>
            <input
              type="text"
              value={avValorem}
              onChange={(e) => setAvValorem(e.target.value)}
              placeholder="Digite o valor"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.calculadoraRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>GRIS</label>
            <input
              type="text"
              value={gris}
              onChange={(e) => setGris(e.target.value)}
              placeholder="Digite o GRIS"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.calculadoraAcao}>
          <button className={styles.btnSubmit} onClick={calcularFrete}>
            Calcular Frete Total
          </button>
        </div>

        {valorFinal && (
          <div className={styles.resultadoContainer}>
            <h3 className={styles.resultadoTitulo}>Valor do Frete:</h3>
            <p className={styles.resultadoValor}>R$ {valorFinal}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculadoraCotacao;