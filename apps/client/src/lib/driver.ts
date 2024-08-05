import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const driverObject = driver({
  animate: true,
  allowClose: true,
  overlayColor: "rgba(25, 25, 25, 1)",
  stageRadius: 10,
});
