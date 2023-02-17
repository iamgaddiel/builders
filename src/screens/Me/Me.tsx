import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { logOut } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserCollectionType, StoredUser } from '../../@types/users'
import HeaderTitle from '../../components/HeaderTitle'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import { SettingsContext, SettingsContextType } from '../../contexts/SettingsContext'
import { StorageContext, StorageContextType } from '../../contexts/StorageContext'
import { USER } from '../../helpers/keys'

const Me = () => {
    const { logout, getStoredUser } = useContext(AuthContext) as AuthContextType
    const { clearData } = useContext(StorageContext) as StorageContextType
    const { setshowTabs } = useContext(SettingsContext) as SettingsContextType

    const [user, setUser] = useState<UserCollectionType | null>(null)
    const history = useHistory()



    useEffect(() => {
        getUser()
    }, [])


    async function getUser() {
        const res: StoredUser = await getStoredUser()
        if (res !== null) setUser(res.record)
    }


    async function logoutUser() {
        clearData(USER)
        logout()
        setshowTabs(false)
        history.push('/login')
    }


    return (
        <IonPage>
            <HeaderTitle title='Me' />
            <IonContent className='ion-padding'>
                <IonButton className="fill" shape='round' expand='block' onClick={() => logoutUser()}>
                    logout { }
                    <IonIcon icon={logOut} slot="end" />
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Me