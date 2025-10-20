"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        
        <div className={styles.container}>
            <a className={styles.link} onClick={() => router.push("/pagina-agregado")}><strong>← Voltar</strong></a>
            <h1>CHECKLIST de Veículos Agregados</h1>
            <div className={styles.formulario}>
                <label className={styles.label}>Nome completo do motorista: </label>
                <input className={styles.input} type="text" id="nome" name="nome"></input>
                <label className={styles.label}>CPF: </label>
                <input className={styles.input} type="text" id="CPF" name="CPF"></input>
                <label className={styles.label}>Placa do veículo: </label>
                <p>Somente LETRAS e  NÚMEROS (sem traço)</p>
                <input className={styles.input} type="text" id="placa" name="placa"></input>
                <label className={styles.label}>Tipo de Veículo:</label>
                <div className={styles.radioGroup}>
                    <input type="radio" id="FIORINO" name="tipo_veiculo" value="FIORINO" />
                    <label htmlFor="FIORINO">FIORINO</label>

                    <input type="radio" id="VAN" name="tipo_veiculo" value="VAN" />
                    <label htmlFor="VAN">VAN</label>

                    <input type="radio" id="VUC" name="tipo_veiculo" value="VUC" />
                    <label htmlFor="VUC">VUC</label>

                    <input type="radio" id="3/4" name="tipo_veiculo" value="3/4" />
                    <label htmlFor="3/4">3/4</label>

                    <input type="radio" id="TOCO" name="tipo_veiculo" value="TOCO" />
                    <label htmlFor="TOCO">TOCO</label>

                    <input type="radio" id="TRUCK" name="tipo_veiculo" value="TRUCK" />
                    <label htmlFor="TRUCK">TRUCK</label>

                    <input type="radio" id="CARRETA" name="tipo_veiculo" value="CARRETA" />
                    <label htmlFor="CARRETA">CARRETA</label>
                </div>

                <h2><strong>MOTOR</strong></h2>
                <p>Verificação do vazamentos e nível de óleo e água no motor do veículo.</p>

                <label className={styles.label}>VISTORIA</label>
                <p>
                    1 - Verifique o nível do óleo usando a vareta. <br></br>
                    2 - Verifique se tem poças ou gotas de óleo no motor ou no chão. <br></br>
                    3 - Verifique visualmente se a água do reservatório está no nível.
                </p>

                <table className={styles.radioTable}>
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
                    <td>Nível de ÁGUA do reservatório está bom?</td>
                    <td><input type="radio" name="nivel_agua" value="SIM" /></td>
                    <td><input type="radio" name="nivel_agua" value="NAO" /></td>
                    <td><input type="radio" name="nivel_agua" value="NA" /></td>
                    </tr>
                </tbody>
                </table>
                <label className={styles.label}>Foto do motor do veículo</label>
                <input className={styles.inputImage} type="file" accept="image/*" />

                <label className={styles.label}>Foto etiqueta da última troca de óleo</label>
                <input className={styles.inputImage} type="file" accept="image/*" />

                <h2><strong>PNEUS</strong></h2>
                <p>Verificação do estado de conservação dos PNEUS do veículo.</p>
                <table className={styles.radioTable}>
                <thead>
                    <tr>
                    <th>Pneus estão LISOS?</th>
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
                <label className={styles.label}>FOTOS GERAIS - Comprobatórias</label>
                <p>
                    1 - PNE - Pneu Dianteiro Esquerdo <br></br>
                    2 - PTE - Pneu Traseiro Esquerdo <br></br>
                    3 - PTD - Pneu Traseiro Direito <br></br>
                    4 - PDD - Pneu Dianteiro Direito
                </p>
                <input className={styles.inputImage} type="file" accept="image/*" />
                <h2><strong>CONSERVAÇÃO | APARÊNCIA | SEGURANÇA</strong></h2>
                <table className={styles.radioTable}>
                <thead>
                    <tr>
                    <th>Limpeza e Aparência externa do veículo</th>
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
                <table className={styles.radioTable}>
                <thead>
                    <tr>
                    <th>Sistema Elétrico</th>
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
                <table className={styles.radioTable}>
                <thead>
                    <tr>
                    <th>Itens obrigatórios e Segurança Individual</th>
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
                <label className={styles.label}>FOTOS GERAIS</label>
                <p>
                    (Adicione 4 fotos do veículo) <br></br>
                    1 - Frente do veículo <br></br>
                    2 - Lateral Direita<br></br>
                    3 - Lateral Esquerda<br></br>
                    4 - Traseira com a porta ABERTA
                </p>
                <input type="file" accept="image/*" />
                <label className={styles.label}>OBSERVAÇÕES SOBRE O VEÍCULO</label>
                <input className={styles.input} type="text" id="observacao" name="observacao"></input>
                <label className={styles.label}>Responsável pela Vistoria</label>
                <div className={styles.radioGroupCircles}>
                    <div className={styles.radioItem}>
                        <input type="radio" id="DiegoSavio" name="responsavel" value="Diego Sávio" />
                        <span>Diego Sávio</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="GabrielAndrade" name="responsavel" value="Gabriel Andrade" />
                        <span>Gabriel Andrade</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="IgorCarvalho" name="responsavel" value="Igor Carvalho" />
                        <span>Igor Carvalho</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="JuniorPereira" name="responsavel" value="Junior Pereira" />
                        <span>Junior Pereira</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="LuisOliveira" name="responsavel" value="Luis Oliveira" />
                        <span>Luis Oliveira</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="RuanHofacher" name="responsavel" value="Ruan Hofacher" />
                        <span>Ruan Hofacher</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="SamuelLucas" name="responsavel" value="Samuel Lucas" />
                        <span>Samuel Lucas</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="TatianeDias" name="responsavel" value="Tatiane Dias" />
                        <span>Tatiane Dias</span>
                    </div>

                    <div className={styles.radioItem}>
                        <input type="radio" id="Outro" name="responsavel" value="Outro" />
                        <span>Outro:</span>
                        <input className={styles.input} type="text" id="outro" name="outro" />
                    </div>
                </div>


                <button className={styles.btn_enviar} type="submit">Enviar</button>
            </div>
        </div>
    )
}