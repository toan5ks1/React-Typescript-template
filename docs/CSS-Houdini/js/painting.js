//register paint API
(() => {
    const worklet = `
  
    if (typeof registerPaint !== "undefined") {
        registerPaint('mana-paint', class {
          paint (ctx, geom, properties, args) {
            //Note: The PaintRenderingContext2D implements a subset of the CanvasRenderingContext2D API. 
            //Specifically it doesn’t implement the CanvasImageData, CanvasUserInterface, CanvasText, or CanvasTextDrawingStyles APIs.
           
            ctx.beginPath(); 
            ctx.moveTo(90, 130);
            ctx.lineTo(95, 25);
            ctx.lineTo(150, 80);
            ctx.lineTo(205, 25);
            ctx.lineTo(210, 130);

            ctx.moveTo(230, 130);
            ctx.lineTo(260, 20);
            ctx.lineTo(280, 20);
            ctx.lineTo(310, 130);
            ctx.moveTo(250, 65);
            ctx.lineTo(290, 65);


            ctx.moveTo(330, 130);
            ctx.lineTo(335, 25);
            ctx.lineTo(400, 110);
            ctx.lineTo(405, 15);
            

            ctx.moveTo(425, 130);
            ctx.lineTo(455, 20);
            ctx.lineTo(475, 20);
            ctx.lineTo(505, 130);
            ctx.moveTo(445, 65);
            ctx.lineTo(485, 65);

            // ctx.moveTo(525, 130);
            // ctx.lineTo(530, 15);
            // ctx.lineTo(560, 20);
            // ctx.lineTo(580, 40);
            // ctx.lineTo(580, 50);
            // ctx.lineTo(530, 65);
            // ctx.lineTo(530, 70);
            // ctx.lineTo(560, 80);
            // ctx.lineTo(590, 95);
            // ctx.lineTo(595, 120);
            // ctx.lineTo(518, 130);

            ctx.strokeStyle = 'rgb(29, 90, 210)';
            ctx.lineWidth = 15;
            ctx.stroke();

          }
        });
    }
    `;
    const workletBlob = URL.createObjectURL(
        new Blob([worklet], { type: "application/javascript" })
    );

    window.CSS.paintWorklet.addModule(workletBlob);
})();
