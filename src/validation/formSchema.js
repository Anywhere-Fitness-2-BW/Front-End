import * as yup from 'yup'


const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(3, 'Full name must be at least three characters long')
        .required('Full name is a required field'),
    email: yup.string()
        .email('The email must be a valid email address')
        .required('Email is a required field'),
    username: yup.string()
        .trim()
        .min(4, 'Username must be at least four characters long')
        .required('Username is a required field'),
    password: yup.string()
        .trim()
        .min(4, 'Password must be at least four characters long')
        .required('Password is a required field'),
    role: yup.string().required('Role is a required field'),    
})

export default formSchema