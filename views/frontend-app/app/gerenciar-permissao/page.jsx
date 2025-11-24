"use client";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ProtectRoute from "../../components/ProtectRoute";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PERFIL_MAP = {
  master: 1,
  vendedor: 2,
  gestor: 3,
};

const PERMISSOES = {
  "Gerenciar Permissões": ["Acessar tela"],
  Administrativo: [
    "Avaliação dos eventos",
    "Cadastro de funcionários",
    "Calendário",
    "Eventos",
    "Gestão de localização",
    "Justificativas",
  ],
  Comercial: [
    "Agendamento",
    "Cotação e Coleta",
    "Desempenho dos vendedores",
    "Funil de vendas",
    "Gestão de clientes",
  ],
  Operacional: [
    "Área do Agregado",
    "Checklist e Formulários",
    "Gestão de Formulários",
  ],
  Dashboards: ["Visualizar Dashboards"],
  Relatórios: ["Visualizar Relatórios"],
  Eventos: ["Visualizar Eventos"],
};

function Gerenciamento() {
  const [modalOpen, setModalOpen] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargoSelecionado, setCargoSelecionado] = useState("");
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(`${apiUrl}/funcionario`);
        setFuncionarios(response.data.funcionarios);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const abrirModal = (func) => {
    setFuncionarioSelecionado(func);
    setCargoSelecionado(func.permissao);
    setPermissoesSelecionadas(func.permissoes || []);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setFuncionarioSelecionado(null);
    setCargoSelecionado("");
    setPermissoesSelecionadas([]);
    setIsSaving(false);
  };

  const togglePermissao = (tela) => {
    setPermissoesSelecionadas((prev) =>
      prev.includes(tela)
        ? prev.filter((p) => p !== tela)
        : [...prev, tela]
    );
  };

  const salvarAlteracoes = async (e) => {
    e.preventDefault();
    if (isSaving || !funcionarioSelecionado) return;

    setIsSaving(true);

    try {
      const funcionarioId = funcionarioSelecionado.id;
      const perfilNovoId = PERFIL_MAP[cargoSelecionado];

      // Atualizar cargo
      if (cargoSelecionado !== funcionarioSelecionado.permissao) {
        const perfilAntigoId = funcionarioSelecionado.perfilIdOriginal;
        if (perfilAntigoId) {
          await fetch(`${apiUrl}/funcionarios/${funcionarioId}/perfis/${perfilAntigoId}`, {
            method: "DELETE",
          });
        }
        await fetch(`${apiUrl}/funcionarios/${funcionarioId}/perfis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ perfis: [perfilNovoId] }),
        });
      }

      // Atualizar permissões
      await fetch(`${apiUrl}/funcionarios/${funcionarioId}/permissoes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissoes: permissoesSelecionadas }),
      });

      // Atualiza estado local
      setFuncionarios((prev) =>
        prev.map((f) =>
          f.id === funcionarioId
            ? {
                ...f,
                permissao: cargoSelecionado,
                perfilIdOriginal: perfilNovoId,
                permissoes: permissoesSelecionadas,
              }
            : f
        )
      );

      alert("Alterações salvas com sucesso!");
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert(`Erro ao salvar: ${error.message}`);
      setIsSaving(false);
    }
  };

  return (
    <ProtectRoute perfisPermitidos={["master"]}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Gerenciamento de Permissões</h1>

        <div className={styles.grid}>
          {funcionarios.map((f) => (
            <div key={f.id} className={styles.card}>
              <p>
                <strong>Funcionário:</strong> {f.nome}
              </p>
              <p>
                <strong>Cargo:</strong> {f.cargo}
              </p>
              <button
                className={styles.botao}
                onClick={() => abrirModal(f)}
              >
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
                  Nome:
                  <p>{funcionarioSelecionado.nome}</p>
                </label>

                <label>
                  Cargo:
                  <select
                    value={cargoSelecionado}
                    onChange={(e) => setCargoSelecionado(e.target.value)}
                  >
                    {Object.keys(PERFIL_MAP).map((perfil) => (
                      <option key={perfil} value={perfil}>
                        {perfil}
                      </option>
                    ))}
                  </select>
                </label>

                <div className={styles.permissoesContainer}>
                  {Object.entries(PERMISSOES).map(([categoria, telas]) => (
                    <div key={categoria} className={styles.categoria}>
                      <h4>{categoria}</h4>
                      {telas.map((tela) => (
                        <div key={tela} className={styles.checkboxOption}>
                          <input
                            type="checkbox"
                            id={`${funcionarioSelecionado.id}-${tela}`}
                            checked={permissoesSelecionadas.includes(tela)}
                            onChange={() => togglePermissao(tela)}
                          />
                          <label htmlFor={`${funcionarioSelecionado.id}-${tela}`}>
                            {tela}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={fecharModal}
                    className={`${styles.botao} ${styles.cancelar}`}
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.botao} disabled={isSaving}>
                    {isSaving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectRoute>
  );
}

export default Gerenciamento;
