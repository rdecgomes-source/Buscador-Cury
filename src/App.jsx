import { useMemo, useState } from "react";

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

  const senhaCorreta = "1234"; // altere aqui se quiser

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      setLiberado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const empreendimentos = [
    {
        "nome": "Dez Belenzinho",
        "endereco": "Endereço não informado",
        "enderecoResumido": "Endereço não informado",
        "faixaCep": "03",
        "bairro": "Belém",
        "regiao": "Zona Leste",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "Não informada"
    },
    {
        "nome": "Mérito Belenzinho",
        "endereco": "R. Joaquim Carlos, S/N",
        "enderecoResumido": "R. Joaquim Carlos, S/N",
        "faixaCep": "03",
        "bairro": "Belém",
        "regiao": "Zona Leste",
        "precoNumero": 255093,
        "precoTexto": "A partir de R$ 255 mil",
        "metragemBase": "34,37 m²",
        "entrega": "01/09/2027"
    },
    {
        "nome": "Modern Mooca",
        "endereco": "R. Dona Ana Neri, 793",
        "enderecoResumido": "R. Dona Ana Neri, 793",
        "faixaCep": "01",
        "bairro": "Mooca/Cambuci",
        "regiao": "Zona Leste",
        "precoNumero": 375266,
        "precoTexto": "A partir de R$ 375 mil",
        "metragemBase": "41,61 m²",
        "entrega": "01/06/2028"
    },
    {
        "nome": "Novo Mundo Carrão II",
        "endereco": "R. Lutecia, 1508",
        "enderecoResumido": "R. Lutecia, 1508",
        "faixaCep": "03",
        "bairro": "Vila Carrão",
        "regiao": "Zona Leste",
        "precoNumero": 245000,
        "precoTexto": "A partir de R$ 245 mil",
        "metragemBase": "27,89 m²",
        "entrega": "01/07/2029"
    },
    {
        "nome": "Cidade Mooca  - Navona",
        "endereco": "R. Serra de Paracaina, S/N",
        "enderecoResumido": "R. Serra de Paracaina, S/N",
        "faixaCep": "03",
        "bairro": "Mooca",
        "regiao": "Zona Leste",
        "precoNumero": 268055,
        "precoTexto": "A partir de R$ 268 mil",
        "metragemBase": "34,44 m²",
        "entrega": "01/06/2027"
    },
    {
        "nome": "Supreme Anália Franco",
        "endereco": "R. Guapeva, S/N",
        "enderecoResumido": "R. Guapeva, S/N",
        "faixaCep": "03",
        "bairro": "Analia Franco",
        "regiao": "Zona Leste",
        "precoNumero": 270000,
        "precoTexto": "A partir de R$ 270 mil",
        "metragemBase": "32,83 m²",
        "entrega": "01/02/2028"
    },
    {
        "nome": "Marco freguesia",
        "endereco": "R. Eneias Luis Carlos Barbanti, 392",
        "enderecoResumido": "R. Eneias Luis Carlos Barbanti, 392",
        "faixaCep": "02",
        "bairro": "Fraguesia do Ó",
        "regiao": "Zona Norte",
        "precoNumero": 287857,
        "precoTexto": "A partir de R$ 287 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/03/2029"
    },
    {
        "nome": "Park View 360",
        "endereco": "Av. Do Anastacio, 740",
        "enderecoResumido": "Av. Do Anastacio, 740",
        "faixaCep": "05",
        "bairro": "Pirituba/Cyti Aerica",
        "regiao": "Zona Norte",
        "precoNumero": 297973,
        "precoTexto": "A partir de R$ 297 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/01/2028"
    },
    {
        "nome": "Alto São Domingos  - Mutinga",
        "endereco": "Av. Mutinga, S/N",
        "enderecoResumido": "Av. Mutinga, S/N",
        "faixaCep": "05",
        "bairro": "Pirituba",
        "regiao": "Zona Norte",
        "precoNumero": 275815,
        "precoTexto": "A partir de R$ 275 mil",
        "metragemBase": "34,45 m²",
        "entrega": "01/11/2027"
    },
    {
        "nome": "Dez Butantã",
        "endereco": "Av. Corifeu de Azevedo Marques, S/N",
        "enderecoResumido": "Av. Corifeu de Azevedo Marques, S/N",
        "faixaCep": "05",
        "bairro": "Vl. Lageado",
        "regiao": "Zona Oeste",
        "precoNumero": 265420,
        "precoTexto": "A partir de R$ 265 mil",
        "metragemBase": "34,24 m²",
        "entrega": "01/01/2028"
    },
    {
        "nome": "Singular Butantã",
        "endereco": "Av. Rio Pequeno, S/N",
        "enderecoResumido": "Av. Rio Pequeno, S/N",
        "faixaCep": "05",
        "bairro": "Rio Pequeno",
        "regiao": "Zona Oeste",
        "precoNumero": 281,
        "precoTexto": "A partir de R$ 0 mil",
        "metragemBase": "34,24 m²",
        "entrega": "01/07/2028"
    },
    {
        "nome": "Supreme Vila Romana",
        "endereco": "R. Clelia, 1030",
        "enderecoResumido": "R. Clelia, 1030",
        "faixaCep": "05",
        "bairro": "Agua Brnaca",
        "regiao": "Zona Oeste",
        "precoNumero": 357834,
        "precoTexto": "A partir de R$ 357 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/01/2029"
    },
    {
        "nome": "Atmosfera  Jaguare",
        "endereco": "R. Santo Eurilo, 296",
        "enderecoResumido": "R. Santo Eurilo, 296",
        "faixaCep": "05",
        "bairro": "Jaguaré",
        "regiao": "Zona Oeste",
        "precoNumero": 220000,
        "precoTexto": "A partir de R$ 220 mil",
        "metragemBase": "24,13 m²",
        "entrega": "01/11/2028"
    },
    {
        "nome": "Mérito Lapa",
        "endereco": "R. Bartolomeu Paes, 255",
        "enderecoResumido": "R. Bartolomeu Paes, 255",
        "faixaCep": "05",
        "bairro": "Lapa/Vila anastacio",
        "regiao": "Zona Oeste",
        "precoNumero": 322050,
        "precoTexto": "A partir de R$ 322 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/01/2029"
    },
    {
        "nome": "Barra funda900",
        "endereco": "R. Barra Funda, 900",
        "enderecoResumido": "R. Barra Funda, 900",
        "faixaCep": "01",
        "bairro": "Barra Funda",
        "regiao": "Zona Oeste",
        "precoNumero": 292907,
        "precoTexto": "A partir de R$ 292 mil",
        "metragemBase": "32,5 m²",
        "entrega": "01/03/2029"
    },
    {
        "nome": "Barra funda930",
        "endereco": "R. Barra Funda, 930",
        "enderecoResumido": "R. Barra Funda, 930",
        "faixaCep": "01",
        "bairro": "Barra Funda",
        "regiao": "Zona Oeste",
        "precoNumero": 360000,
        "precoTexto": "A partir de R$ 360 mil",
        "metragemBase": "37,86 m²",
        "entrega": "01/11/2028"
    },
    {
        "nome": "Cidade Vila Lobos Sonata",
        "endereco": "Endereço não informado",
        "enderecoResumido": "Endereço não informado",
        "faixaCep": "05",
        "bairro": "Jaguaré",
        "regiao": "Zona Oeste",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "Não informada"
    },
    {
        "nome": "Cidade Vila Lobos - Maestro",
        "endereco": "Av. Torres de Oliveira, S/N",
        "enderecoResumido": "Av. Torres de Oliveira, S/N",
        "faixaCep": "05",
        "bairro": "Jaguaré",
        "regiao": "Zona Oeste",
        "precoNumero": 267910,
        "precoTexto": "A partir de R$ 267 mil",
        "metragemBase": "34,81 m²",
        "entrega": "01/05/2028"
    },
    {
        "nome": "Cidade Vila Lobos -  Soprano",
        "endereco": "Endereço não informado",
        "enderecoResumido": "Endereço não informado",
        "faixaCep": "05",
        "bairro": "Jaguaré",
        "regiao": "Zona Oeste",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "01/11/2027"
    },
    {
        "nome": "Cidade Vila Lobos - Condominio Tenor",
        "endereco": "Av. Onofrio Milani, S/N",
        "enderecoResumido": "Av. Onofrio Milani, S/N",
        "faixaCep": "05",
        "bairro": "Jaguaré",
        "regiao": "Zona Oeste",
        "precoNumero": 251835,
        "precoTexto": "A partir de R$ 251 mil",
        "metragemBase": "32,42 m²",
        "entrega": "01/04/2029"
    },
    {
        "nome": "Lyne Agua Branca",
        "endereco": "R. Comendador Souza, 194",
        "enderecoResumido": "R. Comendador Souza, 194",
        "faixaCep": "05",
        "bairro": "Agua Branca",
        "regiao": "Zona Oeste",
        "precoNumero": 296000,
        "precoTexto": "A partir de R$ 296 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/12/2029"
    },
    {
        "nome": "Nova Leopoldina",
        "endereco": "Endereço não informado",
        "enderecoResumido": "Endereço não informado",
        "faixaCep": "05",
        "bairro": "Vila Leopoldina",
        "regiao": "Zona Oeste",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "Não informada"
    },
    {
        "nome": "Cidade Parque Guarapiranga",
        "endereco": "Av. Do Rio Bonito, 57",
        "enderecoResumido": "Av. Do Rio Bonito, 57",
        "faixaCep": "04",
        "bairro": "Socorro",
        "regiao": "Zona Sul",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "01/09/2029"
    },
    {
        "nome": "Praça Santo Antonio",
        "endereco": "R. Braganca Paulista, 845",
        "enderecoResumido": "R. Braganca Paulista, 845",
        "faixaCep": "04",
        "bairro": "Vl. Cruzeiro",
        "regiao": "Zona Sul",
        "precoNumero": 325000,
        "precoTexto": "A partir de R$ 325 mil",
        "metragemBase": "36,8 m²",
        "entrega": "01/05/2029"
    },
    {
        "nome": "Parque das Nações Laguna",
        "endereco": "R. Luiz Seraphico Junior, 326",
        "enderecoResumido": "R. Luiz Seraphico Junior, 326",
        "faixaCep": "04",
        "bairro": "Jd. Caravelas",
        "regiao": "Zona Sul",
        "precoNumero": 236012,
        "precoTexto": "A partir de R$ 236 mil",
        "metragemBase": "26,56 m²",
        "entrega": "01/02/2029"
    },
    {
        "nome": "Merito - Vila Mascote",
        "endereco": "R. Dr. Djalma Pinheiro Franco, S/N",
        "enderecoResumido": "R. Dr. Djalma Pinheiro Franco, S/N",
        "faixaCep": "04",
        "bairro": "Vl. Santa Catarina",
        "regiao": "Zona Sul",
        "precoNumero": 294914,
        "precoTexto": "A partir de R$ 294 mil",
        "metragemBase": "35 m²",
        "entrega": "01/11/2027"
    },
    {
        "nome": "Cidade Mooca - Duomo",
        "endereco": "R. Serra de Paracaína, S/N",
        "enderecoResumido": "R. Serra de Paracaína, S/N",
        "faixaCep": "03",
        "bairro": "Mooca",
        "regiao": "Zona Leste",
        "precoNumero": 264343,
        "precoTexto": "A partir de R$ 264 mil",
        "metragemBase": "34,6 m²",
        "entrega": "01/03/2027"
    },
    {
        "nome": "Cidade Mooca - Vila Capri",
        "endereco": "R. da Mooca, 1300",
        "enderecoResumido": "R. da Mooca, 1300",
        "faixaCep": "03",
        "bairro": "Mooca",
        "regiao": "Zona Leste",
        "precoNumero": 362971,
        "precoTexto": "A partir de R$ 362 mil",
        "metragemBase": "37,05 m²",
        "entrega": "01/12/2024"
    },
    {
        "nome": "Condomínio Residencial Dez Canindé",
        "endereco": "R. Azurita, 48",
        "enderecoResumido": "R. Azurita, 48",
        "faixaCep": "03",
        "bairro": "Canindé",
        "regiao": "Zona Sul",
        "precoNumero": 276102,
        "precoTexto": "A partir de R$ 276 mil",
        "metragemBase": "34,65 m²",
        "entrega": "01/11/2023"
    },
    {
        "nome": "Condomínio Residencial Dez Celeste",
        "endereco": "Av.  Dos Ourives, 840",
        "enderecoResumido": "Av.  Dos Ourives, 840",
        "faixaCep": "04",
        "bairro": "Jd. São Savério",
        "regiao": "Zona Sul",
        "precoNumero": 231790,
        "precoTexto": "A partir de R$ 231 mil",
        "metragemBase": "34,99 m²",
        "entrega": "26/04/2026"
    },
    {
        "nome": "Connect São Mateus",
        "endereco": "R. Andre de Almeida, 2665",
        "enderecoResumido": "R. Andre de Almeida, 2665",
        "faixaCep": "03",
        "bairro": "Parque Colonial",
        "regiao": "Zona Sul",
        "precoNumero": 271611,
        "precoTexto": "A partir de R$ 271 mil",
        "metragemBase": "34,19 m²",
        "entrega": "01/09/2025"
    },
    {
        "nome": "Connect São Mateus 2",
        "endereco": "R. Andre de Almeida, 2665",
        "enderecoResumido": "R. Andre de Almeida, 2665",
        "faixaCep": "03",
        "bairro": "Parque Colonial",
        "regiao": "Zona Sul",
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada",
        "entrega": "01/05/2026"
    },
    {
        "nome": "Dez Limão",
        "endereco": "R. Rocha lima, 411",
        "enderecoResumido": "R. Rocha lima, 411",
        "faixaCep": "02",
        "bairro": "Vila Diva",
        "regiao": "Zona Norte",
        "precoNumero": 305685,
        "precoTexto": "A partir de R$ 305 mil",
        "metragemBase": "33,99 m²",
        "entrega": "01/06/2026"
    },
    {
        "nome": "Green Lyne Pirituba",
        "endereco": "Av. Paula Ferreira, 3700",
        "enderecoResumido": "Av. Paula Ferreira, 3700",
        "faixaCep": "02",
        "bairro": "Vila Pirituba",
        "regiao": "Zona Norte",
        "precoNumero": 228962,
        "precoTexto": "A partir de R$ 228 mil",
        "metragemBase": "35,23 m²",
        "entrega": "01/06/2025"
    },
    {
        "nome": "Like Campo Limpo",
        "endereco": "R.  Nossa Sra. Do Bom Conselho, S/N",
        "enderecoResumido": "R.  Nossa Sra. Do Bom Conselho, S/N",
        "faixaCep": "05",
        "bairro": "Chacara N. Sra. Do Bom Conselho",
        "regiao": "Zona Sul",
        "precoNumero": 386343,
        "precoTexto": "A partir de R$ 386 mil",
        "metragemBase": "44,5 m²",
        "entrega": "01/04/2028"
    },
    {
        "nome": "Lyne Campo Limpo",
        "endereco": "Av. Carlos Caldeira Filho, S/N",
        "enderecoResumido": "Av. Carlos Caldeira Filho, S/N",
        "faixaCep": "05",
        "bairro": "Jd. Avenida",
        "regiao": "Zona Sul",
        "precoNumero": 607675,
        "precoTexto": "A partir de R$ 607 mil",
        "metragemBase": "56,31 m²",
        "entrega": "01/10/2027"
    },
    {
        "nome": "My Sacomã",
        "endereco": "R. Frans Alt, S/N",
        "enderecoResumido": "R. Frans Alt, S/N",
        "faixaCep": "04",
        "bairro": "Jd. Santa Emilia",
        "regiao": "Zona Sul",
        "precoNumero": 325716,
        "precoTexto": "A partir de R$ 325 mil",
        "metragemBase": "43,44 m²",
        "entrega": "01/02/2028"
    },
    {
        "nome": "Soul Miguel Yunes",
        "endereco": "Av. Miguel Yunes, S/N",
        "enderecoResumido": "Av. Miguel Yunes, S/N",
        "faixaCep": "04",
        "bairro": "Usina Piratininga",
        "regiao": "Zona Sul",
        "precoNumero": 180316,
        "precoTexto": "A partir de R$ 180 mil",
        "metragemBase": "23,23 m²",
        "entrega": "01/05/2027"
    },
    {
        "nome": "Urban Tatuapé",
        "endereco": "R.  Cesario Galeno, 289",
        "enderecoResumido": "R.  Cesario Galeno, 289",
        "faixaCep": "03",
        "bairro": "Tatuape",
        "regiao": "Zona Leste",
        "precoNumero": 378272,
        "precoTexto": "A partir de R$ 378 mil",
        "metragemBase": "35,48 m²",
        "entrega": "01/02/2026"
    },
    {
        "nome": "Urban Vila Maria II",
        "endereco": "R. João Veloso Filho, 1346",
        "enderecoResumido": "R. João Veloso Filho, 1346",
        "faixaCep": "02",
        "bairro": "Vila Guilherme",
        "regiao": "Zona Norte",
        "precoNumero": 460072,
        "precoTexto": "A partir de R$ 460 mil",
        "metragemBase": "44,86 m²",
        "entrega": "30/04/2024"
    },
    {
        "nome": "Yunes Park",
        "endereco": "Av. Miguel Yunes, S/N",
        "enderecoResumido": "Av. Miguel Yunes, S/N",
        "faixaCep": "04",
        "bairro": "Usina piratininga",
        "regiao": "Zona Sul",
        "precoNumero": 181249,
        "precoTexto": "A partir de R$ 181 mil",
        "metragemBase": "28,8 m²",
        "entrega": "01/02/2027"
    }
];

  const detalhesPorEmpreendimento = {
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

  const handleEnterBusca = (e) => {
    if (e.key === "Enter") {
      buscarEmpreendimentos();
    }
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
    const detalhes =
      detalhesPorEmpreendimento[empreendimentoSelecionado.nome] || [];

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.headerCard}>
            <button onClick={voltarLista} style={styles.secondaryButton}>
              ← Voltar
            </button>

            <div style={{ marginTop: 18 }}>
              <div style={styles.brandTop}>Detalhamento do empreendimento</div>
              <h1 style={styles.titleInterna}>{empreendimentoSelecionado.nome}</h1>
              <p style={styles.enderecoLinha}>
                {empreendimentoSelecionado.endereco}
              </p>
              <p style={styles.subtitle}>
                Bairro: {empreendimentoSelecionado.bairro} • Região:{" "}
                {empreendimentoSelecionado.regiao}
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
                  {empreendimentoSelecionado.entrega}
                </span>
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
                Este empreendimento ainda não teve as faixas de unidades
                lançadas na tela interna.
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
                    <span style={styles.detailValue}>
                      {item.enquadramento}
                    </span>
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
                Consulta rápida para atendimento comercial
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
            placeholder="Digite o CEP, bairro ou região do cliente"
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
              Pesquise por Mooca, Barra Funda, Campo Limpo, Santo André,
              Tatuapé, Sacomã ou por CEP.
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
                    <span style={styles.infoValue}>
                      {item.faixaCep}xxx-xxx
                    </span>
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
                  style={{
                    ...styles.primaryButton,
                    marginTop: 16,
                    width: "100%",
                  }}
                >
                  Ver unidades
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
  infoLabel: {
    color: "#64748b",
    fontSize: "13px",
  },
  infoValue: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
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
  detailQty: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#1d4ed8",
    padding: "7px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold",
    marginBottom: "12px",
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