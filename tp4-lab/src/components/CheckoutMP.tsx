import { initMercadoPago } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { createPreferenceMP } from '../servicios/FuncionesApi';
import PreferenceMP from '../Entidades/PreferenceMP';
import Pedido from '../Entidades/Pedido';

type Props = {
    pedido: Pedido;
};

function CheckoutMP({ pedido }: Props) {
    const [idPreference, setIdPreference] = useState<string>('');

    const getPreferenceMP = async () => {
        if (pedido.totalPedido > 0) {
            try {
                console.log('Pedido enviado a Mercado Pago:', pedido);
                const response: PreferenceMP = await createPreferenceMP(pedido);
                console.log('Preference id: ' + response.id);
                if (response) {
                    setIdPreference(response.id);
                    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${response.id}`;
                }
            } catch (error) {
                console.error('Error al crear la preferencia de Mercado Pago:', error);
                alert('Hubo un error al procesar el pago con Mercado Pago.');
            }
        } else {
            alert('Agregue al menos un instrumento al carrito');
        }
    };

    initMercadoPago('APP_USR-e9cdbf94-9ed1-431f-b12a-e1bc599a201b', { locale: 'es-AR' });

    return (
        <>
            <div>
                <button onClick={getPreferenceMP} className="btMercadoPago">
                    COMPRAR con <br /> Mercado Pago
                </button>
            </div>
        </>
    );
}

export default CheckoutMP;
