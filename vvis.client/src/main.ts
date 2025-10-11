import { platformBrowser } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { AppModule } from './app/app.module';

registerLocaleData(localeNl);

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
