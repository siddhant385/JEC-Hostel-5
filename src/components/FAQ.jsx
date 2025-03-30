import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { question: "What are the other things we will get with the hostel room?", answer: "You'll get a bed, table, fan, 2 tubelights, & and almirah." },
  { question: "What are the mess timings", answer: "Mess is open for 2 times a day. From 12pm in the afternoon and 7pm in the night." },
  { question: "What about the water facilities?", answer: "Water is supplied 2 times a day 5am in the morning and 5pm in the evening For drinking purposes,you'll get RO water from the water cooler" },
  { question: "What is the distance between college and hostel?", answer:"850m"}
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
