import { useMemo, useState } from "react";
import empreendimentos from "./dados/baseMaster";
export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [busca, setBusca] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState(
    "Digite um CEP, bairro ou região para buscar empreendimentos."
  );
  const [empreendimentoSelecionado, setEmpreendimentoSelecionado] =
    useState(null);

  const senhaCorreta = "master2026";


  const totalEmpreendimentos = useMemo(() => empreendimentos.length, []);

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      setLiberado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const limparNumero = (valor) => String(valor || "").replace(/\D/g, "");

  const normalizarTexto = (valor) =>
    String(valor || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(valor || 0);

  const resumoTipologias = (item) => {
    if (!item.tipologias || item.tipologias.length === 0) {
      return "Tipologias não cadastradas";
    }

    return item.tipologias
      .map((t) => {
        const area =
          t.areaMin && t.areaMax
            ? `${String(t.areaMin).replace(".", ",")} a ${String(t.areaMax).replace(".", ",")} m²`
            : t.areaMin
            ? `${String(t.areaMin).replace(".", ",")} m²`
            : "área não informada";

        return `${t.tipologia || "Tipologia"} • ${area} • Varanda: ${t.varanda || "Não informado"} • Vaga: ${t.vaga || "Não informado"} • ${t.precoTexto || "Preço não informado"}`;
      })
      .join(" | ");
  };


  const formatarOpcao = (valor) => {
    const texto = String(valor || "").trim();
    const normalizado = normalizarTexto(texto);

    if (!texto || texto === "0") return "Não";
    if (normalizado === "opcao") return "Opção";
    if (normalizado === "sim") return "Sim";
    if (normalizado === "nao") return "Não";

    return texto;
  };

  const renderTipologias = (item) => {
    if (!item.tipologias || item.tipologias.length === 0) {
      return <div style={styles.tipoLinha}>Tipologias não cadastradas</div>;
    }

    return item.tipologias.map((t, index) => {
      const area =
        t.areaMin && t.areaMax
          ? `${String(t.areaMin).replace(".", ",")} a ${String(t.areaMax).replace(".", ",")} m²`
          : t.areaMin
          ? `${String(t.areaMin).replace(".", ",")} m²`
          : "área não informada";

      return (
        <div key={index} style={styles.tipoLinha}>
          <strong>{t.tipologia || "Tipologia"}</strong> • {area} • Varanda:{" "}
          {formatarOpcao(t.varanda)} • Vaga: {formatarOpcao(t.vaga)} •{" "}
          {t.precoTexto || "Preço não informado"}
        </div>
      );
    });
  };

  const menorPrecoTipologias = (item) => {
    const precos = (item.tipologias || [])
      .map((t) => Number(t.precoNumero || 0))
      .filter((valor) => valor > 0);

    if (precos.length === 0) return 0;
    return Math.min(...precos);
  };

  const buscarEmpreendimentos = () => {
    const termoOriginal = busca.trim();
    const termo = normalizarTexto(termoOriginal);
    const cepLimpo = limparNumero(termoOriginal);
    const max = precoMaximo ? Number(precoMaximo) : null;

    if (!termoOriginal) {
      setResultados([]);
      setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
      return;
    }

    const termoSemZona = termo
      .replace("zona norte", "norte")
      .replace("zona sul", "sul")
      .replace("zona leste", "leste")
      .replace("zona oeste", "oeste")
      .replace("zona central", "central")
      .trim();

    let encontrados = empreendimentos.filter((item) => {
      const regiaoNormalizada = normalizarTexto(item.regiao);
      const bairroNormalizado = normalizarTexto(item.bairro);
      const nomeNormalizado = normalizarTexto(item.nome);

      const textoCompleto = normalizarTexto(
        [
          item.nome,
          item.construtora,
          item.regiao,
          `zona ${item.regiao}`,
          item.bairro,
          item.endereco,
          item.numero,
          item.cep,
          item.enderecoCompleto,
          item.enquadramento,
          item.estacaoPrincipal,
          item.metroCptm,
          item.distanciaMetro,
          resumoTipologias(item),
        ].join(" ")
      );

      const bateCep =
        cepLimpo.length >= 2 && item.faixaCep === cepLimpo.substring(0, 2);

      const bateRegiao =
        regiaoNormalizada.includes(termoSemZona) ||
        termoSemZona.includes(regiaoNormalizada);

      const bateBairro =
        bairroNormalizado.includes(termo) ||
        bairroNormalizado.includes(termoSemZona);

      const bateNome =
        nomeNormalizado.includes(termo) ||
        nomeNormalizado.includes(termoSemZona);

      const bateTexto =
        textoCompleto.includes(termo) || textoCompleto.includes(termoSemZona);

      return bateCep || bateRegiao || bateBairro || bateNome || bateTexto;
    });

    if (max) {
      encontrados = encontrados.filter((item) => {
        const preco = Number(item.precoNumero || 0) || menorPrecoTipologias(item);
        return preco > 0 && preco <= max;
      });
    }

    encontrados.sort((a, b) => {
      const precoA =
        Number(a.precoNumero || 0) || menorPrecoTipologias(a) || 999999999;
      const precoB =
        Number(b.precoNumero || 0) || menorPrecoTipologias(b) || 999999999;
      return precoA - precoB;
    });

    setResultados(encontrados);

    if (encontrados.length > 0) {
      setMensagem(`Encontramos ${encontrados.length} empreendimento(s).`);
    } else {
      setMensagem("Nenhum empreendimento encontrado com esses filtros.");
    }
  };

  const limparBusca = () => {
    setBusca("");
    setPrecoMaximo("");
    setResultados([]);
    setMensagem("Digite um CEP, bairro ou região para buscar empreendimentos.");
    setEmpreendimentoSelecionado(null);
  };

  const handleEnterBusca = (e) => {
    if (e.key === "Enter") {
      buscarEmpreendimentos();
    }
  };

  if (!liberado) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2 style={styles.loginTitle}>🏠 Rurick Gomes – Casa Própria</h2>

          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") verificarSenha();
            }}
            style={styles.input}
          />

          <button style={styles.button} onClick={verificarSenha}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  if (empreendimentoSelecionado) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.headerCard}>
            <button
              onClick={() => setEmpreendimentoSelecionado(null)}
              style={styles.secondaryButton}
            >
              ← Voltar
            </button>

            <div style={{ marginTop: 18 }}>
              <div style={styles.brandTop}>Detalhamento do empreendimento</div>
              <h1 style={styles.titleInterna}>
                {empreendimentoSelecionado.nome}
              </h1>

              <p style={styles.enderecoLinha}>
                {empreendimentoSelecionado.enderecoCompleto}
              </p>

              <p style={styles.subtitle}>
                Bairro: {empreendimentoSelecionado.bairro || "Não informado"} • Região:{" "}
                {empreendimentoSelecionado.regiao || "Não informada"}
              </p>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Valor inicial</span>
                <span style={styles.statValueSmall}>
                  {empreendimentoSelecionado.precoTexto}
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>Metragem base</span>
                <span style={styles.statValueSmall}>
                  {empreendimentoSelecionado.metragemBase}
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>Entrega</span>
                <span style={styles.statValueSmall}>
                  {empreendimentoSelecionado.entrega || "Não informada"}
                </span>
              </div>

              <div style={styles.statCard}>
                <span style={styles.statLabel}>Unidades disponíveis</span>
                <span style={styles.statValueSmall}>
                  {empreendimentoSelecionado.unidadesDisponiveis &&
                  empreendimentoSelecionado.unidadesDisponiveis !== "0"
                    ? empreendimentoSelecionado.unidadesDisponiveis
                    : "Não informado"}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.messageBox}>
            Tipologias cadastradas para este empreendimento
          </div>

          {!empreendimentoSelecionado.tipologias ||
          empreendimentoSelecionado.tipologias.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📄</div>
              <h3 style={styles.emptyTitle}>Sem tipologias cadastradas</h3>
              <p style={styles.emptyText}>
                Este empreendimento ainda não tem informações de dormitórios,
                varanda, vaga, área e preço na aba de tipologias.
              </p>
            </div>
          ) : (
            <div style={styles.detailGrid}>
              {empreendimentoSelecionado.tipologias.map((item, index) => (
                <div key={index} style={styles.detailCard}>
                  <h3 style={styles.detailTitle}>{item.tipologia}</h3>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Área</span>
                    <span style={styles.detailValue}>
                      {item.areaMin
                        ? `${String(item.areaMin).replace(".", ",")} m²`
                        : "Não informada"}
                    </span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Varanda</span>
                    <span style={styles.detailValue}>
                      {formatarOpcao(item.varanda)}
                    </span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Vaga / Garagem</span>
                    <span style={styles.detailValue}>
                      {formatarOpcao(item.vaga)}
                    </span>
                  </div>

                  <div style={styles.divider}></div>

                  <div style={styles.priceArea}>
                    <div style={styles.priceText}>
                      {item.precoTexto || "Preço não informado"}
                    </div>
                    <div style={styles.priceSub}>
                      Referência: {item.referencia || "a partir de"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerCard}>
          <div style={styles.brandRow}>
            <div style={styles.brandBadge}>C</div>

            <div style={styles.brandInfo}>
              <div style={styles.brandTop}>Ferramenta interna do corretor</div>
              <h1 style={styles.title}>Buscador de Empreendimentos</h1>
              <p style={styles.subtitle}>
                Consulta rápida por CEP, bairro, região ou empreendimento
              </p>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Empreendimentos</span>
              <span style={styles.statValue}>{totalEmpreendimentos}</span>
            </div>

            <div style={styles.statCard}>
              <span style={styles.statLabel}>Pesquisa</span>
              <span style={styles.statValue}>CEP / Bairro</span>
            </div>
          </div>
        </div>

        <div style={styles.searchPanel}>
          <input
            type="text"
            placeholder="Digite o CEP, bairro, região ou nome do empreendimento"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={handleEnterBusca}
            enterKeyHint="search"
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Preço máximo"
            value={precoMaximo}
            onChange={(e) => setPrecoMaximo(e.target.value)}
            onKeyDown={handleEnterBusca}
            enterKeyHint="search"
            style={styles.input}
          />

          <div style={styles.buttonRow}>
            <button
              onClick={buscarEmpreendimentos}
              style={styles.primaryButton}
            >
              Buscar
            </button>

            <button onClick={limparBusca} style={styles.secondaryButton}>
              Limpar
            </button>
          </div>
        </div>

        <div style={styles.messageBox}>{mensagem}</div>

        {resultados.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏢</div>
            <h3 style={styles.emptyTitle}>Pronto para consultar</h3>
            <p style={styles.emptyText}>
              Pesquise por Mooca, Belém, Pirituba, Campo Limpo, Zona Leste,
              Zona Sul ou por CEP.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {resultados.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.regionBadge}>
                    {item.regiao || "Região não informada"}
                  </span>
                </div>

                <h2 style={styles.cardTitle}>{item.nome}</h2>

                <div style={styles.infoBlockCentral}>
                  <div style={styles.infoRowColumnCenter}>
                    <span style={styles.infoLabel}>Endereço</span>
                    <span style={styles.infoValueCenter}>
                      {item.enderecoCompleto}
                    </span>
                  </div>
                  <div style={styles.infoRowCenter}>
                    <span style={styles.infoLabel}>Metrô/CPTM</span>
                    <span style={styles.infoValueCenter}>
                    {(item.estacaoPrincipal || item.metroCptm || "Não informado")}
                    {item.distanciaMetro ? ` • ${item.distanciaMetro}` : ""}
                      </span>
                      </div>
                  <div style={styles.infoRowCenter}>
                    <span style={styles.infoLabel}>Entrega</span>
                    <span style={styles.infoValueCenter}>
                      {item.entrega || "Não informada"}
                    </span>
                  </div>

                  <div style={styles.infoRowCenter}>
                    <span style={styles.infoLabel}>Unidades disponíveis</span>
                    <span style={styles.infoValueCenter}>
                      {item.unidadesDisponiveis && item.unidadesDisponiveis !== "0"
                        ? item.unidadesDisponiveis
                        : "Não informado"}
                    </span>
                  </div>

                  <div style={styles.infoRowColumnCenter}>
                    <span style={styles.infoLabel}>Tipologias</span>
                    <div style={styles.tipoBox}>{renderTipologias(item)}</div>
                  </div>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.priceArea}>
                  <div style={styles.priceText}>{item.precoTexto}</div>
                  {item.precoNumero ? (
                    <div style={styles.priceSub}>
                      Referência: {formatarMoeda(item.precoNumero)}
                    </div>
                  ) : (
                    <div style={styles.priceSub}>
                      Preço ainda não cadastrado na tipologia
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setEmpreendimentoSelecionado(item)}
                  style={{
                    ...styles.primaryButton,
                    marginTop: 16,
                    width: "100%",
                  }}
                >
                  Ver tipologias
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  loginPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f5f9",
    padding: "20px",
  },
  loginBox: {
    background: "#ffffff",
    padding: "28px 20px",
    borderRadius: "20px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.10)",
    textAlign: "center",
    width: "100%",
    maxWidth: "380px",
  },
  loginTitle: {
    marginBottom: "20px",
    color: "#0f172a",
    fontSize: "22px",
  },
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #0f3d91 0%, #1e63d6 14%, #f4f7fb 14%, #f4f7fb 100%)",
    padding: "16px 10px 32px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  headerCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "18px",
    boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
    marginBottom: "16px",
  },
  brandRow: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "18px",
  },
  brandInfo: {
    flex: 1,
  },
  brandBadge: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #0f3d91, #1e63d6)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    boxShadow: "0 10px 22px rgba(30, 99, 214, 0.25)",
    flexShrink: 0,
  },
  brandTop: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "6px",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    lineHeight: 1.12,
    color: "#0f172a",
  },
  titleInterna: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.18,
    color: "#0f172a",
  },
  enderecoLinha: {
    margin: "8px 0 0",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1.4,
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.4,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
    marginTop: "16px",
  },
  statCard: {
    background: "#f8fbff",
    border: "1px solid #d8e4f8",
    borderRadius: "16px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#0f172a",
  },
  statValueSmall: {
    fontSize: "17px",
    fontWeight: "bold",
    color: "#0f172a",
  },
  searchPanel: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "14px",
    boxShadow: "0 10px 28px rgba(15, 23, 42, 0.07)",
    marginBottom: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 14px",
    borderRadius: "14px",
    border: "1px solid #cfdced",
    fontSize: "16px",
    outline: "none",
    background: "#ffffff",
    color: "#0f172a",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "4px",
  },
  primaryButton: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #0f3d91, #1e63d6)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(30, 99, 214, 0.22)",
  },
  secondaryButton: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cfdced",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #0f3d91, #1e63d6)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  messageBox: {
    background: "#ffffff",
    border: "1px solid #d8e4f8",
    borderRadius: "16px",
    padding: "12px 14px",
    textAlign: "center",
    color: "#1e293b",
    fontWeight: "bold",
    boxShadow: "0 8px 22px rgba(15, 23, 42, 0.05)",
    marginBottom: "14px",
    fontSize: "14px",
  },
  emptyState: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "34px 18px",
    textAlign: "center",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
  },
  emptyIcon: {
    width: "82px",
    height: "82px",
    borderRadius: "999px",
    margin: "0 auto 16px",
    background: "#eef4ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#0f172a",
  },
  emptyText: {
    marginTop: "10px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "14px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "18px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.07)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  regionBadge: {
    background: "#e8f0ff",
    color: "#0f3d91",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold",
  },
  cardTitle: {
    margin: "0 0 14px",
    fontSize: "24px",
    color: "#0f172a",
    lineHeight: 1.14,
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  infoRowColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "13px",
  },
  infoValue: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1.45,
  },
  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "16px 0",
  },
  priceArea: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  priceText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#059669",
    lineHeight: 1.1,
  },
  priceSub: {
    fontSize: "13px",
    color: "#64748b",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "14px",
  },
  detailCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "18px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.07)",
  },
  detailTitle: {
    margin: "0 0 14px",
    fontSize: "22px",
    color: "#0f172a",
    lineHeight: 1.2,
  },
  detailRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginBottom: "10px",
  },
  detailLabel: {
    color: "#64748b",
    fontSize: "12px",
  },
  detailValue: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
  },
};