import { IonPage, IonContent, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonText, IonCard, IonCardContent, IonIcon, IonCardTitle, IonCardSubtitle } from '@ionic/react'
import { location } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { BidType } from '../../@types/bid'
import { ProjectType } from '../../@types/projects'
import { UserCollectionType, StoredUser } from '../../@types/users'
import HeaderTitle from '../../components/HeaderTitle'
import NotFound from '../../components/NotFound'
import SpaceBetween from '../../components/style/SpaceBetween'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import { SettingsContext, SettingsContextType } from '../../contexts/SettingsContext'
import { BIDS_COLLECTION, PROJECTS_COLLECTION } from '../../helpers/keys'
import { filterCollection, listCollection } from '../../helpers/sdks'

const Bids = () => {

  const { setshowTabs } = useContext(SettingsContext) as SettingsContextType
  const { getStoredUser } = useContext(AuthContext) as AuthContextType
  const [user, setUser] = useState<UserCollectionType | null>(null)
  const [projectList, setProjectList] = useState<ProjectType[]>([])
  const [bids, setBids] = useState<BidType[]>([])




  useEffect(() => {
    setshowTabs(true)
    getUser()
    getBids()
  }, []);



  async function getUser() {
    const res: StoredUser = await getStoredUser()
    if (res !== null) setUser(res.record)
  }


  async function getBids() {
    try {
      const filterParam = `user="${user?.id}"`
      const res = await filterCollection(BIDS_COLLECTION, filterParam, 1, 200, "projects") as BidType[]
      console.log("🚀 ~ file: Bids.tsx:44 ~ getBids ~ res", res)
      setBids(res)
    }
    catch (err) {
      console.log(err, '<---- Error Project')
    }
  }

  
  return (
    <IonPage>
      <HeaderTitle title='Bids' />
      <IonContent className='ion-padding' fullscreen>

        <section className="buildings">
          {
            projectList?.length > 0 ? (
              <>
                {
                  projectList?.map((project, indx) => (
                    <IonCard mode='ios' >
                      <IonCardContent>
                        <span className="mt-3 text-muted ion-padding-horizontal">
                          <IonIcon icon={location} />
                          { }
                          {project.location}
                        </span>
                        <SpaceBetween className='ion-padding-horizontal'>
                          <IonCardTitle>{project.name}</IonCardTitle>
                          <IonCardSubtitle className='text-danger'>{project.project_duration}{project.project_time_frame}</IonCardSubtitle>
                        </SpaceBetween>



                        <section className="mt-2">
                          <IonList lines='none'>
                            <IonItem>
                              <IonLabel>
                                <IonText>Duration</IonText>
                                <p>{project.project_duration}{project.project_time_frame} </p>
                              </IonLabel>
                            </IonItem>
                            <IonItem>
                              <IonLabel>
                                <IonText>Professional Needed</IonText>
                                <p>{project.professionals_needed} </p>
                              </IonLabel>
                            </IonItem>
                          </IonList>
                        </section>

                        {/* <IonButton className='mt-2 fill' shape='round' expand='block'>
                        Bid
                        <IonIcon icon={walletOutline} slot="end" />
                      </IonButton> */}
                      </IonCardContent>
                    </IonCard>
                  ))}
              </>
            ) : (
              <NotFound message="No projects were found" />
            )
          }
        </section>

      </IonContent>
    </IonPage >
  )
}

export default Bids