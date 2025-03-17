import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { question: "What are the hostel fees?", answer: "The fees are ₹30,00 per year, excluding food and WiFi." },
  { question: "Is there a curfew?", answer: "No, students are free to leave and come" },
  { question: "Are visitors allowed?", answer: "No, They aren't allowed" },
];

const FAQ = () => (
  <Container sx={{ mt: 5 }}>
    <Typography variant="h4" align="center" gutterBottom>
      ❓ Frequently Asked Questions
    </Typography>
    {faqs.map((faq, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Container>
);

export default FAQ;
