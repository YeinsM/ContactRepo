import { Alert, AlertTitle, AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import reducer from "./services/reducer";
import { CenteredContainer } from "./utils/customContainer";
import { MenuButton } from "./components/MenuButton";
import Form from "./components/Form";
import { del, get, post, put } from "../src/services/contactApi";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedContact, setSelectedContact] = useState(null);

  const contactsMap = useMemo(() => new Map(state.contacts.map(contact => [contact.id, contact])), [state.contact]);

  const todoListRef = useRef(null);
  const todoFormRef = useRef(null);

  const scrollToTodoList = () =>
    todoListRef.current.scrollIntoView({ behavior: "smooth" });

  const scrollToTodoForm = () =>
    todoFormRef.current.scrollIntoView({ behavior: "smooth" });

  const getContacts = () => {
    dispatch({ type: "GET_CONTACT_REQUEST" });
    get()
      .then((data) => {
        dispatch({ type: "GET_CONTACT_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "GET_CONTACT_FAILURE", payload: error.message });
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleAddContacts = async (contact) => {
    post(contact)
      .then((data) => {
        dispatch({ type: "ADD_CONTACT_SUCCESS", payload: data });
        scrollToTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateContact = (id, contact) => {
    put(id, contact)
      .then((data) => {
        dispatch({ type: "UPDATE_CONTACT_SUCCESS", payload: data });
        scrollToTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteContact = (id) => {
    del(id)
      .then(() => {
        dispatch({ type: "DELETE_CONTACT_SUCCESS", payload: id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditContact = (id) => {
    const contactToEdit = contactsMap.get(id);
    setSelectedContact(contactToEdit);
    scrollToTodoForm();
  };

  const handleCancelEdit = () => {
    setSelectedContact(null);
  };

  useEffect(() => {
    if (state.contacts.length > 0) {
      scrollToTodoList();
    }
  }, [state.contacts]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <MenuButton
            scrollToTodoForm={scrollToTodoForm}
            scrollToTodoList={scrollToTodoList}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="GalaxyFont"
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <CenteredContainer background={"#581845"} refComponent={todoFormRef}>
        <Form
          onAddContact={handleAddContacts}
          onUpdateContact={handleUpdateContact}
          onCancelEdit={handleCancelEdit}
          selectedContact={selectedContact}
        />
      </CenteredContainer>
      {state.isLoading && (
        <Alert severity="info">
          <AlertTitle>Loading</AlertTitle>
          Loading <strong>all tasks!</strong>
        </Alert>
      )}
      {state.error && <p>{state.error}</p>}
      {!state.isLoading && !state.error && (
        <CenteredContainer background={"#900C3F"} refComponent={todoListRef}>
          {/* <TodoList
            tasks={state.tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          /> */}
        </CenteredContainer>
      )}
    </>
  );
};

export default App;
