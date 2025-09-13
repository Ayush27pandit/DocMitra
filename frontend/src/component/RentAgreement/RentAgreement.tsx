import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  clause: {
    marginBottom: 10,
    textAlign: "justify",
  },
});

const RentAgreementPreview = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>RENTAL AGREEMENT</Text>

      <View style={styles.section}>
        <Text>
          This Rent Agreement is made and executed on this 1st day of June 2025,
          by and between:
        </Text>
        <Text>
          <Text style={styles.label}>Landlord:</Text> Mr. Rajesh Kumar, S/o Shri
          Mohan Kumar, residing at 123, Green Street, New Delhi - 110001
        </Text>
        <Text>
          <Text style={styles.label}>Tenant:</Text> Mr. Suresh Mehta, S/o Shri
          Anil Mehta, currently residing at 78, Blue Apartments, Mumbai - 400001
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address of Rented Premises:</Text>
        <Text>
          Flat No. 202, Rose Residency, Near City Mall, Pune, Maharashtra -
          411014
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Duration of Agreement:</Text>
        <Text>11 Months, starting from 1st June 2025 to 30th April 2026</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Monthly Rent:</Text>
        <Text>INR 15,000/- payable on or before 5th of each month</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Security Deposit:</Text>
        <Text>INR 45,000/- refundable upon termination of the agreement</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Clauses:</Text>
        <Text style={styles.clause}>
          1. The Tenant shall not sublet the premises without the prior written
          consent of the Landlord.
        </Text>
        <Text style={styles.clause}>
          2. The Tenant shall maintain the property in good condition and shall
          bear the cost of any damage caused by negligence.
        </Text>
        <Text style={styles.clause}>
          3. The Landlord shall be responsible for property taxes and major
          repairs.
        </Text>
        <Text style={styles.clause}>
          4. Electricity and water bills shall be borne by the Tenant.
        </Text>
        <Text style={styles.clause}>
          5. Either party may terminate the agreement by giving 30 days' prior
          written notice.
        </Text>
        <Text style={styles.clause}>
          6. The agreement shall be governed under Indian law and any disputes
          shall be subject to Pune jurisdiction.
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          In witness whereof, both parties have signed this Agreement.
        </Text>
        <Text style={{ marginTop: 30 }}>
          _______________________ _______________________
        </Text>
        <Text>Signature of Landlord Signature of Tenant</Text>
      </View>
    </Page>
  </Document>
);

export const RentAgreementPreviewMain = () => (
  <PDFViewer width="100%" height="100%">
    <RentAgreementPreview />
  </PDFViewer>
);
