class Users {
	/*
	 | --------------------------------------------------------
	 | State
	 | --------------------------------------------------------
	 */

	constructor() {
		this.state = {
			id: 4,
			execute: true,
			update: true,
			status: 'Add',
			newuser: { name: '', username: '' },
			users: {
				1: { name: 'Abdelrahman Salem', username: '@abubakir1997' },
				2: { name: 'Enes Sezen', username: '@esezen' },
				3: { name: 'Omar Salem', username: '@omar94' }
			}
		}
	}

	/*
	 | --------------------------------------------------------
	 | Helpers
	 | --------------------------------------------------------
	 */

	getNewId() {
		const ids = Object.keys(this.state.users)
		const lastId = Number(ids[ids.length - 1])

		return lastId ? lastId + 1 : 1
	}

	getUser(id, type = null) {
		var user = this.state.users[id]

		if (user === undefined) {
			user = { name: 'DNE', username: '@dne' }
		}

		return type === null ? user : user[type]
	}

	/*
	 | --------------------------------------------------------
	 | Async Actions
	 | --------------------------------------------------------
	 */

	@async
	getWithExtraProp() {
		return Object.keys(this.state.users).map(key => ({
			...this.state.users[key],
			id: key,
			school: 'Drexel'
		}))
	}

	@async
	asyncAppendUser(user) {
		if (this.state.execute) {
			setTimeout(() => {
				// Reset State Before Dispatch
				// this.state.newProp will not sync
				this.resetState()
        this.removeExecute()
        this.appendUser(user)
        this.syncState()
			}, 1000)
		}
	}

	@async
	asyncUpdateName() {
		if (this.state.update) {
			setTimeout(() => {
				this.setState({
          update: {
            $set: false
          },
          users: {
            1: {
              $set: {
                username: this.getUser(1, 'username'),
                name: 'Abdelrahman Salem (Abu Bakr)'
              }
            }
          }
        })

        // Sync Previous State Manipulation
        this.syncState()

        // This update will Sync with Next @Action Dispatch
        this.setState({
          $merge: {
            newProp: true
          }
        })

				// You can dispatch a reset to the state by calling this.reset.dispatch()
			}, 1000)
		}
	}

  @command
  iff(array, original) {
    return array[0] ? array[1] : original
  }

	/*
	 | --------------------------------------------------------
	 | Actions
	 | --------------------------------------------------------
	 */

  @action
  removeExecute() {
    this.setState({
      execute: {
        $set: false
      }
    })
  }

	@action
	appendUser(user) {
    const newId = this.getNewId()

    this.setState({
      id: {
        $iff: [
          this.state.status !== 'Update',
          newId + 1
        ]
      },
      users: {
        [newId]: {
          $set: user
        }
      }
    })
	}

	@action
	updateUser(id) {
    this.setState({
      id: {
        $set: Number(id)
      },
      status: {
        $set: 'Update'
      },
      newuser: {
        $set: this.state.users[id]
      }
    })
	}

	@action
	delUser(id) {
    this.setState({
      users: {
        $unset: [ id ]
      }
    })

    // Seperated to generate newId after removal

    this.setState({
      id: {
        $set: this.getNewId()
      }
    })
	}

	@action
	addUser() {
    const name = this.state.newuser.name.trim()
    const username = this.state.newuser.username.trim()

    this.setState({
      status: {
        $set: 'Add'
      },
      users: {
        [this.state.id]: {
          $set: {
            name: name.length > 0 ? name : 'Empty',
            username: username.length > 1 ? username : '@empty'
          }
        }
      }
    })

    // Seperated to generate newId after addition

    this.setState({
      id: {
        $set: this.getNewId()
      }
    })
  }

	@action
	updateNewUser(payload) {
		this.setState({
      newuser: {
        $merge: payload
  		}
    })
	}
}
