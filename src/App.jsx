import { useState, useMemo } from "react";

export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [empreendimentoSelecionado, setEmpreendimentoSelecionado] = useState(null);

  const senhaCorreta = "1234";

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      setLiberado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const empreendimentos = [
    {
      nome: "Dez Belenzinho",
      regiao: "Leste",
      bairro: "Belém",
      entrega: "01/10/2027",
      maps: "https://www.google.com/maps/search/?api=1&query=Belém+SP",
    },
    {
      nome: "Mérito Belenzinho",
      regiao: "Leste",
      bairro: "Belém",
      entrega: "01/09/2027",
      maps: "https://www.google.com/maps/search/?api=1&query=Belém+SP",
    },
    {
      nome: "Modern Mooca",
      regiao: "Leste",
      bairro: "Mooca",
      entrega: "01/06/2028",
      maps: "https://www.google.com/maps/search/?api=1&query=Mooca+SP",
    },
  ];

  const total = useMemo(() => empreendimentos.length, []);

  const buscar = () => {
    const termo = busca.toLowerCase();

    const filtrados = empreendimentos.filter((e) =>
      e.nome.toLowerCase().includes(termo) ||
      e.bairro.toLowerCase().includes(termo) ||
      e.regiao.toLowerCase().includes(termo)
    );

    setResultados(filtrados);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") buscar();
  };

  if (!liberado) {
    return (
      <div style={{ padding: 40 }}>
        <h2>🔐 Acesso</h2>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && verificarSenha()}
        />
        <button onClick={verificarSenha}>Entrar</button>
      </div>
    );
  }

  if (empreendimentoSelecionado) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setEmpreendimentoSelecionado(null)}>← Voltar</button>

        <h1>{empreendimentoSelecionado.nome}</h1>
        <p>{empreendimentoSelecionado.bairro} - {empreendimentoSelecionado.regiao}</p>
        <p>Entrega: {empreendimentoSelecionado.entrega}</p>

        <a href={empreendimentoSelecionado.maps} target="_blank">
          📍 Ver no Google Maps
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Buscador Cury</h1>
      <p>Total: {total}</p>

      <input
        placeholder="Buscar por bairro ou nome"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onKeyDown={handleEnter}
      />

      <button onClick={buscar}>Buscar</button>

      <div>
        {resultados.map((e, i) => (
          <div key={i} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
            <h2>{e.nome}</h2>
            <p>{e.bairro} - {e.regiao}</p>
            <p>Entrega: {e.entrega}</p>

            <button onClick={() => setEmpreendimentoSelecionado(e)}>
              Ver detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}