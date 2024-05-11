


export default function BEFORE_QUIZ({status, questions , dispatch}){

    return(

       <>
        {status === "loading" && <h2 className="h2_loading">LOADING...</h2>}   
        {status === "error" && 
        <div className="div_error">
          💥 There was error in fetching data! Try Again.
        </div>
        }
        {status === "ready" && 

        <div className="div_recieved">

          <h1>Welcome to The React Quiz</h1>
          <h3>{questions.length} questions to test your React Mastery</h3>
          <button className="btn_lets_start" onClick={() => dispatch({type:"play"})}>LET'S START</button>

        </div>
        }  
       
       </>

    )
}