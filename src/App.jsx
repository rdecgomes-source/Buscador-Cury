import { useMemo, useState } from "react";

export default function App() {
  const [busca, setBusca] = useState("");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState(
    "Digite um CEP, bairro ou região para buscar empreendimentos."
  );
  const [empreendimentoSelecionado, setEmpreendimentoSelecionado] = useState(null);

  const empreendimentos = [
    {
      nome: "360º Park View",
      faixaCep: "05",
      bairro: "Zona Oeste",
      regiao: "Zona Oeste",
      precoNumero: 297973,
      precoTexto: "A partir de R$ 297 mil",
      metragemBase: "36,8 m²",
      entrega: "31/01/2028",
    },
    {
      nome: "Alto São Domingos - Mutinga",
      faixaCep: "05",
      bairro: "São Domingos",
      regiao: "Zona Oeste",
      precoNumero: 275815,
      precoTexto: "A partir de R$ 275 mil",
      metragemBase: "34,45 m²",
      entrega: "30/11/2027",
    },
    {
      nome: "Cidade Mooca - Duomo",
      faixaCep: "03",
      bairro: "Mooca",
      regiao: "Zona Leste",
      precoNumero: 264343,
      precoTexto: "A partir de R$ 264 mil",
      metragemBase: "34,34 m²",
      entrega: "31/03/2027",
    },
    {
      nome: "Cidade Mooca - Navona",
      faixaCep: "03",
      bairro: "Mooca",
      regiao: "Zona Leste",
      precoNumero: 268055,
      precoTexto: "A partir de R$ 268 mil",
      metragemBase: "34,44 m²",
      entrega: "30/06/2027",
    },
    {
      nome: "Cidade Mooca - Vila Capri",
      faixaCep: "03",
      bairro: "Mooca",
      regiao: "Zona Leste",
      precoNumero: 362971,
      precoTexto: "A partir de R$ 362 mil",
      metragemBase: "37,05 m²",
      entrega: "31/12/2024",
    },
    {
      nome: "Cidade Parque Guarapiranga - Condomínio Rio Bonito",
      faixaCep: "04",
      bairro: "Guarapiranga",
      regiao: "Zona Sul",
      precoNumero: 525112,
      precoTexto: "A partir de R$ 525 mil",
      metragemBase: "48,86 m²",
      entrega: "30/09/2029",
    },
    {
      nome: "Condomínio Residencial Dez Canindé",
      faixaCep: "01",
      bairro: "Canindé",
      regiao: "Zona Central/Leste",
      precoNumero: 276102,
      precoTexto: "A partir de R$ 276 mil",
      metragemBase: "34,65 m²",
      entrega: "23/11/2023",
    },
    {
      nome: "Condomínio Residencial Dez Celeste",
      faixaCep: "04",
      bairro: "Zona Sul",
      regiao: "Zona Sul",
      precoNumero: 236724,
      precoTexto: "A partir de R$ 236 mil",
      metragemBase: "34,99 m²",
      entrega: "30/09/2024",
    },
    {
      nome: "Condomínio Residencial Dez Tatuapé",
      faixaCep: "03",
      bairro: "Tatuapé",
      regiao: "Zona Leste",
      precoNumero: 333300,
      precoTexto: "A partir de R$ 333 mil",
      metragemBase: "34,99 m²",
      entrega: "31/10/2023",
    },
    {
      nome: "Connect São Mateus",
      faixaCep: "08",
      bairro: "São Mateus",
      regiao: "Zona Leste",
      precoNumero: 271611,
      precoTexto: "A partir de R$ 271 mil",
      metragemBase: "34,19 m²",
      entrega: "30/09/2025",
    },
    {
      nome: "Connect São Mateus 2",
      faixaCep: "08",
      bairro: "São Mateus",
      regiao: "Zona Leste",
      precoNumero: 271611,
      precoTexto: "A partir de R$ 271 mil",
      metragemBase: "34,19 m²",
      entrega: "29/05/2026",
    },
    {
      nome: "Dez Limão",
      faixaCep: "02",
      bairro: "Limão",
      regiao: "Zona Norte",
      precoNumero: 305685,
      precoTexto: "A partir de R$ 305 mil",
      metragemBase: "33,99 m²",
      entrega: "30/06/2026",
    },
    {
      nome: "Green Lyne Pirituba",
      faixaCep: "02",
      bairro: "Pirituba",
      regiao: "Zona Norte",
      precoNumero: 373700,
      precoTexto: "A partir de R$ 373 mil",
      metragemBase: "39,01 m²",
      entrega: "30/09/2024",
    },
    {
      nome: "Like Campo Limpo",
      faixaCep: "05",
      bairro: "Campo Limpo",
      regiao: "Zona Sul",
      precoNumero: 376817,
      precoTexto: "A partir de R$ 376 mil",
      metragemBase: "42,31 m²",
      entrega: "30/04/2028",
    },
    {
      nome: "Lyne Campo Limpo",
      faixaCep: "05",
      bairro: "Campo Limpo",
      regiao: "Zona Sul",
      precoNumero: 607675,
      precoTexto: "A partir de R$ 607 mil",
      metragemBase: "56,31 m²",
      entrega: "31/10/2027",
    },
    {
      nome: "Mérito Belenzinho",
      faixaCep: "03",
      bairro: "Belenzinho",
      regiao: "Zona Leste",
      precoNumero: 255093,
      precoTexto: "A partir de R$ 255 mil",
      metragemBase: "34,37 m²",
      entrega: "30/09/2027",
    },
    {
      nome: "Mérito Vila Mascote",
      faixaCep: "04",
      bairro: "Vila Mascote",
      regiao: "Zona Sul",
      precoNumero: 505781,
      precoTexto: "A partir de R$ 505 mil",
      metragemBase: "46,26 m²",
      entrega: "31/07/2027",
    },
    {
      nome: "Modern Mooca",
      faixaCep: "03",
      bairro: "Mooca",
      regiao: "Zona Leste",
      precoNumero: 257000,
      precoTexto: "A partir de R$ 257 mil",
      metragemBase: "32 m²",
      entrega: "30/06/2028",
    },
    {
      nome: "My Sacomã",
      faixaCep: "04",
      bairro: "Sacomã",
      regiao: "Zona Sul",
      precoNumero: 249716,
      precoTexto: "A partir de R$ 249 mil",
      metragemBase: "34,43 m²",
      entrega: "29/02/2028",
    },
    {
      nome: "Soul Miguel Yunes",
      faixaCep: "04",
      bairro: "Miguel Yunes",
      regiao: "Zona Sul",
      precoNumero: 180316,
      precoTexto: "A partir de R$ 180 mil",
      metragemBase: "23,23 m²",
      entrega: "31/05/2027",
    },
    {
      nome: "Supreme Anália Franco",
      faixaCep: "03",
      bairro: "Anália Franco",
      regiao: "Zona Leste",
      precoNumero: 376581,
      precoTexto: "A partir de R$ 376 mil",
      metragemBase: "37,81 m²",
      entrega: "29/02/2028",
    },
    {
      nome: "Supreme Vila Romana",
      faixaCep: "05",
      bairro: "Vila Romana",
      regiao: "Zona Oeste",
      precoNumero: 357834,
      precoTexto: "A partir de R$ 357 mil",
      metragemBase: "36,83 m²",
      entrega: "31/01/2029",
    },
    {
      nome: "Urban Tatuapé",
      faixaCep: "03",
      bairro: "Tatuapé",
      regiao: "Zona Leste",
      precoNumero: 378272,
      precoTexto: "A partir de R$ 378 mil",
      metragemBase: "35,48 m²",
      entrega: "01/02/2026",
    },
    {
      nome: "Urban Vila Maria II",
      faixaCep: "02",
      bairro: "Vila Maria",
      regiao: "Zona Norte",
      precoNumero: 460072,
      precoTexto: "A partir de R$ 460 mil",
      metragemBase: "44,86 m²",
      entrega: "30/04/2027",
    },
    {
      nome: "Yunes Park",
      faixaCep: "04",
      bairro: "Miguel Yunes",
      regiao: "Zona Sul",
      precoNumero: 181249,
      precoTexto: "A partir de R$ 181 mil",
      metragemBase: "23,23 m²",
      entrega: "28/02/2027",
    },
  ];

  const detalhesPorEmpreendimento = {
    "360º Park View": [
      {
        qtd: 20,
        tipologia: "2 Dorms com terraço",
        metragem: "36,8 m²",
        faixas: "T 01 - 1º ao 11º",
        enquadramento: "HIS2",
        valor: "R$ 297.973,72",
        entrega: "31/01/2028",
      },
      {
        qtd: 4,
        tipologia: "2 Dorms com terraço",
        metragem: "39,31 m²",
        faixas: "T 01 - finais 14 e 15 - 1º ao 10º",
        enquadramento: "HIS2",
        valor: "R$ 336.573,82",
        entrega: "31/01/2028",
      },
      {
        qtd: 27,
        tipologia: "2 Dorms com suíte, terraço e vaga",
        metragem: "46,24 a 46,61 m²",
        faixas: "Diversas torres - 1º ao 11º",
        enquadramento: "R2V",
        valor: "R$ 515.717,95 a R$ 526.575,17",
        entrega: "31/01/2028",
      },
    ],
    "Alto São Domingos - Mutinga": [
      {
        qtd: 19,
        tipologia: "2 Dorms (meio) sem vaga",
        metragem: "34,59 m²",
        faixas: "T01 - 1º ao 17º andar",
        enquadramento: "HIS2",
        valor: "R$ 275.815,14",
        entrega: "30/11/2027",
      },
      {
        qtd: 5,
        tipologia: "1 Dorm sem vaga",
        metragem: "34,45 a 34,61 m²",
        faixas: "Torre 03 - 1º ao 10º andar",
        enquadramento: "HIS2",
        valor: "R$ 283.697,59",
        entrega: "30/11/2027",
      },
    ],
    "Cidade Mooca - Duomo": [
      {
        qtd: 1,
        tipologia: "1 Quarto sem sacada",
        metragem: "34,34 m²",
        faixas: "Torre 2 - final 1 - 1º ao 6º",
        enquadramento: "HIS1",
        valor: "R$ 264.343,48",
        entrega: "31/03/2027",
      },
    ],
    "Cidade Mooca - Navona": [
      {
        qtd: 33,
        tipologia: "2 Dorms com suíte, sacada e vaga",
        metragem: "44,73 m²",
        faixas: "Torres 01 e 02 - 1º ao 11º",
        enquadramento: "R2V",
        valor: "R$ 486.480,50",
        entrega: "30/06/2027",
      },
      {
        qtd: 1,
        tipologia: "1 Dorm sem sacada",
        metragem: "34,44 m²",
        faixas: "Torre 02 - final 01 - 1º ao 7º",
        enquadramento: "HIS1",
        valor: "R$ 268.055,87",
        entrega: "30/06/2027",
      },
    ],
    "Cidade Mooca - Vila Capri": [
      {
        qtd: 2,
        tipologia: "2 Dorms com terraço",
        metragem: "37,05 m²",
        faixas: "Torre 1 - 1º ao 19º",
        enquadramento: "HIS2",
        valor: "R$ 362.971,31",
        entrega: "31/12/2024",
      },
    ],
    "Cidade Parque Guarapiranga - Condomínio Rio Bonito": [
      {
        qtd: 1,
        tipologia: "2 Dorms com terraço, suíte e vaga",
        metragem: "48,86 m²",
        faixas: "Torre A - 1º ao 24º",
        enquadramento: "R2V",
        valor: "R$ 525.112,75",
        entrega: "30/09/2029",
      },
    ],
    "Condomínio Residencial Dez Canindé": [
      {
        qtd: 1,
        tipologia: "2 Dorms",
        metragem: "34,65 m²",
        faixas: "T02 - 6º ao 13º",
        enquadramento: "HIS1",
        valor: "R$ 276.102,20",
        entrega: "23/11/2023",
      },
    ],
    "Condomínio Residencial Dez Celeste": [
      {
        qtd: 1,
        tipologia: "HIS2",
        metragem: "34,99 m²",
        faixas: "Torre 03 - unidade 0405",
        enquadramento: "HIS2",
        valor: "R$ 236.724,55",
        entrega: "30/09/2024",
      },
    ],
    "Condomínio Residencial Dez Tatuapé": [
      {
        qtd: 1,
        tipologia: "HMP",
        metragem: "34,99 m²",
        faixas: "Torres 02 e 03 - 4º ao 8º",
        enquadramento: "HMP",
        valor: "R$ 333.300,00",
        entrega: "31/10/2023",
      },
    ],
    "Connect São Mateus": [
      {
        qtd: 2,
        tipologia: "2 Dorms",
        metragem: "34,19 m²",
        faixas: "Todas as torres - térreo ao 9º",
        enquadramento: "HIS2",
        valor: "R$ 271.611,62",
        entrega: "30/09/2025",
      },
    ],
    "Connect São Mateus 2": [
      {
        qtd: 1,
        tipologia: "2 Dorms",
        metragem: "34,65 m²",
        faixas: "Torre 1 - 2º andar",
        enquadramento: "HIS2",
        valor: "R$ 271.611,62",
        entrega: "29/05/2026",
      },
      {
        qtd: 1,
        tipologia: "1 Dorm com vaga",
        metragem: "34,19 m²",
        faixas: "Torre 01 - 9º andar - final 14",
        enquadramento: "HIS2",
        valor: "R$ 315.005,33",
        entrega: "29/05/2026",
      },
    ],
    "Dez Limão": [
      {
        qtd: 1,
        tipologia: "2 Dorms",
        metragem: "33,99 m²",
        faixas: "T02 - 13º ao 14º",
        enquadramento: "R2V",
        valor: "R$ 305.685,15",
        entrega: "30/06/2026",
      },
    ],
    "Green Lyne Pirituba": [
      {
        qtd: 1,
        tipologia: "HIS2 com varanda",
        metragem: "39,01 m²",
        faixas: "Torres A e B - 5º ao 8º",
        enquadramento: "HIS2",
        valor: "R$ 373.700,00",
        entrega: "30/09/2024",
      },
    ],
    "Like Campo Limpo": [
      {
        qtd: 4,
        tipologia: "2 Dorms com varanda",
        metragem: "42,31 a 44,5 m²",
        faixas: "Torre 01 e 02 - 1º ao 24º",
        enquadramento: "HMP",
        valor: "R$ 376.817,47 a R$ 386.343,75",
        entrega: "30/04/2028",
      },
      {
        qtd: 16,
        tipologia: "2 Dorms suíte, varanda e vaga",
        metragem: "45,62 a 45,96 m²",
        faixas: "Torre 01 - 1º ao 24º",
        enquadramento: "R2V",
        valor: "R$ 518.653,26",
        entrega: "30/04/2028",
      },
      {
        qtd: 7,
        tipologia: "3 Dorms suíte, varanda e vaga",
        metragem: "56,56 m²",
        faixas: "Torre 01 - 1º ao 24º",
        enquadramento: "R2V",
        valor: "R$ 603.331,34",
        entrega: "30/04/2028",
      },
    ],
    "Lyne Campo Limpo": [
      {
        qtd: 7,
        tipologia: "3 Dorms com suíte, varanda e vaga",
        metragem: "56,31 m²",
        faixas: "Torre 01 - 1º ao 23º",
        enquadramento: "R2V",
        valor: "R$ 607.675,33",
        entrega: "31/10/2027",
      },
    ],
    "Mérito Belenzinho": [
      {
        qtd: 5,
        tipologia: "1 Dorm",
        metragem: "34,37 a 34,53 m²",
        faixas: "Torre 04 - 1º ao 13º",
        enquadramento: "HIS1",
        valor: "R$ 255.093,91 a R$ 255.595,92",
        entrega: "30/09/2027",
      },
      {
        qtd: 1,
        tipologia: "2 Dorms",
        metragem: "34,53 m²",
        faixas: "Torre 04 - 14º ao 24º",
        enquadramento: "HIS2",
        valor: "R$ 296.494,65",
        entrega: "30/09/2027",
      },
    ],
    "Mérito Vila Mascote": [
      {
        qtd: 7,
        tipologia: "2 Dorms com suíte, terraço e vaga",
        metragem: "46,26 a 46,7 m²",
        faixas: "Torre 01 - 1º ao 23º",
        enquadramento: "R2V",
        valor: "R$ 505.781,94 a R$ 517.181,54",
        entrega: "31/07/2027",
      },
    ],
    "Modern Mooca": [
      {
        qtd: 2,
        tipologia: "2 Dorms",
        metragem: "32 m²",
        faixas: "Torre A - 1º ao 24º",
        enquadramento: "HIS1",
        valor: "R$ 257.000,00",
        entrega: "30/06/2028",
      },
      {
        qtd: 4,
        tipologia: "2 Dorms com terraço",
        metragem: "41,61 a 52,89 m²",
        faixas: "Torres A e B - térreo ao 23º",
        enquadramento: "HMP",
        valor: "R$ 375.266,17 a R$ 447.760,77",
        entrega: "30/06/2028",
      },
    ],
    "My Sacomã": [
      {
        qtd: 2,
        tipologia: "2 Dorms",
        metragem: "34,43 m²",
        faixas: "Torres A e C - 1º ao 9º",
        enquadramento: "HIS2",
        valor: "R$ 249.716,07",
        entrega: "29/02/2028",
      },
      {
        qtd: 1,
        tipologia: "2 Dorms com varanda",
        metragem: "43,44 m²",
        faixas: "Torres B e D - térreo",
        enquadramento: "HIS2",
        valor: "R$ 325.716,60",
        entrega: "29/02/2028",
      },
    ],
    "Soul Miguel Yunes": [
      {
        qtd: 1,
        tipologia: "Studio com sacada",
        metragem: "23,23 m²",
        faixas: "T3 - 1º ao 3º",
        enquadramento: "R2V / NR",
        valor: "R$ 180.316,06",
        entrega: "31/05/2027",
      },
    ],
    "Supreme Anália Franco": [
      {
        qtd: 3,
        tipologia: "2 Dorms varanda",
        metragem: "37,81 a 41,19 m²",
        faixas: "Torres A, B e C - 1º ao 16º",
        enquadramento: "HMP",
        valor: "R$ 376.581,55 a R$ 397.797,41",
        entrega: "29/02/2028",
      },
    ],
    "Supreme Vila Romana": [
      {
        qtd: 72,
        tipologia: "2 Dorms com terraço",
        metragem: "36,83 a 37,14 m²",
        faixas: "Torres A e B - 1º ao 26º",
        enquadramento: "HIS2",
        valor: "R$ 357.834,28",
        entrega: "31/01/2029",
      },
      {
        qtd: 28,
        tipologia: "2 Dorms suíte, terraço e vaga",
        metragem: "51,96 m²",
        faixas: "Torre A - 3º ao 26º",
        enquadramento: "R2V",
        valor: "R$ 679.885,14",
        entrega: "31/01/2029",
      },
    ],
    "Urban Tatuapé": [
      {
        qtd: 1,
        tipologia: "2 Dorms",
        metragem: "35,48 m²",
        faixas: "Torre 2 - 2º ao 18º",
        enquadramento: "HIS2",
        valor: "R$ 378.272,59",
        entrega: "01/02/2026",
      },
    ],
    "Urban Vila Maria II": [
      {
        qtd: 1,
        tipologia: "2 Dorms suíte, sacada e vaga",
        metragem: "44,86 m²",
        faixas: "Torre 1 - 1º ao 8º",
        enquadramento: "R2V",
        valor: "R$ 460.072,65",
        entrega: "30/04/2027",
      },
    ],
    "Yunes Park": [
      {
        qtd: 13,
        tipologia: "Studio com sacada",
        metragem: "23,23 m²",
        faixas: "T3 - 1º ao 3º",
        enquadramento: "R2V / NR",
        valor: "R$ 181.249,22",
        entrega: "28/02/2027",
      },
      {
        qtd: 8,
        tipologia: "Studios variados",
        metragem: "27,39 a 29 m²",
        faixas: "T3 - 1º ao 3º",
        enquadramento: "R2V / NR",
        valor: "R$ 181.249,22 a R$ 185.000,00",
        entrega: "28/02/2027",
      },
      {
        qtd: 2,
        tipologia: "2 Dorms com suíte, sacada e vaga",
        metragem: "44,14 a 48,31 m²",
        faixas: "T3 - 5º ao 21º",
        enquadramento: "R2V",
        valor: "R$ 514.284,71 a R$ 552.377,52",
        entrega: "28/02/2027",
      },
    ],
  };

  const totalEmpreendimentos = useMemo(() => empreendimentos.length, []);

  const limparNumero = (valor) => valor.replace(/\D/g, "");

  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(valor);

  const buscarEmpreendimentos = () => {
    const termo = busca.trim().toLowerCase();
    const cepLimpo = limparNumero(busca);
    const max = precoMaximo ? Number(precoMaximo) : null;

    if (!termo) {
      setResultados([]);
      setMensagem("Digite um CEP, bairro ou região para buscar.");
      return;
    }

    let encontrados = empreendimentos.filter((item) => {
      const bateCep =
        cepLimpo.length >= 2 && item.faixaCep === cepLimpo.substring(0, 2);

      const bateTexto =
        item.bairro.toLowerCase().includes(termo) ||
        item.nome.toLowerCase().includes(termo) ||
        item.regiao.toLowerCase().includes(termo);

      return bateCep || bateTexto;
    });

    if (max) {
      encontrados = encontrados.filter((item) => item.precoNumero <= max);
    }

    encontrados.sort((a, b) => a.precoNumero - b.precoNumero);

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

  const abrirDetalhes = (empreendimento) => {
    setEmpreendimentoSelecionado(empreendimento);
  };

  const voltarLista = () => {
    setEmpreendimentoSelecionado(null);
  };

  if (empreendimentoSelecionado) {
    const detalhes = detalhesPorEmpreendimento[empreendimentoSelecionado.nome] || [];

    return (
      <div style={styles.page}>
        <div style={styles.overlay}></div>

        <div style={styles.container}>
          <div style={styles.headerCard}>
            <button onClick={voltarLista} style={styles.secondaryButton}>
              ← Voltar
            </button>

            <div style={{ marginTop: 18 }}>
              <div style={styles.brandTop}>Detalhamento do empreendimento</div>
              <h1 style={styles.title}>{empreendimentoSelecionado.nome}</h1>
              <p style={styles.subtitle}>
                Bairro: {empreendimentoSelecionado.bairro} • Região: {empreendimentoSelecionado.regiao}
              </p>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Valor inicial</span>
                <span style={styles.statValueSmall}>{empreendimentoSelecionado.precoTexto}</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Metragem base</span>
                <span style={styles.statValueSmall}>{empreendimentoSelecionado.metragemBase}</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Entrega</span>
                <span style={styles.statValueSmall}>{empreendimentoSelecionado.entrega}</span>
              </div>
            </div>
          </div>

          <div style={styles.messageBox}>
            Unidades e faixas agrupadas do empreendimento
          </div>

          {detalhes.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📄</div>
              <h3 style={styles.emptyTitle}>Sem detalhamento cadastrado</h3>
              <p style={styles.emptyText}>
                Este empreendimento ainda não teve as faixas de unidades lançadas na tela interna.
              </p>
            </div>
          ) : (
            <div style={styles.detailGrid}>
              {detalhes.map((item, index) => (
                <div key={index} style={styles.detailCard}>
                  <div style={styles.detailQty}>Qtd: {item.qtd}</div>
                  <h3 style={styles.detailTitle}>{item.tipologia}</h3>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Metragem</span>
                    <span style={styles.detailValue}>{item.metragem}</span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Faixa / Andares</span>
                    <span style={styles.detailValue}>{item.faixas}</span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Enquadramento</span>
                    <span style={styles.detailValue}>{item.enquadramento}</span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Entrega</span>
                    <span style={styles.detailValue}>{item.entrega}</span>
                  </div>

                  <div style={styles.divider}></div>

                  <div style={styles.priceArea}>
                    <div style={styles.priceText}>{item.valor}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={styles.footer}>
            Tela interna de detalhamento • valores sujeitos a atualização
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <div style={styles.headerCard}>
          <div style={styles.brandRow}>
            <div style={styles.brandBadge}>C</div>

            <div>
              <div style={styles.brandTop}>Ferramenta interna do corretor</div>
              <h1 style={styles.title}>Buscador de Empreendimentos</h1>
              <p style={styles.subtitle}>
                Estoque atualizado e consulta rápida para atendimento comercial
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

            <div style={styles.statCard}>
              <span style={styles.statLabel}>Uso</span>
              <span style={styles.statValue}>Interno</span>
            </div>
          </div>
        </div>

        <div style={styles.searchPanel}>
          <input
            type="text"
            placeholder="Digite o CEP, bairro ou região do cliente"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Preço máximo"
            value={precoMaximo}
            onChange={(e) => setPrecoMaximo(e.target.value)}
            style={styles.input}
          />

          <button onClick={buscarEmpreendimentos} style={styles.primaryButton}>
            Buscar
          </button>

          <button onClick={limparBusca} style={styles.secondaryButton}>
            Limpar
          </button>
        </div>

        <div style={styles.messageBox}>{mensagem}</div>

        {resultados.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏢</div>
            <h3 style={styles.emptyTitle}>Pronto para consultar</h3>
            <p style={styles.emptyText}>
              Pesquise por Mooca, Barra Funda, Campo Limpo, Santo André, Tatuapé,
              Sacomã ou por CEP.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {resultados.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.regionBadge}>{item.regiao}</span>
                </div>

                <h2 style={styles.cardTitle}>{item.nome}</h2>

                <div style={styles.infoBlock}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Bairro</span>
                    <span style={styles.infoValue}>{item.bairro}</span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Faixa CEP</span>
                    <span style={styles.infoValue}>{item.faixaCep}xxx-xxx</span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Metragem inicial</span>
                    <span style={styles.infoValue}>{item.metragemBase}</span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Entrega</span>
                    <span style={styles.infoValue}>{item.entrega}</span>
                  </div>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.priceArea}>
                  <div style={styles.priceText}>{item.precoTexto}</div>
                  <div style={styles.priceSub}>
                    Referência: {formatarMoeda(item.precoNumero)}
                  </div>
                </div>

                <button
                  onClick={() => abrirDetalhes(item)}
                  style={{ ...styles.primaryButton, marginTop: 16, width: "100%" }}
                >
                  Ver unidades
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={styles.footer}>
          Uso interno • corretor • estoque sujeito a atualização
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #0f3d91 0%, #1e63d6 35%, #f4f7fb 35%, #f4f7fb 100%)",
    padding: "24px 12px 40px",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1240px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  headerCard: {
    background: "#ffffff",
    borderRadius: "28px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
    marginBottom: "20px",
  },
  brandRow: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  brandBadge: {
    width: "74px",
    height: "74px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, #0f3d91, #1e63d6)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    fontWeight: "bold",
    boxShadow: "0 10px 24px rgba(30, 99, 214, 0.25)",
  },
  brandTop: {
    fontSize: "13px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "6px",
  },
  title: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.08,
    color: "#0f172a",
  },
  subtitle: {
    margin: "10px 0 0",
    color: "#64748b",
    fontSize: "18px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },
  statCard: {
    background: "#f8fbff",
    border: "1px solid #d8e4f8",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#64748b",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#0f172a",
  },
  statValueSmall: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0f172a",
  },
  searchPanel: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "18px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    marginBottom: "16px",
  },
  input: {
    padding: "15px 16px",
    borderRadius: "14px",
    border: "1px solid #cfdced",
    fontSize: "16px",
    outline: "none",
    background: "#ffffff",
    color: "#0f172a",
  },
  primaryButton: {
    padding: "15px 18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #0f3d91, #1e63d6)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(30, 99, 214, 0.22)",
  },
  secondaryButton: {
    padding: "15px 18px",
    borderRadius: "14px",
    border: "1px solid #cfdced",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  messageBox: {
    background: "#ffffff",
    border: "1px solid #d8e4f8",
    borderRadius: "18px",
    padding: "14px 18px",
    textAlign: "center",
    color: "#1e293b",
    fontWeight: "bold",
    boxShadow: "0 8px 22px rgba(15, 23, 42, 0.05)",
    marginBottom: "18px",
  },
  emptyState: {
    background: "#ffffff",
    borderRadius: "26px",
    padding: "52px 20px",
    textAlign: "center",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
  },
  emptyIcon: {
    width: "110px",
    height: "110px",
    borderRadius: "999px",
    margin: "0 auto 18px",
    background: "#eef4ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "46px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "32px",
    color: "#0f172a",
  },
  emptyText: {
    marginTop: "10px",
    color: "#64748b",
    fontSize: "17px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "20px",
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
    fontSize: "12px",
    fontWeight: "bold",
  },
  cardTitle: {
    margin: "0 0 14px",
    fontSize: "28px",
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
  infoLabel: {
    color: "#64748b",
    fontSize: "14px",
  },
  infoValue: {
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "bold",
  },
  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "18px 0",
  },
  priceArea: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  priceText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#059669",
    lineHeight: 1.1,
  },
  priceSub: {
    fontSize: "14px",
    color: "#64748b",
  },
  footer: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    marginTop: "22px",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "18px",
  },
  detailCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.07)",
  },
  detailQty: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  detailTitle: {
    margin: "0 0 14px",
    fontSize: "24px",
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
    fontSize: "13px",
  },
  detailValue: {
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "bold",
  },
git init
git add .
git commit -m "primeira versão"
git remote add origin https://github.com/rdecgomes-source/Buscador-Cury.git
git branch -M main
git push -u origin main

