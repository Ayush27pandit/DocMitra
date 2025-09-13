import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Times-Roman",
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
    fontWeight: 700,
  },
  heading: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
    textDecoration: "underline",
  },
  clause: {
    marginBottom: 8,
  },
});

const FreelanceAgreement = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Freelance Agreement</Text>

      <View style={styles.section}>
        <Text>This Freelance Agreement is made on 1st June 2025.</Text>
        <Text>
          Between: Mr. Arjun Mehta, residing at 201 Green Residency, New Delhi
          (hereinafter referred to as the "Client"),
        </Text>
        <Text>
          And: Ms. Nisha Rao, residing at 402 Blue Towers, Bangalore
          (hereinafter referred to as the "Freelancer").
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Scope of Work</Text>
        <Text style={styles.clause}>
          The Freelancer agrees to provide web design and development services
          as described in Annexure A, including delivery of a fully responsive
          website by the delivery date.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Duration</Text>
        <Text style={styles.clause}>
          The agreement shall commence on 1st June 2025 and terminate on 30th
          June 2025, unless extended by mutual consent.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Payment Terms</Text>
        <Text style={styles.clause}>
          The Client agrees to pay ₹40,000 (Rupees Forty Thousand Only), 50%
          upfront and 50% upon completion.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Revisions</Text>
        <Text style={styles.clause}>
          Up to 2 rounds of revisions are included. Additional revisions will be
          charged at ₹1,000 per hour.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Confidentiality</Text>
        <Text style={styles.clause}>
          Both parties agree to keep confidential information private and not
          share it without prior written consent.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Intellectual Property</Text>
        <Text style={styles.clause}>
          All intellectual property rights shall transfer to the Client upon
          full payment.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>7. Termination</Text>
        <Text style={styles.clause}>
          Either party may terminate the agreement with 7 days’ written notice.
          Payments due for work completed shall be settled promptly.
        </Text>
      </View>

      <View style={styles.section}>
        <Text>
          IN WITNESS WHEREOF, the parties have executed this Agreement on the
          date mentioned above.
        </Text>
        <Text>Signature of Client: _________________________</Text>
        <Text>Date: _______________</Text>
        <Text style={{ marginTop: 10 }}>
          Signature of Freelancer: _____________________
        </Text>
        <Text>Date: _______________</Text>
      </View>
    </Page>
  </Document>
);

export const FreelanceAgreementPreview = () => (
  <PDFViewer width="100%" height="100%">
    <FreelanceAgreement />
  </PDFViewer>
);
