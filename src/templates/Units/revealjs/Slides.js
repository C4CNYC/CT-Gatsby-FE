import * as React from "react";
import { CSSProperties, FunctionComponent } from "react";


const nextStepClass = "fragment fade-left";
const nextSemiFadeClass = "fragment fade-in-then-semi-out";

const whatIsGitSlideId = "what-is-git";

const inlineCodeStyle = {
	fontWeight: "bold",
	backgroundColor: "rgba(255,103,52,0.67)",
	padding: "0.25rem 0.5rem",
	borderRadius: "0.2rem"
};

export default ({ content }) => (
	<>
    {/*id={whatIsGitSlideId}*/}
    <section dangerouslySetInnerHTML={{ __html: content }} />
	</>
);
