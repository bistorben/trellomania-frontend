import BoardOverview from "./BoardOverview.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <section className="dashboard-header">
        <h1>My User Dasboard</h1>
      </section>
      <section className="dashboard-main">
        <BoardOverview />
      </section>
    </>
  );
};

export default Dashboard;
