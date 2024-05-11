



export default function Options({ 
    questions , dispatch , option , clicked , index ,
}) {

    return(
        <div className="div_all_options">
            
        {questions[index].options.map( (val , i) => (
          
          <button  key={i} onClick={() => dispatch({type:"option_click" , payload:i})}
          
          
           className={clicked ?  
            i === questions[index].correctOption && option === i ? "btn_option correct_option_plus_clicked"  : 
            i === questions[index].correctOption ? "btn_option correct_option"  : 
           (option === i ? "btn_option btn_clicked_option" : "btn_option btn_not_clicked") : "btn_option"}
           disabled={clicked}

          >
         
          {val}
          </button>

        ) )}

    </div>
    )
}