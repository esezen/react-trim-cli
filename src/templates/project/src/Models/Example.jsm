class Example {
	/*
	 | --------------------------------------------------------
	 | State
	 | --------------------------------------------------------
	 | The State is shared data in the form of props within
	 | the controllers layer.
	 |
	 */
	
	state() {
		return {
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
	 | Actions
	 | --------------------------------------------------------
	 | Actions manipulate the state and are dispatched from
	 | the view layer.
	 |
	 */

	toggleProps(state, payload) {
		return {
			...state,
			someProps: !state.someBool ? 'I am a changed Props!' : this.getInital(),
			someBool: !state.someBool
		}
	}
}
