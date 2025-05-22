import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/Graficos.css";
import { Chart } from "react-google-charts";
import ReporteExcel from "../components/ReporteExcel";
import { DataBarChart, DataPieChart } from "../Entidades/types";

const EstadisticasPedidos = () => {
  const [dataBarChart, setDataBarChart] = useState<DataBarChart>([
    ["Año - Mes", "Cantidad de Pedidos"]
  ]);

  const [dataPieChart, setDataPieChart] = useState<DataPieChart>([
    ["Instrumento", "Cantidad de Pedidos"]
  ]);

  const opcionesGraficoBarras = {
    chart: {
      title: "Cantidad de pedidos por mes y año",
      subtitle: "Agrupados según la fecha de creación del pedido",
    },
  };

  const opcionesGraficoTorta = {
    title: "Distribución de pedidos por instrumento",
  };

  const obtenerDatosGraficoBarras = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pedidos/bar-chart");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data: DataBarChart = await response.json();
      setDataBarChart(data);
    } catch (error) {
      console.log("Error al obtener los datos del gráfico de barras");
    }
  };

  const obtenerDatosGraficoTorta = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pedidos/pie-chart");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data: DataPieChart = await response.json();
      setDataPieChart(data);
    } catch (error) {
      console.log("Error al obtener los datos del gráfico de torta");
    }
  };

  useEffect(() => {
    obtenerDatosGraficoBarras();
    obtenerDatosGraficoTorta();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container__principal__graficos">
        <div className="container__graficos">
          <h2>Pedidos por Mes y Año</h2>
          <p>Gráfico de barras que muestra la cantidad de pedidos agrupados por mes y año según su fecha.</p>
          <Chart
            chartType="Bar"
            data={dataBarChart}
            options={opcionesGraficoBarras}
          />
        </div>

        <div className="container__graficos">
          <h2>Pedidos por Instrumento</h2>
          <p>Gráfico de torta que muestra la cantidad total de pedidos agrupados por instrumento.</p>
          <Chart
            chartType="PieChart"
            data={dataPieChart}
            options={opcionesGraficoTorta}
            width={"100%"}
            height={"400px"}
          />
        </div>

        <div className="excel-container">
          <h2 className="titulo__excel">Reporte en Excel de Pedidos</h2>
          <p>Exporta un archivo Excel con la lista de pedidos filtrados por rango de fechas.</p>
          <ReporteExcel />
        </div>
      </div>
    </>
  );
};

export default EstadisticasPedidos;
