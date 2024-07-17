const Spinner = () => {
  return (
    <div className="loadingSpinnerContainer" data-testId="spin-container">
      <div className="loadingSpinner" data-testid="inner-container"></div>
    </div>
  );
};
export default Spinner;
