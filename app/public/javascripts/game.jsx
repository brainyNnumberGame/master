/*game core logic*/
var NoGameComponent = React.createClass({
	getInitialState:function(){
		return {
			no : [1,2,3,4,5,6,7,8,9],

		}
	},
	render:function(){
		return (
			<div>
				<GameNo no={this.state.no}/>
			</div>
		)
	}
});

var GameNo = React.createClass({
	render:function(){
		var numbers = [];
		this.props.no.forEach(function(no,index){
			numbers.push(
				<span>
					{no}
				</span>
			)
		});
		return (
			<div className='noBox'>
				{numbers}
			</div>
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