import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import badge from './badge.png'; // Ensure the badge image is in the src directory
import border from './border.png'; // Ensure the border image is in the src directory

function App() {
  const [image, setImage] = useState(null);
  const [usingCamera, setUsingCamera] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setUsingCamera(false);
    };
    reader.readAsDataURL(file);
  };

  const handleStartCamera = () => {
    setUsingCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error("error:", err));
  };

  const handleTakePhoto = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setImage(canvas.toDataURL());
    setUsingCamera(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  useEffect(() => {
    if (image && !usingCamera) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // Draw the uploaded image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw the badge
        const badgeImg = new Image();
        badgeImg.src = badge;
        badgeImg.onload = () => {
          const x = (canvas.width - 200) / 2;
          const y = canvas.height - 200 - 20;
          ctx.drawImage(badgeImg, x, y, 200, 200);
          drawText(ctx, x, y + 160 + 10); // Draw the text below the badge
        };

        // Draw the border
        const borderImg = new Image();
        borderImg.src = border;
        borderImg.onload = () => {
          ctx.drawImage(borderImg, -170, -230, canvas.width+330, canvas.height+455);
        };
      };
    }
  }, [image, usingCamera]);

  const drawText = (ctx, x, y) => {
    ctx.save(); // Save the current context state
    ctx.font = '40px "Dancing Script"'; // Set the desired font size
    ctx.fillStyle = '#FFFFFF'; // Set the text color
    ctx.textAlign = 'center'; // Align text to the center
    ctx.textBaseline = 'top'; // Align text to the top
    ctx.fillText('#myMyntraDNA', x + 100, y); // Draw the text below the badge
    ctx.restore(); // Restore the context to its original state
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'myntra-badge.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const whatsappLogo = require('./whatsapp-logo.png');
  const InstagramLogo = require('./insta.png');
  const SnapChatLogo = require('./snapchat.png');


  /*const handleShareImage = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], 'myntra-badge.png', { type: 'image/png' });
      if (navigator.share) {
        navigator.share({
          title: 'My Myntra Badge',
          text: 'Check out my Myntra badge!',
          files: [file],
        }).then(() => {
          console.log('Sharing successful');
        }).catch((error) => {
          console.error('Error sharing:', error);
        });
      } else {
        console.error('Web Share API is not supported in this browser.');
      }
    });
  };*/

  return (
    <div className="App">
      <h1 className="headline">Unleash Your Style Swagger!</h1>
      <input type="file" onChange={handleImageUpload} />
      <button className="camera-button" onClick={handleStartCamera}>Use Camera</button>
      <div className="canvas-container">
        {usingCamera && (
          <div>
            <video ref={videoRef} style={{ display: 'block', margin: '0 auto' }} />
            <button className="take-photo-button" onClick={handleTakePhoto}>Take Photo</button>
          </div>
        )}
        <canvas ref={canvasRef} width={500} height={520} style={{ display: image || usingCamera ? 'block' : 'none' }} />
      </div>
      {image && (
        <>
          <button className="save-image-button" onClick={handleSaveImage}>Save Image</button>
          <div class="share-page">
        <h3>Share Image</h3>
        <div class="share-options">
          <a href="https://web.whatsapp.com/"><button class="whatsapp-button" onClick={() => {
          }}>
            <img src={whatsappLogo} alt="WhatsApp Logo" />
          </button></a>
          <a href="https://www.instagram.com/accounts/login/?hl=en"><button class="insta-button" onClick={() => {
          }}>
            <img src={InstagramLogo} alt="Instagram Logo" />
          </button></a>
          <a href="https://www.snapchat.com/"><button class="snap-button" onClick={() => {
          }}>
            <img src={SnapChatLogo} alt="Snapchat Logo" />
          </button></a>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

export default App;
