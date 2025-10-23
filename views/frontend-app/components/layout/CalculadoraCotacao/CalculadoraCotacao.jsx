import React, {useState} from 'react'
import './CalculadoraCotacao.css';


const CalculadoraCotacao = () => {
    const[custo, setCusto] = useState("");
    const [porcentagem, setPorcentagem] = useState("");
    const[valorFinal, setValorFinal] = useState(null);
    const calcular = ()=> {
      const c = parseFloat(custo.replace(",", "."));
      const p = parseFloat(porcentagem.replace(",", "."));
      if(isNaN(c) || isNaN(p)){
        alert("Para fazer a operação, digite apenas valores válidos!")
        return;
      }
      const resultado = c + (c * p/100)
      setValorFinal(resultado.toFixed(2));
    }

  return (
    <div className="cotacao-container">
      
      <h2 className="cotacao-titulo">Modelo de Cotação</h2>
      <div className="principal">
        <label>Custo Total (R$)</label>
        <input 
        className=''
        type="text"
        value={custo}
        onChange={(e) => setCusto(e.target.value)}
        placeholder='0,00'

        
        />


    </div>

    <div className='principal'>
      <label>Porcentagem (%)</label>
      <input type="text"
      value={porcentagem}
      onChange={(e)=> setPorcentagem(e.target.value)}
      placeholder='0,00'
      
      />

    

    </div>

      <button className='botao-calcular' onClick={calcular}>
          Calcular Valor final


      </button>

      {valorFinal && (
          <p className='resultado'>Valor Final: R$ {valorFinal}</p>

      )}

    </div>
  )
}

export default CalculadoraCotacao;