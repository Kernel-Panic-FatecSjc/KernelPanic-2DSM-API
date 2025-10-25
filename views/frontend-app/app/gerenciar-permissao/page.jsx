"use client";
import { useState } from "react";
import styles from "./App.module.css";

function Gerenciamento() {
  const [modalOpen, setModalOpen] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const funcionarios = [
    { id: 1, nome: "João Silva", permissao: "Gestor", email: "joao@email.com" },
    { id: 2, nome: "Maria Souza", permissao: "Gestor", email: "maria@email.com" },
    { id: 3, nome: "Pedro Lima", permissao: "Gestor", email: "pedro@email.com" },
    { id: 4, nome: "Ana Costa", permissao: "Gestor", email: "ana@email.com" },
    { id: 5, nome: "Lucas Rocha", permissao: "Gestor", email: "lucas@email.com" },
    { id: 6, nome: "Fernanda Reis", permissao: "Gestor", email: "fernanda@email.com" },
  ];

  const abrirModal = (func) => {
    setFuncionarioSelecionado(func);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setFuncionarioSelecionado(null);
  };

  const salvarAlteracoes = (e) => {
    e.preventDefault();
    // Aqui você poderia atualizar o array de funcionários no estado, se necessário
    alert("Alterações salvas!");
    fecharModal();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Gerenciamento de Permissões</h1>

      <div className={styles.grid}>
        {funcionarios.map((f) => (
          <div key={f.id} className={styles.card}>
            <p><strong>Funcionário:</strong> {f.nome}</p>
            <p><strong>Nível de permissão: </strong>{f.permissao}</p>
            <button className={styles.botao} onClick={() => abrirModal(f)}>
              Editar
            </button>
          </div>
        ))}
      </div>

      {modalOpen && funcionarioSelecionado && (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                <h2>Editar Funcionário</h2>
                <form onSubmit={salvarAlteracoes}>
                    <label>
                    Nome:<p>
                    {funcionarioSelecionado.nome}
                    </p>
                    </label>
                    
                    <label>
                    Cargo:
                    <select defaultValue={funcionarios.permissao}>
                        <option value="Gestor">Gestor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    </label>

                <div className={styles.checkboxGroup}>
                    <label className={styles.inputtitle}>Pode cadastrar</label>
                    <div className={styles.checkboxOption}>
                        <input className={styles.inputcheckbox} type="checkbox" id="sim2" name="sim2" />
                        <label htmlFor="sim2">Sim</label>
                    </div>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.inputtitle}>Pode ver funcionarios </label>
                    <div className={styles.checkboxOption}>
                        <input className={styles.inputcheckbox} type="checkbox" id="sim3" name="sim3" />
                        <label htmlFor="sim3">Sim</label>
                    </div>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.inputtitle}>Pode gerenciar Clientes</label>
                    <div className={styles.checkboxOption}>
                        <input className={styles.inputcheckbox} type="checkbox" id="sim4" name="sim4" />
                        <label htmlFor="sim4">Sim</label>
                    </div>
                </div>

              <div className={styles.modalButtons}>
                <button
                  type="button"
                  onClick={fecharModal}
                  className={`${styles.botao} ${styles.cancelar}`}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.botao}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gerenciamento;
