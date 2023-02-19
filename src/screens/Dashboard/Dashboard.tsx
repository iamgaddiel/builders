import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonText, IonTitle } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTitle from '../../components/HeaderTitle'


import Avater from '../../assets/svgs/undraw_profile_pic_ic5t.svg'
import { UserCollectionType, StoredUser } from '../../@types/users'
import { AuthContextType, AuthContext } from '../../contexts/AuthContext'
import { SettingsContextType, SettingsContext } from '../../contexts/SettingsContext'
import SpaceBetween from '../../components/style/SpaceBetween'
import { ProjectList, ProjectType } from '../../@types/projects'
import { listCollection } from '../../helpers/sdks'
import { PROJECTS_COLLECTION } from '../../helpers/keys'
import NotFound from '../../components/NotFound'
import { location, timeOutline, walletOutline } from 'ionicons/icons'

import moment from "moment"


const Dashboard = () => {

  const { setshowTabs } = useContext(SettingsContext) as SettingsContextType
  const { getStoredUser } = useContext(AuthContext) as AuthContextType
  const [user, setUser] = useState<UserCollectionType | null>(null)
  const [projectList, setProjectList] = useState<ProjectType[]>([])





  useEffect(() => {
    setshowTabs(true)
    getUser()
    getProjects()
  }, []);



  async function getUser() {
    const res: StoredUser = await getStoredUser()
    if (res !== null) setUser(res.record)
  }


  async function getProjects() {
    try {
      const res = await listCollection(PROJECTS_COLLECTION) as ProjectType[]
      console.log("🚀 ~ file: Dashboard.tsx:45 ~ getProjects ~ res", res)
      setProjectList(res)
    }
    catch (err) {
      console.log(err, '<---- Error Project')
    }
  }



  return (
    <IonPage>
      <HeaderTitle title='Dashboard' />
      <IonContent className='ion-padding' fullscreen>

        <section className="profile_preview">
          <IonList lines='none'>
            <IonItem>
              <IonAvatar>
                <IonImg src={Avater} />
              </IonAvatar>
              <IonLabel>
                <IonText>{user?.name}</IonText>
                <p>{user?.skill}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </section>


        <section className="buildings">
          {
            projectList?.length > 0 ? (
              <>
                {
                  projectList?.map((project, indx) => (
                    <IonCard mode='ios' routerDirection='forward' routerLink={`/place/bid/${project.id}`}>
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
                            <IonItem>
                              <IonLabel>
                              <IonText><IonIcon icon={timeOutline} /> Posted</IonText>
                                <p>{moment(project.created).fromNow()} </p>
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

export default Dashboard