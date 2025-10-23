'use client';
import React from 'react'
import styles from './App.module.css';
import { useRouter } from 'next/navigation';


function page() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        className={styles.buttonvoltar}
        onClick={() => router.back()}
      >
        ← Voltar
      </button>
      <h2>Formulário de manutenção predial</h2>
      <p>
        Esse formulário tem o objetivo de verificar as condições do local afim de manter
        segurança, funcionalidade e conservação do ambiente de trabalho.
        <br /><br />
        Quando você enviar este formulário, o proprietário verá seu nome e
        endereço de email.
      </p>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data da verificação</label>
        <input
          className={styles.input2}
          type="date"
          id="dataVerificacao"
          name="dataVerificacao"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do piso do escritório (ADM/ Diretoria/ Sala de reunião)?</label>
        <input
          className={styles.input2}
          type="text"
          id="pisoEscritorio"
          name="pisoEscritorio"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do piso da sala?(OPERACIONAL)</label>
        <input
          className={styles.input2}
          type="text"
          id="pisoSalaOpera"
          name="pisoSalaOpera"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do piso do GALPÃO?</label>
        <input
          className={styles.input2}
          type="text"
          id="pisoGalpao"
          name="pisoGalpao"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do piso REFEITÓRIO ?</label>
        <input
          className={styles.input2}
          type="text"
          id="pisoRefeitorio"
          name="pisoRefeitorio"
        />
    </div>
    
    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do forro/cobertura do escritório?(ADM/ Sala de reunião)</label>
        <input
          className={styles.input2}
          type="text"
          id="forroEscritorio"
          name="forroEscritorio"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do forro/cobertura do OPERACIONAL?</label>
        <input
          className={styles.input2}
          type="text"
          id="forroOperacional"
          name="forroOperacional"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do forro/cobertura do GALPÃO?</label>
        <input
          className={styles.input2}
          type="text"
          id="forroGalpao"
          name="forroGalpao"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições do forro/cobertura do REFEITÓRIO ?</label>
        <input
          className={styles.input2}
          type="text"
          id="forroRefeitorio"
          name="forroRefeitorio"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Qual estado geral das instalações elétricas?</label>
        <input
          className={styles.input2}
          type="text"
          id="eletrica"
          name="eletrica"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Qual estado geral de proteções contra raios?</label>
        <input
          className={styles.input2}
          type="text"
          id="raios"
          name="raios"
        />
    </div>    

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Administrativo</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim1" name="sim1" />
          <label htmlFor="sim1">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Diretoria</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim2" name="sim2" />
          <label htmlFor="sim2">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Reunião</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim3" name="sim3" />
          <label htmlFor="sim3">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação de carga ar condicionado - Sala Operacional</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim4" name="sim4" />
          <label htmlFor="sim4">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Administrativo</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim5" name="sim5" />
          <label htmlFor="sim5">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Diretoria</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim6" name="sim6" />
          <label htmlFor="sim6">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Reunião</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim7" name="sim7" />
          <label htmlFor="sim7">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Sala Operacional</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim8" name="sim8" />
          <label htmlFor="sim8">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Galpão</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim9" name="sim9" />
          <label htmlFor="sim9">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Refeitório</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim10" name="sim10" />
          <label htmlFor="sim10">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das lâmpadas - Banheiro Masculino</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim11" name="sim11" />
          <label htmlFor="sim11">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Maçaneta de todas portas estão em boas condições?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim12" name="sim12" />
          <label htmlFor="sim12">Sim</label>
        </div>
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Mesas do operacional estão com todas proteções no pé ?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim13" name="sim13" />
          <label htmlFor="sim13">Sim</label>
        </div>
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais condições das três paleteiras e do carrinho hidráulico? </label>
        <input
          className={styles.input2}
          type="text"
          id="hidraulico"
          name="hidraulico"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Referente a organização dos locais de trabalho estão corretas de modo a
        não oferecer riscos aos funcionários e aos produtos/serviços? </label>
        <input
          className={styles.input2}
          type="text"
          id="riscos"
          name="riscos"
        />
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Verificação das câmeras de segurança, as 11 estão fucionando corretamente e bem posicionadas ? (se não - informar imediatamente o gestor)</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim14" name="sim14" />
          <label htmlFor="sim14">Sim</label>
        </div>
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Quais as condições da balança de piso?</label>
        <input
          className={styles.input2}
          type="text"
          id="pisoBalança"
          name="pisoBalança"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Favor informar data da última aferição da balança</label>
        <input
          className={styles.input2}
          type="date"
          id="dataBalança"
          name="dataBalança"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Condições dos mictórios e lavatórios?</label>
        <input
          className={styles.input2}
          type="text"
          id="condiçãoLavatorio"
          name="condiçãoLavatorio"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Bebedouro -Informar data da última limpeza e troca de filtro (validade de 6 em 6 meses)</label>
        <input
          className={styles.input2}
          type="date"
          id="dataBalança"
          name="dataBalança"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data da próxima dedetização *</label>
        <input
          className={styles.input2}
          type="date"
          id="dataDedetização"
          name="dataDedetização"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>EXTINTORES - Informar data da última recarga dos extintores</label>
        <input
          className={styles.input2}
          type="date"
          id="dataExtintor"
          name="dataExtintor"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data da próxima recarga dos extintores</label>
        <input
          className={styles.input2}
          type="date"
          id="dataExtintorRecarga"
          name="dataExtintorRecarga"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Caixa D'água- Informar data da última limpeza (validade de 6 em 6 meses)</label>
        <input
          className={styles.input2}
          type="date"
          id="dataCaixaDAgua"
          name="dataCaixaDAgua"
        />
    </div>

    
    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Data da próxima limpeza</label>
        <input
          className={styles.input2}
          type="date"
          id="dataLimpeza"
          name="dataLimpeza"
        />
    </div>

    <div className={styles.checkboxGroup}>
        <label className={styles.inputtitle}>Alguma cadeira está em má condição para uso?</label>
        <div className={styles.checkboxOption}>
          <input className={styles.inputcheckbox} type="checkbox" id="sim15" name="sim15" />
          <label htmlFor="sim15">Sim</label>
        </div>
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Se a resposta da pergunta acima for 'sim' descreva de qual setor é a
        cadeira, e qual posição ela se encontra</label>
        <input
          className={styles.input2}
          type="text"
          id="cadeiraDesc"
          name="cadeiraDesc"
        />
    </div>

    <div className={styles.textgroup}>
        <label className={styles.inputtitle}>Algum detalhe adicional? descreva abaixo.</label>
        <input
          className={styles.input2}
          type="text"
          id="adicional"
          name="adicional"
        />
    </div>

    <button type="submit" className={styles.buttonenviar}>Enviar</button>
    </div>
  );
}

export default page