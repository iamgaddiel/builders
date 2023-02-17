import { IonButton, IonContent, IonPage } from '@ionic/react'
import React from 'react'


import Building from "../../assets/images/building.jpg"

import './Landing.css'



const Landing = () => {
    return (
        <IonPage>
            <IonContent className='' fullscreen>

                <section className="landing_image" style={{ backgroundImage: `url("${Building}")`}}></section>


                <section className="action-panel text-center ion-padding py-5">
                    <big className='ion-text-center fw-bold text-justiyfy'>enjoy the eperince the new experinece of building with others</big>
                    <IonButton
                        className='fill ion-margin-vertical'
                        expand='block'
                        shape='round'
                        size='large'
                        routerDirection='forward'
                        routerLink='/login'
                        mode='ios'
                    >Get Started
                    </IonButton>

                    <small className="text-muted ion-text-center mt-5 fw-bold text-muted">Powered by <a href="/" className='nav-link'>ThisruptCode 💙</a> </small>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default Landing
