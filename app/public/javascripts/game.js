/*game core logic*/
var NoGameComponent = React.createClass({
	getInitialState:function(){
		return {
			no : [1,2,3,4,5,6,7,8,9].sort(function(){ 
				return 0.5 - Math.random() 
			}),
			currentNo : 1
		}
	},
	changeCurrentNo:function(current){
		this.setState({
			currentNo : current
		});
	},
	render:function(){
		return (
			<div>
				<GameNoBox no={this.state.no}/>
				<ChooseGameNo changeCurrentNo={this.changeCurrentNo}/>
			</div>
		)
	}
});
/*gameBox component*/
var GameNoBox = React.createClass({
	render:function(){
		var numbers = [];
		this.props.no.forEach(function(no,index){
			numbers.push(
				
				<GameNo no={no}/>
			)
		});
		return (
			<div className='noBox'>
				{numbers}
			</div>
		);
	}
});
/*ganme number component*/
var GameNo = React.createClass({
	getInitialState:function(){
		return {
			styleClass : 'flip',
			styleClassBack : 'back flip out',
			styleClassFront : 'front flip'
		}
	},
	handleClick:function(){
		this.setState({
			styleClassBack : 'back flip out',
			styleClassFront : 'front flip in'
		});
	},
	componentWillMount:function(){
		var self = this;
		this.timer = setTimeout(function(){
			self.setState({
				styleClassBack : 'back flip in',
				styleClassFront : 'front flip out'
			})
		},2000);
	},
	componentDidMount:function(){
		//console.log('componentDidMount');
		//console.log(this.getDOMNode());
	},
	render:function(){
		return (
			<span onTouchStart={this.handleClick}>
				<em className={this.state.styleClassFront} >
					{this.props.no}
				</em>
				<em className={this.state.styleClassBack}>
					
				</em>
			</span>
		);
	}
});
/*choose number component*/
var ChooseGameNo = React.createClass({
	getInitialState:function(){
		return {
			no : [1,2,3,4,5,6,7,8,9,0]
		}
	},
	render:function(){
		return (
			<div>
				<ChooseGameNoBox no={this.state.no} changeCurrentNo={this.props.changeCurrentNo}/>
			</div>
		)
	}
});
/*choose number choosegamenobox*/
var ChooseGameNoBox = React.createClass({
	render:function(){
		var numbers = [];
		var changeCurrentNo = this.props.changeCurrentNo;
		this.props.no.forEach(function(no,index){
			numbers.push(
				<ChooseGameNoDetail no={no} changeCurrentNo={changeCurrentNo}/>
			);
		});
		return (
			<div className='chooseNoBox'>
				{numbers}
			</div>
		)
	}
});
var ChooseGameNoDetail = React.createClass({
	getInitialState:function(){
		return {
			isCurrent : false 
		}
	},
	handleClick:function(e){
		
		var currentNo = e.target.innerHTML;
		Array.prototype.slice.call(e.target.parentNode.childNodes).forEach(function(dom,index){
			dom.style.background = "#FFFFFF";
		});
		e.target.style.background = "#F923A3";
		this.props.changeCurrentNo(currentNo);
		console.log(currentNo)
		console.log(game.state.currentNo)
	},
	render:function(){
		var styleObj = {
			background:this.state.isCurrent ? '#F923A3' : '#FFFFFF'
		};
		return (
			<em style={styleObj} onTouchStart={this.handleClick}>
				{this.props.no}
			</em>
		)
	}
});
/*game render*/
var game = React.render(
	<NoGameComponent/>,
	document.getElementById('gameCoreCon'),
	function(){
		console.log('done!');
	}
);
/*choose game number render*/
/*var chooseGameNo = React.render(
	<ChooseGameNo/>,
	document.getElementById('chooseGameNoCon'),
	function(){
		console.log('done!');
	}
);*/