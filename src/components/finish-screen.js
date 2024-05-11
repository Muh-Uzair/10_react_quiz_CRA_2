


export default function FINISH_SCREEN({
    points , total_points , 
    highscore , dispatch , 
}) {

    const percentage = Math.ceil((points / total_points) * 100 );

    let face_emoji ;
    if(percentage >= 90 && percentage < 100) face_emoji = "👍" ;
    if(percentage >= 70 && percentage < 90) face_emoji = "🎉" ;
    if(percentage >= 50 && percentage < 70) face_emoji = "😒" ;
    if(percentage >= 30 && percentage < 50) face_emoji = "🖐" ;
    if(percentage < 30) face_emoji = "😂" ;

    

    return(

    <div className="div_finished_screen">
        <p className="text_you_scored">{face_emoji} You scored {points} out of {total_points} ({percentage}%)</p>
        <p className="text_highscore">(Highscore: {highscore} points)</p>
        <button className="btn_restart" onClick={(e) => dispatch({type : "restart_clicked"})}>RESTART</button>
    </div>
       
    )

    
}