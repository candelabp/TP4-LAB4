import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import "../styles/Graficos.css"
import { Chart } from "react-google-charts";
import ReporteExcel from "../components/ReporteExcel";
import { DataBarChart, DataPieChart } from "../Entidades/types";

const Graficos = () => {

    const [dataBarChart, setDataBarChart] = useState<DataBarChart>([
        ["Año - Mes", "Cantidad de Pedidos"]
    ]);

    const [dataPieChart, setDataPieChart] = useState<DataPieChart>([
        ["Instrumento", "Cantidad de Pedidos"]
    ]);

    const optionsBarChart = {
        chart: {
            title: "Registro de pedidos",
            subtitle: "Agrupados por mes y año",
        },
    };

    const optionsPieChart = {
        title: "Pedidos filtrados por instrumento",
    };

    const obtenerEstadisticasBar = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/pedidos/bar-chart");
            if (!response.ok) throw new Error("Error al obtener los datos");
            const data: DataBarChart = await response.json();
            setDataBarChart(data);
        } catch (error) {
            console.log("Error al obtener los datos");
        }
    };

    const obtenerEstadisticasPie = async () => {
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
        obtenerEstadisticasBar();
        obtenerEstadisticasPie();
    }, []);


    
    return (
        <>
            <Navbar />
            <div className="container__principal__graficos">
                <div>
                    <h2 className="titulo__excel">Exportar excel</h2>
                    <ReporteExcel />
                </div>
                <div className="container__graficos">
                    <h3>Grafico de barras</h3>
                    <Chart
                        chartType="Bar"
                        data={dataBarChart}
                        options={optionsBarChart}
                    />
                </div>
                <div className="container__graficos">
                    <h3>Grafico de torta</h3>
                    <Chart
                        chartType="PieChart"
                        data={dataPieChart}
                        options={optionsPieChart}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>
            </div>
        </>
    )
}

export default Graficos