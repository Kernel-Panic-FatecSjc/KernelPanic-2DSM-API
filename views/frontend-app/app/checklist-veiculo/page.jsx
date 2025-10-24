"use client";

import styles from "./App.module.css";
import { useRouter } from "next/navigation";
import Login from "../../components/layout/Login/login";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.lateral}>
        <Login />
      </div>

      <div className={styles.formularioWrapper}>
        <a className={styles.link} onClick={() => router.push("/pagina-agregado")}>
          <strong>← Voltar</strong>
        </a>

        <div className={styles.formulario}>
          <h1>CHECKLIST de Veículos Agregados</h1>

          <label className={styles.label}><strong>Nome completo do motorista:</strong></label>
          <input className={styles.input} type="text" id="nome" name="nome" />

          <label className={styles.label}><strong>CPF:</strong></label>
          <input className={styles.input} type="text" id="CPF" name="CPF" />

          <label className={styles.label}><strong>Placa do veículo:</strong></label>
          <p>Somente LETRAS e NÚMEROS (sem traço)</p>
          <input className={styles.input} type="text" id="placa" name="placa" />

          <label className={styles.label}><strong>Tipo de Veículo:</strong></label>
          <div className={styles.radioGroup}>
            {["FIORINO", "VAN", "VUC", "3/4", "TOCO", "TRUCK", "CARRETA"].map((tipo) => (
              <div key={tipo}>
                <input type="radio" id={tipo} name="tipo_veiculo" value={tipo} />
                <label htmlFor={tipo}>{tipo}</label>
              </div>
            ))}
          </div>

          <h2><strong>MOTOR</strong></h2>
          <p>Verificação do vazamento e nível de óleo e água no motor do veículo.</p>

          <label className={styles.label}><strong>VISTORIA</strong></label>
          <p>
            1 - Verifique o nível do óleo usando a vareta.<br />
            2 - Verifique se há poças ou gotas de óleo no motor ou no chão.<br />
            3 - Verifique se a água do reservatório está no nível.
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

          <label className={styles.label}><strong>Foto do motor do veículo</strong></label>
          <input className={styles.inputImage} type="file" accept="image/*" />

          <label className={styles.label}><strong>Foto etiqueta da última troca de óleo</strong></label>
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
              {["PNE", "PTE", "PTD", "PDD"].map((pneu) => (
                <tr key={pneu}>
                  <td>{pneu} - Pneu {pneu === "PNE" ? "Dianteiro Esquerdo" :
                    pneu === "PTE" ? "Traseiro Esquerdo" :
                    pneu === "PTD" ? "Traseiro Direito" :
                    "Dianteiro Direito"}
                  </td>
                  <td><input type="radio" name={pneu} value="SIM" /></td>
                  <td><input type="radio" name={pneu} value="NAO" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <label className={styles.label}><strong>FOTOS GERAIS - Comprobatórias</strong></label>
          <p>
            1 - PNE - Pneu Dianteiro Esquerdo <br />
            2 - PTE - Pneu Traseiro Esquerdo <br />
            3 - PTD - Pneu Traseiro Direito <br />
            4 - PDD - Pneu Dianteiro Direito
          </p>
          <input className={styles.inputImage} type="file" accept="image/*" />

          <h2><strong>CONSERVAÇÃO | APARÊNCIA | SEGURANÇA</strong></h2>
          <p>Verifique o estado geral do veículo.</p>

          <label className={styles.label}><strong>FOTOS GERAIS</strong></label>
          <p>
            (Adicione 4 fotos do veículo)<br />
            1 - Frente do veículo<br />
            2 - Lateral Direita<br />
            3 - Lateral Esquerda<br />
            4 - Traseira com a porta ABERTA
          </p>
          <input className={styles.inputImage} type="file" accept="image/*" />

          <label className={styles.label}><strong>OBSERVAÇÕES SOBRE O VEÍCULO</strong></label>
          <input className={styles.input} type="text" id="observacao" name="observacao" />

          <label className={styles.label}><strong>Responsável pela Vistoria</strong></label>
          <div className={styles.radioGroupCircles}>
            {[
              "Diego Sávio",
              "Gabriel Andrade",
              "Igor Carvalho",
              "Junior Pereira",
              "Luis Oliveira",
              "Ruan Hofacher",
              "Samuel Lucas",
              "Tatiane Dias"
            ].map((nome) => (
              <div className={styles.radioItem} key={nome}>
                <input type="radio" id={nome} name="responsavel" value={nome} />
                <span>{nome}</span>
              </div>
            ))}
            <div className={styles.radioItem}>
              <input type="radio" id="Outro" name="responsavel" value="Outro" />
              <span>Outro:</span>
              <input className={styles.input} type="text" id="outro" name="outro" />
            </div>
          </div>

          <button className={styles.btn_enviar} type="submit">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
