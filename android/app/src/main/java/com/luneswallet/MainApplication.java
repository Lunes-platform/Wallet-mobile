package com.luneswallet;

import android.app.Application;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
// import io.sentry.RNSentryPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.keychain.KeychainPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            // new RNSentryPackage(MainApplication.this),            
            new RNI18nPackage(),
            new RCTCameraPackage(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseDatabasePackage(),
            new LinearGradientPackage(),
            new SvgPackage(),
            new KeychainPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
