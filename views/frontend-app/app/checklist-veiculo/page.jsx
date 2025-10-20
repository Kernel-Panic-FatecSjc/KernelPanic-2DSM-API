"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className={styles.conteudo}>
            <a className={styles.link} onClick={() => router.push("/pagina-agregado")}><strong>← Voltar</strong></a>
            <h1>CHECKLIST de Veículos Agregados</h1>
            <div className={styles.formulario}>
                <label>Nome completo do motorista: </label>
                <input type="text" id="nome" name="nome"></input>
                <label>CPF: </label>
                <input type="text" id="CPF" name="CPF"></input>
                <label>Placa do veículo: </label>
                <p>Somente LETRAS e  NÚMEROS (sem traço)</p>
                <input type="text" id="placa" name="placa"></input>
                <label>Tipo de Veículo: </label>
                <input type="radio" id="FIORINO" name="FIORINO" value="FIORINO"/>FIORINO
                <input type="radio" id="VAN" name="VAN" value="VAN"/>VAN
                <input type="radio" id="VUC" name="VUC" value="VUC"/>VUC
                <input type="radio" id="3/4" name="3/4" value="3/4"/>3/4
                <input type="radio" id="TOCO" name="TOCO" value="TOCO"/>TOCO
                <input type="radio" id="TRUCK" name="TRUCK" value="TRUCK"/>TRUCK
                <input type="radio" id="CARRETA" name="CARRETA" value="CARRETA"/>CARRETA
                <h2><strong>MOTOR</strong></h2>
                <p>Verificação do vazamentos e nível de óleo e água no motor do veículo.
                </p>
                <label>VISTORIA</label>
                <p>
                    1 - Verifique o nível do óleo usando a vareta. <br></br>
                    2 - Verifique se tem possas ou gotas de óleo no motor ou no chão. <br></br>
                    3 - Verifique visualmente se água reservatório está no nível.
                </p>
                <table className={styles.tabela}>
                <thead>
                    <tr>
                    <th></th>
                    <th>SIM</th>
                    <th>NÃO</th>
                    <th>NA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Nível de ÓLEO está bom?</td>
                    <td><input type="radio" name="nivel_oleo" value="SIM" /></td>
                    <td><input type="radio" name="nivel_oleo" value="NAO" /></td>
                    <td><input type="radio" name="nivel_oleo" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Livre de vazamentos de ÓLEO?</td>
                    <td><input type="radio" name="vazamento_oleo" value="SIM" /></td>
                    <td><input type="radio" name="vazamento_oleo" value="NAO" /></td>
                    <td><input type="radio" name="vazamento_oleo" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Nível de ÁGUA reservatório está bom?</td>
                    <td><input type="radio" name="nivel_agua" value="SIM" /></td>
                    <td><input type="radio" name="nivel_agua" value="NAO" /></td>
                    <td><input type="radio" name="nivel_agua" value="NA" /></td>
                    </tr>
                </tbody>
                </table> 
                <label>Foto do motor do veículo</label>
                <input type="file" accept="image/*" />
                <label>Foto etiqueta da última troca de óleo</label>
                <input type="file" accept="image/*" />
                <h2>PNEUS</h2>
                <p>Verificação do estado de conservação dos PNEUS do veículo.</p>
                <label>Pneus estão LISOS?</label>
                <table className={styles.tabela}>
                <thead>
                    <tr>
                    <th></th>
                    <th>SIM</th>
                    <th>NÃO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PNE - Pneu Dianteiro Esquerdo</td>
                        <td><input type="radio" name="PNE" value="SIM" /></td>
                        <td><input type="radio" name="PNE" value="NAO" /></td>
                    </tr>
                    <tr>
                        <td>PTE - Pneu Traseiro Esquerdo</td>
                        <td><input type="radio" name="PTE" value="SIM" /></td>
                        <td><input type="radio" name="PTE" value="NAO" /></td>
                    </tr>
                    <tr>
                        <td>PTD - Pneu Traseiro Direito</td>
                        <td><input type="radio" name="PTD" value="SIM" /></td>
                        <td><input type="radio" name="PTD" value="NAO" /></td>
                    </tr>
                    <tr>
                        <td>PDD - Pneu Dianteiro Direito</td>
                        <td><input type="radio" name="PDD" value="SIM" /></td>
                        <td><input type="radio" name="PDD" value="NAO" /></td>
                    </tr>
                </tbody>
                </table> 
                <label>FOTOS GERAIS - Comprobatórias</label>
                <p>
                    1 - PNE - Pneu Dianteiro Esquerdo <br></br>
                    2 - PTE - Pneu Traseiro Esquerdo <br></br>
                    3 - PTD - Pneu Traseiro Direito <br></br>
                    4 - PDD - Pneu Dianteiro Direito
                </p>
                <input type="file" accept="image/*" />
                <h2>CONSERVAÇÃO | APARÊNCIA | SEGURANÇA</h2>
                <label>Limpeza e Aparência externa do veículo</label>
                <table className={styles.tabela}>
                <thead>
                    <tr>
                    <th></th>
                    <th>SIM</th>
                    <th>NÃO</th>
                    <th>NA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Para-brisa em perfeito estado?	
                    </td>
                    <td><input type="radio" name="para_brisa" value="SIM" /></td>
                    <td><input type="radio" name="para_brisa" value="NAO" /></td>
                    <td><input type="radio" name="para_brisa" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Cabine (externa) está limpa?	
                    </td>
                    <td><input type="radio" name="cabine" value="SIM" /></td>
                    <td><input type="radio" name="cabine" value="NAO" /></td>
                    <td><input type="radio" name="cabine" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Veículo (externo) está limpo?	
                    </td>
                    <td><input type="radio" name="veiculo" value="SIM" /></td>
                    <td><input type="radio" name="veiculo" value="NAO" /></td>
                    <td><input type="radio" name="veiculo" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Livre de amassados/ferrugens? 	
                    </td>
                    <td><input type="radio" name="amassado_ferrugem" value="SIM" /></td>
                    <td><input type="radio" name="amassado_ferrugem" value="NAO" /></td>
                    <td><input type="radio" name="amassado_ferrugem" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Assoalho está conversado? Sem ferrugens ou amassados?	
                    </td>
                    <td><input type="radio" name="assoalho" value="SIM" /></td>
                    <td><input type="radio" name="assoalho" value="NAO" /></td>
                    <td><input type="radio" name="assoalho" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui FAIXAS REFLETIVAS?		
                    </td>
                    <td><input type="radio" name="faixa_reflexiva" value="SIM" /></td>
                    <td><input type="radio" name="faixa_reflexiva" value="NAO" /></td>
                    <td><input type="radio" name="faixa_reflexiva" value="NA" /></td>
                    </tr>
                </tbody>
                </table> 
                <label>Sistema elétrico</label>
                <table className={styles.tabela}>
                <thead>
                    <tr>
                    <th></th>
                    <th>SIM</th>
                    <th>NÃO</th>
                    <th>NA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Limpador Para-brisa funcionando?		
                    </td>
                    <td><input type="radio" name="para_brisa" value="SIM" /></td>
                    <td><input type="radio" name="para_brisa" value="NAO" /></td>
                    <td><input type="radio" name="para_brisa" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Buzina funciona?		
                    </td>
                    <td><input type="radio" name="buzina" value="SIM" /></td>
                    <td><input type="radio" name="buzina" value="NAO" /></td>
                    <td><input type="radio" name="buzina" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Farol ALTO (dois lados)?	
                    </td>
                    <td><input type="radio" name="farol_alto" value="SIM" /></td>
                    <td><input type="radio" name="farol_alto" value="NAO" /></td>
                    <td><input type="radio" name="farol_alto" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Farol BAIXO (dois lados)?		
                    </td>
                    <td><input type="radio" name="farol_baixo" value="SIM" /></td>
                    <td><input type="radio" name="farol_baixo" value="NAO" /></td>
                    <td><input type="radio" name="farol_baixo" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Setas dianteiras (dois lados)?	
                    </td>
                    <td><input type="radio" name="seta_dianteira" value="SIM" /></td>
                    <td><input type="radio" name="seta_dianteira" value="NAO" /></td>
                    <td><input type="radio" name="seta_dianteira" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Setas traseiras (dois lados)?	
                    </td>
                    <td><input type="radio" name="seta_traseira" value="SIM" /></td>
                    <td><input type="radio" name="seta_traseira" value="NAO" /></td>
                    <td><input type="radio" name="seta_traseira" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Pisca-Alerta (dois lados)?		
                    </td>
                    <td><input type="radio" name="pisca_alerta" value="SIM" /></td>
                    <td><input type="radio" name="pisca_alerta" value="NAO" /></td>
                    <td><input type="radio" name="pisca_alerta" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Luz de freio (dois lados)?		
                    </td>
                    <td><input type="radio" name="luz_freio" value="SIM" /></td>
                    <td><input type="radio" name="luz_freio" value="NAO" /></td>
                    <td><input type="radio" name="luz_freio" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Luz de Ré (dois lados)?			
                    </td>
                    <td><input type="radio" name="luz_re" value="SIM" /></td>
                    <td><input type="radio" name="luz_re" value="NAO" /></td>
                    <td><input type="radio" name="luz_re" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Sirene de Ré funciona?		
                    </td>
                    <td><input type="radio" name="sirene_re" value="SIM" /></td>
                    <td><input type="radio" name="sirene_re" value="NAO" /></td>
                    <td><input type="radio" name="sirene_re" value="NA" /></td>
                    </tr>
                </tbody>
                </table>
                <label>Itens obrigatórios e Segurança Individual</label>
                <table className={styles.tabela}>
                <thead>
                    <tr>
                    <th></th>
                    <th>SIM</th>
                    <th>NÃO</th>
                    <th>NA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Possui EXTINTOR?	
                    </td>
                    <td><input type="radio" name="extintor" value="SIM" /></td>
                    <td><input type="radio" name="extintor" value="NAO" /></td>
                    <td><input type="radio" name="extintor" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui STEP?		
                    </td>
                    <td><input type="radio" name="step" value="SIM" /></td>
                    <td><input type="radio" name="step" value="NAO" /></td>
                    <td><input type="radio" name="step" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui TRIANGULO?	
                    </td>
                    <td><input type="radio" name="triangulo" value="SIM" /></td>
                    <td><input type="radio" name="triangulo" value="NAO" /></td>
                    <td><input type="radio" name="triangulo" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui MACACO?		
                    </td>
                    <td><input type="radio" name="macaco" value="SIM" /></td>
                    <td><input type="radio" name="macaco" value="NAO" /></td>
                    <td><input type="radio" name="macaco" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui CHAVE DE RODA?	
                    </td>
                    <td><input type="radio" name="chave_roda" value="SIM" /></td>
                    <td><input type="radio" name="chave_roda" value="NAO" /></td>
                    <td><input type="radio" name="chave_roda" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui CAPACETE SEGURANÇA?	
                    </td>
                    <td><input type="radio" name="capacete" value="SIM" /></td>
                    <td><input type="radio" name="capacete" value="NAO" /></td>
                    <td><input type="radio" name="capacete" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui COLETE SEGURANÇA?		
                    </td>
                    <td><input type="radio" name="colete_seguranca" value="SIM" /></td>
                    <td><input type="radio" name="colete_seguranca" value="NAO" /></td>
                    <td><input type="radio" name="colete_seguranca" value="NA" /></td>
                    </tr>
                    <tr>
                    <td>Possui BOTA DE SEGURANÇA?		
                    </td>
                    <td><input type="radio" name="bota_seguranca" value="SIM" /></td>
                    <td><input type="radio" name="bota_seguranca" value="NAO" /></td>
                    <td><input type="radio" name="bota_seguranca" value="NA" /></td>
                    </tr>
                </tbody>
                </table>
                <label>FOTOS GERAIS</label>
                <p>
                    (Adicione 4 fotos do veículo) <br></br>
                    1 - Frente do veículo <br></br>
                    2 - Lateral Direita<br></br>
                    3 - Lateral Esquerda<br></br>
                    4 - Traseira com a porta ABERTA
                </p>
                <input type="file" accept="image/*" />
                <label>OBSERVAÇÕES SOBRE O VEÍCULO</label>
                <input type="text" id="observacao" name="observacao"></input>
                <label>Responsável pela Vistoria</label>
                <input type="radio" id="DiegoSavio" name="DiegoSavio" value="Diego Savio"/>Diego Sávio
                <input type="radio" id="VAN" name="VAN" value="VAN"/>Gabriel Andrade
                <input type="radio" id="VUC" name="VUC" value="VUC"/>Igor Carvalho
                <input type="radio" id="3/4" name="3/4" value="3/4"/>Junior Pereira
                <input type="radio" id="TOCO" name="TOCO" value="TOCO"/>Luis Oliveira
                <input type="radio" id="TRUCK" name="TRUCK" value="TRUCK"/>Ruan Hofacher
                <input type="radio" id="CARRETA" name="CARRETA" value="CARRETA"/>Samuel Lucas
                <input type="radio" id="CARRETA" name="CARRETA" value="CARRETA"/>Tatiane Dias
                <label>Outro</label>
                <input type="text" id="outro" name="outro"></input>
                <button type="submit">Enviar</button>
            </div>
        </div>
    )
}