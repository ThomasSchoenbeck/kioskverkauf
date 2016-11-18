import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { ListPage } from '../pages/list/list';
import { GamePage } from '../pages/game/game';
import { PreGamePage } from '../pages/preGame/preGame';
import { LoadGamePage } from '../pages/loadGame/loadGame';
import { SettingsPage } from '../pages/settings/settings';

import { ActionSheetComponent } from '../pages/actionsheet/actionsheet';

import { CitySelectorComponent } from '../components/citySelector/citySelector';
import { ShopSelectorComponent } from '../components/shopSelector/shopSelector';
import { ShoppingComponent } from '../components/shopping/shopping';
import { ActionsComponent } from '../components/actions/actions';
import { InventoryComponent } from '../components/inventory/inventory';
import { FinancesComponent } from '../components/finances/finances';
import { SaveSlotComponent } from '../components/saveSlot/saveSlot'
import { RoundSummaryComponent } from '../components/roundSummary/roundSummary';

import { SettingsProvider } from '../providers/settings';
import { SavegameProvider } from '../providers/savegame';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    // ListPage,
    GamePage,
    PreGamePage,
    LoadGamePage,
    SettingsPage,
    ActionSheetComponent,
    CitySelectorComponent,
    ShopSelectorComponent,
    ShoppingComponent,
    ActionsComponent,
    InventoryComponent,
    FinancesComponent,
    SaveSlotComponent,
    RoundSummaryComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    // ListPage,
    GamePage,
    PreGamePage,
    LoadGamePage,
    SettingsPage,
    ActionSheetComponent,
    CitySelectorComponent,
    ShopSelectorComponent,
    ShoppingComponent,
    ActionsComponent,
    InventoryComponent,
    FinancesComponent,
    SaveSlotComponent,
    RoundSummaryComponent
  ],
  providers: [ ActionSheetComponent, Storage, SettingsProvider, SavegameProvider ]
})
export class AppModule {}
