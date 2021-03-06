(function() {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("Câmera não está disponível nesse navegador");
      return;
    }
  
    // get page elements
    const video = document.querySelector("#video");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const canvas = document.querySelector("#canvas");
    
  
    // video constraints
    const constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
      },
    };
  
    // use front face camera
    let useFrontCamera = false;
  
    // current video stream
    let videoStream;
  
    
//     btnScreenshot.addEventListener("click", function () {
//         const img = document.createElement("img");
//         canvas.width = video.videoWidth/2;
//         canvas.height = video.videoHeight/2;
//         canvas.getContext("2d").drawImage(video, 0, 0);
//         img.src = canvas.toDataURL("image/png");
//         screenshotsContainer.prepend(img);
//       });
    // stop video stream
    function stopVideoStream() {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  
    // initialize
    async function initializeCamera() {
      stopVideoStream();
      constraints.video.facingMode = useFrontCamera ? "user" : "environment";
  
      try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
      } catch (err) {
        alert("A Câmera não pode ser acessada");
      }
    }
  
    initializeCamera();
  })();

$(document).ready(function()
		{
			$("#btnScreenshot").on('click', function(e)
			{
				html2canvas(document.body, {
					taintTest: true,
	  				onrendered: function(canvas) {
	  					$("#img1").attr('src', canvas.toDataURL());
	    				//document.body.appendChild(canvas);
	  				}			
	  			});
			});	
		});	
