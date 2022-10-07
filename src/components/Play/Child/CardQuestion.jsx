import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControlLabel,
  Grid,
  Pagination,
  Typography,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import questionImage from "../../../assets/questionImage.jpg";

export default function CardQuestion() {
  const listQuestion = useSelector((state) => state.question.questionsPlay);
  console.log(listQuestion)
  const [question, setQuestion] = useState(listQuestion[0]);
  const [numberQ, setNumberQ] = useState(1);

  const dispatch = useDispatch();
  const changeQuestion = (numberQuestion) => {
    setQuestion(listQuestion[numberQuestion - 1]);
    setNumberQ(numberQuestion);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        textAlign: "left",
        marginTop: 5,
        marginBottom: 5,

        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Typography
        component="p"
        variant="h5"
        margin={2}
        fontWeight={600}
        sx={{
          textAlign: "center",
          color: "black",
          fontSize: "35px",
        }}
      >
        Question No: {numberQ}
      </Typography>

      <Typography
        margin={2}
        sx={{
          color: "black",
          fontSize: "35px",
          backgroundColor: "#E9E9E9",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: "10%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          component="p"
          variant="h5"
          margin={3}
          fontWeight={600}
          sx={{
            color: "black",
            fontSize: "30px",
          }}
        >
          Q. {question.title}
        </Typography>
      </Typography>

      <CardMedia
        component="img"
        image={question.thumbnail_link || `${questionImage}`}
        alt="No Image"
        sx={{
          display: "block",
          maxWidth: "200px",
          maxHeight: "200px",
          width: "auto",
          height: "200px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      />
      <CardContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
            {question.answers.map((answer) => {
              return (
                <Grid
                  key={answer.id}
                  sx={{
                    paddingLeft: "5px",
                    backgroundColor: "#E9E9E9",
                    maxHeight: "31%",
                    marginTop: "12px",
                    borderRadius: "5px",
                    border: "1px solid",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  <FormControlLabel
                    value={answer.id}
                    control={<Checkbox />}
                    label={answer.content}
                  ></FormControlLabel>
                </Grid>
              );
            })}
          </Box>
        </Grid>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Pagination
          count={listQuestion.length}
          color="primary"
          defaultPage={1}
          onChange={(event, questionNumber) => {
            changeQuestion(questionNumber);
          }}
        />
      </CardActions>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          // loading={loading}
          variant="contained"
          type="submit"
          sx={{ mt: 3, mb: 5, width: "35%" }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
