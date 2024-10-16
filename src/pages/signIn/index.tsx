import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useSignInMutation } from '@/lib/features/Auth'
import Header from "../../components/header"
import Footer from "../../components/footer"
import Breadcrumbs from "../../components/breadcrumbs"
import { Alert } from "@material-tailwind/react"
import {
  Card,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react"
import { useFormik } from 'formik'
import * as yup from "yup"

export default function SignInPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [signIn] = useSignInMutation()
  const [disableButton, setDisableButton] = useState(false)
  const [open, setOpen] = useState(false)

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Required'),
    password: yup.string() .min(1,'Password must be at least 6 characters') .required ('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setOpen(false);
      try {
        setDisableButton(true);
        await signIn({
          email: values.email,
          password: values.password,
        }).unwrap();
        router.push('/manageAccommodation');
      } catch (error) {
        setOpen(true);
        setDisableButton(false);
      }
    },
  });


  return (
    <div className="font-prompt grid h-screen grid-rows-[auto_1fr] bg-white ">
      <div>
        <Header />
        <div className="hidden sm:block my-10 mx-10">
          <Breadcrumbs>
          <a href="/" className="opacity-80 ml-2">
            {t('home')}
          </a>
          <a href="/signIn" className="text-black">
            {t('login.signIn')}
          </a>
          </Breadcrumbs>
        </div>
      </div>
      <Card
        className="flex items-center justify-center p-8"
        color="transparent"
        shadow={false}
      >
        <Typography className="text-[150%] text-black ">
          {t("login.signIn")}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={formik.handleSubmit}>
          <div className="mb-1 flex flex-col gap-6 ">
            <Alert open={open} color="red" onClose={() => setOpen(false)}>
              {t("login.error")}
            </Alert>
            <Typography className="text-[110%] font-bold">
              {t("email")}
            </Typography>
            <Input
              error={formik.touched.email && Boolean(formik.errors.email)}
              type="email"
              size="lg"
              color="black"
              placeholder="email@mail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              label="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="red">{formik.errors.email}</Typography>
            )}
            <Typography className="text-[110%] font-bold">
              {t("password")}
            </Typography>
            <Input
              error={formik.touched.password && Boolean(formik.errors.password)}
              label="Password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
            />           
              {formik.touched.password && formik.errors.password && (
              <Typography color="red">{formik.errors.password}</Typography>
            )}
            <Button
              type="submit"
              disabled={disableButton}
              className="mt-2 bg-gradient-to-r from-cyan-500 via-purple-300 to-pink-300 text-[100%] font-semibold"
              fullWidth
            >
              {t("login.signIn")}
            </Button>
            <Typography
              variant="small"
              color="black"
              className="flex justify-center font-normal mt-3"
            >
              <a href="/forgotPassword" className="font-prompt hover:text-gray-700">
                {t("forgot_password")}
              </a>
            </Typography>
          </div>
        </form>
      </Card>
      <Footer />
    </div>
  );
}
