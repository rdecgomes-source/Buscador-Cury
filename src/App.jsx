import { useEffect, useMemo, useState } from "react";

const EMPREENDIMENTOS_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcXklfVhrdFNCHZOURWqJUbjnVV8ekso7cHyWMZFNxXuNH_K6sgXzTzZs5uNrSPA/pub?gid=1080729431&single=true&output=csv";

const TIPOLOGIAS_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcXklfVhrdFNCHZOURWqJUbjnVV8ekso7cHyWMZFNxXuNH_K6sgXzTzZs5uNrSPA/pub?gid=536631797&single=true&output=csv";

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

  const senhaCorreta = "1234";

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setCarregando(true);

      const antiCache = "&t=" + Date.now();

      const [resEmp, resTipo] = await Promise.all([
        fetch(EMPREENDIMENTOS_CSV + antiCache),
        fetch(TIPOLOGIAS_CSV + antiCache),
      ]);

      const [csvEmp, csvTipo] = await Promise.all([
        resEmp.text(),
        resTipo.text(),
      ]);

      const empreendimentosBase = csvParaObjetos(csvEmp);
      const tipologiasBase = csvParaObjetos(csvTipo);

      const tipologiasPorEmpreendimento = {};

      tipologiasBase.forEach((t) => {
        const nome = normalizarChave(t.Empreendimento);
        if (!nome) return;

        const precoNumero = limparNumero(t["Preço a partir (R$)"]);

        const tipologia = {
          tipologia: t.Tipologia || "",
          areaMin: t["Área mínima (m²)"] || "",
          areaMax: t["Área máxima (m²)"] || "",
          varanda: t.Varanda || "",
          vaga: t.Vaga || "",
          precoNumero,
          precoTexto: precoNumero
            ? "A partir de R$ " + Number(precoNumero).toLocaleString("pt-BR")
            : "Preço não informado",
          referencia: t.Referência || "",
          observacoes: t.Observações || "",
        };

        if (!tipologiasPorEmpreendimento[nome]) {
          tipologiasPorEmpreendimento[nome] = [];
        }

        tipologiasPorEmpreendimento[nome].push(tipologia);
      });

      const lista = empreendimentosBase
        .filter((e) => e.Empreendimento)
        .map((e) => {
          const nomeChave = normalizarChave(e.Empreendimento);
          const tipologias = tipologiasPorEmpreendimento[nomeChave] || [];
          const precos = tipologias
            .map((t) => Number(t.precoNumero || 0))
            .filter((n) => n > 0);

          const menorPreco = precos.length ? Math.min(...precos) : 0;

          return {
            nome: e.Empreendimento || "",
            construtora: e.Construtora || "",
            regiao: e.Região || "",
            bairro: e.Bairro || "",
            endereco: e.Endereço || "",
            numero: e.Número || "",
            cep: e.CEP || "",
            cepNumero: limparNumero(e.CEP),
            unidades: e.Status || "",
            entrega: e["Data de Entrega"] || "",
            mcmv: e["Aceita MCMV"] || "",
            enquadramento: e.Enquadramento || "",
            tipologias,
            precoNumero: menorPreco,
            precoTexto: menorPreco
              ? "A partir de R$ " + Number(menorPreco).toLocaleString("pt-BR")
              : "Preço não informado",
          };
        });

      setEmpreendimentos(lista);
      setResultados([]);
      setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
      setErro("");
    } catch (e) {
      console.error(e);
      setErro("Não foi possível carregar os dados da planilha.");
    } finally {
      setCarregando(false);
    }
  };

  const csvParaObjetos = (csv) => {
    const linhas = csv
      .trim()
      .split(/\r?\n/)
      .map((linha) =>
        linha
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map((c) => c.replace(/^"|"$/g, "").replace(/""/g, '"').trim())
      );

    const cabecalho = linhas[0] || [];

    return linhas.slice(1).map((linha) => {
      const obj = {};
      cabecalho.forEach((coluna, i) => {
        obj[coluna] = linha[i] || "";
      });
      return obj;
    });
  };

  const normalizar = (texto) =>
    String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const normalizarChave = (texto) => normalizar(texto).replace(/\s+/g, " ");

  const limparNumero = (valor) => {
    if (!valor) return 0;
    const apenasNumeros = String(valor).replace(/\D/g, "");
    return apenasNumeros ? Number(apenasNumeros) : 0;
  };

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      setLiberado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const total = useMemo(() => empreendimentos.length, [empreendimentos]);

  const buscar = () => {
    const termoOriginal = busca.trim();
    const termo = normalizar(termoOriginal);
    const termoSemZona = termo.replace("zona ", "");
    const cepBusca = limparNumero(termoOriginal);
    const precoMax = precoMaximo ? Number(precoMaximo) : null;

    if (!termoOriginal && !precoMax) {
      setResultados([]);
      setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
      return;
    }

    let encontrados = [];

    if (cepBusca && String(cepBusca).length >= 5) {
      encontrados = empreendimentos
        .filter((e) => e.cepNumero)
        .map((e) => ({
          ...e,
          distanciaCep: Math.abs(Number(e.cepNumero) - Number(cepBusca)),
        }))
        .sort((a, b) => a.distanciaCep - b.distanciaCep)
        .slice(0, 12);

      if (precoMax) {
        encontrados = encontrados.filter(
          (e) => Number(e.precoNumero || 0) > 0 && Number(e.precoNumero) <= precoMax
        );
      }

      setResultados(encontrados);
      setMensagem(
        encontrados.length
          ? `Encontramos ${encontrados.length} empreendimento(s) mais próximos do CEP informado.`
          : "Nenhum empreendimento encontrado para esse CEP."
      );
      return;
    }

    encontrados = empreendimentos.filter((e) => {
      const texto = normalizar(
        [
          e.nome,
          e.construtora,
          e.regiao,
          "zona " + e.regiao,
          e.bairro,
          e.endereco,
          e.numero,
          e.cep,
          e.enquadramento,
          e.mcmv,
          (e.tipologias || [])
            .map(
              (t) =>
                `${t.tipologia} ${t.areaMin} ${t.areaMax} ${t.varanda} ${t.vaga} ${t.precoTexto}`
            )
            .join(" "),
        ].join(" ")
      );

      return !termo || texto.includes(termo) || texto.includes(termoSemZona);
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
          <h2 style={styles.loginTitle}>🔐 Acesso Restrito</h2>
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

        {resultados.map((e, i) => (
          <div key={`${e.nome}-${i}`} style={styles.card}>
            <span style={styles.badge}>{e.regiao || "Região não informada"}</span>

            <h2 style={styles.cardTitle}>{e.nome}</h2>

            <p>
              <strong>Endereço:</strong> {e.endereco} {e.numero} - {e.bairro} - CEP{" "}
              {e.cep}
            </p>

            <p>
              <strong>Entrega:</strong> {formatarData(e.entrega)}
            </p>

            <p>
              <strong>Unidades disponíveis:</strong> {e.unidades || "Não informado"}
            </p>

            <p>
              <strong>Aceita MCMV:</strong> {e.mcmv || "Não informado"}
            </p>

            <h3 style={styles.price}>{e.precoTexto}</h3>

            <button
              onClick={() => alternarTipologias(e.nome)}
              style={styles.tipologiaButton}
            >
              {tipologiasAbertas[e.nome] ? "Ocultar tipologias" : "Ver tipologias"}
            </button>

            {tipologiasAbertas[e.nome] && (
              <div style={styles.tipologiaBox}>
                <strong>Tipologias disponíveis</strong>

                {e.tipologias && e.tipologias.length > 0 ? (
                  e.tipologias.map((t, idx) => (
                    <div key={idx} style={styles.tipologiaLinha}>
                      <div>
                        <strong>{t.tipologia || "Tipologia"}</strong>
                      </div>
                      <div>
                        Área:{" "}
                        {t.areaMin
                          ? `${String(t.areaMin).replace(".", ",")} m²`
                          : "Não informada"}
                      </div>
                      <div>Varanda: {formatarOpcao(t.varanda)}</div>
                      <div>Vaga: {formatarOpcao(t.vaga)}</div>
                      <div>{t.precoTexto}</div>
                    </div>
                  ))
                ) : (
                  <div style={styles.tipologiaLinha}>Tipologias não cadastradas</div>
                )}
              </div>
            )}
          </div>
        ))}
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
