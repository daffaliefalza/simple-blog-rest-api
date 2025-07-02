const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="title">Cultural Harmony</h1>
      <div className="flag-wrapper">
        <img src="/korea.png" alt="Korea Flag" className="flag animate-left" />
        <span className="symbol">✦</span>
        <img
          src="/indonesia.png"
          alt="Indonesia Flag"
          className="flag animate-right"
        />
      </div>
      <p className="subtitle">Korea ✧ Indonesia — Friendship & Unity</p>
    </div>
  );
};

export default HomePage;
