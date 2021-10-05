import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
// import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import {drawRect} from "./utilities.js"; 
import React, { useRef, useEffect } from "react";


export function CamDetector() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Main function
    const runCoco = async () => {
        // 3. TODO - Load network 
        const net = await tf.loadGraphModel('https://fclb-tfod-cloud-storage-v2.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
        
        // Loop and detect hands
        setInterval(() => {
        detect(net);
        }, 16.7);
    };

    const detect = async (net) => {
        // Check data is available
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          // Get Video Properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
          // Set video width
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
    
          // Set canvas height and width
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
    
          // 4. TODO - Make Detections
          const img = tf.browser.fromPixels(video)
          const resized = tf.image.resizeBilinear(img, [640,480])
          const casted = resized.cast('int32')
          const expanded = casted.expandDims(0)
          const obj = await net.executeAsync(expanded)
    
          const boxes = await obj[4].array()
          const classes = await obj[5].array()
          const scores = await obj[3].array()
        
          // Draw mesh
          const ctx = canvasRef.current.getContext("2d");
    
          // 5. TODO - Update drawing utility
          // drawSomething(obj, ctx)  
          requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)}); 
    
          tf.dispose(img)
          tf.dispose(resized)
          tf.dispose(casted)
          tf.dispose(expanded)
          tf.dispose(obj)
    
        }
      };
    
      useEffect(()=>{runCoco()},[]);

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            {/* <video width={640} height={480} autoPlay className="position-absolute top-50 start-50 translate-middle rounded"
                id="video"
                style={{display:"none"}}
            >
                <source  src="video.mp4" type="video/mp4"/>
            </video> */}

            <Webcam 
                ref={webcamRef}
                muted={true}
                width={640} 
                height={480} 
                autoPlay 
                className="position-absolute top-50 start-50 translate-middle rounded"
                id="video"
                style={{display:"none"}}
            />

            <canvas
                ref={canvasRef}
                className="text-center rounded position-relative"
                style={{
                    height: 480,
                    width: 640,
                    display: "none"
                }}


                id="canvas"
            >

            </canvas>
        </div>
    );
}

export default CamDetector;