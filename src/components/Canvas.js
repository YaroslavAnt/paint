import React, { useState, useEffect, useRef } from "react";

export default function Canvas1(props) {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [ctx, setCtx] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
    return window.removeEventListener("resize", () => null);
  }, []);

  const startDrawing = e => {
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = props.color;
    ctx.beginPath();
    // actual coordinates
    ctx.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    );
    setDrawing(true);
  };

  const stopDrawing = () => {
    ctx.closePath();
    setDrawing(false);
  };

  const handleMouseMove = e => {
    // actual coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ];
    if (drawing) {
      ctx.lineTo(...coords);
      ctx.stroke();
    }
    if (props.handleMouseMove) {
      props.handleMouseMove(...coords);
    }
  };

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        width={props.width || width}
        height={props.height || height}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={handleMouseMove}
      />
    </React.Fragment>
  );
}

// class Canvas extends React.Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.handleResize = this.handleResize.bind(this);
//     this.startDrawing = this.startDrawing.bind(this);
//     this.stopDrawing = this.stopDrawing.bind(this);
//     this.state = {
//       drawing: false,
//       width: window.innerWidth
//     };
//   }
//   componentDidMount() {
//     this.ctx = this.canvasRef.current.getContext("2d");
//     window.addEventListener("resize", this.handleResize);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("resize", this.handleResize);
//   }
//   handleMouseMove(e) {
//     // actual coordinates
//     const coords = [
//       e.clientX - this.canvasRef.current.offsetLeft,
//       e.clientY - this.canvasRef.current.offsetTop
//     ];
//     if (this.state.drawing) {
//       this.ctx.lineTo(...coords);
//       this.ctx.stroke();
//     }
//     if (this.props.handleMouseMove) {
//       this.props.handleMouseMove(...coords);
//     }
//   }
//   handleResize() {
//     this.setState({ width: window.innerWidth, height: window.innerHeight });
//   }
//   startDrawing(e) {
//     this.ctx.lineJoin = "round";
//     this.ctx.lineCap = "round";
//     this.ctx.lineWidth = 10;
//     this.ctx.strokeStyle = this.props.color;
//     this.ctx.beginPath();
//     // actual coordinates
//     this.ctx.moveTo(
//       e.clientX - this.canvasRef.current.offsetLeft,
//       e.clientY - this.canvasRef.current.offsetTop
//     );
//     this.setState({ drawing: true });
//   }
//   stopDrawing() {
//     this.ctx.closePath();
//     this.setState({ drawing: false });
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <canvas
//           ref={this.canvasRef}
//           width={this.props.width || this.state.width}
//           height={this.props.height || this.state.height}
//           onMouseDown={this.startDrawing}
//           onMouseUp={this.stopDrawing}
//           onMouseOut={this.stopDrawing}
//           onMouseMove={this.handleMouseMove}
//         />
//       </React.Fragment>
//     );
//   }
// }
