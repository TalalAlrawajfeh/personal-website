import source from "../../cv/talal-alrawajfeh-cv.tex?raw";
import { parseCv } from "./parse-cv";

// The LaTeX document is the content source for both CV formats.
export const cv = parseCv(source);
