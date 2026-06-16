import { useMemo, useState } from "react";
import empreendimentos from "./dados/baseMaster";
export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [busca, setBusca] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState(
    "Digite um CEP, bairro, região ou empreendimento para buscar."
  );
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tipologiasAbertas, setTipologiasAbertas] = useState({});

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

    if (precoMax) {
      encontrados = encontrados.filter(
        (e) => Number(e.precoNumero || 0) > 0 && Number(e.precoNumero) <= precoMax
      );
    }

    encontrados.sort((a, b) => {
      const pa = Number(a.precoNumero || 999999999);
      const pb = Number(b.precoNumero || 999999999);
      return pa - pb;
    });

    setResultados(encontrados);
    setMensagem(
      encontrados.length
        ? `Encontramos ${encontrados.length} empreendimento(s).`
        : "Nenhum empreendimento encontrado."
    );
  };

  const limpar = () => {
    setBusca("");
    setPrecoMaximo("");
    setResultados([]);
    setTipologiasAbertas({});
    setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
  };

  const alternarTipologias = (nome) => {
    setTipologiasAbertas((atual) => ({
      ...atual,
      [nome]: !atual[nome],
    }));
  };

  const formatarData = (valor) => {
    if (!valor) return "Não informada";
    if (valor.includes("T")) return valor.split("T")[0].split("-").reverse().join("/");
    if (valor.includes("00:00:00")) return valor.replace(" 00:00:00", "");
    return valor;
  };

  const formatarOpcao = (valor) => {
    const texto = String(valor || "").trim();
    const norm = normalizar(texto);

    if (!texto || texto === "0") return "Não informado";
    if (norm === "opcao") return "Opção";
    if (norm === "sim") return "Sim";
    if (norm === "nao") return "Não";

    return texto;
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
            onKeyDown={(e) => e.key === "Enter" && verificarSenha()}
            style={styles.input}
          />
          <button onClick={verificarSenha} style={styles.primaryButton}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logo}>C</div>
          <div>
            <div style={styles.sub}>Ferramenta interna do corretor</div>
            <h1 style={styles.title}>Buscador de Empreendimentos</h1>
            <p style={styles.text}>Consulta por CEP, bairro, região ou empreendimento</p>
          </div>
        </div>

        <div style={styles.box}>
          <span>Empreendimentos cadastrados</span>
          <h2>{carregando ? "Carregando..." : total}</h2>
        </div>

        {erro ? <div style={styles.error}>{erro}</div> : null}

        <div style={styles.searchBox}>
          <input
            placeholder="Digite CEP, bairro, região ou nome do empreendimento"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Preço máximo"
            value={precoMaximo}
            onChange={(e) => setPrecoMaximo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            style={styles.input}
          />

          <div style={styles.buttonRow}>
            <button onClick={buscar} style={styles.primaryButton}>
              Buscar
            </button>
            <button onClick={limpar} style={styles.secondaryButton}>
              Limpar
            </button>
          </div>
        </div>

        <div style={styles.message}>{mensagem}</div>

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
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f5f9",
    padding: 20,
  },
  loginBox: {
    background: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  loginTitle: {
    marginBottom: 16,
  },
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #0f3d91 0%, #1e63d6 14%, #f4f7fb 14%, #f4f7fb 100%)",
    padding: 16,
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: 1000,
    margin: "0 auto",
  },
  header: {
    background: "#fff",
    borderRadius: 22,
    padding: 20,
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 14,
    background: "#0f3d91",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sub: {
    fontSize: 11,
    color: "#64748b",
    textTransform: "uppercase",
  },
  title: {
    margin: "4px 0",
    fontSize: 24,
    color: "#0f172a",
  },
  text: {
    margin: 0,
    color: "#64748b",
  },
  box: {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    textAlign: "center",
    marginBottom: 14,
    border: "1px solid #d8e4f8",
  },
  searchBox: {
    background: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cfdced",
    fontSize: 16,
    marginBottom: 10,
    boxSizing: "border-box",
  },
  buttonRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  primaryButton: {
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#1455c8",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cfdced",
    background: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    background: "#fff",
    borderRadius: 14,
    padding: 12,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 14,
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: 14,
    padding: 12,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 14,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    textAlign: "center",
    boxShadow: "0 12px 26px rgba(0,0,0,0.07)",
  },
  badge: {
    background: "#e8f0ff",
    color: "#0f3d91",
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },
  cardTitle: {
    color: "#0f172a",
    marginTop: 14,
  },
  price: {
    color: "#059669",
    marginTop: 14,
  },
  tipologiaButton: {
    width: "100%",
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "#1455c8",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 10,
  },
  tipologiaBox: {
    marginTop: 14,
    borderTop: "1px solid #e5e7eb",
    paddingTop: 14,
  },
  tipologiaLinha: {
    background: "#f8fbff",
    border: "1px solid #d8e4f8",
    borderRadius: 12,
    padding: 10,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 1.6,
  },
};