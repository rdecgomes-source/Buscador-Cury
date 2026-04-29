import { useState } from "react";

export default function App() {

const empreendimentos = [
  {
    nome: "Parque das Nações",
    regiao: "Leste",
    bairro: "Laguinho",
    enderecoCompleto: "Não informado",
    entrega: "",
    unidadesDisponiveis: "236012",
    tipologias: [
      { tipologia: "1 dormitório", preco: "A partir de R$ 236.012" },
      { tipologia: "2 dormitórios", preco: "A partir de R$ 335.708" }
    ]
  },
  {
    nome: "Mérito - Vila Mascote",
    regiao: "Sul",
    bairro: "Vila Mascote",
    enderecoCompleto: "Não informado",
    entrega: "",
    unidadesDisponiveis: "517181",
    tipologias: [
      { tipologia: "1 dormitório", preco: "A partir de R$ 294.914" },
      { tipologia: "2 dormitórios", preco: "A partir de R$ 517.181" }
    ]
  },
  {
    nome: "Cidade Mooca",
    regiao: "Leste",
    bairro: "Mooca",
    enderecoCompleto: "Não informado",
    entrega: "",
    unidadesDisponiveis: "264343",
    tipologias: [
      { tipologia: "1 dormitório", preco: "A partir de R$ 264.343" },
      { tipologia: "2 dormitórios", preco: "A partir de R$ 362.971" }
    ]
  }
];

const [busca, setBusca] = useState("");
const [resultados, setResultados] = useState([]);

const buscar = () => {
  const termo = busca.toLowerCase();
  const termoSemZona = termo.replace("zona ", "");

  const filtrados = empreendimentos.filter((e) =>
    e.nome.toLowerCase().includes(termo) ||
    e.bairro.toLowerCase().includes(termo) ||
    e.regiao.toLowerCase().includes(termoSemZona) ||
    e.enderecoCompleto.toLowerCase().includes(termo)
  );

  setResultados(filtrados);
};

return (
<div style={{ padding: 20 }}>
  <h1>Buscador Cury</h1>

  <input
    placeholder="Buscar por zona, bairro ou empreendimento"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />

  <button onClick={buscar}>Buscar</button>

  {resultados.map((e, i) => (
    <div key={i} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>

      <h2 style={{ textAlign: "center" }}>{e.nome}</h2>

      <p style={{ textAlign: "center" }}>{e.enderecoCompleto}</p>
      <p style={{ textAlign: "center" }}>Entrega: {e.entrega || "Não informada"}</p>
      <p style={{ textAlign: "center" }}>
        Unidades disponíveis: {e.unidadesDisponiveis}
      </p>

      <div style={{ marginTop: 10 }}>
        {e.tipologias.map((t, j) => (
          <div key={j} style={{ marginBottom: 5 }}>
            {t.tipologia} - {t.preco}
          </div>
        ))}
      </div>

    </div>
  ))}
</div>
);
}