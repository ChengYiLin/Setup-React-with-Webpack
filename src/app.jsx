import { useState } from "react";

const App = () => {
    const [liked, setLiked] = useState(false);

    if (liked) {
        return "Hello React";
    }

    return <button onClick={() => setLiked(true)}>Click Me</button>;
};

export default App;
