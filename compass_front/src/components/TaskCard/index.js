import { Card, ProgressBar, Badge, Row, Col } from "react-bootstrap";
import "./index.scss";

const TaskCard = ({ id, subject, studentName, task, status, progress }) => {
  return (
    <Card className="TaskCard mb-4">
      <Card.Body>
        <div className="text-end">
          <h3 className="mb-0">
            <Badge
              bg={
                subject === "Writing"
                  ? "success"
                  : subject === "Math"
                  ? "primary"
                  : "danger"
              }
            >
              {subject}
            </Badge>
          </h3>
        </div>
        <Row className="g-0 align-items-center">
          <Col className="col-auto me-2">
            <div className="profile-pic"></div>
          </Col>
          <Col>
            <div className="student-name">
              <u>{studentName}</u>
            </div>
          </Col>
        </Row>

        <div className="task">Task: {task}</div>
        <div className="status">Status: {status}</div>
        <ProgressBar now={progress} className="my-2" />
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
