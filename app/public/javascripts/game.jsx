/*game core logic*/
var NoGameComponent = React.createClass({
	getInitialState:function(){
		return {
			no : [1,2,3,4,5,6,7,8,9].sort(function(){ 
				return 0.5 - Math.random() 
			})
		}
	},
	render:function(){
		return (
			<div>
				<GameNoBox no={this.state.no}/>
			</div>
		)
	}
});

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
			<span onClick={this.handleClick}>
				<em className={this.state.styleClassFront} >
					{this.props.no}
				</em>
				<em className={this.state.styleClassBack}>
					
				</em>
			</span>
		);
	}
});
var Game = React.render(
	<NoGameComponent/>,
	document.getElementById('gameCoreCon'),
	function(){
		console.log('done!');
	}
);