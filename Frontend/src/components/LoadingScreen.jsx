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

        <p className="loader-text">Initializing AI</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
