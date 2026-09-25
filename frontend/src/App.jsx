import './App.css';
//import ContentManager from "./Components/ContentManager";
import ContentManager from "./Components/ContentManager";
import LandingPage from "./Components/LandingPage";
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
