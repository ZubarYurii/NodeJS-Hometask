exports.user = {
    id: '',
    firstName: value => value === '' ? false : true,
    lastName: value => value === '' ? false : true,
    email: value => /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi.test(value),
    phoneNumber: value => /^\+380(\d{9})$/g.test(value),
    password: value => ('' + value).length >= 3 // min 3 symbols
}