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
			styleClass : 'flip-container',
			popClass : '',
			styleClassBack : 'back',
			styleClassFront : 'front',
			currentNo : 1
		}
	},
	handleClick:function(){
		if(this.state.styleClass != 'flip-container hover'){
			if(this.state.popClass == 'pop in'){
				this.setState({
					popClass : ''
				});
			}else{
				this.setState({
					popClass : 'pop in'
				});
			}
			var self = this;
			setTimeout(function(){
				self.setState({
					popClass : ''
				});
			},500);
		}
		this.setState({
			styleClass : 'flip-container',
			styleClassBack : 'back',
			styleClassFront : 'front',
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
				styleClass : 'flip-container hover',
				//styleClassBack : 'front',
				//styleClassFront : 'back'
			})
		},2000);
	},
	componentDidMount:function(){
		//console.log('componentDidMount');
		//console.log(this.getDOMNode());
	},
	render:function(){
		return (
			<span onTouchStart={this.handleClick} className={'no '+this.state.styleClass}>
				<span className={'flipper '+this.state.popClass}>
					<em className={this.state.styleClassFront} ref='noItem'>
						<i className={'bg'+this.props.no}>{this.props.no}</i>
					</em>
					<em className={this.state.styleClassBack+' one'} ref='noItem'>
						
					</em>
				</span>
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
			initNo : this.props.initNo,
			tipsWords : '秒记',
			tipsVisible : false,
			hasCancelButton : false
		}
	},
	submit:function(){
		var canSubmit = this.props.canSubmit;
		if(canSubmit == false){
			// alert('请将全部数字翻过来再提交!');
			this.setState({
				tipsWords : '请将全部数字翻过来再提交!',
				tipsVisible : true,
				hasCancelButton : false
			});
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
			// alert("恭喜你,过关啦,马上进入下一关!");
			this.setState({
				tipsWords : '恭喜你,过关啦,马上进入下一关!',
				tipsVisible : true,
				hasCancelButton : false
			});
			if(gameInit.currentStage < gameInit.stage.length - 1) {
				gameInit.currentStage ++;
				localStorage.setItem('stage',gameInit.currentStage);
				gameInit.refresh();
			}else{
				// alert('牛逼哄哄!通关啦!你是人类吗?');
				this.setState({
					tipsWords : '牛逼哄哄!通关啦!你是人类吗?',
					tipsVisible : true,
					hasCancelButton : false
				});
			}
			
		}else{
			// alert("很遗憾,请继续努力!");
			this.setState({
				tipsWords : '很遗憾,请继续努力!',
				tipsVisible : true,
				hasCancelButton : false
			});
			localStorage.setItem('stage',gameInit.currentStage);
			gameInit.refresh();
		}
	},
	refresh:function(){
		gameInit.refresh();
	},
	restart:function(){
		// alert('有魄力，从头再来!')
		this.setState({
			tipsWords : '大神，你确定你要重头再来？确定将从第一关开始，取消将接着目前进度继续。',
			tipsVisible : true,
			hasCancelButton : true
		});
		
	},
	render:function(){
		return (
			<div>
				<div className='buttonBox'>
					<button className='submit' onClick={this.submit}>提交</button>
					<button className='refresh' onClick={this.refresh}>重来</button>
					<button className='restart' onClick={this.restart}>重置</button>
				</div>
				<GameTips tipsWords={this.state.tipsWords} visible={this.state.tipsVisible} hasCancelButton={this.state.hasCancelButton}/>
			</div>
		)
	}
});
/*game tips*/
var GameTips = React.createClass({
	getInitialState:function(){
		return {
			visible : this.props.visible,
			tipsWords : this.props.tipsWords,
			hasCancelButton : this.props.hasCancelButton
		}
	},
	handleClickOk:function(){
		gameInit.restart();
	},
	handleClickCancel:function(){
		gameInit.refresh();
		this.state.visible = false;
	},
	render:function(){
		console.log(this.state)
		var styleObjTips = {
			display:this.props.visible == false ? 'none' : 'block'
		};
		var styleObjButtonCancel = {
			display:this.props.hasCancelButton == false ? 'none' : 'inline-block'
		};
		
		return (
			<div className='popWrap' style={styleObjTips}>
				<div className='popwin'>
					<div className='words'>{this.props.tipsWords}</div>
					<div className='buttons'>
						<button className='ok' onClick={this.handleClickOk}>确定</button>
						<button style={styleObjButtonCancel} className='cancel' onClick={this.handleClickCancel}>取消</button>
					</div>
				</div>
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
		gameInit.currentStage = 0;
		localStorage.setItem('stage',0);
		gameInit.refresh();
	}
};

gameInit.run(gameInit.currentStage);

