require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom';
// import {findDOMNode} from 'react-dom';
// 引入imageData数据
var imagesData = require('../data/imgData.json');
// 将imgData数据转换成可以引用的图片格式
// 利用自执行函数将图片名信息转换为图片url信息
imagesData = (function genImageUrl(imagesDataArray) {
  for (let i = 0; i < imagesDataArray.length; i++) {
    var singleImageData = imagesDataArray[i];
    // console.log(singleImageData);
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imagesDataArray[i] = singleImageData;
  }
  return imagesDataArray;
})(imagesData);
// 获取图片位置的随机数
var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);

// 获取0-30°之间的任意正负值
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));
}

// let yeomanImage = require('../images/yeoman.png');
var ImgFigure = React.createClass({
  // 点击图片进行翻转
  handleClick(e) {
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
    
  },
  render() {
    var styleObj = {};
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    // 如果图片的旋转角度有值且不为零，添加旋转角度
    if (this.props.arrange.rotate) {
      // 兼容各种浏览器
      (['-moz-', '-ms-', '-webkit-', '']).forEach(function (val) {
        styleObj[val + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex=11;
    }
    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
});
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    // imgFigure取值范围初始化
    this.Constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {//水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
    this.state = {
      imgsArrangeArr: [
        // {
        //   pos:{
        //     left:'0',
        //     top:'0'
        //   },
        //   rotate:0, //表示旋转角度
        //   isInverse:false, //图片正反面 默认为false
        //   isCenter:false 图片是否居中
        // }
      ]
    }
  }
  // 翻转图片
  // @param index 输入当前被执行inverse操作的图片对饮的图片信息数组的index值
  // @return {Function}这是一个闭包函数，其内return一个真正待被执行函数
  inverse(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      // 触发视图重新渲染
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }
  }
  /*
  *利用rearrange函数，居中对应的index图片
  *@param index,需要被居中的图片对应的图片信息数组的index值
  *@return {function}
  */
 center(index){
   return ()=>{
   this.rerrange(index);
   }
 }
  /* 重新布局所有图片
    @param centerIndex指定居中排布哪个图片
  */
  rerrange(centerIndex) {
    // 获取imgimgsArrangeArr中心位置坐标对象
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      hPosRangeLeftSexX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,

      vPosRange = this.Constant.vPosRange,
      vPosRangeX = vPosRange.x,
      vPosRangeY = vPosRange.topY,
      // 存储图片上方对应的图片状态信息
      imgsArrangeTopArr = [],
      // 图片上方区域的数量定义在[0,1]之间
      imgTopNum = Math.floor(Math.random() * 2),
      // 标记上方图片是从数组图片中哪个位置拿出来的
      topImgSpliceIndex = 0,
      // 声明数组对象用来存放中心图片位置信息
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    // 居中centerIndex的图片, 剧中图片centerIndex不需要旋转
    imgsArrangeCenterArr[0] ={
      pos:centerPos,
      rotate:0,
      isCenter:true
    } 
    // 取出要布局上侧的图片状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - imgTopNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, imgTopNum);
    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeY[0], vPosRangeY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter:false
      }
    });
    // 布局左右两侧的图片
    for (var i = 0; i < imgsArrangeArr.length; i++) {
      var hPosRangeLORX = null;
      // 前半部分布局在左边，右半部分布局在右边
      if (i < imgsArrangeArr.length / 2) {
        hPosRangeLORX = hPosRangeLeftSexX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter:false
      }
    }
    // 填充上侧区域
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }
    // 填充中心位置区域的图片
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }
  //  组件加载之后，为每张图片计算位置的范围
  componentDidMount() {
    // 通过this.refs索引到子组件
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      // 获取stage宽高
      stageWidth = stageDOM.scrollWidth,
      stageHeight = stageDOM.scrollHeight,
      halfStageWidth = Math.floor(stageWidth / 2),
      halfStageHeight = Math.floor(stageHeight / 2);
    // console.log(halfStageWidth);
    // console.log(halfStageHeight);

    // 获取每一个imageFigure的宽高
    let imgFigDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
      imgFigWidth = imgFigDOM.scrollWidth,
      imgFigHeight = imgFigDOM.scrollHeight,
      halfImgFigWidth = Math.floor(imgFigWidth / 2),
      halfImgFigHeight = Math.floor(imgFigHeight / 2);
    // console.log(halfImgFigWidth,halfImgFigHeight);
    // 计算中心图片的位置坐标点
    this.Constant.centerPos = {
      left: halfStageWidth - halfImgFigWidth,
      top: halfStageHeight - halfImgFigHeight
    }
    // 水平方向图片位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgFigWidth;
    this.Constant.hPosRange.leftSecX[1] = halfStageWidth - halfImgFigWidth * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageWidth + halfImgFigWidth;
    this.Constant.hPosRange.rightSecX[1] = stageWidth - halfImgFigWidth;
    this.Constant.hPosRange.y[0] = -halfImgFigHeight;
    this.Constant.hPosRange.y[1] = stageHeight - halfImgFigHeight;
    // 垂直方向图片位置的取值范围
    this.Constant.vPosRange.x[0] = halfStageWidth - imgFigWidth;
    this.Constant.vPosRange.x[1] = halfStageWidth;
    // 上分区距离topy的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgFigHeight;
    this.Constant.vPosRange.topY[1] = halfStageHeight - halfImgFigHeight * 3;
    this.rerrange(0);
  }

  render() {
    // console.log(self);
    var ImageFigures = [], ControllerUnits = [];
    // 为每一个imgFigure生成一个索引
    imagesData.forEach((value, index) => {
      // console.log(value);
      if (!this.state.imgsArrangeArr[index]) {
        // 初始化图片状态对象
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter:false
        }
      }
      ImageFigures.push(<ImgFigure data={value} key={value.fileName} ref={'imageFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
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
