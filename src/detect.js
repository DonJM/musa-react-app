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
    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return [480, 320];
        }
        if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
        ) {
          return [320, 480];
        }
        return [640, 480];
      };

    const sizes = getDeviceType();


    // Main function
    const runCoco = async () => {
        // 3. TODO - Load network 
        const net = await tf.loadGraphModel(process.env.REACT_APP_MODEL_URL)
        
        // Loop and detect hands
        setInterval(() => {
        detect(net);
        }, 16.7);
    };

    // ibmcloud cos bucket-cors-put --bucket ssd-mobilenet-v2-fpnlite-320x320 --cors-configuration file://corsconfig.json

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
          const resized = tf.image.resizeBilinear(img, sizes)
          const casted = resized.cast('int32')
          const expanded = casted.expandDims(0)
          const obj = await net.executeAsync(expanded)
          
       
            const boxes = await obj[6].array()
            const classes = await obj[0].array()
            const scores = await obj[7].array() 
        
          // Draw mesh
          const ctx = canvasRef.current.getContext("2d");
    
        //   5. TODO - Update drawing utility
        //   drawSomething(obj, ctx)  
          requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.45, videoWidth, videoHeight, ctx)}); 
    
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
            <Webcam 
                ref={webcamRef}
                muted={true}
                className="position-absolute top-50 start-50 translate-middle rounded"
                id="video"
                width= {sizes[0]}
                height= {sizes[1]}
                facingmode = {"environment"}
                style={{
                  display:"none",
                  
                }}
            />

            <canvas
                ref={canvasRef}
                className="text-center rounded position-relative"
                width= {sizes[0]}
                height= {sizes[1]}
                style={{
                    display: "none"
                }}


                id="canvas"
            >

            </canvas>
        </div>
    );
}

export default CamDetector;
