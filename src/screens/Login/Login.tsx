import { IonButton, IonContent, IonInput, IonPage, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonSelect, IonSelectOption, IonToast, IonAlert } from '@ionic/react'
import { hammer, hammerOutline, lockClosed, lockClosedOutline, logInOutline, mailOpen, mailOpenOutline, mailOutline, person, personOutline, phonePortraitOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router';


import Building from "../../assets/images/building.jpg"
import { AuthContext, AuthContextType } from '../../contexts/AuthContext';
import { StorageContext, StorageContextType } from '../../contexts/StorageContext';
import { USER } from '../../helpers/keys';
import Settings from '../../helpers/settings';


import "./Login.css"



const Login = () => {

  const [formType, setFormType] = useState<"login" | "register">("login")
  const [skill, setSkill] = useState("")
  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAleart] = useState(false)


  const { register, handleSubmit, formState: { errors } } = useForm<AuthInputs>();
  const { createUser, authenticate } = useContext(AuthContext) as AuthContextType
  const { pb } = Settings()
  const history = useHistory()
  const { saveData } = useContext(StorageContext) as StorageContextType

  let [colors, setColors] = useState("green")
  let [colorCounter, setColorCounter] = useState(0)






  const handdleLoginSubmit: SubmitHandler<AuthInputs> = async ({ loginInputs }) => {
    setLoading(true)
    try {
      const res: any = await authenticate(loginInputs.email, loginInputs.password)

      if (!pb.authStore.isValid) {
        displayFormError(res.message)
        return
      }

      saveData(USER, res)
      setLoading(false)
      history.push('/dashboard')

    }
    catch (err) {
      console.log(err, '<-- New Error')
    }
  }


  const handdleRegistrationSubmit: SubmitHandler<AuthInputs> = async ({ registrationInputs }) => {
    setLoading(true)

    let _colors = ["black", "pink", "orange", "purple", "green"]
    if (colorCounter === _colors.length) {
      setColorCounter(0)
    }
    setColors(_colors[colorCounter])
    setColorCounter(colorCounter += 1)



    const name = `${registrationInputs.name}`
    const formData = {
      ...registrationInputs,
      name
    }

    try {
      const user: any = await createUser(formData)
      console.log("🚀 ~ file: Login.tsx:73 ~ consthanddleRegistrationSubmit:SubmitHandler<AuthInputs>= ~ user:", user)


      // switch(user){
      //   case "400 | 404 | 500":
      //   case user?.data.
      // }
      // {
      //   "code": 400,
      //     "message": "Failed to create record.",
      //     "data": {
      //       "phone": {
      //         "code": "validation_min_text_constraint",
      //         "message": "Must be at least 9 character(s)."
      //     }
      //   }
      // }


      if (user?.status !== (200 | 201) && user?.message === "Failed to create record.") {
        // let _errors = {
        //   name: user?.data?.data?.name,
        //   email: user?.data?.data?.email,
        //   phone: user?.data?.data?.phone,
        //   password: user?.data?.data?.password,
        //   passwordConfirm: user?.data?.data?.passwordConfirm,
        //   code: user?.status,
        //   response: user
        // }
        // console.log("🚀 ~ file: Login.tsx:113 ~ consthanddleRegistrationSubmit:SubmitHandler<AuthInputs>= ~ _errors:", _errors)

        // check if error is not undefined
        if (!!user?.data?.data?.name) {
          setMessage(`${'Name'}: ${user?.data?.data?.name?.message}`)
          setLoading(false)
          return;
        }
        if (!!user?.data?.data?.email) {
          displayFormError(`${'Email'}`, user?.data?.data?.email?.message)
          setLoading(false)
          return;
        }
        if (!!user?.data?.data?.phone) {
          displayFormError(`${'Phone'}`, user?.data?.data?.phone?.message)
          setLoading(false)
          return;
        }
        if (!!user?.data?.data?.skill) {
          displayFormError(`${'Skill'}`, user?.data?.data?.skill?.message)
          setLoading(false)
          return;
        }
        if (!!user?.data?.data?.password) {
          displayFormError(`${'Password'}`, user?.data?.data?.password?.message)
          setLoading(false)
          return;
        }
        if (!!user?.data?.data?.passwordConfirm) {
          displayFormError(`${'passwordConfirm'}`, user?.data?.data?.passwordConfirm?.message)
          setLoading(false)
          return;
        }
      }
    } catch (err) {
      console.log(err, '<------- }}')
    }

    setMessage("Kindly login to continue")
    setLoading(false)
    setShowAleart(true)

  }


  function displayFormError(field: string, message?: string) {
    setMessage(`${field}: ${message}`)
    setLoading(false)
    setShowToast(true)
  }



  return (
    <IonPage>
      <IonContent className='' fullscreen>
        <IonAlert
          message={message}
          onDidDismiss={() => setShowAleart(false)}
          buttons={
            [
              {
                text: "Okay",
                handler: () => setFormType("login")
              }
            ]
          }

          header="Registration Complete"
          isOpen={showAlert}
        />


        <IonToast
          position='top'
          color={"danger"}
          duration={5000}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          isOpen={showToast}
        />

        {/* Building Image */}
        <section className="landing_image" style={{ backgroundImage: `url("${Building}")` }}></section>


        <section className='auth_section'>

          <section className='mx-auto ion-padding w-75'>
            <IonSegment mode='ios' title={formType} value={formType}>
              <IonSegmentButton mode='ios' value='login' title='login' onClick={() => setFormType("login")}>Login</IonSegmentButton>
              <IonSegmentButton mode='ios' value='register' title='register' onClick={() => setFormType("register")}>Register</IonSegmentButton>
            </IonSegment>
          </section>


          {/* Login Form  */}

          {
            formType === "login" ? (
              <form onSubmit={handleSubmit(handdleLoginSubmit)}>

                <section className="ion-text-center mt-3">
                  <h5>Welcome back</h5>
                  <p className="text-muted">We're so excited to see you again!</p>
                </section>

                <section className="action-panel ion-padding">
                  <div className='ion-margin-vertical'>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="email" className="border rounded-5 ion-margin-end" placeholder='Enter email' {...register('loginInputs.email')} />
                      <IonIcon icon={mailOpenOutline} size="large" />
                    </div>
                    {errors.loginInputs?.email && <li className='text-danger'>This field is required</li>}
                  </div>
                  <div>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="password" className="border rounded-5 ion-margin-end" placeholder='Enter Passwrod' {...register('loginInputs.password')} />
                      <IonIcon icon={lockClosedOutline} size="large" />
                    </div>
                    {errors.loginInputs?.password && <li className='text-danger'>This field is required</li>}
                  </div>

                  {
                    loading ? (
                      <IonButton
                        className='fill ion-margin-vertical mt-4'
                        expand='block'
                        shape='round'
                        size='large'
                      >
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
                      </IonButton>
                    ) : (
                      <IonButton
                        className='fill ion-margin-vertical mt-4'
                        expand='block'
                        shape='round'
                        size='large'
                        type='submit'
                      >Login
                      </IonButton>

                    )
                  }

                </section>
              </form>

            ) : null
          }

          {/* Registration Form  */}
          {
            formType === "register" ? (

              <form onSubmit={handleSubmit(handdleRegistrationSubmit)}>
                <section className="action-panel ion-padding">

                  <div className='ion-margin-vertical'>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="text" className="border rounded-5 ion-margin-end" placeholder='Enter first name' {...register("registrationInputs.name")} />
                      <IonIcon icon={personOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.name && <li className='text-danger'>This field is required</li>}
                  </div>
                  {/*  <div className='ion-margin-vertical'>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="text" className="border rounded-5 ion-margin-end" placeholder='Enter last name' {...register('registrationInputs.lastname')} />
                      <IonIcon icon={personOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.lastname && <li className='text-danger'>This field is required</li>}
                  </div> */}
                  <div className='ion-margin-vertical'>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="email" className="border rounded-5 ion-margin-end" placeholder='Enter Email' {...register('registrationInputs.email')} />
                      <IonIcon icon={mailOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.email && <li className='text-danger'>This field is required</li>}
                  </div>
                  <div className='ion-margin-vertical'>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="text" className="border rounded-5 ion-margin-end" placeholder='Enter Phone number' {...register('registrationInputs.phone')} />
                      <IonIcon icon={phonePortraitOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.phone && <li className='text-danger'>This field is required</li>}
                  </div>
                  <div>
                    <div className='d-flex align-items-center mt-2'>
                      <IonSelect value={skill} onIonChange={(e) => setSkill(e.detail.value)} placeholder="Enter skill" className='border rounded-5 ion-margin-end w-100' {...register('registrationInputs.skill')}>
                        <IonSelectOption value={"architect"} title='architect'>Architect </IonSelectOption>
                        <IonSelectOption value={"quantity surveyor"} title='quantity surveyor'>Quantity Surveyor </IonSelectOption>
                        <IonSelectOption value={"plumber"} title='plumber'>Plumber </IonSelectOption>
                        <IonSelectOption value={"tiler"} title='tiler'>Tiler </IonSelectOption>
                        <IonSelectOption value={"interior decor"} title='interior decor'>Interior Decor </IonSelectOption>
                        <IonSelectOption value={"painter"} title='painter'>Painter </IonSelectOption>
                        <IonSelectOption value={"capenter"} title='capenter'>Capenter </IonSelectOption>
                      </IonSelect>
                      <IonIcon icon={hammerOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.skill && <li className='text-danger'>This field is required</li>}
                  </div>
                  <div>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="password" className="border rounded-5 ion-margin-end" placeholder='Password' {...register('registrationInputs.password')} />
                      <IonIcon icon={lockClosedOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.password && <li className='text-danger'>This field is required</li>}
                  </div>
                  <div>
                    <div className='d-flex align-items-center mt-2'>
                      <IonInput type="password" className="border rounded-5 ion-margin-end" placeholder='Confirm Password' {...register('registrationInputs.passwordConfirm')} />
                      <IonIcon icon={lockClosedOutline} size="large" />
                    </div>
                    {errors.registrationInputs?.passwordConfirm && <li className='text-danger'>This field is required</li>}
                  </div>

                  {
                    loading ? (
                      <IonButton
                        className='fill ion-margin-vertical mt-4'
                        expand='block'
                        shape='round'
                        size='large'
                      >
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                          </div>
                        </div>
                      </IonButton>
                    ) : (
                      <IonButton
                        className='fill ion-margin-vertical mt-4'
                        expand='block'
                        shape='round'
                        size='large'
                        type='submit'
                      >
                        Register
                        <IonIcon icon={logInOutline} style={{ color: `${colors}` }} />
                      </IonButton>

                    )
                  }


                </section>
              </form>

            ) : null
          }

          <div className="ion-text-center my-4">
            <small className="text-muted ion-text-center mt-5 fw-bold">
              Powered by
              <a href="/" className='nav-link'>ThisruptCode 💙</a>
            </small>
          </div>
        </section>

      </IonContent>
    </IonPage>
  )
}

type LoginInputs = {
  email: string
  password: string
};

type ReigsterationInputs = {
  name: string
  email: string
  skill: string
  phone: string
  password: string
  passwordConfirm: string
}

interface AuthInputs {
  // I: LoginInputs | ReigsterationInputs
  loginInputs: LoginInputs
  registrationInputs: ReigsterationInputs
}


export default Login
