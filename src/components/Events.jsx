import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const events = [
  { date: "March 25, 2025", title: "Prahaar Coding Competition 🎉" },
  { date: "March 20, 2025", title: "MidSem Ist Exam 📚" },
  { date: "May, 2025", title: "MidSem IInd Exam 🏆" },
];

const Events = () => (
  <div style={{ marginTop: 40 }}>
    <Typography variant="h4" align="center" gutterBottom>
      📅 Upcoming Events & Notices
    </Typography>
    <List>
      {events.map((event, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <EventIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={event.title} secondary={event.date} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default Events;
