import { useEffect, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQOCZw-pVQqeiSgsuIG17bt0yr4KWZMCDgSo6aVvOYOvDLuwsgcfKmlIsSUSCSc_5HwcgFA7AsYyze/pub?output=csv";

export default function App() {
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(CSV_URL + "&t=" + new Date().getTime())
      .then((res) => res.text())
      .then((csv) => {
        const linhas = csv.trim().split("\n").map((linha) =>
          linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) =>
            c.replace(/^"|"$/g, "").trim()
          )
        );

        const cabecalho = linhas[0];

        const pegar = (linha, nomeColuna) => {
          const index = cabecalho.findIndex(
            (c) => c.toLowerCase().trim() === nomeColuna.toLowerCase().trim()
          );
          return index >= 0 ? linha[index] || "" : "";
        };

        const dados = linhas.slice(1).map((linha) => ({
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
        }));

        setEmpreendimentos(dados.filter((e) => e.nome));
        setCarregando(false);
      });
  }, []);

  const normalizar = (texto) =>
    String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const resultados = empreendimentos.filter((e) => {
    const termo = normalizar(busca);
    const texto = normalizar(
      `${e.nome} ${e.regiao} ${e.bairro} ${e.endereco} ${e.cep}`
    );
    return texto.includes(termo);
  });

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
          <strong>Empreendimentos</strong>
          <h2>{empreendimentos.length}</h2>
        </div>

        <input
          placeholder="Digite CEP, bairro, região ou nome do empreendimento"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={styles.input}
        />

        {carregando ? (
          <div style={styles.message}>Carregando planilha...</div>
        ) : (
          <div style={styles.message}>
            {resultados.length} empreendimento(s) encontrado(s)
          </div>
        )}

        {resultados.map((e, i) => (
          <div key={i} style={styles.card}>
            <span style={styles.badge}>{e.regiao}</span>

            <h2 style={styles.cardTitle}>{e.nome}</h2>

            <p>
              <strong>Endereço:</strong> {e.endereco} {e.numero} - {e.bairro} - CEP{" "}
              {e.cep}
            </p>

            <p>
              <strong>Entrega:</strong> {e.entrega || "Não informada"}
            </p>

            <p>
              <strong>Unidades disponíveis:</strong>{" "}
              {e.unidades || "Não informado"}
            </p>

            <p>
              <strong>Aceita MCMV:</strong> {e.mcmv || "Não informado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #0f3d91 0%, #1e63d6 14%, #f4f7fb 14%, #f4f7fb 100%)",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    background: "#fff",
    borderRadius: "22px",
    padding: "20px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    marginBottom: "16px",
  },
  logo: {
    width: "54px",
    height: "54px",
    borderRadius: "14px",
    background: "#0f3d91",
    color: "#fff",
    fontSize: "28px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sub: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
  },
  title: {
    margin: "4px 0",
    fontSize: "24px",
    color: "#0f172a",
  },
  text: {
    margin: 0,
    color: "#64748b",
  },
  box: {
    background: "#fff",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
    marginBottom: "14px",
    border: "1px solid #d8e4f8",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #cfdced",
    fontSize: "16px",
    marginBottom: "14px",
    boxSizing: "border-box",
  },
  message: {
    background: "#fff",
    borderRadius: "14px",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "14px",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "18px",
    marginBottom: "14px",
    boxShadow: "0 12px 26px rgba(0,0,0,0.07)",
    textAlign: "center",
  },
  badge: {
    background: "#e8f0ff",
    color: "#0f3d91",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  cardTitle: {
    color: "#0f172a",
    marginTop: "14px",
  },
};