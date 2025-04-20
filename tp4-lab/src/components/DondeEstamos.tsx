import "../styles/Home.css";
export const DondeEstamos = () => {
    return (
        <div className="mapa-container">

  <iframe
    title="Ubicación Tienda"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.6927533428533!2d-68.84602292443323!3d-32.886065271541804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0913ccbd7ca3%3A0xb94f264bd9ce21ac!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20M5500%20Mendoza!5e0!3m2!1ses-419!2sar!4v1713285946645!5m2!1ses-419!2sar"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
    )
}