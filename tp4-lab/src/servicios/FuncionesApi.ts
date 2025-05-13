import Pedido from "../Entidades/Pedido";
import PreferenceMP from "../Entidades/PreferenceMP";

export async function createPreferenceMP(pedido?: Pedido) {
  const urlServer = "http://localhost:8080/api/pedidos/mp";
  const method: string = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const preferenceMP = await response.json() as PreferenceMP;
  console.log("PreferenceMP recibido:", preferenceMP);
  return preferenceMP;
}