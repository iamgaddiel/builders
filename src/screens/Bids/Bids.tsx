import { IonPage, IonContent, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonText, IonCard, IonCardContent, IonIcon, IonCardTitle, IonCardSubtitle } from '@ionic/react'
import { homeOutline, location, timeOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { BidType, BidList } from '../../@types/bid'
import { ProjectType } from '../../@types/projects'
import { UserCollectionType, StoredUser } from '../../@types/users'
import HeaderTitle from '../../components/HeaderTitle'
import NotFound from '../../components/NotFound'
import SpaceBetween from '../../components/style/SpaceBetween'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import { SettingsContext, SettingsContextType } from '../../contexts/SettingsContext'
import { BIDS_COLLECTION, PROJECTS_COLLECTION } from '../../helpers/keys'
import { filterCollection, listCollection } from '../../helpers/sdks'
import moment from 'moment'
import { getItem } from 'localforage-cordovasqlitedriver'



const Bids = () => {

  const { setshowTabs } = useContext(SettingsContext) as SettingsContextType
  const { getStoredUser } = useContext(AuthContext) as AuthContextType
  const [user, setUser] = useState<UserCollectionType | null>(null)
  const [projectList, setProjectList] = useState<ProjectType[]>([])
  // const [bids, setBids] = useState<BidType[]>([])
  const [bids, setBids] = useState<BidList | null>()




  useEffect(() => {
    setshowTabs(true)
    getUser()
  }, []);



  async function getUser() {
    const res: StoredUser = await getStoredUser()
    if (res !== null) {
      setUser(res.record)
      getBids(res?.record?.id)
    }
  }


  async function getBids(userId: string) {
    try {
      const filterParam = `user="${userId}"`
      const res = await filterCollection(BIDS_COLLECTION, filterParam, 1, 200, "projects") as BidList
      setBids(res)
    }
    catch (err) {
      console.log(err, '<---- Error Project')
    }
  }
  
  
  async function getProject(projectId: string){
    try{
      const res = await getItem(projectId)
      return res
    }
    catch(err){
      console.log(err, '<---- Error Project')
    }
  }


  return (
    <IonPage>
      <HeaderTitle title='Bids' />
      <IonContent className='ion-padding' fullscreen>

        <section className="buildings">
          {
            bids?.totalItems! > 0 ? (
              <>
                {
                  bids?.items.map((bid, indx) => (
                    <IonCard mode='ios' >
                      <IonCardContent>
                        <IonCardSubtitle className={bid.approved ? 'text-success' : 'text-warning'}>
                          <span className="mt-3 ion-padding-horizontal text-capitalilze">
                            {bid.approved ? "approved" : "pending"}
                          </span>
                        </IonCardSubtitle>
                        <SpaceBetween className='ion-padding-horizontal'>
                          <IonCardTitle>{bid.id}</IonCardTitle>
                        </SpaceBetween>



                        <section className="mt-2">
                          <IonList lines='none'>
                            <IonItem>
                              <IonLabel>
                                <IonText>Profession</IonText>
                                <p>{bid.profession}</p>
                              </IonLabel>
                            </IonItem>
                            {/* <IonItem>
                              <IonLabel>
                                <IonText><IonIcon icon={homeOutline} /> Project</IonText>
                                <p>{bid.expand.}</p>
                              </IonLabel>
                            </IonItem> */}
                            <IonItem>
                              <IonLabel>
                                <IonText><IonIcon icon={timeOutline} /> Bided</IonText>
                                <p>{moment(bid.created).fromNow()} </p>
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
              <NotFound message="No bids were found" />
            )
          }
        </section>

      </IonContent>
    </IonPage >
  )
}

export default Bids