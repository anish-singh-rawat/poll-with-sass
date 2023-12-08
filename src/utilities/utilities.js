import * as yup from 'yup'

export const schema = yup.object().shape({
  username: yup.string().trim().min(4).required("*UserName is Required"),
  userpassword: yup.string().trim().min(5).required("*Password is Required"),
});
