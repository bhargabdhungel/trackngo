import {
  BallTriangle,
  TailSpin,
  ThreeDots,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
} from "react-loading-icons";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div>
          <BallTriangle />
        </div>
      </div>
    </>
  );
}
