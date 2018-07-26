require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'; 
import ReactDOM from 'react-dom';
// import {findDOMNode} from 'react-dom';
// 引入imageData数据
var imagesData=require('../data/imgData.json');
// 将imgData数据转换成可以引用的图片格式
// 利用自执行函数将图片名信息转换为图片url信息
imagesData=(function genImageUrl(imagesDataArray){
    for(let i=0;i<imagesDataArray.length;i++){
      var singleImageData=imagesDataArray[i];
      // console.log(singleImageData);
      singleImageData.imageURL=require('../images/'+singleImageData.fileName);
      imagesDataArray[i]=singleImageData;
    }
    return imagesDataArray;
})(imagesData);
// let yeomanImage = require('../images/yeoman.png');
var ImgFigure=React.createClass({
  render(){   
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.desc}</h2>
        </figcaption>
      </figure>
    );
  }
});
class AppComponent extends React.Component {
  constructor(props){
    super(props);
     // imgFigure取值范围初始化
    this.Constant={
    centerPos:{
      left:0,
      top:0
    },
    hPosRange:{//水平方向取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosPange:{
      x:[0,0],
      topY:[0,0]
    }
  }
  this.state={
    imgsArrangeArr:[
      // {
      //   pos:{
      //     left:'0',
      //     top:'0'
      //   }
      // }
    ]
  }
  };
/* 重新布局所有图片
  @param centerIndex指定居中排布哪个图片
*/
rerrange(centerIndex){

};
//  组件加载之后，为每张图片计算位置的范围
componentDidMount(){
  // 通过this.refs索引到子组件
  let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
  // 获取stage宽高
  stageWidth=stageDOM.scrollWidth,
  stageHeight=stageDOM.scrollHeight,
  halfStageWidth=Math.ceil(stageWidth/2), 
  halfStageHeight=Math.ceil(stageHeight/2);
  // console.log(halfStageWidth);
  // console.log(halfStageHeight);

  // 获取每一个imageFigure的宽高
  let imgFigDOM=ReactDOM.findDOMNode(this.refs.imageFigure0),
      imgFigWidth=imgFigDOM.scrollWidth,
      imgFigHeight=imgFigDOM.scrollHeight,
      halfImgFigWidth=Math.ceil(imgFigWidth/2),
      halfImgFigHeight=Math.ceil(imgFigHeight/2);
      // console.log(halfImgFigWidth,halfImgFigHeight);
      // 计算中心图片的位置坐标点
      this.Constant.centerPos={
        left:halfStageWidth-halfImgFigWidth,
        top:halfStageHeight-halfImgFigHeight
      }
      // 水平方向图片位置的取值范围
      this.Constant.hPosRange.leftSecX[0]=-halfImgFigWidth;
      this.Constant.hPosRange.leftSecX[1]=halfStageWidth-halfImgFigWidth*3;
      this.Constant.hPosRange.rightSecX[0]=halfStageWidth+halfImgFigWidth;
      this.Constant.hPosRange.rightSecX[1]=stageWidth-halfImgFigWidth;
      this.Constant.hPosRange.y[0]=-halfImgFigHeight;
      this.Constant.hPosRange.y[1]=stageHeight-halfImgFigHeight;
      // 垂直方向图片位置的取值范围
      this.Constant.vPosPange.x[0]=halfStageWidth-imgFigWidth;
      this.Constant.vPosPange.x[1]=halfStageWidth;
      // 上分区距离topy的取值范围
      this.Constant.vPosPange.topY[0]=-halfImgFigHeight;
      this.Constant.vPosPange.topY[1]=halfStageHeight-halfImgFigHeight*3;
      this.rerrange(0);
}




  render() {
    var ImageFigures=[],ControllerUnits=[];
    // 为每一个imgFigure生成一个索引
    imagesData.forEach((value,index)=>{
      // console.log(value);
      if(!this.state.imgsArrangeArr[index]){
        // 初始化图片状态对象
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          }
        }
      }
      ImageFigures.push(<ImgFigure data={value} key={value.fileName} ref={'imageFigure'+index}/>);
    });
 
    // console.log(ImageFigures);
    return (
      <section className="stage" ref="stage">
          <section className="img-sec">{ImageFigures}</section>
          <nav className="controller-nav">{ControllerUnits}</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
