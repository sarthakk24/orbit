import * as yup from 'yup'

export const yupSubmitSchema = yup.object({
    problemId: yup.number().required(),
    source: yup.string().required().trim(),
    compilerId: yup
        .number()
        .min(0, 'Compiler ID cannot be less than 0')
        .required(),
    compilerVersionId: yup
        .number()
        .min(0, 'Compiler Version ID of Solution cannot be less than 0')
        .default(0),
})
