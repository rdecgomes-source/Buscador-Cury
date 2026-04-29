import { useEffect, useMemo, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQOCZw-pVQqeiSgsuIG17bt0yr4KWZMCDgSo6aVvOYOvDLuwsgcfKmlIsSUSCSc_5HwcgFA7AsYyze/pub?output=csv";

export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [busca, setBusca] = useState("");
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState("Digite um CEP, bairro, região ou empreendimento para buscar.");
  const senhaCorreta = "1234";

  useEffect(() => {
    fetch(CSV_URL + "&t=" + Date.now())
      .then((res) => res.text())
      .then((csv) => {
        const linhas = csv.trim().split("\n").map((linha) =>
          linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) =>
            c.replace(/^"|"$/g, "").trim()
          )
        );

        const cabecalho = linhas[0];

        const pegar = (linha, nome) => {
          const i = cabecalho.findIndex(
            (c) => c.toLowerCase().trim() === nome.toLowerCase().trim()
          );
          return i >= 0 ? linha[i] || "" : "";
        };

        const lista = linhas.slice(1).map((linha) => ({
          nome: pegar(linha, "Empreendimento"),
          construtora: pegar(linha, "Construtora"),
          regiao: pegar(linha, "Região"),
          bairro: pegar(linha, "Bairro"),
          endereco: pegar(linha, "Endereço"),
          numero: pegar(linha, "Número"),
          cep: pegar(linha, "CEP"),
          unidades: pegar(linha, "Status"),
          entrega: pegar(linha, "Data de Entrega"),
          mcmv: pegar(linha, "Aceita MCMV"),
        })).filter((e) => e.nome);

        setEmpreendimentos(lista);
      });
  }, []);

  const total = useMemo(() => empreendimentos.length, [empreendimentos]);

  const normalizar = (v) =>
    String(v || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const verificarSenha = () => {
    if (senha === senhaCorreta) setLiberado(true);
    else alert("Senha incorreta");
  };

  const buscar = () => {
    const termo = normalizar(busca.trim());

    if (!termo) {
      setResultados([]);
      setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
      return;
    }

    const termoSemZona = termo.replace("zona ", "");

    const encontrados = empreendimentos.filter((e) => {
      const texto = normalizar(
        `${e.nome} ${e.regiao} zona ${e.regiao} ${e.bairro} ${e.endereco} ${e.cep}`
      );
      return texto.includes(termo) || texto.includes(termoSemZona);
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
    setResultados([]);
    setMensagem("Digite um CEP, bairro, região ou empreendimento para buscar.");
  };

  if (!liberado) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <h2>🔐 Acesso Restrito</h2>
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
            <p style={styles.text}>Dados atualizados direto da planilha</p>
          </div>
        </div>

        <div style={styles.box}>
          <span>Empreendimentos cadastrados</span>
          <h2>{total}</h2>
        </div>

        <div style={styles.searchBox}>
          <input
            placeholder="Digite CEP, bairro, região ou nome do empreendimento"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            style={styles.input}
          />

          <div style={styles.buttonRow}>
            <button onClick={buscar} style={styles.primaryButton}>Buscar</button>
            <button onClick={limpar} style={styles.secondaryButton}>Limpar</button>
          </div>
        </div>

        <div style={styles.message}>{mensagem}</div>

        {resultados.map((e, i) => (
          <div key={i} style={styles.card}>
            <span style={styles.badge}>{e.regiao || "Região não informada"}</span>

            <h2 style={styles.cardTitle}>{e.nome}</h2>

            <p><strong>Endereço:</strong> {e.endereco} {e.numero} - {e.bairro} - CEP {e.cep}</p>
            <p><strong>Entrega:</strong> {e.entrega || "Não informada"}</p>
            <p><strong>Unidades disponíveis:</strong> {e.unidades || "Não informado"}</p>
            <p><strong>Aceita MCMV:</strong> {e.mcmv || "Não informado"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  loginPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f5f9", padding: 20 },
  loginBox: { background: "#fff", padding: 24, borderRadius: 20, width: "100%", maxWidth: 360, textAlign: "center" },
  page: { minHeight: "100vh", background: "linear-gradient(180deg, #0f3d91 0%, #1e63d6 14%, #f4f7fb 14%, #f4f7fb 100%)", padding: 16, fontFamily: "Arial, sans-serif" },
  container: { maxWidth: 1000, margin: "0 auto" },
  header: { background: "#fff", borderRadius: 22, padding: 20, display: "flex", gap: 14, alignItems: "center", marginBottom: 16 },
  logo: { width: 54, height: 54, borderRadius: 14, background: "#0f3d91", color: "#fff", fontSize: 28, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" },
  sub: { fontSize: 11, color: "#64748b", textTransform: "uppercase" },
  title: { margin: "4px 0", fontSize: 24, color: "#0f172a" },
  text: { margin: 0, color: "#64748b" },
  box: { background: "#fff", borderRadius: 18, padding: 18, textAlign: "center", marginBottom: 14 },
  searchBox: { background: "#fff", borderRadius: 18, padding: 14, marginBottom: 14 },
  input: { width: "100%", padding: 14, borderRadius: 14, border: "1px solid #cfdced", fontSize: 16, marginBottom: 10, boxSizing: "border-box" },
  buttonRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  primaryButton: { padding: 14, borderRadius: 14, border: "none", background: "#1455c8", color: "#fff", fontWeight: "bold", cursor: "pointer" },
  secondaryButton: { padding: 14, borderRadius: 14, border: "1px solid #cfdced", background: "#fff", fontWeight: "bold", cursor: "pointer" },
  message: { background: "#fff", borderRadius: 14, padding: 12, textAlign: "center", fontWeight: "bold", marginBottom: 14 },
  card: { background: "#fff", borderRadius: 20, padding: 18, marginBottom: 14, textAlign: "center" },
  badge: { background: "#e8f0ff", color: "#0f3d91", padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: "bold" },
  cardTitle: { color: "#0f172a", marginTop: 14 },
};