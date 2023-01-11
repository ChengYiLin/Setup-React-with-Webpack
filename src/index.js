import { one } from "./setting";

alert(one());

const root = document.getElementById("root");

const helloWebpack = document.createElement("h1");
helloWebpack.textContent = "Hello Webpack";

root.appendChild(helloWebpack);

// import { useState, createElement } from "react";
// import { createRoot } from "react-dom";

// function LikeButton() {
//     const [liked, setLiked] = useState(false);

//     if (liked) {
//         return "You liked this!";
//     }

//     return createElement(
//         "button",
//         {
//             onClick: () => setLiked(true),
//         },
//         "Like"
//     );
// }

// const rootNode = document.getElementById("root");
// const root = createRoot(rootNode);

// root.render(createElement(LikeButton));
