import { Document, Page, Text, Image, StyleSheet, View } from '@react-pdf/renderer';
import { InstrumentoType } from '../Entidades/types';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
    color: '#333'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 160,
    objectFit: 'contain',
  },
  precioContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10
  },
  precio: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  datosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  datoColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datoColumnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  value: {
    fontSize: 14,
  },
  costoEnvio: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descripcionContainer: {
    marginTop: 15,
  },
  descripcionLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  descripcionText: {
    lineHeight: 1.5,
    fontSize: 13,
  }
});

type Props = {
  instrumento: InstrumentoType;
  imagenBase64: string;
};

export const PDFInstrumento = ({ instrumento, imagenBase64 }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{instrumento.instrumento}</Text>
      
      <View style={styles.imageContainer}>
        <Image style={styles.image} src={imagenBase64} />
      </View>
      
      <View style={styles.precioContainer}>
        <Text style={styles.precio}>Precio: ${instrumento.precio}</Text>
      </View>
      
      <View style={styles.datosRow}>
        <View style={styles.datoColumn}>
          <Text style={styles.label}>Marca:</Text>
          <Text style={styles.value}>{instrumento.marca}</Text>
        </View>
        
        <View style={styles.datoColumnRight}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{instrumento.modelo}</Text>
        </View>
      </View>
      
      <View style={styles.costoEnvio}>
        <Text style={styles.label}>Costo Envío:</Text>
        <Text style={styles.value}>
          {instrumento.costoEnvio === 'G' ? 'Envío gratis' : `$${instrumento.costoEnvio}`}
        </Text>
      </View>
      
      <View style={styles.descripcionContainer}>
        <Text style={styles.descripcionLabel}>Descripción:</Text>
        <Text style={styles.descripcionText}>{instrumento.descripcion}</Text>
      </View>
    </Page>
  </Document>
);