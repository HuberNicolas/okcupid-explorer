import React, {Fragment} from "react";
import {Button} from "react-bootstrap";




const LandingPage = ({setRenderItem}) => {
    return (
        <Fragment>
            <h1>
                PROJECT AMOR
            </h1>
            <body>
                <p class='ex1'>
                    Welcome to Project Amor!
                </p>
                <p class='ex2'>
                    Have you ever wondered, how many people alike you there are? <br/>
                    It is time to find out!<br/>
                    <br/>
                    With Project Amor you can browse and explore users of OkCupid<br/>
                    and select and filter according to your preferences. <br/>
                    We first ask you to fill out a questionnaire to get to know you.<br/>
                    After that you can interact with the visualization and filter for<br/>
                    attributes that really matter to you!<br/>
                    <br/>
                    The rest is for you to find out; <br/>
                    <br/>
                    have fun!
                </p>


            </body>
            <Button class="btn btn-danger" onClick={()=>setRenderItem(1)}>
                START
            </Button>


        </Fragment>
)
}

export default LandingPage
