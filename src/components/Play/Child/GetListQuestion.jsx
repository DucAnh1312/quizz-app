import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";

import MenuAppBar from "../../Header/MenuAppBar";
import { questionApi } from "../../../api/api";
import { updateQuestionsPlay } from "../../../Store/questionSlice";
// import { data } from "../../Play/Child/CardQuestion";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

export default function GetListQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getQuestions = async (number) => {
    setLoading(true);

    try {
      const response = await questionApi.getQuestionsPlay(number);
      // const dataQuestion = response.data.data;
      // data(dataQuestion);
      const action = updateQuestionsPlay(response.data.data);
      dispatch(action);
      navigate("../play");
    } catch (error) {}
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      number: "",
    },
    onSubmit: (values) => {
      // console.log(values.number);
      getQuestions(values.number);
    },
  });

  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg">
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Typography component="h1" variant="h4">
            Please enter the number of questions
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Number of questions"
              name="number"
              autoComplete="number"
              onChange={formik.handleChange}
              value={formik.values.number}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              GET START
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
