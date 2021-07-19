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
      }
})

export const mutations = {
    insert(context, data){
        context.user = data
    }
}