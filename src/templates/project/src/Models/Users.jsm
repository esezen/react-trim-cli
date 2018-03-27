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
				this.reset.dispatch(() => {
					this.state.execute = false
					this.appendUser.dispatch(user)
				})
			}, 1000)
		} 
	}

	@async
	asyncUpdateName() {
		if (this.state.update) {
			setTimeout(() => {
				this.state.update = false
				this.state.users[1] = { 
					username: this.getUser(1, 'username'),
					name: 'Abdelrahman Salem (Abu Bakr)' 
				}

				this.sync.dispatch() // Sync Previous State Manipulation
				this.state.newProp = true // Will Sync with Next @Action Dispatch

				// You can dispatch a reset to the state by calling this.reset.dispatch()
			}, 1000)
		}
	}

	/*
	 | --------------------------------------------------------
	 | Actions
	 | --------------------------------------------------------
	 */

	@action
	appendUser(user) {
		const newId = this.getNewId()

		this.state.users[newId] = user

		if(this.state.status !== 'Update') {
			this.state.id = newId + 1
		}
	}

	@action
	updateUser(id) {
		this.state.id = Number(id)
		this.state.status = 'Update'
		this.state.newuser = this.state.users[id]
	}

	@action
	delUser(id) {
		this.state.users = Object
			.keys(this.state.users)
			.filter(key => key !== id)
			.reduce((obj, key) => {
				obj[key] = this.state.users[key]
				return obj
			}, {});

		this.state.id = this.getNewId()
	}

	@action
	addUser() {
		const name = this.state.newuser.name.trim()
		const username = this.state.newuser.username.trim()

		this.state.users[this.state.id] = {
			name: name.length > 0 ? name : 'Empty',
			username: username.length > 1 ? username : '@empty'
		}

		this.state.status = 'Add'
		this.state.id = this.getNewId()
	}

	@action
	updateNewUser(payload) {
		this.state.newuser = {
			...this.state.newuser,
			...payload
		}
	}
}