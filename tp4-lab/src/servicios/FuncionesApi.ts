import  Pedido  from "../Entidades/Pedido";
import PreferenceMP from "../Entidades/PreferenceMP";
export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = "" //aca va la url del backend de mp;
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}   