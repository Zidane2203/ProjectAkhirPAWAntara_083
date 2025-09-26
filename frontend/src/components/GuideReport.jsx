// src/components/GuideReport.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  header: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  card: { marginBottom: 10, padding: 10, borderBottom: "1pt solid #ccc" },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  link: { fontSize: 10, color: "blue" }
});

const GuideReport = ({ guides }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daftar Guide - BlablaLink NIKKE</Text>

      {guides.map((g, i) => (
        <View style={styles.card} key={i}>
          <Text style={styles.title}>{g.Nama}</Text>
          <Text style={styles.link}>{g.Link}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default GuideReport;
