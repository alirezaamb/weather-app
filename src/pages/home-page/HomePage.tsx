import Home from '../../components/home/Home';
import videoFile from '../../../public/videos/4567743-sd_960_540_30fps.mp4';

const HomePage = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={videoFile} type="video/mp4" />
      </video>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Home />
      </div>
    </>
  );
};

export default HomePage;
