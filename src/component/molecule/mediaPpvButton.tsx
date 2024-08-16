import Button from "../atom/button";

function MediaPpvButton() {
  return (
    <Button
      label="Pay with mediaPPV"
      styling="mediappv__button"
      cta={() => console.log("button clicked")}
    />
  );
}

export default MediaPpvButton;
