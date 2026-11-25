export const state = () => ({
    user: {
        _id: '',
        name: '',
        username: "",
        public: true,
        creationDate: {
          day: 1,
          month: 1,
          year: 2000
        },
        birthdate: {
          day: null,
          month: null,
          year: null
        },
        description: '',
        profilePictureUrl: '',
        coverPictureUrl: '',
        location: ''
    },
    connections: {
        follows: [],
        followers: []
    },
})

export const mutations = {
    insert(context, data){
        context.user = data
    },
    set_connections(context, data) {
        context.connections.follow = (data.follows) ? data.follows : [];
        context.connections.followers = (data.followers) ? data.followers : [];
    }
}