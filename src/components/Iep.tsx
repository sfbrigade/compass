import { trpc } from "@/client/lib/trpc";
import Goals from "@/components/goal/Goal";
import $button from "@/styles/Button.module.css";
import $input from "@/styles/Input.module.css";
import { Box, Container, List } from "@mui/material";
import Image from "next/image";
import noGoals from "../../public/img/no-goals-icon.png";

interface IepProps {
  iep_id: string;
}

const Iep = ({ iep_id }: IepProps) => {
  const utils = trpc.useContext();

  const { data: goals, isLoading } = trpc.iep.getGoals.useQuery(
    { iep_id: iep_id },
    { enabled: Boolean(iep_id) }
  );

  const goalMutation = trpc.iep.addGoal.useMutation({
    onSuccess: () => utils.iep.getGoals.invalidate(),
  });

  const handleGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    goalMutation.mutate({
      iep_id: iep_id,
      description: data.get("description") as string,
      category: data.get("category") as string,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <h2>Goals</h2>
        <div>
          <form
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
            onSubmit={handleGoalSubmit}
          >
            <input
              type="text"
              name="description"
              placeholder="Goal description"
              className={$input.default}
              required
            />
            <select name="category">
              <option value="writing">writing</option>
              <option value="reading">reading</option>
              <option value="math">math</option>
              <option value="other">other</option>
            </select>
            <button type="submit" className={$button.default}>
              Add Goal
            </button>
          </form>
        </div>
      </Box> */}

      {/* List of goals */}
      {goals?.length ? (
        <Container
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginTop: "2rem",
            paddingBottom: "2rem",
            height: "620px",
            overflowY: "auto",
            borderTop: "20px solid",
            borderBottom: "40px solid",
            borderColor: "#ffffff",
          }}
        >
          {" "}
          <ul>
            {goals.map((goal) => (
              <List key={goal.goal_id}>
                <Goals goal={goal} />
              </List>
            ))}
          </ul>
        </Container>
      ) : (
        // No Goal in DB yet
        <Container
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginTop: "2rem",
            height: "620px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src={noGoals}
              alt="no goals image"
              style={{ width: "600px", height: "auto" }}
            />
            <h1 style={{ marginBottom: "1rem", alignSelf: "center" }}>
              No goals yet
            </h1>
            <h4 style={{ marginBottom: "1rem" }}>
              Start adding goals to set up your student&#39;s profile
            </h4>
            <button
              // onClick={() => setCreateIepModal(true)}
              className={`${$button.default}`}
              style={{ width: "fit-content", alignSelf: "center" }}
            >
              Add goal
            </button>
          </Box>
        </Container>
      )}
    </div>
  );
};
export default Iep;
