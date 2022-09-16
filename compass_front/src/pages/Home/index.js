import { Row, Col } from "react-bootstrap";
import { tasksData } from "../../data/tasksData";

import TaskCard from "../../components/TaskCard";
import NavBar from "../../components/NavBar";
import "./index.scss";

const Home = () => {
  return (
    <div className="Home">
      <div className="mt-4 pt-5 px-5">
        <h1 className="display-3">Todays Tasks</h1>
        <Row>
          <Col>
            <h3 className="mb-0">
              In Progress <sup>3</sup>
            </h3>
          </Col>
          <Col>
            <h3 className="text-muted mb-0">Completed</h3>
          </Col>
        </Row>
        <hr className="mt-0 mb-4" />
        {tasksData.map((t) => (
          <TaskCard
            key={t.id}
            subject={t.subject}
            studentName={t.studentName}
            task={t.task}
            status={t.status}
            progress={t.progress}
          />
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Home;
