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
	 | --------------------------------------------------------
   | Async Actions can take as many arguments as pleased.
	 */

	@async
	asyncToggleProps() {
		if (this.state.execute) {
			setTimeout(() => {
        this.setState({
          execute: {
            $set: false
          }
        })

				this.toggleProps.dispatch()
			}, 1000)
		}
	}

  /*
   | --------------------------------------------------------
   | Commands
   | --------------------------------------------------------
   | Commands are used in actions to mutate the state
   | via immutability-helper. Essentially, it is equivalent
   | to extending the update method functionality as described
   | in immutability-helper's git repository.
   | --------------------------------------------------------
   | original: immutability-helper passes the property from
   | the state object where the mutation will be made.
   |
   | argument: is argument to the command by the user. Since
   | an argument is not needed for this example I passed null
   | as the argument.
   */

  @command
  my_toggle(argument, original) {
    return !this.state.someBool ? 'I am a changed Props!' : this.getInital()
  }

	/*
	 | --------------------------------------------------------
	 | Actions
	 | --------------------------------------------------------
	 | Actions manipulate the state and are dispatched from
	 | the view layer.
	 | --------------------------------------------------------
   | Action method take only one argument (the payload).
	 */

	@action
	toggleProps() {
    this.setState({
      someBool: {
        $set: !this.state.someBool
      },
      someProps: {
        $my_toggle: null
      }
    })
	}
}
