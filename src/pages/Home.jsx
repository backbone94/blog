import Header from "../Header";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <iframe
        id="player"
        src="https://www.youtube.com/embed/cbuZfY2S2UQ?rel=0"
        title="YouTube video player"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Home;
