

import { useEffect , useReducer } from "react"
import HEADER_REACT_QUIZ from "./components/header"
import BEFORE_QUIZ from "./components/before-quiz"
import TIMER_PLUS_NEXT_BTN from "./components/timer-plus-next-btn"
import Options from "./components/options"
import Progress from "./components/progress"
import FINISH_SCREEN from "./components/finish-screen"




const initial_state = {
  questions:[] ,
  status : "loading" ,
  index : 0 ,
  clicked:false ,
  option : null ,
  points: 0 ,
  progress_count : 0 ,
  highscore: 0 ,
  

}

function reducer(state,action){

  switch(action.type) {

   
    case "recieved" :
      return ({...state , questions : action.payload , status:"ready"}) ;
    
    case "not_recieved" : 
      return ({...state , questions : [] , status:"error" }) ;

    case "play" :
      return({...state , status:"play"}) ;

    case "option_click":
      return({...state , clicked : true , option : action.payload , progress_count : state.progress_count+1 ,
         points : action.payload === state.questions[state.index].correctOption ? 
         state.points + state.questions[state.index].points 
         : state.points   }) ;

    case "next_clicked" :
      return({...state  , clicked:false , option:null , index : state.index+1 })
    
    case "finish_clicked" :
      return({...state ,  status:"finished" , highscore : state.points > state.highscore ? state.points : state.highscore  })

    case "restart_clicked" :
      return({...state , status:"play" , index:0 , clicked:false , option:null , points:0 , progress_count:0 })


    
      default:
        throw new Error("Uknown Action") 
  }


}

export default function App() {

  const [{
    questions,
    status,
    index,
    clicked,
    option ,
    points ,
    progress_count ,
    highscore ,
    

  } , dispatch] = useReducer(reducer , initial_state)

  const total_question = questions.length ;

  let total_points = 0 ;
  questions.map( (val) => total_points += val.points);
  


       useEffect(function(){

        async function fecth_questions(){

          try{
            
            const res = await fetch("http://localhost:9000/questions") ;
            const data = await res.json() ;
            
            if(data.length > 0) dispatch({type:"recieved" , payload:data}) 

            
          }
          catch(err){

            dispatch({type:"not_recieved"}) ;
          }
          finally{
          }


        }

        fecth_questions()
       },[])


  

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
  return (
    <div className="app">

      <HEADER_REACT_QUIZ></HEADER_REACT_QUIZ>

      <main className="main_box">


           <BEFORE_QUIZ status={status} questions={questions} dispatch={dispatch}/>



           {status === "play" 
           && 
           <div className="div_play">

                    <Progress     
                    progress_count={progress_count} 
                    index={index} total_question={total_question} 
                    points={points} total_points={total_points}
                    />

                    <p className="text_question">{questions[index].question}</p>

                    <Options 
                    questions={questions} dispatch={dispatch} 
                    option={option} clicked={clicked} index={index} 
                    />


                    <TIMER_PLUS_NEXT_BTN 
                    clicked={clicked} index={index}
                    questions={questions} dispatch={dispatch}
                    />

           </div>
           }
           {status === "finished" && 
           
           <FINISH_SCREEN 
           points={points} total_points={total_points}
          highscore={highscore} dispatch={dispatch}/>

           

           }


      </main> 




          

    </div>
  )
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------


}