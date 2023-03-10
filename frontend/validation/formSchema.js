import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    email: Yup
    .string()
    .email('Must be a valid email address.')
    .required("Must include email address")
});

export default formSchema;