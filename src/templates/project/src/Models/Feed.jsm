class Feed {
	state() {
		return {
			posts: [
				{ 
					date: '4 Days Ago', 
					user: 1,
					likes: 3,
					content:   `
						In the name of Allah the most gracious the most merciful. 
						We being by praising Allah as he is the most deserving of pairse. 
						We see refuge by Allah from the evil of hour selves and the evil of our actions...
					`
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
}