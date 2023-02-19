import { IonAlert, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { documentAttachOutline, fileTrayOutline, hammerOutline, informationCircleOutline, lockClosedOutline, mailOutline, personOutline, phonePortraitOutline, wallet, walletOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import { UserCollectionType, StoredUser } from '../../@types/users'
import BackHeader from '../../components/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import { StorageContext, StorageContextType } from '../../contexts/StorageContext'
import { BIDS_COLLECTION } from '../../helpers/keys'
import { createItem } from '../../helpers/sdks'
import Settings from '../../helpers/settings'

const Bid = () => {
    const { projectId }: Params = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm<BidFormType>();
    const { getSaveData } = useContext(StorageContext) as StorageContextType
    const { getStoredUser } = useContext(AuthContext) as AuthContextType
    const [user, setUser] = useState<UserCollectionType | null>(null)
    const { pb } = Settings()
    const history = useHistory()


    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAleart] = useState(false)
    const [message, setMessage] = useState("")
    const [appDoc, setAppDoc] = useState("")



    useEffect(() => {
        getUser()
    }, []);



    async function getUser() {
        const res: StoredUser = await getStoredUser()
        if (res !== null) setUser(res.record)
    }


    const handdleBidSubmit: SubmitHandler<BidFormType> = async (data) => {
        setLoading(true)

        const formData = new FormData()

        formData.append("user", user?.id!)
        formData.append("project", projectId)
        formData.append("profession", user?.skill!)
        formData.append("approved", "0")
        formData.append("application_doc", appDoc)

        const newData: any = { ...data }

        for (let val in data) {
            formData.append(val, newData[val])
        }



        try {
            const { isCreated, error }: any = await createItem(BIDS_COLLECTION, formData)
            
            if (isCreated) {
                setMessage("Bid submitted successfuly")
                setLoading(false)
                setShowAleart(true)
            }
            
            
        } catch (err: any) {
            displayFormError('user', err?.message,);
            console.log(err, '<------- }}')
        }

    }


    function displayFormError(field: string, message?: string) {
        setMessage(`${field}: ${message}`)
        setLoading(false)
        setShowToast(true)
    }


    function handleFileUpload(event: any) {
        const file = event.target.files[0]
        setAppDoc(file)
    }


    return (
        <IonPage>
            <BackHeader title='Bid' />
            <IonContent className='ion-paddding'>
                <IonAlert
                    buttons={
                        [
                            {
                                text: "Continue",
                                handler: () => history.push("/bids")
                            }
                        ]
                    }
                    isOpen={showAlert}
                    message="You succssfully bided for this project we will revert back to you shortly"
                    header='Bid Successful'
                />

                <form onSubmit={handleSubmit(handdleBidSubmit)}>
                    <section className="action-panel ion-padding">

                        <div className="mt-3 ion-margin-vertical">
                            <IonLabel>Upload File</IonLabel>
                            <SpaceBetween>
                                <input
                                    accept='application/pdf, application/msword'
                                    onChange={(e) => handleFileUpload(e)}
                                    type="file"
                                    className="border rounded-4 p-2" /> { }
                                <IonIcon icon={documentAttachOutline} size="large" />
                            </SpaceBetween>
                            {errors.application_doc && <span className='text-danger'>This field is required</span>}
                        </div>

                        <section>
                            <IonListHeader className='text-muted'>
                                <IonIcon icon={informationCircleOutline} /> { }
                                Notice
                            </IonListHeader>

                            <ul className='text-muted'>
                                <li> Submit your terms and condition for this bid</li>
                                <li> Application documnets</li>
                            </ul>
                        </section>

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
                                    Submit
                                    <IonIcon icon={walletOutline} slot="end" />
                                </IonButton>

                            )
                        }


                    </section>
                </form>
            </IonContent>
        </IonPage>
    )
}


type BidFormType = {
    user?: string
    project?: string
    profession?: string
    application_doc: string
    approved?: boolean
}

type Params = {
    projectId: string
}

export default Bid