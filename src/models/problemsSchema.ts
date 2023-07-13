import * as yup from 'yup'

export const yupCreateProblemSchema = yup.object({
    name: yup.string().required().trim(),
    description: yup.string().required().trim(),
    type: yup
        .number()
        .min(0, 'Type of problem cannot be less than 0')
        .max(
            4,
            'Type of problem cannot be greater than 4 : 0 - binary, 1 - minimize, 2 - maximize, 4 - percentage'
        )
        .default(0),
    masterjudgeId: yup
        .number()
        .min(0, 'Master Judge ID of problem cannot be less than 0')
        .required(),
    interactive: yup.boolean().default(false),
})

export const yupDeleteProblemSchema = yup.object({
    id: yup.string().required().min(5, 'Min ID length is 5').trim(),
})

export const yupUpdateProblemParamSchema = yup.object({
    id: yup.string().required().min(5, 'Min ID length is 5').trim(),
})

export const yupUpdateProblemBodySchema = yup.object({
    name: yup.string().trim(),
    description: yup.string().trim(),
    type: yup
        .number()
        .min(0, 'Type of problem cannot be less than 0')
        .max(
            4,
            'Type of problem cannot be greater than 4 : 0 - binary, 1 - minimize, 2 - maximize, 4 - percentage'
        ),
    masterjudgeId: yup
        .number()
        .min(0, 'Master Judge ID of problem cannot be less than 0'),
    interactive: yup.boolean(),
    activeTestcases: yup.string().trim(),
})
