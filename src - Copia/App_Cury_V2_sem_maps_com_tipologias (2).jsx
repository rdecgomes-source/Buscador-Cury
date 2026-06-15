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

  const senhaCorreta = "1234";

  const empreendimentos = [
    {
        "nome": "Dez Belenzinho",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Belém",
        "endereco": "",
        "numero": "",
        "cep": "",
        "enderecoCompleto": "Belém",
        "faixaCep": "03",
        "status": "0",
        "entrega": "",
        "mcmv": "",
        "enquadramento": "",
        "perfil": "",
        "tipologias": [],
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada"
    },
    {
        "nome": "Mérito Belenzinho",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Belém",
        "endereco": "R. Joaquim Carlos",
        "numero": "S/N",
        "cep": "03019-000",
        "enderecoCompleto": "R. Joaquim Carlos, S/N - Belém - CEP 03019-000",
        "faixaCep": "03",
        "status": "5",
        "entrega": "01/09/2027",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 34.37,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 255093,
                "precoTexto": "A partir de R$ 255.093",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 255093,
        "precoTexto": "A partir de R$ 255.093",
        "metragemBase": "34,37 m²"
    },
    {
        "nome": "Modern Mooca",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Mooca/Cambuci",
        "endereco": "R. Dona Ana Neri",
        "numero": "793",
        "cep": "01522-000",
        "enderecoCompleto": "R. Dona Ana Neri, 793 - Mooca/Cambuci - CEP 01522-000",
        "faixaCep": "01",
        "status": "6",
        "entrega": "01/06/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 41.61,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 375266,
                "precoTexto": "A partir de R$ 375.266",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 375266,
        "precoTexto": "A partir de R$ 375.266",
        "metragemBase": "41,61 m²"
    },
    {
        "nome": "Novo Mundo Carrão II",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Vila Carrão",
        "endereco": "R. Lutecia",
        "numero": "1508",
        "cep": "03423-000",
        "enderecoCompleto": "R. Lutecia, 1508 - Vila Carrão - CEP 03423-000",
        "faixaCep": "03",
        "status": "641",
        "entrega": "01/07/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 27.89,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 245000,
                "precoTexto": "A partir de R$ 245.000",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 38.95,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 260000,
                "precoTexto": "A partir de R$ 260.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 245000,
        "precoTexto": "A partir de R$ 245.000",
        "metragemBase": "27,89 m²"
    },
    {
        "nome": "Cidade Mooca  - Navona",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Mooca",
        "endereco": "R. Serra de Paracaina",
        "numero": "S/N",
        "cep": "03107-020",
        "enderecoCompleto": "R. Serra de Paracaina, S/N - Mooca - CEP 03107-020",
        "faixaCep": "03",
        "status": "35",
        "entrega": "01/06/2027",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 34.44,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 268055,
                "precoTexto": "A partir de R$ 268.055",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 44.73,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 486480,
                "precoTexto": "A partir de R$ 486.480",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 268055,
        "precoTexto": "A partir de R$ 268.055",
        "metragemBase": "34,44 m²"
    },
    {
        "nome": "Supreme Anália Franco",
        "construtora": "Cury",
        "regiao": "Leste",
        "bairro": "Analia Franco",
        "endereco": "R. Guapeva",
        "numero": "S/N",
        "cep": "03333-010",
        "enderecoCompleto": "R. Guapeva, S/N - Analia Franco - CEP 03333-010",
        "faixaCep": "03",
        "status": "3",
        "entrega": "01/02/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 32.83,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 270000,
                "precoTexto": "A partir de R$ 270.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 270000,
        "precoTexto": "A partir de R$ 270.000",
        "metragemBase": "32,83 m²"
    },
    {
        "nome": "Marco freguesia",
        "construtora": "Cury",
        "regiao": "Norte",
        "bairro": "Fraguesia do Ó",
        "endereco": "R. Eneias Luis Carlos Barbanti",
        "numero": "392",
        "cep": "02911-000",
        "enderecoCompleto": "R. Eneias Luis Carlos Barbanti, 392 - Fraguesia do Ó - CEP 02911-000",
        "faixaCep": "02",
        "status": "502",
        "entrega": "01/03/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 287857,
                "precoTexto": "A partir de R$ 287.857",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 287857,
        "precoTexto": "A partir de R$ 287.857",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Park View 360",
        "construtora": "Cury",
        "regiao": "Norte",
        "bairro": "Pirituba/Cyti Aerica",
        "endereco": "Av. Do Anastacio",
        "numero": "740",
        "cep": "05119-000",
        "enderecoCompleto": "Av. Do Anastacio, 740 - Pirituba/Cyti Aerica - CEP 05119-000",
        "faixaCep": "05",
        "status": "154",
        "entrega": "01/01/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 297973,
                "precoTexto": "A partir de R$ 297.973",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 297973,
        "precoTexto": "A partir de R$ 297.973",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Alto São Domingos  - Mutinga",
        "construtora": "Cury",
        "regiao": "Norte",
        "bairro": "Pirituba",
        "endereco": "Av. Mutinga",
        "numero": "S/N",
        "cep": "05154-000",
        "enderecoCompleto": "Av. Mutinga, S/N - Pirituba - CEP 05154-000",
        "faixaCep": "05",
        "status": "24",
        "entrega": "01/11/2027",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 34.45,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 283697,
                "precoTexto": "A partir de R$ 283.697",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 34.59,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 275815,
                "precoTexto": "A partir de R$ 275.815",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 275815,
        "precoTexto": "A partir de R$ 275.815",
        "metragemBase": "34,45 m²"
    },
    {
        "nome": "Dez Butantã",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Vl. Lageado",
        "endereco": "Av. Corifeu de Azevedo Marques",
        "numero": "S/N",
        "cep": "05339-001",
        "enderecoCompleto": "Av. Corifeu de Azevedo Marques, S/N - Vl. Lageado - CEP 05339-001",
        "faixaCep": "05",
        "status": "24",
        "entrega": "01/01/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 34.24,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 265420,
                "precoTexto": "A partir de R$ 265.420",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 265420,
        "precoTexto": "A partir de R$ 265.420",
        "metragemBase": "34,24 m²"
    },
    {
        "nome": "Singular Butantã",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Rio Pequeno",
        "endereco": "Av. Rio Pequeno",
        "numero": "S/N",
        "cep": "05379-00",
        "enderecoCompleto": "Av. Rio Pequeno, S/N - Rio Pequeno - CEP 05379-00",
        "faixaCep": "05",
        "status": "67",
        "entrega": "01/07/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 34.24,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 281,
                "precoTexto": "A partir de R$ 281",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 281,
        "precoTexto": "A partir de R$ 281",
        "metragemBase": "34,24 m²"
    },
    {
        "nome": "Supreme Vila Romana",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Agua Brnaca",
        "endereco": "R. Clelia",
        "numero": "1030",
        "cep": "05442-00",
        "enderecoCompleto": "R. Clelia, 1030 - Agua Brnaca - CEP 05442-00",
        "faixaCep": "05",
        "status": "104",
        "entrega": "01/01/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 357834,
                "precoTexto": "A partir de R$ 357.834",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 357834,
        "precoTexto": "A partir de R$ 357.834",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Atmosfera  Jaguare",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Jaguaré",
        "endereco": "R. Santo Eurilo",
        "numero": "296",
        "cep": "05345-040",
        "enderecoCompleto": "R. Santo Eurilo, 296 - Jaguaré - CEP 05345-040",
        "faixaCep": "05",
        "status": "177",
        "entrega": "01/11/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 24.13,
                "areaMax": "",
                "varanda": "Não informado",
                "vaga": "0",
                "precoNumero": 220000,
                "precoTexto": "A partir de R$ 220.000",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 32.19,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 255000,
                "precoTexto": "A partir de R$ 255.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 220000,
        "precoTexto": "A partir de R$ 220.000",
        "metragemBase": "24,13 m²"
    },
    {
        "nome": "Mérito Lapa",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Lapa/Vila anastacio",
        "endereco": "R. Bartolomeu Paes",
        "numero": "255",
        "cep": "05092-000",
        "enderecoCompleto": "R. Bartolomeu Paes, 255 - Lapa/Vila anastacio - CEP 05092-000",
        "faixaCep": "05",
        "status": "536",
        "entrega": "01/01/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 322050,
                "precoTexto": "A partir de R$ 322.050",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 322050,
        "precoTexto": "A partir de R$ 322.050",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Barra funda900",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Barra Funda",
        "endereco": "R. Barra Funda",
        "numero": "900",
        "cep": "01150-000",
        "enderecoCompleto": "R. Barra Funda, 900 - Barra Funda - CEP 01150-000",
        "faixaCep": "01",
        "status": "647",
        "entrega": "01/03/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 32.5,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 292907,
                "precoTexto": "A partir de R$ 292.907",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 292907,
        "precoTexto": "A partir de R$ 292.907",
        "metragemBase": "32,50 m²"
    },
    {
        "nome": "Barra funda930",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Barra Funda",
        "endereco": "R. Barra Funda",
        "numero": "930",
        "cep": "01152-000",
        "enderecoCompleto": "R. Barra Funda, 930 - Barra Funda - CEP 01152-000",
        "faixaCep": "01",
        "status": "60",
        "entrega": "01/11/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 37.86,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 360000,
                "precoTexto": "A partir de R$ 360.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 360000,
        "precoTexto": "A partir de R$ 360.000",
        "metragemBase": "37,86 m²"
    },
    {
        "nome": "Cidade Vila Lobos Sonata",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Jaguaré",
        "endereco": "",
        "numero": "",
        "cep": "",
        "enderecoCompleto": "Jaguaré",
        "faixaCep": "05",
        "status": "0",
        "entrega": "",
        "mcmv": "SIM",
        "enquadramento": "",
        "perfil": "GERAL",
        "tipologias": [],
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada"
    },
    {
        "nome": "Cidade Vila Lobos - Maestro",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Jaguaré",
        "endereco": "Av. Torres de Oliveira",
        "numero": "S/N",
        "cep": "05347-020",
        "enderecoCompleto": "Av. Torres de Oliveira, S/N - Jaguaré - CEP 05347-020",
        "faixaCep": "05",
        "status": "17",
        "entrega": "01/05/2028",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 34.81,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 267910,
                "precoTexto": "A partir de R$ 267.910",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 267910,
        "precoTexto": "A partir de R$ 267.910",
        "metragemBase": "34,81 m²"
    },
    {
        "nome": "Cidade Vila Lobos -  Soprano",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Jaguaré",
        "endereco": "",
        "numero": "",
        "cep": "",
        "enderecoCompleto": "Jaguaré",
        "faixaCep": "05",
        "status": "0",
        "entrega": "01/11/2027",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [],
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada"
    },
    {
        "nome": "Cidade Vila Lobos - Condominio Tenor",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Jaguaré",
        "endereco": "Av. Onofrio Milani",
        "numero": "S/N",
        "cep": "05348-030",
        "enderecoCompleto": "Av. Onofrio Milani, S/N - Jaguaré - CEP 05348-030",
        "faixaCep": "05",
        "status": "553",
        "entrega": "01/04/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 32.42,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 251835,
                "precoTexto": "A partir de R$ 251.835",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 251835,
        "precoTexto": "A partir de R$ 251.835",
        "metragemBase": "32,42 m²"
    },
    {
        "nome": "Lyne Agua Branca",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Agua Branca",
        "endereco": "R. Comendador Souza",
        "numero": "194",
        "cep": "05037-090",
        "enderecoCompleto": "R. Comendador Souza, 194 - Agua Branca - CEP 05037-090",
        "faixaCep": "05",
        "status": "721",
        "entrega": "01/12/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 296000,
                "precoTexto": "A partir de R$ 296.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 296000,
        "precoTexto": "A partir de R$ 296.000",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Nova Leopoldina",
        "construtora": "Cury",
        "regiao": "Oeste",
        "bairro": "Vila Leopoldina",
        "endereco": "",
        "numero": "",
        "cep": "",
        "enderecoCompleto": "Vila Leopoldina",
        "faixaCep": "05",
        "status": "0",
        "entrega": "",
        "mcmv": "",
        "enquadramento": "",
        "perfil": "",
        "tipologias": [],
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada"
    },
    {
        "nome": "Cidade Parque Guarapiranga",
        "construtora": "Cury",
        "regiao": "Sul",
        "bairro": "Socorro",
        "endereco": "Av. Do Rio Bonito",
        "numero": "57",
        "cep": "04776-000",
        "enderecoCompleto": "Av. Do Rio Bonito, 57 - Socorro - CEP 04776-000",
        "faixaCep": "04",
        "status": "1",
        "entrega": "01/09/2029",
        "mcmv": "SIM",
        "enquadramento": "",
        "perfil": "GERAL",
        "tipologias": [],
        "precoNumero": 0,
        "precoTexto": "Preço não informado",
        "metragemBase": "Metragem não informada"
    },
    {
        "nome": "Praça Santo Antonio",
        "construtora": "Cury",
        "regiao": "Sul",
        "bairro": "Vl. Cruzeiro",
        "endereco": "R. Braganca Paulista",
        "numero": "845",
        "cep": "04727-000",
        "enderecoCompleto": "R. Braganca Paulista, 845 - Vl. Cruzeiro - CEP 04727-000",
        "faixaCep": "04",
        "status": "241",
        "entrega": "01/05/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "2 dormitorio",
                "areaMin": 36.8,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 325000,
                "precoTexto": "A partir de R$ 325.000",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 325000,
        "precoTexto": "A partir de R$ 325.000",
        "metragemBase": "36,80 m²"
    },
    {
        "nome": "Parque das Nações Laguna",
        "construtora": "Cury",
        "regiao": "Sul",
        "bairro": "Jd. Caravelas",
        "endereco": "R. Luiz Seraphico Junior",
        "numero": "326",
        "cep": "04729-080",
        "enderecoCompleto": "R. Luiz Seraphico Junior, 326 - Jd. Caravelas - CEP 04729-080",
        "faixaCep": "04",
        "status": "295",
        "entrega": "01/02/2029",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 26.56,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 236012,
                "precoTexto": "A partir de R$ 236.012",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 37.15,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 335708,
                "precoTexto": "A partir de R$ 335.708",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 236012,
        "precoTexto": "A partir de R$ 236.012",
        "metragemBase": "26,56 m²"
    },
    {
        "nome": "Merito - Vila Mascote",
        "construtora": "Cury",
        "regiao": "Sul",
        "bairro": "Vl. Santa Catarina",
        "endereco": "R. Dr. Djalma Pinheiro Franco",
        "numero": "S/N",
        "cep": "04368-006",
        "enderecoCompleto": "R. Dr. Djalma Pinheiro Franco, S/N - Vl. Santa Catarina - CEP 04368-006",
        "faixaCep": "04",
        "status": "7",
        "entrega": "01/11/2027",
        "mcmv": "SIM",
        "enquadramento": "HIS1-HIS2-R2V",
        "perfil": "GERAL",
        "tipologias": [
            {
                "tipologia": "1 dormitorio",
                "areaMin": 35,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "0",
                "precoNumero": 294914,
                "precoTexto": "A partir de R$ 294.914",
                "referencia": "",
                "observacoes": ""
            },
            {
                "tipologia": "2 dormitorio",
                "areaMin": 46.7,
                "areaMax": "",
                "varanda": "OPCAO",
                "vaga": "OPCAO",
                "precoNumero": 5171181,
                "precoTexto": "A partir de R$ 5.171.181",
                "referencia": "",
                "observacoes": ""
            }
        ],
        "precoNumero": 294914,
        "precoTexto": "A partir de R$ 294.914",
        "metragemBase": "35,00 m²"
    }
];

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

    let encontrados = empreendimentos.filter((item) => {
      const bateCep =
        cepLimpo.length >= 2 && item.faixaCep === cepLimpo.substring(0, 2);

      const textoCompleto = normalizarTexto(
        [
          item.nome,
          item.construtora,
          item.regiao,
          item.bairro,
          item.endereco,
          item.numero,
          item.cep,
          item.enderecoCompleto,
          item.enquadramento,
          resumoTipologias(item),
        ].join(" ")
      );

      const bateTexto = textoCompleto.includes(termo);

      return bateCep || bateTexto;
    });

    if (max) {
      encontrados = encontrados.filter((item) => {
        const preco = Number(item.precoNumero || 0) || menorPrecoTipologias(item);
        return preco > 0 && preco <= max;
      });
    }

    encontrados.sort((a, b) => {
      const precoA = Number(a.precoNumero || 0) || menorPrecoTipologias(a) || 999999999;
      const precoB = Number(b.precoNumero || 0) || menorPrecoTipologias(b) || 999999999;
      return precoA - precoB;
    });

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
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.headerCard}>
            <button
              onClick={() => setEmpreendimentoSelecionado(null)}
              style={styles.secondaryButton}
            >
              ← Voltar
            </button>

            <div style={{ marginTop: 18 }}>
              <div style={styles.brandTop}>Detalhamento do empreendimento</div>
              <h1 style={styles.titleInterna}>
                {empreendimentoSelecionado.nome}
              </h1>

              <p style={styles.enderecoLinha}>
                {empreendimentoSelecionado.enderecoCompleto}
              </p>

              <p style={styles.subtitle}>
                Bairro: {empreendimentoSelecionado.bairro || "Não informado"} • Região:{" "}
                {empreendimentoSelecionado.regiao || "Não informada"}
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
                  {empreendimentoSelecionado.entrega || "Não informada"}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.messageBox}>
            Tipologias cadastradas para este empreendimento
          </div>

          {!empreendimentoSelecionado.tipologias ||
          empreendimentoSelecionado.tipologias.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📄</div>
              <h3 style={styles.emptyTitle}>Sem tipologias cadastradas</h3>
              <p style={styles.emptyText}>
                Este empreendimento ainda não tem informações de dormitórios,
                varanda, vaga, área e preço na aba de tipologias.
              </p>
            </div>
          ) : (
            <div style={styles.detailGrid}>
              {empreendimentoSelecionado.tipologias.map((item, index) => (
                <div key={index} style={styles.detailCard}>
                  <h3 style={styles.detailTitle}>{item.tipologia}</h3>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Área</span>
                    <span style={styles.detailValue}>
                      {item.areaMin
                        ? `${String(item.areaMin).replace(".", ",")} m²`
                        : "Não informada"}
                    </span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Varanda</span>
                    <span style={styles.detailValue}>
                      {item.varanda || "Não informado"}
                    </span>
                  </div>

                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Vaga / Garagem</span>
                    <span style={styles.detailValue}>
                      {item.vaga || "Não informado"}
                    </span>
                  </div>

                  <div style={styles.divider}></div>

                  <div style={styles.priceArea}>
                    <div style={styles.priceText}>
                      {item.precoTexto || "Preço não informado"}
                    </div>
                    <div style={styles.priceSub}>
                      Referência: {item.referencia || "a partir de"}
                    </div>
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
                Consulta rápida por CEP, bairro, região ou empreendimento
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
            placeholder="Digite o CEP, bairro, região ou nome do empreendimento"
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

                <div style={styles.infoBlock}>
                  <div style={styles.infoRowColumn}>
                    <span style={styles.infoLabel}>Endereço</span>
                    <span style={styles.infoValue}>
                      {item.enderecoCompleto}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Bairro</span>
                    <span style={styles.infoValue}>
                      {item.bairro || "Não informado"}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>CEP / Faixa</span>
                    <span style={styles.infoValue}>
                      {item.cep || `${item.faixaCep}xxx-xxx`}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Entrega</span>
                    <span style={styles.infoValue}>
                      {item.entrega || "Não informada"}
                    </span>
                  </div>

                  <div style={styles.infoRowColumn}>
                    <span style={styles.infoLabel}>Tipologias</span>
                    <span style={styles.infoValue}>
                      {resumoTipologias(item)}
                    </span>
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
    marginTop: "16px",
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
  infoRowColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "13px",
  },
  infoValue: {
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1.45,
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
