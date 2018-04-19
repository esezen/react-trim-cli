@Models {
    users: 'Users/Model'
}
class Feed {
    initState() {
        return {
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

    getUser(id) {
        return this.users.getUser(id);
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
