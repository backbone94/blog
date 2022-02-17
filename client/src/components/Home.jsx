import "../css/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeName">Home</div>
      <div className="video">
        <iframe
          id="player"
          src="https://www.youtube.com/embed/cbuZfY2S2UQ?rel=0"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
