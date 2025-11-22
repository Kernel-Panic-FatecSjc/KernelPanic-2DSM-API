'use client';
import { useState } from 'react';
import styles from './App.module.css';
import { useRouter } from 'next/navigation';
import ProtectRoute from '../../components/ProtectRoute';
import CalculadoraCotacao from '../../components/layout/CalculadoraCotacao/CalculadoraCotacao';

function GestaoComercial() {
    const router = useRouter();
    const [calculadoraAberta, setCalculadoraAberta] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);

    const [email, setEmail] = useState('');
    const [cliente, setCliente] = useState('');
    const [solicitante, setSolicitante] = useState('');
    const [ocPedidoNf, setOcPedidoNf] = useState('');
    const [dataHorarioColeta, setDataHorarioColeta] = useState('');
    const [localColeta, setLocalColeta] = useState('');
    const [localEntrega, setLocalEntrega] = useState('');
    const [pesoEstimado, setPesoEstimado] = useState('');
    const [tipoVeiculo, setTipoVeiculo] = useState('');
    const [valorFrete, setValorFrete] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const handleCalculadoraClick = () => {
        setCalculadoraAberta(true);
    };

    const handleFormularioClick = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setCalculadoraAberta(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            email, cliente, solicitante, ocPedidoNf,
            dataHorarioColeta, localColeta, localEntrega,
            pesoEstimado, tipoVeiculo, valorFrete, observacoes
        });
        setModalAberto(false);
    };

    return (
        <ProtectRoute>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Gestão Comercial</h1>
                    </div>
                    <div className={styles.cardsContainer}>
                        <div className={styles.card} onClick={handleCalculadoraClick}>
                            <div className={styles.iconcontainer}>
                                <img src='/images/calculadora.svg' className='card-image' alt='Calculadora'></img>
                            </div>
                            <h2>Calculadora de Cotação</h2>
                            <button>Acessar</button>
                        </div>
                        <div className={styles.card} onClick={handleFormularioClick}>
                            <div className={styles.iconcontainer}>
                                <img src='/images/caminhao-de-entrega (1).svg' className='card-image' alt='Gestão de Coletas'></img>
                            </div>
                            <h2>Gestão de Coletas</h2>
                            <button>Acessar</button>
                        </div>
                    </div>
                </div>

                {calculadoraAberta && (
                    <div className={styles.modalOverlay} onClick={fecharModal}>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxWidth: '600px' }}
                        >
                            <button className={styles.closeButton} onClick={fecharModal}>×</button>
                            <h2 className={styles.modalTitle}>Calculadora de Cotação</h2>
                            <CalculadoraCotacao />
                        </div>
                    </div>
                )}

                {modalAberto && (
                    <div className={styles.modalOverlay} onClick={fecharModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={fecharModal}>×</button>
                            <h2 className={styles.modalTitle}>Gestão de Coletas</h2>

                            <form onSubmit={handleSubmit} className={styles.responsiveForm}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>E-mail *</label>
                                    <input
                                        type="email"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Qual Cliente? *</label>
                                    <select
                                        className={styles.formSelect}
                                        value={cliente}
                                        onChange={(e) => setCliente(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Quem SOLICITA? *</label>
                                    <input
                                        type="text"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={solicitante}
                                        onChange={(e) => setSolicitante(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>OC / PEDIDO / NF da coleta? *</label>
                                    <input
                                        type="text"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={ocPedidoNf}
                                        onChange={(e) => setOcPedidoNf(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Data e horário de coleta? *</label>
                                    <input
                                        type="datetime-local"
                                        className={styles.formInput}
                                        value={dataHorarioColeta}
                                        onChange={(e) => setDataHorarioColeta(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>LOCAL da coleta (endereço)? *</label>
                                    <input
                                        type="text"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={localColeta}
                                        onChange={(e) => setLocalColeta(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>LOCAL de entrega (Endereço)? *</label>
                                    <input
                                        type="text"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={localEntrega}
                                        onChange={(e) => setLocalEntrega(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>PESO estimado (Kgs)? *</label>
                                    <input
                                        type="number"
                                        placeholder="Insira um número"
                                        className={styles.formInput}
                                        value={pesoEstimado}
                                        onChange={(e) => setPesoEstimado(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>TIPO DE VEÍCULO necessário? *</label>
                                    <select
                                        className={styles.formSelect}
                                        value={tipoVeiculo}
                                        onChange={(e) => setTipoVeiculo(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="caminhao">Caminhão</option>
                                        <option value="furgao">Furgão</option>
                                        <option value="van">Van</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>VALOR DO FRETE a ser cobrado? *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Insira o valor aqui"
                                        className={styles.formInput}
                                        value={valorFrete}
                                        onChange={(e) => setValorFrete(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>OBSERVAÇÕES para equipe operacional</label>
                                    <textarea
                                        placeholder="Insira o valor aqui"
                                        className={styles.formTextarea}
                                        value={observacoes}
                                        onChange={(e) => setObservacoes(e.target.value)}
                                        rows="4"
                                    />
                                </div>

                                <div className={styles.buttonGroup}>
                                    <button
                                        type="button"
                                        onClick={fecharModal}
                                        className={styles.btnCancel}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.btnSubmit}
                                    >
                                        Salvar
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

export default GestaoComercial;