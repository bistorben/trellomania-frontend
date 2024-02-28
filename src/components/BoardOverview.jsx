import "./BoardOverview.css";

const BoardOverview = () => {
  return (
    <section className="BoardOverview">
      <h1>Your Projects:</h1>
      {/* container muss drum */}
      <div className="board-container">
        <div className="board-card">
          <h3>board title</h3>
        </div>
        <div className="board-card">
          <h3>board title</h3>
        </div>
        <div className="board-card">
          <h3>board title</h3>
        </div>
        <div className="board-card">
          <h3>board title</h3>
        </div>
      </div>
    </section>
  );
};

export default BoardOverview;
