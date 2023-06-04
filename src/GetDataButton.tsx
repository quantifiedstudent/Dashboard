import Button from "@mui/material/Button";

function GetDataButton() {
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          fetch(
            "http://localhost:7003/graphSubmissionsWithWeather/course/12525?startDate=2022-09-01&endDate=2022-09-30"
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.error(error));
        }}
      >
        Get Data
      </Button>
    </>
  );
}

export default GetDataButton;
