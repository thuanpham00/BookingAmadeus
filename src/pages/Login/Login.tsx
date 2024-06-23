import { useForm } from "react-hook-form"
import logo from "../../img/favicon/FaviconFlight.png"
import Input from "src/components/Input"
import { Link, useNavigate } from "react-router-dom"
import { path } from "src/constant/path"
import schema, { schemaType } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "src/components/Button"
import { Helmet } from "react-helmet-async"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "src/firebase"
import { useState } from "react"

const schemaForm = schema.pick(["email", "password"])

type FormData = Pick<schemaType, "email" | "password">

export default function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>({ resolver: yupResolver(schemaForm) })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, data.email, data.password)
      if (res) {
        await res.user.getIdTokenResult().then((response) => console.log(response))
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  })

  return (
    <div className="min-w-[350px] md:min-w-[450px] p-6 md:p-8 bg-[#f2f2f2] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-md">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login - Amadeus Booking" />
      </Helmet>

      <Link to={path.home} className="flex items-center justify-center cursor-pointer">
        <div className="w-14 h-14">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl text-textColor font-semibold text-center">Amadeus Booking</h1>
      </Link>

      <div className="text-textColor text-3xl font-semibold text-center">Login</div>

      <button className="mt-4 flex items-center justify-center gap-2 w-full rounded-full border border-[#4e6c8d] py-2">
        <div
          className="w-5 h-5"
          style={{
            backgroundImage: `url(https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        <span className="text-lg text-textColor font-medium">Login with Google</span>
      </button>

      <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

      <form onSubmit={onSubmit} className="mt-5" noValidate>
        <Input
          className="mt-1"
          nameInput="Email"
          type="email"
          name="email"
          autoComplete="on"
          placeholder="Enter email"
          messageError={errors.email?.message}
          register={register}
        />
        <Input
          className="mt-1 relative"
          nameInput="Password"
          type="password"
          name="password"
          autoComplete="on"
          placeholder="Enter password"
          messageError={errors.password?.message}
          register={register}
        />
        <Button nameButton="Login" disable={false} loading={false} />
      </form>
      <div className="my-4 w-full h-[1px] bg-[#4e6c8d]/70"></div>

      <div className="flex justify-center items-center gap-1">
        <span className="text-base">Do not have an account?</span>
        <Link to={path.register} className=" text-textColor font-semibold text-base">
          Sign up
        </Link>
      </div>
    </div>
  )
}
