import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyCardProps from "../types/MyCardProps";
import { Spinner } from "react-bootstrap";

const MyCard: React.FC<MyCardProps> = ({
  fetching,
  error,
  imgURL,
  quoteText,
  quoteAuthor,
  doUpdate
}) => {
  //shows the spinner when fetching
  if (fetching) {
    return (
      <div className="spinner-container">
        <Spinner
          className="spinner-size"
          animation="border"
          variant="primary"
          role="status"
        />
      </div>
    );
  }

  //shows a Card with an error message
  if (error) {
    return (
      <Card className="shadow my-Card my-Card-error">
        <h3
          style={{ position: "relative", left: "25%", top: "50%" }}
          className="text-danger"
        >
          A problem occured...
        </h3>
        <div
          style={{ position: "relative", top: "50%" }}
          className="text-center"
        >
          <Button onClick={doUpdate}>Retry</Button>
        </div>
      </Card>
    );
  }

  //shows the Card if all the data is passed
  return (
    <Card className="shadow my-Card my-Card-ok">
      <Card.Img variant="top" src={imgURL} />
      <Card.Body>
        <blockquote className="blockquote text-center">
          <p>
            <FontAwesomeIcon icon="quote-left" className="text-primary" />
            <span style={{ marginLeft: "5px" }}>{quoteText}</span>
            <FontAwesomeIcon icon="quote-right" className="text-primary" />
          </p>
          {quoteAuthor ? (
            <footer className="blockquote-footer text-end">
              {quoteAuthor}
            </footer>
          ) : null}
        </blockquote>
        <Button onClick={doUpdate}>Update</Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
