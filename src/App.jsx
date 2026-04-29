import { useEffect, useMemo, useState } from "react";

const EMP_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcXklfVhrdFNCHZOURWqJUbjnVV8ekso7cHyWMZFNxXuNH_K6sgXzTzZs5uNrSPA/pub?gid=1080729431&single=true&output=csv";
const TIP_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTcXklfVhrdFNCHZOURWqJUbjnVV8ekso7cHyWMZFNxXuNH_K6sgXzTzZs5uNrSPA/pub?gid=536631797&single=true&output=csv";

export default function App() {
  const [senha, setSenha] = useState("");
  const [liberado, setLiberado] = useState(false);
  const [busca, setBusca] = useState("");
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [tipologiasAbertas, setTipologiasAbertas] = useState({});

  const senhaCorreta = "1234";

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const t = "&t=" + Date.now();

    const [eRes, tRes] = await Promise.all([
      fetch(EMP_URL + t),
      fetch(TIP_URL + t),
    ]);

    const [eTxt, tTxt] = await Promise.all([
      eRes.text(),
      tRes.text(),
    ]);

    const emp = parseCSV(eTxt);
    const tip = parseCSV(tTxt);

    const mapaTip = {};

    tip.forEach((t) => {
      const nome = normalizar(t.Empreendimento);
      if (!mapaTip[nome]) mapaTip[nome] = [];
      mapaTip[nome].push(t);
    });

    const lista = emp.map((e) => {
      const nome = normalizar(e.Empreendimento);

      return {
        nome: e.Empreendimento,
        regiao: e.Região,
        bairro: e.Bairro,
        cep: e.CEP,
        faixaCep: (e.CEP || "").substring(0, 2),
        tipologias: mapaTip[nome] || [],
      };
    });

    setEmpreendimentos(lista);
  };

  const parseCSV = (csv) => {
    const linhas = csv.split("\n").map(l => l.split(","));
    const head = linhas[0];

    return linhas.slice(1).map(l => {
      let obj = {};
      head.forEach((h, i) => obj[h] = l[i]);
      return obj;
    });
  };

  const normalizar = (t) =>
    String(t || "").toLowerCase().trim();

  const buscar = () => {
    const termo = busca.trim();

    // 🔥 CEP (FAIXA)
    if (/^\d{5,}$/.test(termo)) {
      const faixa = termo.substring(0, 2);

      const res = empreendimentos.filter(
        (e) => e.faixaCep === faixa
      );

      setResultados(res);
      return;
    }

    // 🔎 BUSCA NORMAL
    const termoNorm = normalizar(termo);

    const res = empreendimentos.filter((e) =>
      normalizar(
        `${e.nome} ${e.regiao} ${e.bairro}`
      ).includes(termoNorm)
    );

    setResultados(res);
  };

  const toggle = (nome) => {
    setTipologiasAbertas((p) => ({
      ...p,
      [nome]: !p[nome],
    }));
  };

  if (!liberado) {
    return (
      <div>
        <input
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={() => senha === senhaCorreta && setLiberado(true)}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Buscador</h1>

      <input
        placeholder="CEP, bairro ou nome"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && buscar()}
      />

      <button onClick={buscar}>Buscar</button>

      {resultados.map((e, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <h2>{e.nome}</h2>
          <p>{e.bairro} - {e.regiao}</p>

          <button onClick={() => toggle(e.nome)}>
            Ver tipologias
          </button>

          {tipologiasAbertas[e.nome] &&
            e.tipologias.map((t, j) => (
              <div key={j}>
                {t.Tipologia} - {t["Preço a partir (R$)"]}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}