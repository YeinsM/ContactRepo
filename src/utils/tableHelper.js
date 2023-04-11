import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const todoColumns = (onEdit, onDelete) => [
  { field: "title", headerName: "Title", headerAlign: "center", width: 190 },
  {
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    width: 410,
  },
  {
    field: "isCompleted",
    headerName: "Status",
    headerAlign: "left",
    width: 120,
  },
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => (
      <>
        <ButtonGroup
          size="medium"
          variant="text"
          aria-label="text button group"
        >
          <Button
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(params.row.id)}
          />
          <Button
            color="error"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={() => onDelete(params.row.id)}
          />
        </ButtonGroup>
      </>
    ),
  },
];

export const getTodoRows = (tasks) => {
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted ? "Completed" : "Pending",
  }));
};
