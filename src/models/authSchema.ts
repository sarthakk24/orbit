import * as yup from 'yup'

export const yupLoginSchema = yup.object({
    email: yup.string().email().required().trim(),
    password: yup.string().required().trim(),
})

export const yupRegisterSchema = yup.object({
    name: yup.string().required().trim(),
    email: yup.string().email().required().trim(),
    password: yup.string().required().trim(),
    role: yup
        .string()
        .matches(/^admin$|^participant$/, {
            message: 'Role must be admin or participant',
        })
        .required()
        .trim(),
})
