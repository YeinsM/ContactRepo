import { Checkbox, FormControlLabel, TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    fontFamily: "GalaxyFont",
    backgroundColor: "#fff",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "GalaxyFont",
    backgroundColor: "transparent",
  },
  backgroundColor: "#fff",
});

export const generateField = (name, label, value, type, checked, multiline, handleChange) => {
    const field = type === 'checkbox' ? (
      <FormControlLabel
        name={name}
        control={<Checkbox onChange={handleChange} color="secondary" checked={checked} />}
        label={<span className="normal">{label}</span>}
        labelPlacement="start"
      />
    ) : (
      <CustomTextField
        margin="normal"
        fullWidth
        id={name}
        label={<span className="normal">{label}</span>}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={label}
        multiline={multiline}
      />
    );

    return field;
  }
  