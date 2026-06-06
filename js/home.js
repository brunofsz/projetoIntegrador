import data from "./data.js";
const nAtend = document.getElementById("atendimentos");
const varAtend = document.getElementById("atendimentosVariacao");
const nMMP = document.getElementById("medidasProtetivas");
const varMP = document.getElementById("MPVariacao");
const nOcorrencias = document.getElementById("ocorrencias");
const varOcorrencias = document.getElementById("ocorrenciasVariacao");
const nEncaminhamentos = document.getElementById("encaminhamentos");
const varEncaminhamentos = document.getElementById("encaminhamentosVariacao");
const nVisitas = document.getElementById("visitasDomiciliares");
const varVisitas = document.getElementById("visitasVariacao");

const ctx1 = document.getElementById("chart1");
const ctx2 = document.getElementById("chart2");
const ctx3 = document.getElementById("chart3");
const ctx4 = document.getElementById("chart4");
const divMap = document.getElementById("map");
const btnNavbar = document.getElementById("btnNavbar");
const navbar = document.getElementById("navbar");

btnNavbar.addEventListener("click", () => {
  navbar.classList.toggle("active");
  btnNavbar.classList.toggle("active");
});

// cards \/
nAtend.textContent = data.indicadores.atendimentosMes;
varAtend.textContent = `${data.indicadores.atendimentosVariacao >= 0 ? "+" : "-"}${data.indicadores.atendimentosVariacao}% vs mês anterior`;
varAtend.className =
  data.indicadores.atendimentosVariacao >= 0 ? "positive" : "negative";

nMMP.textContent = data.indicadores.medidasProtetivas;
varMP.textContent = `${data.indicadores.medidasVariacao >= 0 ? "+" : "-"}${data.indicadores.medidasVariacao}% vs mês anterior`;
varMP.className =
  data.indicadores.medidasVariacao >= 0 ? "positive" : "negative";

nOcorrencias.textContent = data.indicadores.ocorrencias;
varOcorrencias.textContent = `${data.indicadores.ocorrenciasVariacao >= 0 ? "+" : "-"}${data.indicadores.ocorrenciasVariacao}% vs mês anterior`;
varOcorrencias.className =
  data.indicadores.ocorrenciasVariacao >= 0 ? "positive" : "negative";

nEncaminhamentos.textContent = data.indicadores.encaminhamentos;
varEncaminhamentos.textContent = `${data.indicadores.encaminhamentosVariacao >= 0 ? "+" : "-"}${data.indicadores.encaminhamentosVariacao}% vs mês anterior`;
varEncaminhamentos.className =
  data.indicadores.encaminhamentosVariacao >= 0 ? "positive" : "negative";

nVisitas.textContent = data.indicadores.visitasDomiciliares;
varVisitas.textContent = `${data.indicadores.visitasVariacao >= 0 ? "+" : "-"}${data.indicadores.visitasVariacao}% vs mês anterior`;
varVisitas.className =
  data.indicadores.visitasVariacao >= 0 ? "positive" : "negative";

// Graficos \/
new Chart(ctx1, {
  type: "line",
  data: {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    borderWidth: 10,
    datasets: [
      {
        label: "2026",
        data: data.atendimentosMes,
        backgroundColor: "#e000c663",
        borderWidth: 2,
        borderColor: "#e000c6",
        pontRadius: 0,
        fill: true,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: ["Física", "Psicológica", "Patrimonial", "Moral", "Sexual"],
    datasets: [
      {
        label: "Total de Casos",
        data: [
          data.tiposViolencia.fisica,
          data.tiposViolencia.psicologica,
          data.tiposViolencia.patrimonial,
          data.tiposViolencia.moral,
          data.tiposViolencia.sexual,
        ],
        backgroundColor: [
          "#ff00e1",
          "#ca00b3",
          "#6c006d",
          "#43003c",
          "#ff65f5",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          boxWidth: 15,
          boxHeight: 15,
        },
      },
    },
  },
});

new Chart(ctx3, {
  type: "doughnut",
  data: {
    labels: ["Em Acompanhamento", "Encerrado", "Aguardando"],
    datasets: [
      {
        label: "",
        data: [
          data.statusCasos.acompanhamento,
          data.statusCasos.encerrado,
          data.statusCasos.aguardando,
        ],
        backgroundColor: ["#ff00e1", "#ff83e8", "#96007a"],
      },
    ],
  },
  options: {
    responsive: true,

    cutout: "60%",

    plugins: {
      legend: {
        position: "right",

        labels: {
          font: {
            size: 14,
          },

          boxWidth: 15,
          boxHeight: 15,
        },
      },
    },
  },
});

new Chart(ctx4, {
  type: "bar",
  data: {
    labels: data.ocorrenciasPorBairro.map((bairro) => bairro.bairro),
    datasets: [
      {
        label: "Ocorrências",
        backgroundColor: "#e000c6",
        data: data.ocorrenciasPorBairro.map((bairro) => bairro.ocorrencias),
        borderRadius: 10,
        barPercentage: 0.6,
      },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ocorrências",
        },
      },
      y: {
        title: {
          display: true,
          text: "Bairros",
        },
      },
    },
  },
});

// MAPA DE CALOR \/

const map = L.map(divMap).setView([-22.37, -46.943], 14);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap &copy; CARTO",
  subdomains: "abcd",
  maxZoom: 20,
}).addTo(map);

const coordenadasBairros = {
  "Jardim Ypê": [-22.373, -46.947],
  "Parque Cidade Nova": [-22.36, -46.938],
  "Jardim Novo": [-22.377, -46.952],
  Centro: [-22.3719, -46.942],
  "Jardim Santa Terezinha": [-22.381, -46.94],
  "Vila São Carlos": [-22.365, -46.951],
  "Jardim Fantinato": [-22.375, -46.935],
  "Jardim Guaçuano": [-22.358, -46.946],
  "Jardim Planalto": [-22.364, -46.933],
  "Parque dos Eucaliptos": [-22.382, -46.947],
  "Jardim Imperial": [-22.378, -46.958],
  "Jardim Alvorada": [-22.355, -46.939],
  "Vila Bertioga": [-22.369, -46.955],
  "Jardim Centenário": [-22.362, -46.95],
  "Parque Residencial Ypê Amarelo": [-22.384, -46.943],
};

const maxOcorrencias = Math.max(
  ...data.ocorrenciasPorBairro.map((bairro) => bairro.ocorrencias),
);

const heatData = data.ocorrenciasPorBairro.map((bairro) => {
  const coordenadas = coordenadasBairros[bairro.bairro];

  const intensidade = bairro.ocorrencias / maxOcorrencias;

  return [coordenadas[0], coordenadas[1], intensidade];
});

L.heatLayer(heatData, {
  radius: 80,
  blur: 30,

  gradient: {
    0.2: "#ff00dd",
    0.4: "#ac00a1",
    0.6: "#e000c6",
    0.8: "#3d0035",
    1.0: "#6c006d",
  },
}).addTo(map);

data.ocorrenciasPorBairro.forEach((bairro) => {
  const coordenadas = coordenadasBairros[bairro.bairro];

  if (coordenadas) {
    L.circleMarker(coordenadas, {
      radius: 5,
    })
      .addTo(map)
      .bindPopup(
        `
        <strong>${bairro.bairro}</strong><br>
        Ocorrências: ${bairro.ocorrencias}
        `,
      );
  }
});
