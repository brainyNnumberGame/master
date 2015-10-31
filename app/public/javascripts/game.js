/*game core logic*/
var NoGameComponent = React.createClass({
	getInitialState:function(){
		return {
			no : this.props.no,
			initNo : this.props.initNo,
			currentNo : this.props.current,
			state : this.props.state,
			canSubmit : this.props.canSubmit
		}
	},
	changeCurrentNo:function(current){
		this.setState({
			currentNo : current
		});
	},
	changeCansubmit:function(canSubmit){
		this.setState({
			canSubmit : canSubmit
		});
	},
	render:function(){
		var className = this.state.canSubmit == true ? 'abled' : 'disabled';
		return (
			<div className={className}>
				<GameNoBox no={this.state.no} current={this.state.currentNo} state={this.state.state} changeCansubmit={this.changeCansubmit} canSubmit={this.state.canSubmit}/>
				<ChooseGameNo changeCurrentNo={this.changeCurrentNo} current={this.state.currentNo}/>
				<SubmitNo no={this.state.no} initNo={this.state.initNo} state={this.state.state} canSubmit={this.state.canSubmit}/>
			</div>
		)
	}
});
/*gameBox component*/
var GameNoBox = React.createClass({
	render:function(){
		var numbers = [];
		var current = this.props.current;
		var noArray = this.props.no;
		var state = this.props.state;
		var canSubmit = this.props.canSubmit;
		var changeCansubmit = this.props.changeCansubmit;
		this.props.no.forEach(function(no,index){
			numbers.push(
				
				<GameNo no={no} current={current} index={index} noArray={noArray} state={state} changeCansubmit={changeCansubmit} canSubmit={canSubmit}/>
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
			styleClassFront : 'front flip',
			currentNo : 1
		}
	},
	handleClick:function(){
		this.setState({
			styleClassBack : 'back flip out',
			styleClassFront : 'front flip in',
		});
		this.props.no = this.props.current;
		this.props.noArray[this.props.index] = parseInt(this.props.current); 
		this.props.state[this.props.index] = true;

		console.log(this.props.state)
		var canSubmit = this.props.state[0];
		this.props.state.forEach(function(item,index){
			if(index == 0){
				canSubmit = item;
			}
			canSubmit = canSubmit && item;
		});
		this.props.canSubmit = canSubmit;
		this.props.changeCansubmit(canSubmit);
	},
	componentWillMount:function(){
		this.setState({
			currentNo : this.props.current
		});
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
				<em className={this.state.styleClassFront} ref='noItem'>
					<i className={'bg'+this.props.no}>{this.props.no}</i>
				</em>
				<em className={this.state.styleClassBack+' one'} ref='noItem'>
					
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
				<ChooseGameNoBox no={this.state.no} changeCurrentNo={this.props.changeCurrentNo} current={this.props.current}/>
			</div>
		)
	}
});
/*choose number choosegamenobox*/
var ChooseGameNoBox = React.createClass({
	render:function(){
		var numbers = [];
		var changeCurrentNo = this.props.changeCurrentNo;
		var current = this.props.current;
		this.props.no.forEach(function(no,index){
			numbers.push(
				<ChooseGameNoDetail no={no} changeCurrentNo={changeCurrentNo} current={current}/>
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
			dom.style.backgroundColor = "#FFFFFF";
		});
		e.target.style.backgroundColor = "#DEA015";
		this.props.changeCurrentNo(currentNo);
	},
	componentWillMount :function(){
		if(this.props.no == this.props.current){
			this.setState({
				isCurrent : true		
			});
		}
	},
	render:function(){
		var styleObj = {
			backgroundColor:this.state.isCurrent ? '#DEA015' : '#FFFFFF'
		};
		return (
			<em style={styleObj} className={'smbg'+this.props.no} onTouchStart={this.handleClick}>
				{this.props.no}
			</em>
		)
	}
});
/*submit component*/
var SubmitNo = React.createClass({
	getInitialState:function(){
		return {
			resultNo : this.props.no,
			initNo : this.props.initNo
		}
	},
	submit:function(){
		var canSubmit = this.props.canSubmit;
		console.log(canSubmit)
		if(canSubmit == false){
			alert('请将全部数字翻过来再提交!');
			return;
		}
		var initNo = this.state.initNo;
		var gameResult = true;
		this.state.resultNo.forEach(function(item,index){
			if(item != initNo[index]){
				gameResult = false;
			}
		});
		if(gameResult == true){
			alert("恭喜你,过关啦,马上进入下一关!");
			if(gameInit.currentStage < gameInit.stage.length - 1) {
				gameInit.currentStage ++;
				localStorage.setItem('stage',gameInit.currentStage);
				gameInit.refresh();
			}else{
				alert('牛逼哄哄!通关啦!你是人类吗?');
			}
			
		}else{
			alert("很遗憾,请继续努力!");
			localStorage.setItem('stage',gameInit.currentStage);
			gameInit.refresh();
		}
	},
	render:function(){
		
		return (
			<div className='buttonBox'>
				<button className='submit' onClick={this.submit}>提交</button>
				<button className='refresh' onClick={gameInit.refresh}>重来</button>
				<button className='restart' onClick={gameInit.restart}>重置</button>
			</div>
		)
	}
});
/*game init*/
var gameInit = {
	initState : [false,false,false,false,false,false,false,false,false],
	noArray : [1,2,3,4,5,6,7,8,9],
	initNo : [],
	canSubmit : false,
	run : function(){
		this.noArray = this.stage[this.currentStage];
		var tempArray = this.noArray.slice(0);
		this.initNo = tempArray.sort(function(){ 
			return 0.5 - Math.random(); 
		});
		var originalNo = this.initNo.slice(0);
		var currentNo = this.noArray[0];
		var initState = this.initState;
		var canSubmit = this.canSubmit;
		game = React.render(
			<NoGameComponent no={this.initNo} current={currentNo} initNo={originalNo} state={initState} canSubmit={canSubmit}/>,
			document.getElementById('gameCoreCon'),
			function(){
				console.log('done!');
			}
		);
		/*game.setState({
			no : gameInit.initNo
		});*/
	},
	stage : [
		[0,0,0,0,0,0,0,0,parseInt(Math.random()*9)+1],
		[0,0,0,0,0,0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,0,0,0,0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,0,0,0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,0,0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[0,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1],
		[parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1,parseInt(Math.random()*9)+1]
	],
	currentStage : localStorage.getItem('stage') == null ? 0 : parseInt(localStorage.getItem('stage')),
	refresh : function(){
		document.getElementById("gameCoreCon").innerHTML="";
		gameInit.canSubmit = false;
		gameInit.initState = [false,false,false,false,false,false,false,false,false];
		gameInit.run(gameInit.currentStage);
	},
	restart : function(){
		alert('有魄力，从头再来!')
		gameInit.currentStage = 0;
		localStorage.setItem('stage',0);
		gameInit.refresh();
	}
};

gameInit.run(gameInit.currentStage);

