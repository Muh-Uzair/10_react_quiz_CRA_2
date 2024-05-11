


export default function Progress({
    progress_count , 
    index , total_question , 
    points , total_points
}){

    return(
        
    <div className="div_progress">

                <progress className="progess_bar" max={total_question} value={progress_count} />


                <div className="curr_question_plus_points">

                <p className="text_curr_question"> <strong>{index+1}</strong> / {total_question} </p>
                <p className="text_points"> <strong>{points}</strong> / {total_points}</p>

                </div>

      </div>
    )
}