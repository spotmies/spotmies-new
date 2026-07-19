import { motionValue } from "framer-motion";
const mv = motionValue(0);
console.log(typeof mv.jump === "function" ? "jump exists" : "jump does not exist");
