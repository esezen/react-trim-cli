class Example {
	/*
	 | --------------------------------------------------------
	 | State
	 | --------------------------------------------------------
	 | The State is shared data in the form of props within
	 | the controllers layer.
	 |
	 */

	constructor() {
		this.state = {
			execute: true,
			someProps: 'I am a Props!',
			someBool: false
		}
	}

	/*
	 | --------------------------------------------------------
	 | Helpers
	 | --------------------------------------------------------
	 | Helpers are used inside actions and are not accessible
	 | by any layer other then the model.
	 |
	 */

	getInital() {
		return 'I am a Props!';
	}

	/*
	 | --------------------------------------------------------
	 | Async Actions
	 | --------------------------------------------------------
	 | Asynchronous Actions can dispatch Actions
	 | after within an Asynchronous process.
	 |
	 */

	@async
	asyncToggleProps() {
		if (this.state.execute) {
			setTimeout(() => {
				this.state.execute = false
				this.toggleProps.dispatch()
			}, 1000)
		}
	}

	/*
	 | --------------------------------------------------------
	 | Actions
	 | --------------------------------------------------------
	 | Actions manipulate the state and are dispatched from
	 | the view layer.
	 |
	 */

	@action
	toggleProps() {
		this.state.someBool = !this.state.someBool
		this.state.someProps = this.state.someBool
			? 'I am a changed Props!'
			: this.getInital()
	}
}