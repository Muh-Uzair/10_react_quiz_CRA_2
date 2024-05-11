
import { useEffect, useState } from "react";


export default function TIMER_PLUS_NEXT_BTN({
    clicked , index , 
    questions , dispatch ,
}){

    

    return(

        <div className="div_timer_next_btn">

                <Timer dispatch={dispatch} />
                

                { clicked && index < questions.length - 1 ?
                 <button className="btn_next" onClick={(e) => dispatch({type:"next_clicked"})} >NEXT</button>
                : clicked && index === questions.length-1 ?
                <button className="btn_next" onClick={(e) => dispatch({type:"finish_clicked"})} >FINISH</button>
                :
                <></>
                 }
                


        </div>
                         
    )
}


function Timer({dispatch}){

    const [time , set_time] =  useState(120) ;

   
    useEffect(() => {

        let id ;

        function callback(){

            id = setInterval(function(){
                set_time(time => time-=1)
            },1000)

        }
        if(time <= 0 ){
            dispatch({type:"finish_clicked"}) ;
            clearInterval(id)
        }

        if(time > 0) callback() ;

        

        return () => clearInterval(id) ;

        
    }, [dispatch , time]);
    



    return(
        <div className="div_timer">{ Math.trunc(time/60)} : {Math.trunc(time%60) >= 10 ? <p> {Math.trunc(time%60)}</p>  : <p> <span>0</span><span>{Math.trunc(time%60)}</span></p>  } </div>
    )


}