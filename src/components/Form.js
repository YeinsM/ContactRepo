import { useState, useEffect } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { generateField } from "../utils/generateField";

export const Form = ({
  onAddContact,
  onUpdateContact,
  onCancelEdit,
  selectedContact,
}) => {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    cellPhone: "",
    email: "",
    location: "",
  });

  const reset = () => {
    setContact({
        name: "",
        lastName: "",
        cellPhone: "",
        email: "",
        location: "",
    });
  };

  const onCancel = () => {
    onCancelEdit();
    reset();
  };

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.lastName || !contact.cellPhone || !contact.email || !contact.location) {
      return;
    }

    if (selectedContact) {
      onUpdateContact(selectedContact.id, contact);
      onCancel();
    } else {
      onAddContact(contact);
    }

    reset();
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "#fff" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" fontFamily="GalaxyFontB">
            {selectedContact ? "Update Contact" : "Create Contact"}
          </Typography>
          {generateField("name", "Name", contact.name, "text", null, null, handleChange)}
          {generateField("lastName", "Last Name", contact.lastName, "text", null, null, handleChange)}
          {generateField("cellPhone", "Phone", contact.cellPhone, "text", null, null, handleChange)}
          {generateField("email", "Email", contact.email, "email", null, null, handleChange)}
          {generateField("location", "Location", contact.location, "text", null, null, handleChange)}
          
          <ButtonGroup
            size="medium"
            variant="contained"
            aria-label="text button group"
          >
            <Button type="submit" color="success" startIcon={<AddTaskIcon />}>
              {selectedContact ? (
                <span className="normal">"Update Contact"</span>
              ) : (
                <span className="normal">"Add Contact"</span>
              )}
            </Button>
            {selectedContact && (
              <Button
                type="button"
                onClick={onCancel}
                color="error"
                endIcon={<CancelIcon />}
              >
                <span className="normal">"Cancel"</span>
              </Button>
            )}
          </ButtonGroup>
          <br />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form;
