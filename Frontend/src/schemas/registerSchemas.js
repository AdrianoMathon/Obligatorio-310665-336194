import * as Yup from 'yup';

const emailReg = new RegExp(".*\\..+");

export const getRegisterSchema = (t) => {
    return Yup.object({
        name: Yup.string()
            .min(2, t("validations.min", { min: 2 }))
            .max(40, t("validations.max", { max: 40 }))
            .required(t("validations.name_required")),
        
        email: Yup.string()
            .min(3, t("validations.min", { min: 3 }))
            .matches(emailReg, t("validations.email_invalid"))
            .required(t("validations.email_required")),
        
        password: Yup.string()
            .min(8, t("validations.min", { min: 8 }))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                t("validations.password_strong")
            )
            .required(t("validations.password_required")),
        
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t("validations.password_match"))
            .required(t("validations.confirm_password_required"))
    });
};
