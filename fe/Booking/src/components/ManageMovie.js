import { useEffect, useState } from "react";
import "../styles/admin.css";
import Navbar from "./Navbar";
import {
  styled,
  TableContainer,
  Pagination,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { deleteMovie, fetchMovieData } from "../api/movieApi";

const ManageMovie = () => {
  const [movieSize, setMovieSize] = useState(10);
  const [page, setPage] = useState(1);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedMovie(id);
  };

  const handleAddMovie = () =>{
    setOpenDialog(false);
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleEditMovie = () => {
    setOpenDialog(true);
    setIsEdit(true);
  }

  const [movie,setMovie] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovie([...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(selectedMovie, sessionStorage.getItem("jwt"));
      handleOnCloseConfirmationDialog();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedMovie(null);
  }
  


  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>Manage Movie</TableTitle>
              <FlexContainer>
                <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </IconButton>
                <Pagination
                  count={Math.ceil(movieSize / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    handlePageChange(event, newPage)
                  }
                />
              </FlexContainer>
            </div>

            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Combo table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Genre</StyledTableCell>
                    <StyledTableCell align="center">Duration</StyledTableCell>
                    <StyledTableCell align="center">Premiere</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {movie.map((film) => (
                    <TableRow key={film.id}>
                      <StyledTableCell align="center">
                      {film.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {film.genre} 
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {film.duration}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {film.premiere}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleEditMovie()}>
                            <EditIcon color="warning"/>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog(film.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
      </div>

      {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Movie</DialogTitle>
      <DialogContent>
        <DialogTextField
          label="Name"
          name="name"
          value={""}
          onChange={""}
        />
        <DialogTextField
          label="Description"
          name="description"
          value={""}
          onChange={""}
        />
        <DialogTextField
          label="Price"
          name="price"
          value={""}
          onChange={""}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleAddMovie} color="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </StyledDialog>
      )}


      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
        >
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this movie?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteMovie} color="primary">
              Delete
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageMovie;

const TableTitle = styled("div")({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "1rem",
  color: "black",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableHead = styled(TableHead)`
  & th {
    position: relative;
    text-align: center;
    font-weight: bold;
  }

  & th::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: rgba(224, 224, 224, 1);
    width: 1px;
    height: 70%;
  }
  background-color: #f5f5f5;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 300;
  text-align: center;
`;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "none",
  },
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    paddingTop: "1rem",
  },
  "& .MuiFormControl-root": {
    marginBottom: theme.spacing(2),
  },
  "& .MuiTypography-root": {
    color: "black",
    marginBottom: theme.spacing(2),
  },
  "& .MuiButton-root:not(:last-child)": {
    marginRight: theme.spacing(1),
  },
}));

const DialogTextField = styled(TextField)({
    width: "100%",
  });