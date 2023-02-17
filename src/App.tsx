import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { book, chatbubbles, home, person, walletOutline } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// import boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// global css
import "./global.css"


import { useContext } from 'react';
import { SettingsContextType, SettingsContext } from './contexts/SettingsContext';
import Landing from './screens/Landing';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import Me from './screens/Me';
import Bid from './screens/Bid';
import Bids from './screens/Bids';

setupIonicReact();

const App: React.FC = () => {
  const { showTabs } = useContext(SettingsContext) as SettingsContextType


  return (
    <IonApp>
      <IonReactRouter>

        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/me">
          <Me />
        </Route>

        <Route exact path="place/bid/:projectId">
          <Bid />
        </Route>
        <Route exact path="/bids">
          <Bids />
        </Route>



        {
          showTabs ? (

            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/me">
                  <Me />
                </Route>
                <Route exact path="/place/bid/:projectId">
                  <Bid />
                </Route>
                <Route exact path="/bids">
                  <Bids />
                </Route>

              </IonRouterOutlet>

              <IonTabBar slot='bottom'>
                <IonTabButton tab="tab1" href="/dashboard">
                  <IonIcon icon={home} />
                </IonTabButton>
                <IonTabButton tab="tab2" href="/bids">
                  <IonIcon icon={walletOutline} />
                </IonTabButton>
                <IonTabButton tab="tab4" href="/me">
                  <IonIcon icon={person} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : null
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
