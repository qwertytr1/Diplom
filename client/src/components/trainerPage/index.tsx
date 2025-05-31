import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const TrainerPage = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Профиль тренера
      </Typography>

      <Accordion sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
        <AccordionSummary>
          <Typography variant="h6">Личная информация</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Имя:</strong> Мария Смирнова
          </Typography>
          <Typography>
            <strong>Email:</strong> maria@example.com
          </Typography>
          <Typography>
            <strong>Специализация:</strong> Йога, Пилатес
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
        <AccordionSummary>
          <Typography variant="h6">Расписание занятий</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="1 июня 2025 - Йога - 10:00" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="2 июня 2025 - Пилатес - 12:00" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="3 июня 2025 - Йога - 14:00" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ borderRadius: 2, boxShadow: 3 }}>
        <AccordionSummary>
          <Typography variant="h6">Список клиентов</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText primary="Иван Иванов - ivan@example.com" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Ольга Петрова - olga@example.com" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Сергей Смирнов - sergey@example.com" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default TrainerPage;
