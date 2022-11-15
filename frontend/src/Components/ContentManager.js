import {React, useState} from "react";
import FormCard from "./FormCard";
import {InitialContext} from "./Form/InitialContext";
import Grid from "./Grid";

function ContentManager() {

    const [preSelection, setPreSelection] = useState(false);

    const handleSubmit = (event) => {
        setPreSelection(!event.map(e => {if (e.field_value !== undefined && e.field_value !== 'Select a value'){return true}}).includes(false || undefined))
    }

    return (
        <InitialContext.Provider value={{ handleSubmit }}>
            { preSelection ||
                <FormCard title={"Preselection"} value={{handleSubmit}} />
            }
            {preSelection &&
                <Grid />
            }
        </InitialContext.Provider>
    )

} export default ContentManager;