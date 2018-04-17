class Counter {
    initState() {
        return {
            count: 1,
            other: 1
        }
    }

    constructor() {
        this.onChange('count', this.incOther)
    }

    @command
    plus(arg, origin) {
        return arg + origin
    }

    incCount() {
        this.setState({
            count: { $plus: 1 }
        })
    }

    incOther() {
        this.setState({
            other: { $plus: 1 }
        })
    }
}
