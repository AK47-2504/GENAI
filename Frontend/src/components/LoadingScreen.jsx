import "../global/loading.scss";

function LoadingScreen() {
  return (
    <div className="loader-page">
      <div className="loader">
        <div className="bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
