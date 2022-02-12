import Header from "../components/Header";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <iframe
        id="player"
        src="https://www.youtube.com/embed/cbuZfY2S2UQ?rel=0"
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Home;
