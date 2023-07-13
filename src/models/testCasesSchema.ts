import * as yup from 'yup'

export const yupTestCasesParamSchema = yup.object({
    id: yup.string().required().min(5, 'Min ID length is 5').trim(),
})

export const yupTestCasesBodySchema = yup.object({
    input: yup.mixed(),
    output: yup.mixed(),
    judgeId: yup.number().min(0, 'Judge ID cannot be less than 0').required(),
    active: yup.boolean().default(true),
})
