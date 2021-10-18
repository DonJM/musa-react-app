// Define our labelmap
const labelMap = {
    1:{name:'Fresh', color:'green'},
    2:{name:'Fresh', color:'green'},
    3:{name:'Unripe', color:'yellow'},
    4:{name:'Ripe', color:'orange'},
    5:{name:'Overripe', color:'gray'},
    6:{name:'Rotten', color:'pink'},
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 3
            ctx.fillStyle = 'white'
            ctx.font = '15px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*(imgWidth*0.75), height*(imgHeight*0.75));
            ctx.stroke()
        }
    }
}
