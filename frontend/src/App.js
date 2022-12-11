import './App.css';
//import ContentManager from "./Components/ContentManager";
import ContentManager from "./restructuring/ContentManager";
import LandingPage from "./restructuring/LandingPage";
import {useState} from "react";

function App() {
    const [renderItem, setRenderItem] = useState(0)


    return (
        <div className="App">
            {renderItem === 0 && <LandingPage setRenderItem={setRenderItem}/>}
            {renderItem === 1 && <ContentManager setRenderItem={setRenderItem}/>}
        </div>
    );
}

export default App;
