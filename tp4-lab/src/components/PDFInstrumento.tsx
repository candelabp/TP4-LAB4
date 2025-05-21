import { Document, Page, Text, Image, StyleSheet, View } from '@react-pdf/renderer';
import { InstrumentoType } from '../Entidades/types';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12, fontFamily: 'Helvetica' },
  title: { fontSize: 20, marginBottom: 12, fontWeight: 'bold' },
  img: { width: 200, height: 200, objectFit: 'contain', marginBottom: 16 },
  row: { flexDirection: 'row', marginBottom: 8 },
  label: { fontWeight: 'bold', width: 90 },
  value: {},
  desc: { marginTop: 12 }
});

type Props = { instrumento: InstrumentoType; imagenBase64: string };

export const PDFInstrumento = ({ instrumento, imagenBase64 }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{instrumento.instrumento}</Text>
      <Image style={styles.img} src={imagenBase64} />
      <View style={styles.row}>
        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{instrumento.marca}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.value}>{instrumento.modelo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>${instrumento.precio}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{instrumento.categoria?.nombre || 'Sin categoría'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vendidos:</Text>
        <Text style={styles.value}>{instrumento.cantidadVendida}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Costo Envío:</Text>
        <Text style={styles.value}>
          {instrumento.costoEnvio === 'G' ? 'Envío gratis' : `$${instrumento.costoEnvio}`}
        </Text>
      </View>
      <Text style={styles.desc}><Text style={styles.label}>Descripción: </Text>{instrumento.descripcion}</Text>
    </Page>
  </Document>
);