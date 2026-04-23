import { useState } from "react";

export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);

  const senhaCorreta = "1234"; // 🔐 ALTERE AQUI

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      setLiberado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  // 🔒 TELA DE BLOQUEIO
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
            style={styles.input}
          />

          <button style={styles.button} onClick={verificarSenha}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // 🔓 APP LIBERADO
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.logo}>C</div>

        <div style={styles.subtitle}>
          FERRAMENTA INTERNA DO CORRETOR
        </div>

        <h1 style={styles.title}>
          Buscador de Empreendimentos
        </h1>

        <p style={styles.description}>
          Consulta rápida para atendimento comercial
        </p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <div>Empreendimentos</div>
            <strong style={styles.cardValue}>25</strong>
          </div>

          <div style={styles.card}>
            <div>Pesquisa</div>
            <strong style={styles.cardValue}>CEP / Bairro</strong>
          </div>
        </div>

        <input
          style={styles.input}
          placeholder="Digite o CEP, bairro ou região"
        />

        <input
          style={styles.input}
          placeholder="Preço máximo"
        />
      </div>
    </div>
  );
}

const styles = {
  // 🔒 LOGIN
  loginPage: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
  },

  loginBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "320px",
  },

  loginTitle: {
    marginBottom: "20px",
  },

  // 🌐 APP
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: "420px",
    padding: "20px",
    textAlign: "center",
  },

  logo: {
    width: "60px",
    height: "60px",
    background: "#2d5cff",
    borderRadius: "12px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    margin: "0 auto 10px",
  },

  subtitle: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
  },

  title: {
    fontSize: "22px", // 📱 AJUSTADO MOBILE
    fontWeight: "bold",
    marginBottom: "10px",
  },

  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },

  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "12px", // 📱 MENOR
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  cardValue: {
    fontSize: "18px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2d5cff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};