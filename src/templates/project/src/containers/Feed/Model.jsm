import Users from 'Users/Model'

class Feed {
    constructor() {
        this.state = {
            posts: [
                {
                    date: '4 Days Ago',
                    user: 1,
                    likes: 3,
                    content:   `This news feed is amazing, it has to be built using reac-trim`
                },
                {
                    date: '6 Days Ago',
                    user: 2,
                    likes: 10,
                    content:   `Going to Florida!`
                },
                {
                    date: '2 Years Ago',
                    user: 3,
                    likes: 1902,
                    content:   `Graduated from Drexel`
                }
            ]
        }
    }

    getToday() {
        const date = new Date()
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ]

        const day = date.getDate()
        const monthIndex = date.getMonth()
        const year = date.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }

    postsWithUsers() {
        return this.state.posts.map(({ user }, id) => ({
            ...this.state.posts[id],
            user:  Users.getUser(user)
        }))
    }

    getUsers() {
        return  Users.state.users
    }

    submitPost(post) {
        this.setState({
            posts: {
                $push: [{
                    date: this.getToday(),
                    likes: 0,
                    ...post
                }]
            }
        })
    }
}